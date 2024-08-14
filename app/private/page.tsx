import PrivateImageApp from '../../components/privateImageApp';
import { Button } from "@mui/material";
import Link from 'next/link';
import './style.css'; // スタイルシートをインポート
import Image from 'next/image';



export default function Index() {
  return (
    <>
      <h2 className = "custom-heading">プロフィール</h2>

      <Image
        src="/imagefile/FreeIcon.png"
        width={80}
        height={80}
        style={{ objectFit: 'contain' }}
        alt="Free Icon"
        className="round-image"
      />


      <Link href="/editProfile" passHref>
        <Button className="custom-button" variant="contained" disableElevation>
          プロフィールを編集
        </Button>
      </Link>

      <div className="scroll-container">
        <PrivateImageApp />
      </div>
    </>
  );
}
