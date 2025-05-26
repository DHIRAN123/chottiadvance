"use client";

import { FC, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const faqs = [
  {
    question: "What happens if I miss a payment?",
    answer:
      "Missing a payment may incur additional fees or penalties. It's essential to communicate with your vendor or VinniFinni team to discuss possible extensions or payment adjustments.",
  },
  {
    question: "Can I apply for vendor financing if I have a low credit score?",
    answer:
      "Yes, VinniFinni considers more than just your credit score. We evaluate your business’s financial health and performance to offer tailored financing solutions.",
  },
  {
    question: "Are there any hidden fees with vendor financing?",
    answer:
      "We believe in transparency. Our terms are straightforward, and any applicable fees will be clearly outlined in your agreement before you commit.",
  },
  {
    question: "Can I use vendor financing for any type of purchase?",
    answer:
      "Vendor financing can be used for a wide range of business expenses, including inventory, equipment, or services, depending on the terms of your agreement with the vendor.",
  },
  {
    question:"What industries are eligible for vendor financing through VinniFinni?",
    answer:"VinniFinni offers vendor financing solutions for various industries, including manufacturing, retail, technology, construction, and more. Contact us to learn how we can support your industry."
  }
];

const FAQs: FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <section className="py-24 md:py-32 lg:py-40">
      <div className="container">
        <h2 className="text-4xl md:text-7xl lg:text-8xl">FAQs</h2>
        <div className="mt-10 md:mt-16 lg:mt-20">
          {faqs.map(({ question, answer }, faqIndex) => (
            <div
              key={question}
              className="border-t border-stone-400 border-dotted py-6 md:py-8 lg:py-10 last:border-b cursor-pointer"
              onClick={() =>
                setSelectedIndex(selectedIndex === faqIndex ? null : faqIndex)
              }
            >
              <div className="flex items-center justify-between gap-4">
                <div className="text-2xl md:text-3xl lg:text-4xl">{question}</div>
                <div
                  className={`inline-flex items-center justify-center border border-stone-400 rounded-full shrink-0 transition-transform duration-300 ${
                    selectedIndex === faqIndex ? "rotate-45" : ""
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </div>
              </div>
              <AnimatePresence>
                {faqIndex === selectedIndex && (
                  <motion.div
                    className="overflow-hidden"
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }} 
                  >
                    <p className="text-xl mt-4">{answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQs;
