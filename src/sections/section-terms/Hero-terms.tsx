import {FC, useEffect, useRef} from "react";
import heroImage from "@/assets/hero-image.jpg"
import { div } from "framer-motion/client";
import Image from "next/image"; 
import Buttonterms from "@/components/Buttonterms";
import SplitType from "split-type"; 

import { stagger,useAnimate,motion } from "framer-motion";
const HeroTerms: FC = () => {
    const [titleScope, titleAnimate] = useAnimate();
const scrollingDiv = useRef<HTMLDivElement>(null);
    useEffect(() => {
new SplitType(titleScope.current,{
    types:"lines,words",
    tagName:"span"
});
titleAnimate(titleScope.current.querySelectorAll('.word'),{
    transform: "translateY(0)",
},{
    duration: 0.5,
    delay: stagger(.2),
})
    }, []);

    return (
        <section>
            <div className="grid md:grid-cols-12 md:h-screen items-stretch sticky top-0">
<div className="md:col-span-7 flex flex-col justify-center">
<div className="container !max-w-full">
<motion.h1 
initial={{opacity:0}}
animate={{opacity:1}}

className="text-5xl md:text-6xl lg:text-7xl mt-40 md:mt-0"
ref={titleScope}>
                    Defining the standards for transparency, security, and user trust at VinniFinni.
                </motion.h1>
                <div className="flex flex-col md:flex-row md:items-center mt-10 items-start gap-6">
                    <motion.div
                    initial={{opacity: 0, y: "100%"}}
                    animate={{opacity:1, y:0}}
                    transition={{
                        duration:0.5,
                        delay:1.75,
                    }}
                    >
                <Buttonterms variant="secondary"
                iconAfter={
                    <div className="
                    overflow-hidden size-5">
                        <div className="h-5 w-10 flex group-hover/button:-translate-x-1/2 transition-transform
                        duration-500">
                    <svg xmlns="http://www.w3.org/2000/svg"
                    fill ="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5
                    "
                    >
                        <path 
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 5.25 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5"/>
                        </svg> 
                        </div>
                        </div>
                }><a href="http://vinnifinniterms.s3-website.ap-south-1.amazonaws.com/" target="_blank" rel="noopener noreferrer">
                <span>Download Terms</span>
            </a>
            
                </Buttonterms>
                </motion.div>
                <motion.div
                initial={{opacity: 0, y: "100%"}}
                animate={{opacity:1, y:0}}
                transition={{
                    duration:0.5,
                    delay:2.2,
                }}> 
                {/* <Buttonterms variant="text">Let&apos;s Talk</Buttonterms> */}
                </motion.div>
</div>
           </div> 
</div>
<div className="md:col-span-5">

<div className="mt-20 md:mt-0 md:h-full">
                <Image src={heroImage} alt="My potrait" className="size-full object-cover"/>
            </div>
</div>
            </div>
          <div className="h-[200vh] border-4 border-green-500 ref={scrollingDiv}"></div>  
        </section>
    )
}

export default HeroTerms