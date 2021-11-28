import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import AuthContext from '../auth';
import { Fab, IconButton, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';

/*
    Our Status bar React component goes at the bottom of our UI.
    
    @author McKilla Gorilla
*/
function Statusbar() {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);

    function handleCreateNewList() {
        store.createNewList();
    }

    let text = "";
    if (store.currentList && auth.user)
        if (store.currentList.ownerEmail === auth.user.email) {
            text = store.currentList.name;
        }
    return auth.user ? (
        <div id="list-selector-heading">
            <IconButton
                sx={{backgroundColor: 'transparent'}}
                color="primary"
                aria-label="add"
                id="add-list-button"
                onClick={handleCreateNewList}
                disabled={store.isListNameEditActive}
            >
                <AddIcon  style={{ fontSize: '24pt', color: 'black' }} />
            </IconButton>
            <Typography variant="h2">Your Lists</Typography>
        </div>
    ) : (
        <div id="top5-statusbar">
            <Typography variant="h4">{text}</Typography>
        </div>
    );
}

export default Statusbar;