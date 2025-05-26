"use client";
import { animate, useAnimate, useInView, stagger } from "framer-motion";
import { FC, useEffect } from "react";
import SplitType from "split-type";

const Intro: FC = () => {
    const [scope, animate] = useAnimate();
    const inView = useInView(scope, { once: true });

    // Split text into words and lines
    useEffect(() => {
        if (scope.current) {
            new SplitType(scope.current.querySelector("h2"), {
                types: "lines,words",
                tagName: "span",
            });
        }
    }, [scope]);

    // Animate words when in view
    useEffect(() => {
        if (inView && scope.current) {
            animate(
                scope.current.querySelectorAll(".word"),
                { transform: "translateY(0%)", opacity: 1 },
                { duration: 0.5, delay: stagger(0.2) }
            );
        }
    }, [inView, animate, scope]);

    return (
        <section
            className="py-24 md:py-32 lg:py-40 mt-12 md:mt-16 lg:mt-20"
            id="intro"
            ref={scope}
        >
            <div className="container">
                <h2 className="text-4xl md:text-7xl lg:text-8xl lg:w-[80%]">
                "Fair, Transparent, and Hassle-Free – Our Terms Are Designed to Protect and Empower You!"
                </h2>
            </div>
        </section>
    );
};

export default Intro;
