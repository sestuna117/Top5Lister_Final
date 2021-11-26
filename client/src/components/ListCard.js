import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Typography } from '@mui/material';
import AuthContext from '../auth';
import ExpandedContent from './ExpandedContent';

/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext)
    const [listOpened, setListOpened] = useState(false);
    const { listInfo } = props;

    function handleEditList(event, id) {
        if (!event.target.disabled) {
            // CHANGE THE CURRENT LIST
            store.setCurrentList(id);
        }
    }

    // Handles a click on the like button
    const handleLikeList = (event, id) => {
        store.likeList(id);
    }

    // Handles a click on the dislike button
    const handleDislikeList = (event, id) => {
        store.dislikeList(id);
    }

    // Handles a click on the dropdown to view a list
    const handleOpenList = (event, id) => {
        store.viewList(id)
        setListOpened(true);
    }

    // Handles a click on the dropdown to hide a list
    const handleCloseList = (event) => {
        setListOpened(false);
    }

    function handleDeleteList(event, listInfo) {
        event.stopPropagation();
        store.markListForDeletion(listInfo);
    }

    let cardElement =
        <ListItem
            id={listInfo._id}
            key={listInfo._id}
            sx={{ marginTop: '15px', display: 'flex', p: 1 }}
            className={listInfo.published.length === 0 ? 'published-list' : ''}
            style={{
                width: '100%',
                backgroundColor: '#fffff2',
                flexDirection: 'column',
                borderRadius: 10,
                border: '1px solid black'
            }}
        >
            <div className='list-card-header'>
                <Box sx={{ p: 1 }}>
                    <Typography>{listInfo.name}</Typography>
                    <Typography>By: {listInfo.owner}</Typography>
                </Box>
                <Box sx={{ p: 1, display: 'flex', alignItems: 'center' }}>
                    <IconButton className={listInfo.likes.includes(auth.user.username) ? 'is-on' : null} onClick={(event) => {
                        handleLikeList(event, listInfo._id)
                    }} disabled={store.isListNameEditActive} aria-label='like'>
                        {listInfo.likes.includes(auth.user.username) ? 
                        <ThumbUpIcon style={{ fontSize: '24pt' }} /> 
                        : <ThumbUpOffAltIcon style={{ fontSize: '24pt' }} />}
                    </IconButton>
                    <Typography>{listInfo.likes.length}</Typography>
                    <IconButton onClick={(event) => {
                        handleDislikeList(event, listInfo._id)
                    }} disabled={store.isListNameEditActive} aria-label='dislike'>
                        {listInfo.dislikes.includes(auth.user.username) ? 
                        <ThumbDownIcon style={{ fontSize: '24pt' }} /> 
                        : <ThumbDownOffAltIcon style={{ fontSize: '24pt' }} />}
                    </IconButton>
                    <Typography>{listInfo.dislikes.length}</Typography>
                    <IconButton onClick={(event) => {
                        handleDeleteList(event, listInfo)
                    }} disabled={store.isListNameEditActive} aria-label='delete'>
                        <DeleteIcon style={{ fontSize: '24pt' }} />
                    </IconButton>
                </Box>
            </div>
            {listOpened ? <ExpandedContent listInfo={listInfo} /> : null}
            <div className='list-card-footer'>
                <Box sx={{ p: 1 }}>
                    {listInfo.published.length === 0 ?
                        <Typography>Published: {listInfo.published}</Typography>
                        : <Button sx={{ padding: '0', color: 'red', textDecoration: 'underline' ,
                        ':hover': { bgcolor: 'transparent', color: 'red', boxShadow: 'none', textDecoration: 'underline', fontWeight: 'bold' }}} 
                        onClick={(event) => { handleEditList(event, listInfo._id) }} 
                        disabled={store.isListNameEditActive} aria-label='edit'>
                            Edit
                        </Button>}
                </Box>
                <Box sx={{ p: 1, display: 'flex', alignItems: 'center' }}>
                    <Typography>Views: <span style={{color: '#972c24', fontWeight: 'bold'}}>{listInfo.views}</span></Typography>
                    {listOpened ?
                        <IconButton style={{ padding: '0' }} onClick={(event) => {
                            handleCloseList(event)
                        }}
                            aria-label='delete'>
                            <ArrowDropUpIcon style={{ fontSize: '24pt' }} />
                        </IconButton>
                        : <IconButton style={{ padding: '0' }} onClick={(event) => {
                            handleOpenList(event, listInfo._id)
                        }}
                            aria-label='delete'>
                            <ArrowDropDownIcon style={{ fontSize: '24pt' }} />
                        </IconButton>
                    }
                </Box>
            </div>
        </ListItem>

    return (
        cardElement
    );
}

export default ListCard;