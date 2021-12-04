import React, { useContext, useEffect, useState } from 'react'
import { GlobalStoreContext } from '../store'
import CommunityListCard from './CommunityListCard.js'
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
        let searchedLists = store.aggListInfo.filter(list => list.name.includes(store.filter)).slice();
        switch (store.sorter) {
            case 1:
                searchedLists.sort((a, b) => Date.parse(b.updated) - Date.parse(a.updated))
                break;
            case 2:
                searchedLists.sort((a, b) => Date.parse(a.updated) - Date.parse(b.updated))
                break;
            case 3:
                searchedLists.sort((a, b) => b.views - a.views)
                break;
            case 4:
                searchedLists.sort((a, b) => b.likes.length - a.likes.length)
                break;
            case 5:
                searchedLists.sort((a, b) => b.dislikes.length - a.dislikes.length)
                break;
        }
        setLists(searchedLists);
    }, [store])

    return (auth.user ?
        <div id="top5-list-selector">
            <NavBar />
            <div id="list-selector-list">
                <List sx={{ width: '90%', left: '5%' }}>
                    {
                        lists.map((pair) => (
                            <CommunityListCard
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