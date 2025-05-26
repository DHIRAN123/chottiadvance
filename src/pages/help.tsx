import { Header } from "@/sections/Header";
import "../app/globals.css"; 
import HeroHelp from "@/sections/section-help/Hero-help";
import { LogoTicker } from "@/sections/LogoTicker";
import { Footer } from "@/sections/Footer";
// import { Featureshelp } from "@/sections/section-help/Featureshelp";

const HelpPage = () => {
  return (
    <>
      <div>
        <Header />
        <HeroHelp />
        <div className="text-center text-lg font-semibold mt-6">
          Trusted by these market leaders
        </div>
        <LogoTicker />
        {/* <Featureshelp/> */}
        <Footer/>
      </div>
    </>
  );
};

export default HelpPage;
