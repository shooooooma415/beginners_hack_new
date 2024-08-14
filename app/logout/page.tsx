'use client';
import { useRouter } from 'next/navigation';
import './style.css';

export default function LogoutCheck() {
    const router = useRouter();

    const handleLogout = () => {
        console.log('Logging out...');
        router.push('/');
    };

    const backLogout = () => {
        router.push('/home');
    };

    return (
        <>
            <h2 className="logout">Are you sure to logout?</h2>
           
            <div>
                <button className="custom-buttonYes" onClick={handleLogout}>Logout</button>
                <button className="custom-buttonNo" onClick={backLogout}>Cancel</button>
            </div>
        </>
    );
}
