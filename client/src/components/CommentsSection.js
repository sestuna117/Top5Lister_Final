import { TextField } from "@mui/material"
import { useState, useContext } from "react";
import AuthContext from "../auth";
import GlobalStoreContext from "../store";

function CommentsSection(props) {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const [text, setText] = useState('');
    const { listInfo } = props;

    function handleChange(event) {
        setText(event.target.value)
    }

    function handleKeyPress(event, id) {
        if (event.code === "Enter") {
            if (text === "") {
                return;
            }
            store.addComment(listInfo._id, text);
            setText('');
        }
    }

    return (
        <div className="comments-section">
            <div className='comments-list'>
                {listInfo.comments.map((comment, index) => (
                    <div className='comment' key={index}>
                        <div style={{ color: '#2d24ef', fontWeight: 'bold', textDecoration: 'underline', fontSize: 12, marginBottom: 5 }}>{comment[0]}</div>
                        <div style={{ fontSize: 16, overflowWrap: 'break-word' }}>{comment[1]}</div>
                    </div>
                ))}
            </div>
            <TextField
                id="outlined"
                placeholder="Add Comment"
                value={text}
                fullWidth
                disabled={auth.user ? auth.user.username === ' ' : false } 
                sx={{ backgroundColor: 'white' }}
                onChange={(event) => { handleChange(event) }}
                onKeyPress={(event) => { handleKeyPress(event) }}
            />
        </div>
    )
}

export default CommentsSection