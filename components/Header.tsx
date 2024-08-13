"use client"
import AnchorTemporaryDrawer from "@/components/TopDrawer";
import { useState } from "react";
import Image from 'next/image';
import Link from 'next/link';
import Button from '@mui/material/Button'; // Import Button from Material-UI
import Drawer from '@mui/material/Drawer'; // Import Drawer from Material-UI
import Box from '@mui/material/Box'; // Import Box from Material-UI
import { FooterIcons } from "@/components/footericon";
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
    <header className="relative bottom-0 p-4 border-b-2 border-gray-300 w-full bg-gray-500 flex justify-center items-center"
    style={{ height: '60px', paddingTop: '60px', paddingBottom: '0px', marginTop: '-60px', marginBottom: '0px' }}>
  
      <ul className="w-full max-w-3xl m-auto flex font-medium flex-row">
        <li className=' pr-4'>
        <Link
          className="absolute left-1 bottom-1 z-10"
          href="/home"
          style={{ width: '50px', height: '50px' }}
        >
            <Image
              src="/imagefile/MyMapIcon.png"
              width={50}
              height={50}
              style={{ objectFit: 'contain' }}
              alt="My Map Icon"
            />
          </Link>
        </li>
          {/* <li className="absolute justify-center items-center text-black"
            style={{ width: '50px', height: '50px' }}>
            <FooterIcons text="New Post" />
          </li> */}
        <li className="absolute right-1 bottom-1 z-10 text-black"
          style={{ width: '50px', height: '50px', paddingRight: '-25px' }}>
          <FooterIcons text ="My Posts" /> 
        </li>
      </ul>
    </header>
  );
}
