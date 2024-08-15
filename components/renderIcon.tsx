import { FaPlusSquare } from 'react-icons/fa';
import { IoMdMap } from "react-icons/io";
import { MdInsertPhoto } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";
import { MdOutlineLogout } from "react-icons/md";
import styles from './drawerIcon.module.css';
interface IconProps {
  text: string;
}

export const MapIconComponent: React.FC = () => <IoMdMap className={styles.Icons}/>;
export const InsertPhotoIconComponent: React.FC = () => <MdInsertPhoto className={styles.Icons}/>;
export const AddLocationAltIconComponent: React.FC = () => <FaPlusSquare className={styles.Icons}/>;
export const SettingsIconComponent: React.FC = () => <IoSettingsSharp className={styles.Icons} />;
export const LogoutIconComponent: React.FC = () => <MdOutlineLogout  className={styles.Icons}/>;

export const IconComponent: React.FC<IconProps> = ({ text }) => {
  switch (text) {
    case 'My Map':
      return <MapIconComponent  />;
    case 'My Posts':
      return <InsertPhotoIconComponent />;
    case 'New Post':
    case 'Posts':
      return <AddLocationAltIconComponent />;
    case 'Setting':
      return <SettingsIconComponent />;
    case 'Logout':
      return <LogoutIconComponent />;
    default:
      return null;
  }
};
