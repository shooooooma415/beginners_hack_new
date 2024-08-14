import MapIcon from '@mui/icons-material/Map';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

interface IconProps {
  text: string;
}

export const MapIconComponent: React.FC = () => <MapIcon />;
export const InsertPhotoIconComponent: React.FC = () => <InsertPhotoIcon />;
export const AddLocationAltIconComponent: React.FC = () => <AddLocationAltIcon />;
export const SettingsIconComponent: React.FC = () => <SettingsIcon />;
export const LogoutIconComponent: React.FC = () => <LogoutIcon />;

export const IconComponent: React.FC<IconProps> = ({ text }) => {
  switch (text) {
    case 'My Map':
      return <MapIconComponent />;
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
