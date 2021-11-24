import React, { createContext, useEffect, useState, useCallback } from "react";
import { useHistory } from 'react-router-dom'
import api from '../api'

const AuthContext = createContext();
console.log("create AuthContext: " + AuthContext);

// THESE ARE ALL THE TYPES OF UPDATES TO OUR AUTH STATE THAT CAN BE PROCESSED
export const AuthActionType = {
    GET_LOGGED_IN: "GET_LOGGED_IN",
    REGISTER_USER: "REGISTER_USER",
    LOGIN_USER: "LOGIN_USER",
    LOGOUT_USER: "LOGOUT_USER",
    SET_ERROR_MSG: "SET_ERROR_MSG",
    CLOSE_ERROR_MSG: "CLOSE_ERROR_MSG",
}

function AuthContextProvider(props) {
    const [auth, setAuth] = useState({
        user: null,
        loggedIn: false,
        errorMsg: "",
    });
    const history = useHistory();
    // console.log(auth)

    useEffect(() => {
        getLoggedIn();
    }, []);

    const authReducer = useCallback((action) => {
        const { type, payload } = action;
        switch (type) {
            case AuthActionType.GET_LOGGED_IN: {
                return setAuth({
                    user: payload.user,
                    loggedIn: payload.loggedIn,
                    errorMsg: "",
                });
            }
            case AuthActionType.REGISTER_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    errorMsg: "",
                })
            }
            case AuthActionType.LOGIN_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    errorMsg: "",
                })
            }
            case AuthActionType.LOGOUT_USER: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                    errorMsg: "",
                })
            }
            case AuthActionType.SET_ERROR_MSG: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                    errorMsg: payload.errMsg,
                })
            }
            case AuthActionType.CLOSE_ERROR_MSG: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                    errorMsg: "",
                })
            }
            default:
                return auth;
        }
    }, [setAuth]);

    const getLoggedIn = useCallback(async () => {
        try {
            const response = await api.getLoggedIn();
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.GET_LOGGED_IN,
                    payload: {
                        loggedIn: response.data.loggedIn,
                        user: response.data.user
                    }
                });
            }
        }
        catch {
            return;
        }
    }, [authReducer])

    const registerUser = useCallback(async (userData, store) => {
        try {
            const response = await api.registerUser(userData);
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.REGISTER_USER,
                    payload: {
                        user: response.data.user
                    }
                })
                history.push("/");
                store.loadListInfo();
            }
        }
        catch (err) {
            // console.error(err.response.data.errorMessage);
            authReducer({
                type: AuthActionType.SET_ERROR_MSG,
                payload: {
                    errMsg: err.response.data.errorMessage
                }
            })
        }
    }, [authReducer]);

    const loginUser = useCallback(async (loginData, store) => {
        try {
            const response = await api.loginUser(loginData);
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.LOGIN_USER,
                    payload: {
                        user: response.data.user
                    }
                })
                history.push("/");
                store.loadListInfo();
            }
        }
        catch (err) {
            // console.error(err.response.data.errorMessage);
            authReducer({
                type: AuthActionType.SET_ERROR_MSG,
                payload: {
                    errMsg: err.response.data.errorMessage
                }
            })
        }

    }, [authReducer]);

    const logoutUser = useCallback(async (store) => {
        const response = await api.logoutUser();
        if (response.status === 200) {
            authReducer({
                type: AuthActionType.LOGOUT_USER,
                payload: {}
            })
            store.closeTop5List();
            history.push("/")
        }
    }, [authReducer])

    const closeErrorMsg = useCallback(() => {
        authReducer({
            type: AuthActionType.CLOSE_ERROR_MSG,
            payload: {}
        })
    })

    return (
        <AuthContext.Provider value={{
            auth, registerUser, loginUser, getLoggedIn, logoutUser, closeErrorMsg
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
export { AuthContextProvider };