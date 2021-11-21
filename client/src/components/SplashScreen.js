import Button from '@mui/material/Button';

export default function SplashScreen() {
    return (
        <div id="splash-screen">
            <h1>Top 5 Lister</h1>
            <p>Post and share your top 5 lists with others</p>
            <div>
                <Button
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    style={{ width: '230px', height: '30px', fontSize: '11px' }}
                    href='/login/'
                >
                    Login
                </Button>
                <Button
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    style={{ width: '230px', height: '30px', fontSize: '11px' }}
                    href='/register/'
                >
                    Create New Account
                </Button>
                <Button
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    style={{ width: '230px', height: '30px', fontSize: '11px' }}
                >
                    Login as Guest
                </Button>
            </div>
            <span>Developed By Jason Guo</span>
        </div>
    )
}