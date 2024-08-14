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
            <h1 className="mb-4 pt-28 text-4xl">Logout ?</h1>
           
            <div>
                <button className="custom-buttonYes" onClick={handleLogout}>Logout</button>
                <button className="custom-buttonNo" onClick={backLogout}>Cancel</button>
            </div>
        </>
    );
}
