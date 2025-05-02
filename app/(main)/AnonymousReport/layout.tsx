import Footer from "../home-components/Footer";

import "./global.css";



export default function LogInLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` antialiased bg-[#F5F5F5]`}
      >
        {children}
        <Footer  />
      </body>
    </html>
  );
}