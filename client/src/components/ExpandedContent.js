import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

function ExpandedContent(props) {
    const { store } = useContext(GlobalStoreContext);
    const { listInfo } = props;
    console.log(listInfo);

    // Handles loading list when rendered
    const handleLoadList = (event, id) => {

    }

    return (
        <div className="expanded-content">
            <List sx={{ width: '50%', backgroundColor: '#30316c', borderRadius: 3 }}>
                {
                    listInfo.items.map((item, index) => (
                        <ListItem sx={{ color: '#c9af4f', fontSize: 24, fontWeight: 'bold' }}>{`${index + 1}. ${item}`}</ListItem>
                    ))
                }
            </List>
            <div className="comments-section">comments</div>
        </div>
    )
}

export default ExpandedContent;