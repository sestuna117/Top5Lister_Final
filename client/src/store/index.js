import { createContext, useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import api from '../api'
import AuthContext from '../auth'
/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author McKilla Gorilla
*/

// THIS IS THE CONTEXT WE'LL USE TO SHARE OUR STORE
export const GlobalStoreContext = createContext({});

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
    UPDATE_LIST: "UPDATE_LIST",
    CLOSE_CURRENT_LIST: "CLOSE_CURRENT_LIST",
    CREATE_NEW_LIST: "CREATE_NEW_LIST",
    LOAD_ID_NAME_PAIRS: "LOAD_ID_NAME_PAIRS",
    MARK_LIST_FOR_DELETION: "MARK_LIST_FOR_DELETION",
    UNMARK_LIST_FOR_DELETION: "UNMARK_LIST_FOR_DELETION",
    SET_CURRENT_LIST: "SET_CURRENT_LIST",
    SET_ITEM_EDIT_ACTIVE: "SET_ITEM_EDIT_ACTIVE",
    SET_LIST_NAME_EDIT_ACTIVE: "SET_LIST_NAME_EDIT_ACTIVE",
    CLOSE_TOP5LIST: "CLOSE_TOP5LIST",
    SET_FILTER: "SET_FILTER",
    SET_SORTER: "SET_SORTER",
    CHANGE_PAGE: "CHANGE_PAGE",
    UPDATE_AGG_LIST: "UPDATE_AGG_LIST",
}

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
function GlobalStoreContextProvider(props) {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        listInfo: [],
        aggListInfo: [],
        currentList: null,
        newListCounter: 0,
        isListNameEditActive: false,
        isItemEditActive: false,
        listMarkedForDeletion: null,
        filter: "",
        sorter: 1
    });
    const history = useHistory();

    // SINCE WE'VE WRAPPED THE STORE IN THE AUTH CONTEXT WE CAN ACCESS THE USER HERE
    const { auth } = useContext(AuthContext);

    // HERE'S THE DATA STORE'S REDUCER, IT MUST
    // HANDLE EVERY TYPE OF STATE CHANGE
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            // LIST UPDATE OF ITS NAME
            case GlobalStoreActionType.UPDATE_LIST: {
                return setStore({
                    listInfo: payload.listInfo,
                    aggListInfo: store.aggListInfo,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    filter: store.filter,
                    sorter: store.sorter,
                });
            }
            // STOP EDITING THE CURRENT LIST
            case GlobalStoreActionType.CLOSE_CURRENT_LIST: {
                return setStore({
                    listInfo: store.listInfo,
                    aggListInfo: store.aggListInfo,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    filter: store.filter,
                    sorter: store.sorter,
                })
            }
            // CREATE A NEW LIST
            case GlobalStoreActionType.CREATE_NEW_LIST: {
                return setStore({
                    listInfo: store.listInfo,
                    aggListInfo: store.aggListInfo,
                    currentList: payload,
                    newListCounter: store.newListCounter + 1,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    filter: store.filter,
                    sorter: store.sorter,
                })
            }
            // GET ALL THE LISTS SO WE CAN PRESENT THEM
            case GlobalStoreActionType.LOAD_ID_NAME_PAIRS: {
                return setStore({
                    listInfo: payload.listInfo,
                    aggListInfo: payload.aggListInfo,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    filter: store.filter,
                    sorter: store.sorter,
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.MARK_LIST_FOR_DELETION: {
                return setStore({
                    listInfo: store.listInfo,
                    aggListInfo: store.aggListInfo,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: payload,
                    filter: store.filter,
                    sorter: store.sorter,
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.UNMARK_LIST_FOR_DELETION: {
                return setStore({
                    listInfo: store.listInfo,
                    aggListInfo: store.aggListInfo,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    filter: store.filter,
                    sorter: store.sorter,
                });
            }
            // UPDATE A LIST
            case GlobalStoreActionType.SET_CURRENT_LIST: {
                return setStore({
                    listInfo: store.listInfo,
                    aggListInfo: store.aggListInfo,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    filter: store.filter,
                    sorter: store.sorter,
                });
            }
            // START EDITING A LIST ITEM
            case GlobalStoreActionType.SET_ITEM_EDIT_ACTIVE: {
                return setStore({
                    listInfo: store.listInfo,
                    aggListInfo: store.aggListInfo,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: true,
                    listMarkedForDeletion: null,
                    filter: store.filter,
                    sorter: store.sorter,
                });
            }
            // START EDITING A LIST NAME
            case GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE: {
                return setStore({
                    listInfo: store.listInfo,
                    aggListInfo: store.aggListInfo,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: true,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    filter: store.filter,
                    sorter: store.sorter,
                });
            }
            case GlobalStoreActionType.CLOSE_TOP5LIST: {
                return setStore({
                    listInfo: [],
                    aggListInfo: store.aggListInfo,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    filter: store.filter,
                    sorter: store.sorter,
                });
            }
            case GlobalStoreActionType.SET_FILTER: {
                return setStore({
                    listInfo: store.listInfo,
                    aggListInfo: store.aggListInfo,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    filter: payload,
                    sorter: store.sorter,
                });
            }
            case GlobalStoreActionType.SET_SORTER: {
                return setStore({
                    listInfo: store.listInfo,
                    aggListInfo: store.aggListInfo,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    filter: store.filter,
                    sorter: payload,
                });
            }
            case GlobalStoreActionType.CHANGE_PAGE: {
                return setStore({
                    listInfo: store.listInfo,
                    aggListInfo: store.aggListInfo,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    filter: "",
                    sorter: 1,
                });
            }
            // LIST UPDATE OF ITS NAME
            case GlobalStoreActionType.UPDATE_AGG_LIST: {
                return setStore({
                    listInfo: store.listInfo,
                    aggListInfo: payload.aggListInfo,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    filter: store.filter,
                    sorter: store.sorter,
                });
            }
            default:
                return store;
        }
    }

    // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
    // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN 
    // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.

    store.viewList = async function (id) {
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;
            top5List.views++;
            async function updateList(top5List) {
                response = await api.updateTop5ListById(top5List._id, top5List);
                if (response.data.success) {
                    async function getListPairs() {
                        response = await api.getTop5ListPairs();
                        if (response.data.success) {
                            let pairsArray = response.data.listInfo;
                            storeReducer({
                                type: GlobalStoreActionType.UPDATE_LIST,
                                payload: {
                                    listInfo: pairsArray,
                                }
                            });
                        }
                    }
                    getListPairs(top5List);
                }
            }
            updateList(top5List);
        }
    }

    store.likeList = async function (id) {
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;
            if (top5List.likes.includes(auth.user.username)) {
                top5List.dislikes = top5List.dislikes.filter(i => i !== auth.user.username)
                top5List.likes = top5List.likes.filter(i => i !== auth.user.username)
            }
            else {
                top5List.dislikes = top5List.dislikes.filter(i => i !== auth.user.username)
                top5List.likes = top5List.likes.filter(i => i !== auth.user.username)
                if (top5List.likes.length === 0) {
                    top5List.likes = [auth.user.username]
                }
                else {
                    let likes = top5List.likes;
                    likes.push(auth.user.username);
                    top5List.likes = likes;
                }
            }
            async function updateList(top5List) {
                response = await api.updateTop5ListById(top5List._id, top5List);
                if (response.data.success) {
                    async function getListPairs() {
                        response = await api.getTop5ListPairs();
                        if (response.data.success) {
                            let pairsArray = response.data.listInfo;
                            storeReducer({
                                type: GlobalStoreActionType.UPDATE_LIST,
                                payload: {
                                    listInfo: pairsArray,
                                }
                            });
                        }
                    }
                    getListPairs();
                }
            }
            updateList(top5List);
        }
    }

    store.dislikeList = async function (id) {
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;
            if (top5List.dislikes.includes(auth.user.username)) {
                top5List.dislikes = top5List.dislikes.filter(i => i !== auth.user.username)
                top5List.likes = top5List.likes.filter(i => i !== auth.user.username)
            }
            else {
                top5List.dislikes = top5List.dislikes.filter(i => i !== auth.user.username)
                top5List.likes = top5List.likes.filter(i => i !== auth.user.username)
                if (top5List.dislikes.length === 0) {
                    top5List.dislikes = [auth.user.username]
                }
                else {
                    let dislikes = top5List.dislikes;
                    dislikes.push(auth.user.username);
                    top5List.dislikes = dislikes;
                }
            }
            async function updateList(top5List) {
                response = await api.updateTop5ListById(top5List._id, top5List);
                if (response.data.success) {
                    async function getListPairs() {
                        response = await api.getTop5ListPairs();
                        if (response.data.success) {
                            let pairsArray = response.data.listInfo;
                            storeReducer({
                                type: GlobalStoreActionType.UPDATE_LIST,
                                payload: {
                                    listInfo: pairsArray,
                                }
                            });
                        }
                    }
                    getListPairs();
                }
            }
            updateList(top5List);
        }
    }

    store.addComment = async function (id, comment) {
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;
            if (top5List.comments.length === 0) {
                top5List.comments = [[auth.user.username, comment]]
            }
            else {
                top5List.comments.unshift([auth.user.username, comment]);
            }
            async function updateList(top5List) {
                response = await api.updateTop5ListById(top5List._id, top5List);
                if (response.data.success) {
                    async function getListPairs() {
                        response = await api.getTop5ListPairs();
                        if (response.data.success) {
                            let pairsArray = response.data.listInfo;
                            storeReducer({
                                type: GlobalStoreActionType.UPDATE_LIST,
                                payload: {
                                    listInfo: pairsArray,
                                }
                            });
                        }
                    }
                    getListPairs();
                }
            }
            updateList(top5List);
        }
    }

    store.viewAggList = async function (id) {
        let response = await api.getAggregatedTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.aggregatedTop5List;
            top5List.views++;
            let time = new Date().toISOString().slice(0, 10)
            top5List.updated = time;
            async function updateAggregatedList(top5List) {
                response = await api.updateAggregatedTop5ListById(top5List._id, top5List);
                if (response.data.success) {
                    async function getAggregatedListPairs() {
                        response = await api.getAggregatedTop5ListPairs();
                        if (response.data.success) {
                            let pairsArray = response.data.listInfo;
                            storeReducer({
                                type: GlobalStoreActionType.UPDATE_AGG_LIST,
                                payload: {
                                    aggListInfo: pairsArray,
                                }
                            });
                        }
                    }
                    getAggregatedListPairs(top5List);
                }
            }
            updateAggregatedList(top5List);
        }
    }

    store.likeAggList = async function (id) {
        let response = await api.getAggregatedTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.aggregatedTop5List;
            if (top5List.likes.includes(auth.user.username)) {
                top5List.dislikes = top5List.dislikes.filter(i => i !== auth.user.username)
                top5List.likes = top5List.likes.filter(i => i !== auth.user.username)
            }
            else {
                top5List.dislikes = top5List.dislikes.filter(i => i !== auth.user.username)
                top5List.likes = top5List.likes.filter(i => i !== auth.user.username)
                if (top5List.likes.length === 0) {
                    top5List.likes = [auth.user.username]
                }
                else {
                    let likes = top5List.likes;
                    likes.push(auth.user.username);
                    top5List.likes = likes;
                }
            }
            let time = new Date().toISOString().slice(0, 10)
            top5List.updated = time;
            async function updateAggregatedList(top5List) {
                response = await api.updateAggregatedTop5ListById(top5List._id, top5List);
                if (response.data.success) {
                    async function getListPairs() {
                        response = await api.getAggregatedTop5ListPairs();
                        if (response.data.success) {
                            let pairsArray = response.data.listInfo;
                            storeReducer({
                                type: GlobalStoreActionType.UPDATE_AGG_LIST,
                                payload: {
                                    aggListInfo: pairsArray,
                                }
                            });
                        }
                    }
                    getListPairs();
                }
            }
            updateAggregatedList(top5List);
        }
    }

    store.dislikeAggList = async function (id) {
        let response = await api.getAggregatedTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.aggregatedTop5List;
            if (top5List.dislikes.includes(auth.user.username)) {
                top5List.dislikes = top5List.dislikes.filter(i => i !== auth.user.username)
                top5List.likes = top5List.likes.filter(i => i !== auth.user.username)
            }
            else {
                top5List.dislikes = top5List.dislikes.filter(i => i !== auth.user.username)
                top5List.likes = top5List.likes.filter(i => i !== auth.user.username)
                if (top5List.dislikes.length === 0) {
                    top5List.dislikes = [auth.user.username]
                }
                else {
                    let dislikes = top5List.dislikes;
                    dislikes.push(auth.user.username);
                    top5List.dislikes = dislikes;
                }
            }
            let time = new Date().toISOString().slice(0, 10)
            top5List.updated = time;
            async function updateAggregatedList(top5List) {
                response = await api.updateAggregatedTop5ListById(top5List._id, top5List);
                if (response.data.success) {
                    async function getListPairs() {
                        response = await api.getAggregatedTop5ListPairs();
                        if (response.data.success) {
                            let pairsArray = response.data.listInfo;
                            storeReducer({
                                type: GlobalStoreActionType.UPDATE_AGG_LIST,
                                payload: {
                                    aggListInfo: pairsArray,
                                }
                            });
                        }
                    }
                    getListPairs();
                }
            }
            updateAggregatedList(top5List);
        }
    }

    store.addAggComment = async function (id, comment) {
        let response = await api.getAggregatedTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.aggregatedTop5List;
            if (top5List.comments.length === 0) {
                top5List.comments = [[auth.user.username, comment]]
            }
            else {
                top5List.comments.unshift([auth.user.username, comment]);
            }
            let time = new Date().toISOString().slice(0, 10)
            top5List.updated = time;
            async function updateAggregatedList(top5List) {
                response = await api.updateAggregatedTop5ListById(top5List._id, top5List);
                if (response.data.success) {
                    async function getListPairs() {
                        response = await api.getAggregatedTop5ListPairs();
                        if (response.data.success) {
                            let pairsArray = response.data.listInfo;
                            storeReducer({
                                type: GlobalStoreActionType.UPDATE_AGG_LIST,
                                payload: {
                                    aggListInfo: pairsArray,
                                }
                            });
                        }
                    }
                    getListPairs();
                }
            }
            updateAggregatedList(top5List);
        }
    }

    store.changePage = function (path) {
        history.push(path)
        storeReducer({
            type: GlobalStoreActionType.CHANGE_PAGE,
            payload: {}
        });
    }

    store.setFilter = function (filterStr) {
        storeReducer({
            type: GlobalStoreActionType.SET_FILTER,
            payload: filterStr
        });
    }

    store.setSorter = function (sortNum) {
        storeReducer({
            type: GlobalStoreActionType.SET_SORTER,
            payload: sortNum
        });
    }

    store.closeTop5List = function () {
        storeReducer({
            type: GlobalStoreActionType.CLOSE_TOP5LIST,
            payload: {}
        });
    }

    // THIS FUNCTION PROCESSES CLOSING THE CURRENTLY LOADED LIST
    store.closeCurrentList = function () {
        storeReducer({
            type: GlobalStoreActionType.CLOSE_CURRENT_LIST,
            payload: {}
        });
        if (auth.user) {
            if (auth.user.username === ' ') {
                history.push("/community");
            }
            else {
                history.push("/");
            }
        }
        else {
            history.push("/");
        }
    }

    // THIS FUNCTION CREATES A NEW LIST
    store.createNewList = async function () {
        let newListName = "Untitled" + store.newListCounter;
        let payload = {
            name: newListName,
            items: ["", "", "", "", ""],
            ownerEmail: auth.user.email,
            user: auth.user.username,
            comments: [],
            views: 0,
            likes: [],
            dislikes: [],
            published: '1970-01-01'
        };
        const response = await api.createTop5List(payload);
        if (response.data.success) {
            let newList = response.data.top5List;
            storeReducer({
                type: GlobalStoreActionType.CREATE_NEW_LIST,
                payload: newList
            }
            );

            // IF IT'S A VALID LIST THEN LET'S START EDITING IT
            history.push("/top5list/" + newList._id);
        }
        else {
            console.log("API FAILED TO CREATE A NEW LIST");
        }
    }

    // THIS FUNCTION LOADS ALL THE ID, NAME PAIRS SO WE CAN LIST ALL THE LISTS
    store.loadListInfo = async function () {
        try {
            let response = await api.getTop5ListPairs();
            if (response.data.success) {
                let pairsArray = response.data.listInfo;
                response = await api.getAggregatedTop5ListPairs();
                if (response.data.success) {
                    let aggPairsArray = response.data.listInfo;
                    storeReducer({
                        type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                        payload: { listInfo: pairsArray, aggListInfo: aggPairsArray }
                    });
                }
            }
        }
        catch {
            console.log("API FAILED TO GET THE LIST PAIRS");
        }
    }

    // THE FOLLOWING 5 FUNCTIONS ARE FOR COORDINATING THE DELETION
    // OF A LIST, WHICH INCLUDES USING A VERIFICATION MODAL. THE
    // FUNCTIONS ARE markListForDeletion, deleteList, deleteMarkedList,
    // showDeleteListModal, and hideDeleteListModal
    store.markListForDeletion = async function (listInfo) {
        storeReducer({
            type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
            payload: listInfo
        })
        // GET THE LIST
        // let response = await api.getTop5ListById(id);
        // if (response.data.success) {
        //     let top5List = response.data.top5List;
        //     storeReducer({
        //         type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
        //         payload: top5List
        //     });
        // }
    }

    store.deleteList = async function (listToDelete) {
        let response = await api.deleteTop5ListById(listToDelete._id);

        let items = [];
        listToDelete.items.forEach((item, index) => {
            items.push({ name: item, points: 5 - index })
        })
        console.log(items)
        async function removeFromAggList(name, items) {
            let existingAggList = store.aggListInfo.findIndex(list => list.name === name);
            console.log(existingAggList);
            if (existingAggList >= 0) {
                let aggList = store.aggListInfo[existingAggList];
                let aggListItems = aggList.items;
                items.forEach(newItem => {
                    let existingItem = aggListItems.findIndex(oldItem => oldItem.name === newItem.name)
                    console.log('item name:' + newItem.name)
                    console.log(existingItem);
                    if (existingItem >= 0) {
                        aggListItems[existingItem].points -= newItem.points;
                        if (aggListItems[existingItem].points <= 0) {
                            aggListItems.splice(existingItem, 1)
                        }
                    }
                })
                console.log(aggListItems);
                if (aggListItems.length === 0) {
                    response = await api.deleteAggregatedTop5ListById(aggList._id);
                }
                else {
                    aggList.items = aggListItems;
                    let time = new Date().toISOString().slice(0, 10)
                    aggList.updated = time;
                    response = await api.updateAggregatedTop5ListById(aggList._id, aggList)
                }
                if (response.data.success) {
                    console.log("API UPDATED AGGREGATED LIST");
                }
                else {
                    console.log("API FAILED TO UPDATE AGGREGATED LIST");
                }
            }
        }
        removeFromAggList(listToDelete.name, items);

        if (response.data.success) {
            store.loadListInfo();
            history.push("/");
        }
    }

    store.deleteMarkedList = function () {
        store.deleteList(store.listMarkedForDeletion);
    }

    store.unmarkListForDeletion = function () {
        storeReducer({
            type: GlobalStoreActionType.UNMARK_LIST_FOR_DELETION,
            payload: null
        });
    }

    // THE FOLLOWING 8 FUNCTIONS ARE FOR COORDINATING THE UPDATING
    // OF A LIST. THE FUNCTIONS ARE setCurrentList, updateCurrentList
    store.setCurrentList = async function (id) {
        try {
            let response = await api.getTop5ListById(id);
            if (response.data.success) {
                let top5List = response.data.top5List;
                response = await api.updateTop5ListById(top5List._id, top5List);
                if (response.data.success) {
                    storeReducer({
                        type: GlobalStoreActionType.SET_CURRENT_LIST,
                        payload: top5List
                    });
                    history.push("/top5list/" + top5List._id);
                }
            }
        }
        catch {
            return false;
        }
    }

    store.saveList = function (newName, newItems) {
        store.currentList.items = newItems;
        store.currentList.name = newName;
        store.updateCurrentList();
        store.closeCurrentList();
        store.loadListInfo();
    }

    store.publishList = function (newName, newItems) {
        store.currentList.items = newItems;
        store.currentList.name = newName;
        store.currentList.published = new Date().toISOString().slice(0, 10)

        let items = [];
        newItems.forEach((item, index) => {
            items.push({ name: item, points: 5 - index })
        })
        async function addToAggList(newName, items) {
            let existingAggList = store.aggListInfo.findIndex(list => list.name === newName);
            console.log(existingAggList);
            if (existingAggList >= 0) {
                let aggList = store.aggListInfo[existingAggList];
                let aggListItems = aggList.items;
                items.forEach(newItem => {
                    let existingItem = aggListItems.findIndex(oldItem => oldItem.name === newItem.name)
                    console.log('item name:' + newItem.name)
                    console.log(existingItem);
                    if (existingItem >= 0) {
                        aggListItems[existingItem].points += newItem.points;
                    }
                    else {
                        aggListItems.push(newItem);
                    }
                })
                console.log(aggListItems);
                aggList.items = aggListItems;
                const response = await api.updateAggregatedTop5ListById(aggList._id, aggList)
                if (response.data.success) {
                    console.log("API UPDATED AGGREGATED LIST");
                }
                else {
                    console.log("API FAILED TO UPDATE AGGREGATED LIST");
                }
            }
            else {
                let time = new Date().toISOString().slice(0, 10)
                let payload = {
                    name: newName,
                    items: items,
                    comments: [],
                    views: 0,
                    likes: [],
                    dislikes: [],
                    updated: time
                };
                const response = await api.createAggregatedTop5List(payload);
                if (response.data.success) {
                    console.log("API CREATED A NEW AGGREGATED LIST");
                }
                else {
                    console.log("API FAILED TO CREATE A NEW AGGREGATED LIST");
                }
            }
        }
        addToAggList(newName, items);
        store.updateCurrentList();
        store.closeCurrentList();
        store.loadListInfo();
    }

    store.updateCurrentList = async function () {
        const response = await api.updateTop5ListById(store.currentList._id, store.currentList);
        if (response.data.success) {
            storeReducer({
                type: GlobalStoreActionType.CLOSE_CURRENT_LIST,
                payload: store.currentList
            });
        }
    }

    // THIS FUNCTION ENABLES THE PROCESS OF EDITING A LIST NAME
    store.setIsListNameEditActive = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE,
            payload: null
        });
    }

    // THIS FUNCTION ENABLES THE PROCESS OF EDITING AN ITEM
    store.setIsItemEditActive = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_ITEM_EDIT_ACTIVE,
            payload: null
        });
    }

    return (
        <GlobalStoreContext.Provider value={{
            store
        }}>
            {props.children}
        </GlobalStoreContext.Provider>
    );
}

export default GlobalStoreContext;
export { GlobalStoreContextProvider };