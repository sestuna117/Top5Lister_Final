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
    const [texts, setTexts] = useState(['','','','','','']);
    const [publishable, setPublishable] = useState(false);

    useEffect(() => {
        if (!store.currentList) {
            return;
        }
        if (!store.currentList.name || !store.currentList.items) {
            return;
        }
        let initTexts = [store.currentList.name]
        store.currentList.items.forEach(item => {
            initTexts.push(item);
        })
        setTexts(initTexts);
    },[store.currentList])

    useEffect(() => {
        if (!texts.length === 6) {
            return;
        }
        checkPublishable();
    },[texts])

    function handleChange(event) {
        let newTexts = texts.slice();
        newTexts[0] = event.target.value;
        setTexts(newTexts);
    }

    const checkPublishable = () => {
        let index = 0;
        let publish = true;
        while (index < 6 && publish) {
            if (!texts[index].charAt(0).match(/^[a-z0-9]+$/i)) {
                publish = false;
            }
            index++;
        }
        setPublishable(publish);
    }

    // Response for when one presses the save button
    const handleSave = (event) => {
        event.preventDefault();
        let listName = texts[0];
        let items = texts.slice(1);
        store.saveList(listName, items)
    }

    // Response for when one presses the publish button
    const handlePublish = (event) => {
        event.preventDefault();
        let listName = texts[0];
        let items = texts.slice(1);
        store.publishList(listName, items)
    }

    useEffect(() => {
        if (!auth.user) {
            setNoUser(true);
        }
        store.setCurrentList(id);
        setNoUser(false);
    }, [auth.user])

    if (auth.user && store.currentList) {
        return (auth.user.username === store.currentList.user) ? (
            <div id="top5-workspace">
                <NavBar />
                <Box component="form" noValidate sx={{ mt: 1 }}>
                    <div id="workspace-edit">
                        <TextField
                            onChange={handleChange}
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
                                        texts={texts}
                                        changeTexts={setTexts}
                                        index={index}
                                    />
                                ))
                            }
                        </div>
                        <EditToolbar handleSave={handleSave} handlePublish={handlePublish} publishable={publishable} />
                    </div>
                </Box>
            </div>
        ) :
            <UnauthModal revert={true} />
    }
    else {
        return noUser ? <UnauthModal /> : null
    }
}

export default WorkspaceScreen;