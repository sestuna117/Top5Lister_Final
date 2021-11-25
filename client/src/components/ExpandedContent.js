import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { TextField } from '@mui/material';

function ExpandedContent(props) {
    const { store } = useContext(GlobalStoreContext);
    const [text, setText] = useState('');
    const { listInfo } = props;

    function handleChange(event) {
        setText(event.target.value)
      }

    function handleKeyPress(event, id) {
        if (event.code === "Enter") {
            console.log(text);
            if (text === "") {
                return;
            }
            store.addComment(listInfo._id, text);
            setText('');
        }
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
            <div className="comments-section"><div>
            </div>comment</div>
            <TextField
                id="outlined"
                placeholder="Add Comment"
                value={text}
                onChange={(event) => {handleChange(event)}}
                onKeyPress={(event) => {handleKeyPress(event)}}
            />
        </div>
    )
}

export default ExpandedContent;