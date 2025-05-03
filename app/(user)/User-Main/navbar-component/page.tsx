'use client';

import { useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/navbar.module.scss";
import { Roboto } from 'next/font/google';
import { Menu, X, Home, Clock, MapPin, Settings, Users, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
const roboto = Roboto({
    weight: ['400', '700'],
    subsets: ['latin'],
    variable: '--font-roboto',
});

export default function NavbarUser() {
    const [menuOpen, setMenuOpen] = useState(false);


    const router = useRouter();

    const handleLogout = async () => {
        await fetch('/api/logout');
        router.push('/Login'); 
    };
    return (
        <>
            <header className={`${styles["main-header"]} w-full min-h-16 sticky top-0 bg-white shadow-md z-50`}>
                <div className={`${styles["backgroundImage"]}`}>
                    <Image className='w-[100%]' src={`/1st-sec-1st-pic.jpg`} alt='' width={1000} height={10}></Image>
                </div>
                <div className={`${styles.content} w-[80%] m-auto`}>
                    <div className={`${styles.navbarGrid} w-full m-auto py-5 px-4 flex items-center justify-between`}>
                        <div className="flex items-center gap-3">
                            <Image
                                src="/safe-net-logo.svg"
                                alt="SafeNet Logo"
                                height={70}
                                width={70}
                                className=""
                            />
                            <Link href="/User-Main" className="flex flex-col">
                                <span className={`${styles.logoTitle} ${roboto.variable} font-bold text-3xl`}>SAFENET</span>
                                <span className={`${styles.logoSubTitle} text-white`}>BARANGGAY BAGONG SILANGAN ALERT SYSTEM</span>
                            </Link>
                        </div>

                        <div className="flex items-center gap-6 justify-end">
                            <button onClick={() => setMenuOpen(true)} className="text-white focus:outline-none">
                                <Menu size={28} />
                            </button>
                        </div>
                    </div>
                </div>

                <div className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transition-transform ${menuOpen ? 'translate-x-0' : 'translate-x-full'} duration-300 z-50`}>
                    <div className="h-16 py-12 flex items-center justify-between p-4 border-b">
                        <h2 className="text-lg font-bold text-red-600">Menu</h2>
                        <button onClick={() => setMenuOpen(false)} className="text-gray-700">
                            <X size={24} />
                        </button>
                    </div>

                    <div className="flex flex-col p-4 space-y-4">
                        <Link href="/User-Main" className="flex items-center space-x-3 text-gray-700 hover:text-red-600">
                            <Home size={20} />
                            <span>Home</span>
                        </Link>
                        <Link href="/User-Main/user-report-history" className="flex items-center space-x-3 text-gray-700 hover:text-red-600">
                            <Clock size={20} />
                            <span>Report History</span>
                        </Link>
                        <Link href="/User-Main/evacuation" className="flex items-center space-x-3 text-gray-700 hover:text-red-600">
                            <MapPin size={20} />
                            <span>Evacuation Area</span>
                        </Link>
                        <Link href="/User-Main/profile-account" className="flex items-center space-x-3 text-gray-700 hover:text-red-600">
                            <Settings size={20} />
                            <span>Account Settings</span>
                        </Link>
                        <Link href="/User-Main/user-about" className="flex items-center space-x-3 text-gray-700 hover:text-red-600">
                            <Users size={20} />
                            <span>About Us</span>
                        </Link>
                        <button onClick={handleLogout} className="flex items-center space-x-3 text-gray-700 hover:text-red-600">
                            <LogOut size={20} />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </header>
        </>
    );
}
