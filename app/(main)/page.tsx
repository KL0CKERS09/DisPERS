import SecondSecClient from "./home-components/secondSecServer";
import FirstSecClient from "./home-components/firstSecClient";
import AnnouncementClient from "./home-components/AnnouncementSection";
import style from "@/styles/variable.module.scss"
import FAQ from "./home-components/FAQS";
import About from "./home-components/about";
import MissionVision from "./home-components/MissionVision";


export default function Home() {
  return (
    <>
    <main className="relative">
      <FirstSecClient/>
      <div className={`${style[`hr`]}`}></div>
      <SecondSecClient/>
      <div className={`${style[`hr`]}`}></div>
      <AnnouncementClient />
      <div className={`${style[`hr`]}`}></div>
      <FAQ/>
      <div className={`${style[`hr`]}`}></div>
      <About/>
      <div className={`${style[`hr`]}`}></div>
      <MissionVision/>
      </main>
    </>
  );
}
