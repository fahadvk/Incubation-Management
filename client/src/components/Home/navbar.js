import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
// import MenuIcon from '@mui/icons-material/Menu';

export default function ButtonAppBar(props) {
    const Navigate = useNavigate()
    const logout = () => {
        localStorage.clear()
        Navigate(`/login`)
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        {/* <MenuIcon /> */}
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Incubation Management
                    </Typography>



                    <Button onClick={logout} color="inherit">Logout</Button>
                </Toolbar>
            </AppBar>
        </Box>
    )
}
