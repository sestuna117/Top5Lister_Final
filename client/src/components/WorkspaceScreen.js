import { useContext, useEffect, useState } from 'react'
import Top5Item from './Top5Item.js'
import { TextField } from '@mui/material'
import { GlobalStoreContext } from '../store/index.js'
import { useParams } from "react-router-dom";
import AuthContext from '../auth'
import UnauthModal from './UnauthModal.js'
import { Box } from '@mui/system';
import EditToolbar from './EditToolbar.js';
import NavBar from './NavBar.js';

/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/
function WorkspaceScreen() {
    const { id } = useParams();
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const [noUser, setNoUser] = useState(false);
    const [button, setButton] = useState(1);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let items = [];
        for(var pair of data.entries()) {
            items.push(pair[1])
        }
        let listName = items.shift();
        // Response for when one presses the save button
        if (button === 1) {
            store.saveList(listName, items)
        }
        // Response for when one presses the publish button
        else if (button === 2) {
            store.publishList(listName, items)
        }
    };

    useEffect(() => {
        store.setCurrentList(id).then(gotList => {
            if (!gotList) {
                setNoUser(true);
            }
        })
    }, [])

    if (auth.user && store.currentList) {
        return (auth.user.username === store.currentList.user) ? (
            <div id="top5-workspace">
                <NavBar />
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <div id="workspace-edit">
                        <TextField
                            margin="none"
                            required
                            id='list-name'
                            name='list-name'
                            size='small'
                            name="name"
                            className='list-name'
                            defaultValue={store.currentList.name}
                            sx={{ margin: '10px' }}
                            inputProps={{ style: { fontSize: 16, backgroundColor: 'white' } }}
                        />
                        <div className='top5-item-list'>
                            {
                                store.currentList.items.map((item, index) => (
                                    <Top5Item
                                        key={'top5-item-' + (index + 1)}
                                        text={item}
                                        index={index}
                                    />
                                ))
                            }
                        </div>
                        <EditToolbar selectButton={setButton} />
                    </div>
                </Box>
            </div>
        ) :
            <UnauthModal />
    }
    else {
        return noUser ? <UnauthModal /> : null
    }
}

export default WorkspaceScreen;