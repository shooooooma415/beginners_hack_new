'use client';
import './style.css';
import { Button } from '@mui/material';


export default function Setting() {
    return (
        <div className="settings-container">
            <h2 className="custom-heading">設定</h2>
            <div className="button-group">
                <Button className="settings-button">
                    ヘルプページ
                </Button>
                <Button className="settings-button">
                    このサイトについて
                </Button>
                <Button className="settings-button">
                    プロフィールを編集
                </Button>
            </div>
        </div>
    );
}