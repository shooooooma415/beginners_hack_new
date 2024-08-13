import Link from "next/link";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MapIcon from '@mui/icons-material/Map';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { IconComponent } from '@/components/renderIcon';

const FooterIcons = ({ text }) => {

  const getHref = () => {
    switch (text) {
      case 'My Map':
        return "/home";
      case 'My Posts':
        return "/private";
      case 'New Post':
        return "/postDetail";
      case 'Posts':
        return "/post";
      case 'Setting':
        return "/settings";
      case 'Logout':
        return "/logout";
      default:
        return "#";
    }
  };

  return (
    <Link href={getHref()}>
      <ListItemButton>
        <ListItemIcon>
          <IconComponent text={text} />
        </ListItemIcon>
      </ListItemButton>
    </Link>
  );
};

export  {FooterIcons};
