import {AppBar, Button, IconButton, Toolbar} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

export default function NavBar(){
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="burgermenu"
                    sx={{mr: "auto"}}
                >
                    <MenuIcon/>
                </IconButton>
                <Button
                    color="inherit"
                >
                    Se connecter
                </Button>
            </Toolbar>
        </AppBar>
    )
}