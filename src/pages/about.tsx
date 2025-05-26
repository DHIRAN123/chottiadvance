import { Header } from "@/sections/Header";

import "../app/globals.css"; // Adjust the path relative to _app.tsx
import HeroAbout from "@/sections/section-about/Hero-about";
import { LogoTicker } from "@/sections/LogoTicker";
import Introduction from "@/sections/section-about/Introduction";
import Features from "@/sections/section-about/Features";
import Integrations from "@/sections/section-about/Integrations";
import Faqs from "@/sections/section-about/Faqs";
import CallToAction from "@/sections/section-about/CallToAction";
import { Footer } from "@/sections/Footer";
const AboutPage = () => {
  return (
    <div>
      <Header/>
      <HeroAbout/>
      <section className="py-24 overflow-x-clip">
        <div className="container">
            <h3 className="text-center text-xl">
                Already chosen by these market leaders
                <LogoTicker/>
            </h3>
        </div>
        </section>
        <Introduction/>
        <Features/> 
        <Integrations/>
        <Faqs/>
        <CallToAction/>
        <Footer/>

      
    </div>
  );
};

export default AboutPage;
