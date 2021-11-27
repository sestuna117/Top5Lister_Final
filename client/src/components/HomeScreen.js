import React, { useContext, useEffect, useState } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import List from '@mui/material/List';
import AuthContext from '../auth';
import DeleteModal from './DeleteModal'
import NavBar from './NavBar';

/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext)
    const [lists, setLists] = useState([])

    useEffect(() => {
        if (!store) {
            return;
        }
        let ownedLists = store.listInfo.filter(pair => pair.owner === auth.user.username)
            .filter(list => list.name.includes(store.filter)).slice();
        setLists(ownedLists);
    }, [store])

    useEffect(() => {
        if (!auth.loggedIn || store.listInfo === 0) {
            return;
        }
        store.loadListInfo();
    }, [auth]);

    return (
        <div id="top5-list-selector">
            <NavBar />
            <div id="list-selector-list">
                <List sx={{ width: '90%', left: '5%' }}>
                    {
                        lists.map((pair) => (
                            <ListCard
                                key={pair._id}
                                listInfo={pair}
                                selected={false}
                            />
                        ))
                    }
                    <DeleteModal />
                </List>
            </div>
        </div>)
}

export default HomeScreen;