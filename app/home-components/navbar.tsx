import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/variable.module.scss";
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
});

export default function Navbar() {
    return(
        <>
            <header className={`${styles["main-header"]} w-[100%] min-h-16 sticky top-0`}>
                <div className={` ${styles.navbarGrid} w-[100%] m-auto py-5 px-4  `}>
                    <div className="flex items-center gap-3">
                        <Image 
                            className=""
                            src='/safe-net-logo.svg' 
                            alt="SafeNet Logo" 
                            height={70} 
                            width={70}>
                        </Image>
                        <Link 
                            className="flex flex-col" 
                            href={"/"}>
                                <span className={`${styles.logoTitle} ${roboto.variable} font-bold text-3xl`}>DisPERS</span> 
                                <span className={`${styles.logoSubTitle}`}>BARANGGAY BAGONG SILANGAN ALERT SYSTEM</span>
                        </Link>
                    </div>
                    <div className="min-h-16 w-[100%]">
                        <ul className="flex justify-end items-center gap-2 w-[100%] h-[100%]">
                            <li className={`${styles.li}`}>
                                <Link 
                                className={`${styles.Link} text-xl px-7 py-2 text-gray-900  font-semibold hover:bg-orange-100 `} 
                                href={"/"}>Home</Link>
                            </li>
                            <li className={`${styles.li}`}>
                                <Link 
                                className={`${styles.Link} text-xl px-7 py-2 text-gray-900  font-semibold hover:bg-orange-100 `}
                                href={"../About"}>About</Link>
                            </li>
                            <li className={`${styles.li}`}>
                                <Link 
                                className={`${styles.Link} text-xl px-7 py-2 text-gray-900  font-semibold hover:bg-orange-100 `}
                                href={"../contact"}>Contact</Link>
                            </li>
                            <li>
                                <Link 
                                className={`${styles.logInBtn} px-15 py-4 rounded-4xl text-xl text-white   bg-[#4E709D] hover:bg-blue-500 hover:text-gray-200`}
                                href={"../Login"}>Log In</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </header>
        </>
    );
}