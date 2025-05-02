

import React from 'react';
import NavbarUser from './navbar-component/page';
import './globals.css';
import Footer from '@/app/home-components/Footer';
import About from '../User-Main/about-card/about';

export default function UserMainLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
          <body
            className={`antialiased bg-[#F5F5F5]`}
          >
            <NavbarUser />
            {children} 
            <hr />
            <About/>
            <Footer/>
          </body>
    </html>
  );
}
