import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';

function EditToolbar(props) {
    const { handleSave, handlePublish, publishable } = props
    const { store } = useContext(GlobalStoreContext);

    let editStatus = false;
    if (store.isItemEditActive || !store.currentList) {
        editStatus = true;
    }
    return (
        <div id="edit-toolbar">
            <Button
                onClick={(event) => {handleSave(event)}}
                type="submit"
                id='save-button'
                variant="contained"
                sx={{
                    backgroundColor: '#dddddd', color: 'black', boxShadow: 'none', border: '1px black solid', marginRight: '10px',
                    ':hover': { bgcolor: '#dddddd', color: 'black', boxShadow: 'none' }
                }}>
                <Typography
                    sx={{ fontWeight: 'bold' }}>
                    Save
                </Typography>
            </Button>
            <Button
                disabled={!publishable}
                onClick={(event) => {handlePublish(event)}}
                type="button"
                id='publish-button'
                variant="contained"
                sx={{
                    backgroundColor: '#dddddd', color: 'black', boxShadow: 'none', border: '1px black solid', marginRight: '20px',
                    ':hover': { bgcolor: '#dddddd', color: 'black', boxShadow: 'none' }
                }}>
                <Typography
                    sx={{ fontWeight: 'bold' }}>
                    Publish
                </Typography>
            </Button>
        </div>
    )
}

export default EditToolbar;