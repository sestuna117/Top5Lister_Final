import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';

/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function EditToolbar(props) {
    const { selectButton } = props
    const { store } = useContext(GlobalStoreContext);

    let editStatus = false;
    if (store.isItemEditActive || !store.currentList) {
        editStatus = true;
    }
    return (
        <div id="edit-toolbar">
            <Button
                onClick={() => { selectButton(1) }}
                type="submit"
                id='save-button'
                // onClick={null}
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
                onClick={() => { selectButton(2) }}
                type="submit"
                // disabled={editStatus}
                id='publish-button'
                // onClick={!editStatus ? handleClose : null}
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