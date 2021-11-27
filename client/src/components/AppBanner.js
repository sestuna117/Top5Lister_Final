import { useContext, useState } from 'react';
import { Link } from 'react-router-dom'
import AuthContext from '../auth';
import { GlobalStoreContext } from '../store'
import EditToolbar from './EditToolbar'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Button } from '@mui/material';

export default function AppBanner() {
    const { auth, logoutUser } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        handleMenuClose();
        logoutUser(store);
    }

    const menuId = 'primary-search-account-menu';
    const loggedOutMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}><Link to='/login/'>Login</Link></MenuItem>
            <MenuItem onClick={handleMenuClose}><Link to='/register/'>Create New Account</Link></MenuItem>
        </Menu>
    );
    const loggedInMenu =
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>

    let menu = loggedOutMenu;
    if (auth.loggedIn) {
        menu = loggedInMenu;
    }

    function getAccountMenu(loggedIn) {
        return <AccountCircle />;
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: '#e0e0e0' }}>
                <Toolbar>
                    <Typography
                        variant="h4"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block'} }}
                    >
                        <Link
                            className={store.isItemEditActive || store.isListNameEditActive ? 'disabled-link' : ''}
                            style={{ textDecoration: 'none', color: '#c4b569' }}
                            to='/'>
                            T<sup>5</sup>L
                        </Link>
                    </Typography>
                    <Box sx={{ flexGrow: 1 }}>{}</Box>
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        {!auth.loggedIn ? <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                            sx={{ color: 'black' }}
                        >
                            {getAccountMenu(auth.loggedIn)}
                        </IconButton> : <Button
                            disabled={store.isItemEditActive || store.isListNameEditActive}
                            variant="h5"
                            type="submit"
                            sx={{ fontSize: 20, border: '2px solid', borderRadius: 100, color: 'black', backgroundColor: '#a959d0' }}
                            onClick={handleProfileMenuOpen}
                        >
                            {(auth.user.firstName.charAt(0) + auth.user.lastName.charAt(0)).toUpperCase()}
                        </Button>}
                    </Box>
                </Toolbar>
            </AppBar>
            {
                menu
            }
        </Box>
    );
}