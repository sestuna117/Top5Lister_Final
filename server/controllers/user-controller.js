const auth = require('../auth')
const User = require('../models/user-model')
const bcrypt = require('bcryptjs')

getLoggedIn = async (req, res) => {
    auth.verify(req, res, async function () {
        const loggedInUser = await User.findOne({ _id: req.userId });
        return res.status(200).json({
            loggedIn: true,
            user: {
                firstName: loggedInUser.firstName,
                lastName: loggedInUser.lastName,
                email: loggedInUser.email,
                username: loggedInUser.username,
            }
        }).send();
    })
}

createGuest = async (req, res) => {
    try {
        const { firstName, lastName, email, username, password } = req.body;
        const existingUser = await User.findOne({ username: username });
        if (existingUser) {
            return res
                .status(200)
                .json({
                    success: false,
                    errorMessage: "Guest acc already exists."
                })
        }

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName, lastName, username, email, passwordHash
        });
        const savedUser = await newUser.save();
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}

loginGuest = async (req, res) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email: email });
    const correctPass = await bcrypt.compare(password, existingUser.passwordHash);

    // LOGIN THE USER
    const token = auth.signToken(existingUser);
    if (!correctPass) {
        return res
            .status(401)
            .json({
                success: false,
                errorMessage: "Wrong email or password."
            })
    }

    await res.cookie("token", token, {
        httpOnly: true,
        secure: true,
    }).status(200).json({
        success: true,
        user: {
            firstName: existingUser.firstName,
            lastName: existingUser.lastName,
            email: existingUser.email,
            username: existingUser.username,
        }
    }).send();
}

registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, username, password, passwordVerify } = req.body;
        if (!firstName || !lastName || !email || !password || !passwordVerify) {
            return res
                .status(400)
                .json({ errorMessage: "Please enter all required fields." });
        }
        if (password.length < 8) {
            return res
                .status(400)
                .json({
                    errorMessage: "Please enter a password of at least 8 characters."
                });
        }
        if (password !== passwordVerify) {
            return res
                .status(400)
                .json({
                    errorMessage: "Please enter the same password twice."
                })
        }
        const existingEmail = await User.findOne({ email: email });
        if (existingEmail) {
            return res
                .status(400)
                .json({
                    success: false,
                    errorMessage: "An account with this email address already exists."
                })
        }
        const existingUser = await User.findOne({ username: username });
        if (existingUser) {
            return res
                .status(400)
                .json({
                    success: false,
                    errorMessage: "This username is already taken."
                })
        }

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName, lastName, username, email, passwordHash
        });
        const savedUser = await newUser.save();

        // LOGIN THE USER
        const token = auth.signToken(savedUser);

        await res.cookie("token", token, {
            httpOnly: true,
            secure: true,
        }).status(200).json({
            success: true,
            user: {
                firstName: savedUser.firstName,
                lastName: savedUser.lastName,
                email: savedUser.email,
                username: savedUser.username,
            }
        }).send();
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}

loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res
            .status(400)
            .json({ errorMessage: "Please enter all required fields." });
    }

    let existingUser = await User.findOne({ email: email });
    if (!existingUser) {
        existingUser = await User.findOne({ username: email });
        if (!existingUser) {
            return res
                .status(401)
                .json({
                    success: false,
                    errorMessage: "Wrong email/username or password."
                })
        }
    }
    const correctPass = await bcrypt.compare(password, existingUser.passwordHash);
    if (!correctPass) {
        return res
            .status(401)
            .json({
                success: false,
                errorMessage: "Wrong email/username or password."
            })
    }

    // LOGIN THE USER
    const token = auth.signToken(existingUser);

    await res.cookie("token", token, {
        httpOnly: true,
        secure: true,
    }).status(200).json({
        success: true,
        user: {
            firstName: existingUser.firstName,
            lastName: existingUser.lastName,
            email: existingUser.email,
            username: existingUser.username,
        }
    }).send();
}

logoutUser = async (req, res) => {
    // Set token to none and expire after 5 seconds
    await res.cookie('token', null, {
        httpOnly: true,
    }).status(200).json({
        success: true,
        user: null
    });
}

module.exports = {
    getLoggedIn,
    registerUser,
    loginUser,
    logoutUser,
    createGuest,
    loginGuest
}