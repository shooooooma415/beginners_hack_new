import './style.css';
import Image from "next/image";

export default function AboutSite() {
    return (
        <>
            <div className="header-container">
                <h2 className="custom-heading">このサイトについて</h2>


            </div>
            <div className="teamname">作成チーム</div>
            <div className="detailname">りんごかじり虫</div>
            
            <div className="tools">技術スタック</div>
            <div className="image-row">
                <Image
                    className="nextjs"
                    src="/imagefile/Nextjs.png"
                    width={100}
                    height={100}
                    alt="Next.js Icon"
                />
                <Image
                    className="supabase"
                    src="/imagefile/supabase.png"
                    width={100}
                    height={100}
                    alt="Supabase Icon"
                />
                <Image
                    className="tailwindcss"
                    src="/imagefile/tailwindcss copy.png"
                    width={100}
                    height={100}
                    alt="Tailwind CSS Icon"
                />
                <Image
                    className="github"
                    src="/imagefile/github copy.png"
                    width={100}
                    height={100}
                    alt="Tailwind CSS Icon"
                />
                
            </div>
        </>
    );  
}
