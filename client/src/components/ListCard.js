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
import { useLocation } from 'react-router';

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
    let location = useLocation();
    let publishDate = "";
    let datePieces = listInfo.published.split('-')
    switch (datePieces[1]) {
        case '01':
            publishDate = "Jan";
            break;
        case '02':
            publishDate = "Feb";
            break;
        case '03':
            publishDate = "Mar";
            break;
        case '04':
            publishDate = "Apr";
            break;
        case '05':
            publishDate = "May";
            break;
        case '06':
            publishDate = "Jun";
            break;
        case '07':
            publishDate = "Jul";
            break;
        case '08':
            publishDate = "Aug";
            break;
        case '09':
            publishDate = "Sep";
            break;
        case '10':
            publishDate = "Oct";
            break;
        case '11':
            publishDate = "Nov";
            break;
        case '12':
            publishDate = "Dec";
            break;
    }
    publishDate += (' ' + datePieces[2] + ', ' + datePieces[0]);

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
        if (listInfo.published !== '1970-01-01') {
            store.viewList(id)
        }
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
            className={listInfo.published !== '1970-01-01' ? 'published-list' : ''}
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
                    <Typography fontWeight='bold'>{listInfo.name}</Typography>
                    <Typography sx={{ fontSize: 14 }}>By: {<span>{listInfo.owner}</span>}</Typography>
                </Box>
                <Box sx={{ p: 1, display: 'flex', alignItems: 'center' }}>
                    {
                        listInfo.published !== '1970-01-01' ?
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <IconButton className={auth.user ? listInfo.likes.includes(auth.user.username) ? 'is-on' : null : null} onClick={(event) => {
                                    handleLikeList(event, listInfo._id)
                                }} aria-label='like' disabled={auth.user ? auth.user.username === ' ' : false} >
                                    {auth.user ? listInfo.likes.includes(auth.user.username) ?
                                        <ThumbUpIcon style={{ fontSize: '24pt' }} />
                                        : <ThumbUpOffAltIcon style={{ fontSize: '24pt' }} /> : <ThumbUpOffAltIcon style={{ fontSize: '24pt' }} />}
                                </IconButton>
                                <Typography>{listInfo.likes.length}</Typography>
                                <IconButton onClick={(event) => {
                                    handleDislikeList(event, listInfo._id)
                                }} aria-label='dislike' disabled={auth.user ? auth.user.username === ' ' : false} >
                                    {auth.user ? listInfo.dislikes.includes(auth.user.username) ?
                                        <ThumbDownIcon style={{ fontSize: '24pt' }} />
                                        : <ThumbDownOffAltIcon style={{ fontSize: '24pt' }} /> : <ThumbDownOffAltIcon style={{ fontSize: '24pt' }} />}
                                </IconButton>
                                <Typography>{listInfo.dislikes.length}</Typography>
                            </Box>
                            : null
                    }
                    {auth.user.username === listInfo.owner && location.pathname === '/' ? <IconButton onClick={(event) => {
                        handleDeleteList(event, listInfo)
                    }} aria-label='delete'>
                        <DeleteIcon style={{ fontSize: '24pt' }} />
                    </IconButton> : null}
                </Box>
            </div>
            {listOpened ? <ExpandedContent listInfo={listInfo} /> : null}
            <div className='list-card-footer'>
                <Box sx={{ p: 1, marginTop: '10px' }}>
                    {listInfo.published !== '1970-01-01' ?
                        <Typography sx={{ fontSize: 14, fontWeight: 'bold' }}>Published: <span style={{ color: '#79ae5a' }}>{publishDate}</span></Typography>
                        : <Button sx={{
                            padding: '0', color: 'red', textDecoration: 'underline',
                            ':hover': { bgcolor: 'transparent', color: 'red', boxShadow: 'none', textDecoration: 'underline', fontWeight: 'bold' }
                        }}
                            onClick={(event) => { handleEditList(event, listInfo._id) }}
                            aria-label='edit'>
                            Edit
                        </Button>}
                </Box>
                <Box sx={{ p: 1, display: 'flex', alignItems: 'center' }}>
                    {listInfo.published !== '1970-01-01' ?
                        <Typography sx={{ fontSize: 14 }}>Views: <span style={{ color: '#972c24', fontWeight: 'bold' }}>{listInfo.views}</span></Typography>
                        : null
                    }
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