'use client';
import './style.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Setting() {
    const router = useRouter();

    const rootHelp = () => {
        router.push('/help');
    };

    const rootAbout = () => {
        router.push('/aboutSite');
    };

    return (
        <div className="settings-container">
            <h2 className="custom-heading">設定</h2>
            <hr style={{
                border: 'none',
                borderTop: '2px solid #767373',
                margin: "0",
            }} />
            <div className="button-group">
                <button className="settings-button" onClick={rootHelp}>
                    ヘルプページ
                </button>
                <button className="settings-button" onClick={rootAbout}>
                    このサイトについて
                </button>
                <Link href="/editProfile" passHref>
                    <button className="settings-button">
                        プロフィールを編集
                    </button>
                </Link>
            </div>
        </div>
    );
}
