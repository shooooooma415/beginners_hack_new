import Link from "next/link";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { IconComponent } from '@/components/renderIcon';
import styles from './drawerIcon.module.css';

const NavigationItem = ({ text }) => {

  const getHref = () => {
    switch (text) {
      case 'My Map':
        return "/home";
      case 'My Posts':
        return "/private";
      case 'New Post':
        return "/post";
      case 'Setting':
        return "/setting";
      case 'Logout':
        return "/logout";
      default:
        return "#";
    }
  };

  return (
    <Link href={getHref()}>
      <ListItemButton  className={styles.area}>
        <ListItemIcon>
          <IconComponent text={text} />
        </ListItemIcon>
        <ListItemText primary={text} className={styles.texts} />
      </ListItemButton>
    </Link>
  );
};

export { NavigationItem };
