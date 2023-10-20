import React from 'react';
import {
    AppBar,
    Button,
    IconButton,
    Toolbar,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Divider,
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import Logo from '../../assets/react.svg';
import {useState} from "react";
import pages from "../../datas/pages.tsx";

export default function NavBar(){
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(!open);
    };

    return (
        <React.Fragment>
            <AppBar
                position="fixed"
                sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
            >
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="burgermenu"
                        sx={{mr: "auto"}}
                        onClick={handleDrawerOpen}
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
            <Drawer
                anchor="left"
                open={open}
                onClose={handleDrawerOpen}
            >
                <div style={{height:64}}/>
                <List>
                    <ListItem>
                        <ListItemIcon>
                            <img src={Logo} alt="Logo"/>
                        </ListItemIcon>
                        <ListItemText>TA72</ListItemText>
                    </ListItem>
                </List>
                <Divider/>
                <List>
                    {pages.map(({text, icons,path}) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton onClick={() => window.location.replace(path)}>
                                <ListItemIcon>
                                    {icons}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <List sx={{marginTop:'auto'}}>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <PowerSettingsNewIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Déconnexion" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>
        </React.Fragment>
    )
}