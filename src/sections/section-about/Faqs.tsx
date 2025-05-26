"use client";

import Tag from "@/components/Tag";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { AnimatePresence, motion } from "framer-motion";
const faqs = [
    {
        question: "How is VinniFinni different?",
        answer: "While other NBFCs take 48 hours to sanction high amounts, VinniFinni redefines speed by delivering approvals in an average of 15 minutes, maxing out nbfc's to sort this @ just 30 minutes. ",
        
    },
    {
        question: "Is VinniFinni user-friendly for first-time users?",
        answer: "Absolutely! Our intuitive platform is designed for instant use without steep learning curves, making financing effortless.",
    },
    {
        question: "Does VinniFinni support collaboration for teams?",
        answer: "Yes, VinniFinni offers real-time dashboards and conflict-free tools to streamline team collaboration at every step.",
    },
    {
        question: "How does VinniFinni guarantee the lowest ROI?",
        answer: "By partnering with multiple NBFCs and leveraging smart algorithms, we dynamically rank loan offers to ensure vendors receive the best deals.",
    },
    {
        question: "Is my data secure on VinniFinni?",
        answer: "100%. With blockchain-powered transparency and robust security protocols, your data is encrypted and tamper-proof.",
    },
    {
        question:"What kind of businesses can use VinniFinni?",
        answer:"Following Recursion principle for Corporates"
    }
];

export default function Faqs() {
    const [selectedIndex,setselectedIndex]= useState(0);
    return <section className="py-24">
        <div className="container">
            <div className="flex justify-center">
            <Tag>Faqs</Tag>
            </div>
        <h2 className="text-6xl font-medium mt-6 text-center max-w-xl mx-auto">
            Questions? we&apos;ve got <span className="text-lime-400">answers</span>
        </h2>
        <div className="mt-12 flex flex-col gap-6 max-w-xl mx-auto">
        {faqs.map((faq, faqIndex) => (
            <div key={faq.question}
            className="bg-neutral-900 rounded-2xl border border-white/10 p-6">
                <div className="flex justify-between items-center" onClick={() => setselectedIndex(faqIndex)}>
<h3 className="font-medium text-white">{faq.question}</h3>
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={twMerge("feather feather-plus text-lime-400 flex-shrink-0 transition duration", selectedIndex===faqIndex && 'rotate-45')}><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                </div>
                <AnimatePresence>
                {selectedIndex===faqIndex && (
                    <motion.div initial ={{
                    height:0,
                    marginTop:0,
                    }} animate={{
                        height:'auto',
                        marginTop:24
                    }} exit={{
                        height:0,
                        marginTop:0
                    }}
                        className={twMerge("overflow-hidden")}>
                <p className="text-white/50">{faq.answer}</p>
                </motion.div>
                )}
                </AnimatePresence>
                </div>
                ))}
        </div></div>
    </section>;
}
