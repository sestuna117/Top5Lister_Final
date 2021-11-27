import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import AuthContext from '../auth';
import { Button, Fab, Typography } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import FunctionsIcon from '@mui/icons-material/Functions';
import SortIcon from '@mui/icons-material/Sort';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Box } from '@mui/system';

/*
    Our Status bar React component goes at the bottom of our UI.
    
    @author McKilla Gorilla
*/
function NavBar() {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const [anchorEl, setAnchorEl] = useState(null)
    const isMenuOpen = Boolean(anchorEl);
    const [text, setText] = useState('');
    
    // Response for when a keyboard key is pressed in search bar
    function handleChange(event) {
        setText(event.target.value)
    }

    // Response for when one presses the "Enter" key
    function handleKeyPress(event) {
        if (event.code === "Enter") {
            store.setFilter(text);
        }
    }

    const handleSortMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleSort = () => {
        handleMenuClose();
    }

    // Response for when one presses a list page icon
    const handleChangePage = (event) => {

    }

    function getSortMenu() {
        return <SortIcon style={{ fontSize: '36pt' }} />;
    }

    const menuId = 'primary-search-account-menu';
    const menu = (
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
            <MenuItem onClick={handleMenuClose}><Button>Publish Date (Newest)</Button></MenuItem>
            <MenuItem onClick={handleMenuClose}><Button>Publish Date (Oldest)</Button></MenuItem>
            <MenuItem onClick={handleMenuClose}><Button>Views</Button></MenuItem>
            <MenuItem onClick={handleMenuClose}><Button>Likes</Button></MenuItem>
            <MenuItem onClick={handleMenuClose}><Button>Dislikes</Button></MenuItem>
        </Menu>
    );

    return (
        <div className='navbar'>
            <div className='navbar-left'>
                <IconButton onClick={handleChangePage} disabled={store.isListNameEditActive} aria-label='edit'>
                    <HomeIcon style={{ fontSize: '36pt' }} />
                </IconButton>
                <IconButton onClick={handleChangePage} disabled={store.isListNameEditActive} aria-label='edit'>
                    <GroupIcon style={{ fontSize: '36pt' }} />
                </IconButton>
                <IconButton onClick={handleChangePage} disabled={store.isListNameEditActive} aria-label='edit'>
                    <PersonIcon style={{ fontSize: '36pt' }} />
                </IconButton>
                <IconButton onClick={handleChangePage} disabled={store.isListNameEditActive} aria-label='edit'>
                    <FunctionsIcon style={{ fontSize: '36pt' }} />
                </IconButton>
                <TextField
                    required
                    onChange={handleChange}
                    placeholder={"Search"}
                    style={{ width: 400 }}
                    name="name"
                    className='list-card'
                    onKeyPress={handleKeyPress}
                    inputProps={{ style: { fontSize: 18, backgroundColor: 'white', borderRadius: 5 } }}
                    InputLabelProps={{ style: { fontSize: 18 } }}
                />
            </div>
            <div className='navbar-right'>
                <Typography variant="h6"
                    component="span"
                    sx={{ display: { xs: 'none', sm: 'block' } }}>
                    Sort By
                </Typography>
                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                    <IconButton
                        onClick={handleSortMenuOpen}
                        color="inherit"
                    >
                        {getSortMenu()}
                    </IconButton>
                </Box>
                {
                    menu
                }
            </div>
        </div >
    )
}

export default NavBar;