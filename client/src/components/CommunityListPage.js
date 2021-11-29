import React, { useContext, useEffect, useState } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import List from '@mui/material/List';
import AuthContext from '../auth';
import NavBar from './NavBar';
import UnauthModal from './UnauthModal.js'

/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const CommunityListPage = () => {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext)
    const [lists, setLists] = useState([])

    useEffect(() => {
        store.loadListInfo();
    }, []);

    useEffect(() => {
        if (!store) {
            return;
        }
        let searchedLists = store.listInfo.filter(list => list.name.includes(store.filter)).slice();
        setLists(searchedLists);
    }, [store])

    return (auth.user ?
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
                </List>
            </div>
        </div> : <UnauthModal />)
}

export default CommunityListPage;