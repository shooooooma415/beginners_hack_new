"use client";
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import { GiHamburgerMenu } from "react-icons/gi";
import { NavigationItem } from '@/components/getIcon';
import styles from './hamburgerbox.module.css';


export default function SwipeableTemporaryDrawer() {
    const [open, setOpen] = useState(false);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

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

    const list = () => (
        <Box
            sx={{ width: 'auto', height: '250px' }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                {['My Map', 'My Posts', 'New Post',"Setting","Logout"].map((text) => (
                    <ListItem key={text} disablePadding>
                        <NavigationItem text={text} />
                    </ListItem>
                ))}
            </List>
            <Divider />
        </Box>
    );

    if (!isClient) {
        return null; // サーバーサイドでは何も表示しない
    }

    return (
        <>
            <GiHamburgerMenu className={styles.hamburger} onClick={toggleDrawer(true)}/>
            <SwipeableDrawer
                className={styles.upBurger}
                anchor="bottom"
                open={open}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
            >
                {list()}
            </SwipeableDrawer>
        </>
    );
}
