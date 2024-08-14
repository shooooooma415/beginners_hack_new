"use client"
import AnchorTemporaryDrawer from "@/components/TopDrawer";
import { useState } from "react";
import Image from 'next/image';
import Link from 'next/link';
import Button from '@mui/material/Button'; // Import Button from Material-UI
import Drawer from '@mui/material/Drawer'; // Import Drawer from Material-UI
import Box from '@mui/material/Box'; // Import Box from Material-UI
import { MdInsertPhoto } from "react-icons/md";
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import { FaRegSquarePlus } from "react-icons/fa6";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import styles from './header.module.css'; // CSS module
export default function Header() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setOpen(open);
  };

  const DrawerList = (
    <Box
      sx={{ width: 250 }} // Width of the drawer
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <ul>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <li key={text} className="p-2">
            {text}
          </li>
        ))}
      </ul>
    </Box>
  );

  return (
    <header className={styles.header}>
  <ul className={styles.navList}>
    <li className={styles.leftItem}>
      <Link className={styles.iconLink} href="/home">
        <div className={styles.button}>
          <Image
            src="/imagefile/MyMapIcon.png"
            width={43.6}
            height={43.6}
            style={{ objectFit: 'contain' }}
            alt="My Map Icon"
          />
        </div>
      </Link>
    </li>
    <li className={styles.centeredItem}>
      <Link href="/post">
        <ListItemButton>
          <ListItemIcon>
            <FaRegSquarePlus className={ styles.centerIcon} />
          </ListItemIcon>
        </ListItemButton>
      </Link>
    </li>
    <li className={styles.rightItem}>
      <Link href="/private">
        <ListItemButton>
          <ListItemIcon>
          <MdInsertPhoto  className={ styles.rightIcon} />
          </ListItemIcon>
        </ListItemButton>
      </Link>
    </li>
  </ul>
</header>


  );
}
