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
import { TbMap2, TbMapPlus } from "react-icons/tb";
import { RiMapPinUserFill } from "react-icons/ri";
import { TbMapPinPlus } from "react-icons/tb";
import { TbPhotoPlus } from "react-icons/tb";
import MailIcon from '@mui/icons-material/Mail';
import { GiHamburgerMenu } from "react-icons/gi";

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
                                <TbMap2 />
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
                                <TbPhotoPlus />
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </Link>
                );
            case 'New Post':
                return (
                    <Link href={"/"}>
                    <ListItemButton>
                        <ListItemIcon>
                            <TbMapPinPlus />
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
                            <TbMapPinPlus />
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
            sx={{ width: 250 }}  // Set width for the right Drawer
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                {['My Map', 'My Posts', 'New Post','Posts'].map((text) => (
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
            {/* Button to open the Drawer from the right */}
            <Button onClick={toggleDrawer(true)}><GiHamburgerMenu />
            </Button>
            <SwipeableDrawer
                anchor="right"  // Ensure the Drawer only opens from the right
                open={open}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
            >
                {list()}
            </SwipeableDrawer>
        </div>
    );
}
