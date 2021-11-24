import React, { useContext, useEffect } from 'react'
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

    useEffect(() => {
        if (!auth.loggedIn || store.listInfo === 0) {
            return;
        }
        store.loadListInfo();
    }, [auth]);

    let listCard = "";
    if (store) {
        listCard =
            <List sx={{ width: '90%', left: '5%' }}>
                {
                    store.listInfo.map((pair) => (
                        <ListCard
                            key={pair._id}
                            listInfo={pair}
                            selected={false}
                        />
                    ))
                }
                <DeleteModal />
            </List>;
    }
    return (
        <div id="top5-list-selector">
            <NavBar/>
            <div id="list-selector-list">
                {
                    listCard
                }
            </div>
        </div>)
}

export default HomeScreen;