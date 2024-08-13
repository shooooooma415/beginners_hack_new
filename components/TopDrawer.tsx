"use client";
import Link from 'next/link';
import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { GiHamburgerMenu } from "react-icons/gi";
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import MapIcon from '@mui/icons-material/Map';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import styles from './humburger.module.css'

export default function SwipeableTemporaryDrawer() {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event &&
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }

        setOpen(open);
    };

    // Helper function to render the correct icon
    const getIcon = (text: string) => {
        switch (text) {
            case 'My Map':
                return (
                    <Link href={"/home"}>
                        <ListItemButton>
                            <ListItemIcon>
                                <MapIcon />
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </Link>
                );
            case 'My Posts':
                return (
                    <Link href={"/private"}>
                        <ListItemButton>
                            <ListItemIcon>
                                <InsertPhotoIcon />
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </Link>
                );
            case 'New Post':
                return (
                    <Link href={"/postDetail"}>
                    <ListItemButton>
                        <ListItemIcon>
                            <AddLocationAltIcon />
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItemButton>
                    </Link>
                );
            case 'Posts':
                return (
                    <Link href={"/post"}>
                    <ListItemButton>
                        <ListItemIcon>
                            <AddLocationAltIcon />
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItemButton>
                    </Link>
                );
                case 'Setting':
                    return (
                        <Link href={""}>
                        <ListItemButton>
                        <ListItemIcon>
                            < SettingsIcon/>
                        </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                        </Link>
                    );
                    case 'Logout':
                        return (
                            <Link href={"/logout"}>
                            <ListItemButton>
                                <ListItemIcon>
                                    <LogoutIcon />
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                            </Link>
                        );
        
            default:
                return null;
        }
    };

    const list = () => (
        <Box
            sx={{ width: 'auto', height: '600px' }}  // Set height for the bottom Drawer
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                {['My Map', 'My Posts', 'New Post','Posts',"Setting","Logout"].map((text) => (
                    <ListItem key={text} disablePadding>
                        {getIcon(text)}
                    </ListItem>
                ))}
            </List>
            <Divider />
        </Box>
    );

    return (
        <div>
            {/* Button to open the Drawer from the bottom */}
            <Button  onClick={toggleDrawer(true)}><GiHamburgerMenu className={styles.Hamburger}/>
            </Button>
            <SwipeableDrawer
                anchor="bottom"  // Open the Drawer from the bottom
                open={open}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
            >
                {list()}
            </SwipeableDrawer>
        </div>
    );
}
