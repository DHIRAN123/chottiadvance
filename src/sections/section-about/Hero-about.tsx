'use client'; 

// import Button from "@/components/Button";
import designExample1Image from '@/assets/design-example-1.png';
import designExample2Image from '@/assets/design-example-2.png';
import Image from "next/image";
import Pointer from '@/components/Pointer';
import {motion, useAnimate} from 'framer-motion';
import { useEffect } from 'react';
import cursorYouImage from '@/assets/cursor-you.svg';

export default function HeroAbout() {
  const [leftDesignScope, leftDesignAnimate] = useAnimate();
  const [leftPointerScope,leftPointerAnimate]= useAnimate();
  const [rightDesignScope, rightDesignAnimate] = useAnimate();
  const [rightPointerScope,rightPointerAnimate]= useAnimate();

  useEffect(() => {
    leftDesignAnimate([
      [leftDesignScope.current, {opacity: [1]}, {duration:0.5}],
      [leftDesignScope.current,{y: 0,x: 0}, {duration:0.5}]
    ]);
    leftPointerAnimate([
      [leftPointerScope.current,{opacity:1}, {duration:0.5}],
      [leftPointerScope.current, {y:0,x:-100}, {duration:0.5}],
      [
        leftPointerScope.current,
        {x:0,y:[0,16,0]},
        {duration:0.5, ease:"easeInOut"},
      ],
    ]);

    rightDesignAnimate([
      [rightDesignScope.current,{opacity:1},{duration:0.5, delay:1.5}],
      [
        rightDesignScope.current,{x:0,y:0},{duration:0.5}
      ],
    ]);
    rightDesignAnimate([
      [
        rightPointerScope.current,
        {opacity:1},
        {duration:0.5,delay:1.5},
      ],
      [rightPointerScope.current,{
        x:175,
        y:0
      },
      {
        duration:0.5
      }],
      [rightDesignScope.current,{x:0,y:[0,20,0]}, {duration:0.5}]
    ]);
  }, [leftDesignAnimate, leftDesignScope, leftPointerAnimate, leftPointerScope, rightDesignAnimate, rightDesignScope, rightPointerScope]);

  return (
    <section className="py-24 overflow-x-clip" style={{
      cursor:`url(${cursorYouImage.src}),auto`,
    }}>
      <div className="container-about relative">
        <motion.div ref={leftDesignScope} initial={{opacity:0, y:100, x:-100}} 
          drag
          className="absolute -left-32 top-16 hidden lg:block">
          <Image
            src={designExample1Image}
            alt="Designemaple1" 
            draggable="false"
          />
        </motion.div>
        <motion.div ref={leftPointerScope}
          initial={{opacity:0,y:100,x:-200}}
          className='absolute left-56 top-96 hidden lg:block'>
          <Pointer name="From Dhiran"/>
        </motion.div>
        <motion.div ref={rightDesignScope} 
          initial={{opacity: 0, x:100, y:100}}
          drag
          className='absolute -right-64 -top-16 hidden lg:block'>
          <Image src={designExample2Image} alt="designexample2"
            draggable="false"
          />
        </motion.div>
        <motion.div ref={rightPointerScope} 
          initial={{opacity:0,x:275,y:100}}
          className='absolute right-80 -top-4 hidden lg:block'>
          <Pointer name="Sorry Ma'am " color="red" />
        </motion.div>
        <div className="flex justify-center">
          <div className="flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
            <div className="inline-flex py-1 px-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full text-neutral-950 font-semibold text-sm sm:text-base">
              $7.5M seed round raised
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-8xl font-medium text-center mt-5 leading-tight">
              VinniFinni: Fast, Transparent Vendor Financing
            </h1>
            <p className="text-center text-base sm:text-lg md:text-xl text-black/50 mt-4 sm:mt-6">
              With VinniFinni decisions made in just 15 minutes, VinniFinni ensures that businesses can secure the funds they need without unnecessary delays or complexities.
            </p>
            <form className="flex-border border-white/15 rounded-full p-2 mt-8">
              <input type="email" placeholder="Enter your email" className="bg-transparent px-4" />
              <button type="submit" className="whitespace-nowrap" >Sign Up</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
