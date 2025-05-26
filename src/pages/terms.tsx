// import Header from "@/sections/Header";

import { Header } from "@/sections/Header";
import "../app/globals.css"; // Adjust the path relative to _app.tsx

import HeroTerms from "@/sections/section-terms/Hero-terms";
import Intro from "@/sections/section-terms/intro-terms";
import Testimonials from "@/sections/section-terms/Testimonials-terms";
import FAQs from "@/sections/section-terms/FAQ-terms";
import { Footer } from "@/sections/Footer";

export default function TermsPage() {
    return (
        <>
     <div className="">
        <Header/>
        
        <HeroTerms/>
<Intro/>
{/* <Testimonials/> */}
<FAQs/>
<Footer/>        </div></>
    )
}

