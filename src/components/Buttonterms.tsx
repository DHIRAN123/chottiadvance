import { span } from "framer-motion/client";
import { ButtonHTMLAttributes, ReactNode } from "react";
import {twMerge} from "tailwind-merge";


const Buttonterms = ( 
    props: {
        variant:"primary" | "secondary" | "text" ; 
        iconAfter?: ReactNode;
    } & ButtonHTMLAttributes<HTMLButtonElement>
) => {
const {
    className = twMerge("bg-red-500 bg-blue-500"),
    children,
    variant, 
    iconAfter,
    ...rest
} = props;
return (
    <button className={twMerge("h-11 px-6 rounded-xl border border-red-orange-500  inline-flex items-center gap-2 transition duration-500 relative group/button", variant === "primary" && "bg-red-orange-500 text-white",
    variant === "secondary" && "hover:bg-red-orange-500 hover:text-white",
    variant === "text" && "h-auto px-0 border-transparent after:transition-all after:duration-500 after:content-[''] after:h-px after:w-0 after:absolute after:top-full after:bg-red-orange-500 hover:after:w-full",
    className)} {...rest}>
        <span>{children}</span>
        {iconAfter && <span>{iconAfter}</span>}
    </button>
);
};



export default Buttonterms;