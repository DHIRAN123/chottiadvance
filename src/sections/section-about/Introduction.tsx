"use client";
import Tag from "@/components/Tag";
import { useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

const text = `VinniFinni delivers lowest ROI in Market , AI-driven transparency, and seamless collaboration.`;
const words = text.split(" ");

export default function Introduction() {
  const scrollTarget = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: scrollTarget, offset: ["start end", "end end"] });

  const [currentWord, setCurrentWord] = useState(0);
  const wordIndex = useTransform(scrollYProgress, [0, 1], [0, words.length]);

  useEffect(() => {
    wordIndex.on("change", (latest) => {
      setCurrentWord(Math.floor(latest)); // Ensure it's an integer value
    });
  }, [wordIndex]);

  return (
    <section className="py-20 lg:py-28"> {/* Reduced padding */}
      <div className="container">
        <div className="sticky-top-20 md:top-28 lg:top-40">
          <div className="flex justify-center">
            <Tag>Why Choose VinniFinni?</Tag>
          </div>
          <div className="text-4xl md:text-6xl lg:text-7xl text-center font-medium mt-10">
            <span>Time is money,That&apos;s why 15-Minute Average Financing 
             and VinniFinni values both. With advanced AI, we deliver rapid approvals and fund disbursements.</span>
            <div className="text-black/15">
              {words.map((word, wordIndex) => (
                <span
                  key={wordIndex}
                  className={twMerge(
                    wordIndex <= currentWord ? "text-black" : "text-black/15" // Ensure previous words are white
                  )}
                >
                  {word}{" "}
                </span>
              ))}
            </div>
            <span className="text-lime-400 block">That&apos;s why we built Vinnifinni</span>
          </div>
        </div>
        {/* Reduced height to make it more compact */}
        <div className="h-[30vh]" ref={scrollTarget}></div>
      </div>
    </section>
  );
}
