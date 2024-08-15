import PrivateImageApp from '../../components/privateImageApp';
import { Button } from "@mui/material";
import Link from 'next/link';
import './style.css'; // スタイルシートをインポート
import Image from 'next/image';



export default function Index() {
  return (
    <>
      <h2 className = "custom-heading">プロフィール</h2>


      <div className="scroll-container">
        <PrivateImageApp />
      </div>
    </>
  );
}
