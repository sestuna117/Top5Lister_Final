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
        store.loadListInfo();
    }, []);

    useEffect(() => {
        if (!store) {
            return;
        }
        console.log(store.sorter)
        let ownedLists = store.listInfo.filter(pair => pair.owner === auth.user.username)
            .filter(list => list.name.includes(store.filter)).slice();
        switch (store.sorter) {
            case 1:
                ownedLists.sort((a, b) => Date.parse(b.published) - Date.parse(a.published))
                break;
            case 2:
                ownedLists.sort((a, b) => Date.parse(a.published) - Date.parse(b.published))
                break;
            case 3:
                ownedLists.sort((a, b) => b.views - a.views)
                break;
            case 4:
                ownedLists.sort((a, b) => b.likes.length - a.likes.length)
                break;
            case 5:
                ownedLists.sort((a, b) => b.dislikes.length - a.dislikes.length)
                break;
        }
        setLists(ownedLists);
    }, [store])

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