import './App.css';
import { React, useContext, useEffect } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import {
    AppBanner,
    HomeWrapper,
    RegisterScreen,
    Statusbar,
    WorkspaceScreen,
    LoginScreen,
    AllListPage,
    UserListPage,
    CommunityListPage
} from './components'
import GlobalStoreContext from './store';
import AuthContext from './auth';
/*
    This is our application's top-level component.
    
    @author McKilla Gorilla
*/
/*
  This is the entry-point for our application. Notice that we
  inject our store into all the components in our application.
  
  @author McKilla Gorilla
*/
const App = () => {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext)

    useEffect(() => {
        if (store.listInfo === 0) {
            return;
        }
        store.loadListInfo();
    }, [auth]);

    return (
        <div>
            <AppBanner />
            <Switch>
                <Route path="/" exact component={HomeWrapper} />
                <Route path="/all" exact component={AllListPage} />
                <Route path="/user" exact component={UserListPage} />
                <Route path="/community" exact component={CommunityListPage} />
                <Route path="/login/" exact component={LoginScreen} />
                <Route path="/register/" exact component={RegisterScreen} />
                <Route path="/top5list/:id" exact component={WorkspaceScreen} />
            </Switch>
            <Statusbar />
        </div>
    )
}

export default App