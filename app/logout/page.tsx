'use client';
import { useRouter } from 'next/navigation';
import { Button } from "@mui/material";

export default function LogoutCheck() {
    const router = useRouter();

    const handleLogout = () => {
        // ログアウト処理をここに追加します（例: トークンの削除、セッションのクリアなど）
        // 例:
        // localStorage.removeItem('authToken');
        // または API 呼び出しでログアウト処理を行う
        console.log('Logging out...');

        // ログアウト後、ホームページにリダイレクト
        router.push('/');
    };

    const backLogout = () => {
        router.push('/home');
    }

    return (
        <>
            <h1 className="mb-4 pt-28 text-4xl">本当にログアウトしますか？</h1>
            <Button
                variant="contained"
                href="#contained-buttons"
                onClick={handleLogout}
            >
                Yes
            </Button>
            <Button 
                variant="outlined"
                onClick={backLogout}
                >
                Back
            </Button>
        </>
    );
}
