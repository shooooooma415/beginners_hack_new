"use client"
import AnchorTemporaryDrawer from "@/components/TopDrawer";
import { useState } from "react";
import Image from 'next/image';
import Link from 'next/link';
import Button from '@mui/material/Button'; // Import Button from Material-UI
import Drawer from '@mui/material/Drawer'; // Import Drawer from Material-UI
import Box from '@mui/material/Box'; // Import Box from Material-UI
import SwipeableTemporaryDrawer from "@/components/TopDrawer";

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
    <header className="p-4 border-b-2 border-gray-300 w-full bg-white">
      <ul className="w-full max-w-3xl m-auto flex font-medium flex-row">
        <li className=' pr-4'>
          <Link className="text-gray-700 hover:text-blue-700" href="/home">
            <Image
              src="/imagefile/MyMapIcon.png"
              width={50}
              height={50}
              style={{ objectFit: 'contain' }}
              alt="My Map Icon"
            />
          </Link>
        </li>
        <li>
          <Link className="text-gray-700 hover:text-blue-700" href="/private">
            マイページ
          </Link>
        </li>
        <li>
          <Link className="text-gray-700 hover:text-blue-700" href="/">
            投稿
          </Link>
        </li>
        <li>
          <SwipeableTemporaryDrawer />
        </li>
      </ul>
    </header>
  );
}
