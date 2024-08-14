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
    // <header className="absolute bottom-0 right-0 p-4 border-b-2 border-gray-300 w-full flex justify-center items-center"
    // style={{ 
    //     height: '60px', 
    //     paddingTop: '60px', 
    //     paddingBottom: '0px', 
    //     margin: '0px',
    //     backgroundColor: 'rgba(128, 128, 128, 0.6)'  // 透明度50%のグレー
    // }}>
    //         <li className=' pr-4'>
    //     <Link
    //       className="absolute left-1 bottom-1 z-10"
    //       href="/home"
    //       style={{ width: '50px', height: '50px' }}
    //     >
    //         <Image
    //           src="/imagefile/MyMapIcon.png"
    //           width={50}
    //           height={50}
    //           style={{ objectFit: 'contain' }}
    //           alt="My Map Icon"
    //         />
    //       </Link>
    //     </li>
    //     <li className="absolute flex justify-center items-center text-black"
    //         style={{ width: '50px', height: '50px' }}>
    //     <ListItemButton>
    //         <ListItemIcon>
    //         <FaRegSquarePlus style={{ fontSize: '50px' }} />
    //         </ListItemIcon>
    //     </ListItemButton>
    //     </li>

    //         <li className="absolute right-1 bottom-1 z-10 text-black"
    //             style={{ width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    //             <Link href={"/private"}>   
    //                 <ListItemButton>
    //                     <ListItemIcon>
    //                     <InsertPhotoIcon style={{ fontSize: '50px' }} />
    //                     </ListItemIcon>
    //                 </ListItemButton>
    //             </Link> 
    //         </li>
    //   </ul>
    // </header>
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
      <ListItemButton>
        <ListItemIcon>
          <FaRegSquarePlus className={ styles.centerIcon} />
        </ListItemIcon>
      </ListItemButton>
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