'use client';
import { useRouter } from 'next/navigation';
import { Button, styled } from "@mui/material";
import './style.css';

export default function LogoutCheck() {
    const router = useRouter();

    const CustomButton = styled(Button)({
        width: 150,
        padding: '10px 20px',
        margin: '0 10px', // ボタン同士に少し間隔を持たせる
    });

    const handleLogout = () => {
        console.log('Logging out...');
        router.push('/');
    };

    const backLogout = () => {
        router.push('/home');
    };

    return (
        <>
            <h1 className="mb-4 pt-28 text-4xl">Logout ?</h1>
            <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: '50%' }}>
                <CustomButton
                    className="custom-buttonYes"
                    variant="contained"
                    href="#contained-buttons"
                    onClick={handleLogout}
                >
                    Yes
                </CustomButton>
                <CustomButton
                    className="custom-buttonNo"
                    variant="contained"
                    href="#contained-buttons"
                    onClick={backLogout}
                >
                    Back
                </CustomButton>
            </div>
        </>
    );
}
