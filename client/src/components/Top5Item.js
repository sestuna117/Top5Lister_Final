import { React, useContext, useState } from "react";
import { GlobalStoreContext } from '../store'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
/*
    This React component represents a single item in our
    Top 5 List, which can be edited or moved around.
    
    @author McKilla Gorilla
*/
function Top5Item(props) {
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");

    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit();
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsItemEditActive();
        }
        setEditActive(newActive);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let newText = event.target.value;
            if (text === "") {
                newText = props.text;
            }
            store.addUpdateItemTransaction(index, newText);
            toggleEdit();
        }
    }

    function handleUpdateText(event) {
        setText(event.target.value);
    }

    let { index } = props;

    let itemClass = "top5-item";

    return !editActive ? (
        <ListItem
            id={'item-' + (index + 1)}
            key={props.key}
            className={itemClass}
            sx={{ display: 'flex', p: 1 }}
            style={{
                fontSize: '48pt',
                width: '100%'
            }}
        >
            <Box sx={{ p: 1 }}>
                <IconButton onClick={handleToggleEdit} disabled={store.isItemEditActive} aria-label='edit'>
                    <EditIcon style={{ fontSize: '48pt' }} />
                </IconButton>
            </Box>
            <Box sx={{ p: 1, flexGrow: 1 }}>{props.text}</Box>
        </ListItem>
    ) : <TextField
        margin="none"
        required
        fullWidth
        id={'item-' + (index + 1)}
        label="Top 5 Item"
        name="name"
        autoComplete="Top 5 Item"
        className={itemClass}
        onKeyPress={handleKeyPress}
        onChange={handleUpdateText}
        defaultValue={props.text}
        inputProps={{ style: { fontSize: 48 } }}
        InputLabelProps={{ style: { fontSize: 24 } }}
        autoFocus
    />
}

export default Top5Item;