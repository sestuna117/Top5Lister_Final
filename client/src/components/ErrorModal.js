import { useContext } from 'react'
import { Box, Modal, Button, Alert } from '@mui/material'
import AuthContext from '../auth';

function ErrorModal() {
    const { auth, closeErrorMsg } = useContext(AuthContext);
    let msg = "";
    if (auth.errorMsg) {
        if (auth.errorMsg.length !== 0)
            msg = auth.errorMsg;
    }
    function handleCloseModal() {
        closeErrorMsg();
    }
    return (
        <Modal
            open={msg.length !== 0 ? true : false}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                border: '2px solid #000',
                boxShadow: 24,
                p: 4,
            }}>
                <Alert severity="error">{msg}</Alert>
                <Button sx={{ position: 'relative', left: '80%', }} onClick={handleCloseModal}>OK</Button>
            </Box>
        </Modal >
    );
}

export default ErrorModal;