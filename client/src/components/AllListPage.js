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
const AllListPage = () => {
    const { auth } = useContext(AuthContext)
    const { store } = useContext(GlobalStoreContext);
    const [lists, setLists] = useState([])

    useEffect(() => {
        if (!store) {
            return;
        }
        let searchedLists = store.listInfo.filter(list => list.published !== '1970-01-01')
            .filter(list => list.name.toLowerCase().includes(store.filter.toLowerCase())).slice();
        switch (store.sorter) {
            case 1:
                searchedLists.sort((a, b) => Date.parse(b.published) - Date.parse(a.published))
                break;
            case 2:
                searchedLists.sort((a, b) => Date.parse(a.published) - Date.parse(b.published))
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

export default AllListPage;