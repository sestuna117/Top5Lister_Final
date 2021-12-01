import { useContext, useEffect, useState } from 'react'
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
import { useLocation } from 'react-router';
import CommunityExpandedContent from './CommunityExpandedContent';

/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function CommunityListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext)
    const [listOpened, setListOpened] = useState(false);
    const [items, setItems] = useState([]);
    const { listInfo } = props;
    let location = useLocation();
    let publishDate = "";
    let datePieces = listInfo.updated.split('-')
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

    useEffect(() => {
        if (!listInfo) {
            return;
        }
        listInfo.items.sort((a, b) => b.points - a.points)
        let sortedItems = listInfo.items.slice(0, 5);

        setItems(sortedItems);
    }, [listInfo])

    // Handles a click on the like button
    const handleLikeList = (event, id) => {
        store.likeAggList(id);
    }

    // Handles a click on the dislike button
    const handleDislikeList = (event, id) => {
        store.dislikeAggList(id);
    }

    // Handles a click on the dropdown to view a list
    const handleOpenList = (event, id) => {
        store.viewAggList(id)
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
            className='published-list'
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
                </Box>
                <Box sx={{ p: 1, display: 'flex', alignItems: 'center' }}>
                    <IconButton className={auth.user ? listInfo.likes.includes(auth.user.username) ? 'is-on' : null : null} onClick={(event) => {
                        handleLikeList(event, listInfo._id)
                    }} aria-label='like' disabled={auth.user ? auth.user.username === ' ' || auth.user.username === listInfo.owner : false} >
                        {auth.user ? listInfo.likes.includes(auth.user.username) ?
                            <ThumbUpIcon style={{ fontSize: '24pt' }} />
                            : <ThumbUpOffAltIcon style={{ fontSize: '24pt' }} /> : <ThumbUpOffAltIcon style={{ fontSize: '24pt' }} />}
                    </IconButton>
                    <Typography>{listInfo.likes.length}</Typography>
                    <IconButton onClick={(event) => {
                        handleDislikeList(event, listInfo._id)
                    }} aria-label='dislike' disabled={auth.user ? auth.user.username === ' ' || auth.user.username === listInfo.owner : false} >
                        {auth.user ? listInfo.dislikes.includes(auth.user.username) ?
                            <ThumbDownIcon style={{ fontSize: '24pt' }} />
                            : <ThumbDownOffAltIcon style={{ fontSize: '24pt' }} /> : <ThumbDownOffAltIcon style={{ fontSize: '24pt' }} />}
                    </IconButton>
                    <Typography>{listInfo.dislikes.length}</Typography>
                    {auth.user.username === listInfo.owner && location.pathname === '/' ? <IconButton onClick={(event) => {
                        handleDeleteList(event, listInfo)
                    }} aria-label='delete'>
                        <DeleteIcon style={{ fontSize: '24pt' }} />
                    </IconButton> : null}
                </Box>
            </div>
            {listOpened ? <CommunityExpandedContent listInfo={listInfo} items={items} /> : null}
            <div className='list-card-footer'>
                <Box sx={{ p: 1, marginTop: '10px' }}>
                    <Typography sx={{ fontSize: 14, fontWeight: 'bold' }}>Updated: <span style={{ color: '#79ae5a' }}>{publishDate}</span></Typography>
                </Box>
                <Box sx={{ p: 1, display: 'flex', alignItems: 'center' }}>
                    <Typography sx={{ fontSize: 14 }}>Views: <span style={{ color: '#972c24', fontWeight: 'bold' }}>{listInfo.views}</span></Typography>
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

export default CommunityListCard;