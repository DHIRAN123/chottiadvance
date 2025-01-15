"use client"

import CheckIcon from "@/assets/check.svg";
import { twMerge } from "tailwind-merge";
import {motion} from "framer-motion";

const pricingTiers = [
  {
    title: "Free",
    monthlyPrice: 0,
    buttonText: "Login now",
    popular: true,
    inverse: false,
    features: [
      "Zero platform charges for vendor financing",
      "Access to real-time tender notifications",
      "Basic financing tools to manage vendor transactions",
      "Introductory  financing limits for small businesses",
      "Transparent ROI calculations",
    ],
  },
  {
    title: "Free",
    monthlyPrice: 0,
    buttonText: "Login now",
    popular: true,
    inverse: true,
    features: [
      "Customizable loan terms for vendors",
      "Instant eligibility checks for financing",
      "Access to detailed repayment schedules",
      "Automated payment reminders for vendors",
      "Early Repayment benefits",
      "Low ROI vendor financing",
    
    ],
  },
  {
    title: "free",
    monthlyPrice: 0,
    buttonText: "Login now",
    popular: true,
    inverse: false,
    features: [
      "Dedicated financing manager for vendors ",
      "Priority access to corporate tenders",
      "Blockchain-secured financing transactions",
      "Custom financing solutions for large transactions",
      "Seamless integration with ERP and accounting systems",
      "Multi-tier financing support for diverse vendor categories",
      "Detailed audit tages for all financial activities",
      "Enhanced financing limits for high-value transactions ",
      "End-to-end vendor financing lifecycle management",
      "Advanced security features",
    ],
  },
];

export const Pricing = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container">
        <div className="section-heading">
          <h2 className="section-title">Pricing</h2>
          <p className="section-description mt-5">
            Free forever, better security, and
            exclusive collaborations & notifications in indian market.
          </p>
        </div>
        <div className="flex flex-col gap-6 items-center mt-10 lg:flex-row lg:items-end lg:justify-center">
          {pricingTiers.map(
            ({
              title,
              monthlyPrice,
              buttonText,
              popular,
              inverse,
              features,
            }) => (
              <div
                className={twMerge(
                  "card",
                  inverse === true && "border-black bg-black text-white"
                )}
                key={title}
              >
                <div className="flex justify-between">
                  <h3
                    className={twMerge(
                      "text-lg font-bold text-black/50",
                      inverse === true && "text-white/60"
                    )}
                  >
                    {title}
                  </h3>
                  {popular === true && (
                    <div className="inline-flex text-sm px-4 py-1.5 rounded-xl border border-white/20">
                      <motion.span
                      animate={{
                        backgroundPositionX: "100%",
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                        repeatType: "loop"
                      }}
                      className="bg-[linear-gradient(to_right,#DD7DDF,#E1CD86,#BBCB92,#71C2EF,#3BFFFF,#DD7DDF)] [background-size:200%] text-transparent bg-clip-text font-medium">
                        Popular
                      </motion.span>
                    </div>
                  )}
                </div>
                <div className="flex items-baseline gap-1 mt-[30px]">
                  <span className="text-4xl font-bold tracking-tighter leading-none">
                    ${monthlyPrice}
                  </span>
                  <span className="tracking-tight font-bold text-black/50">
                    /month
                  </span>
                </div>
                <button
                  className={twMerge(
                    "btn btn-primary w-full mt-[30px]",
                    inverse === true && "bg-white text-black"
                  )}
                >
                  {buttonText}
                </button>
                <ul className="flex flex-col gap-5 mt-8">
                  {features.map((feature) => (
                    <li
                      key={feature}
                      className="text-sm flex items-center gap-4"
                    >
                      <CheckIcon className="h-6 w-6" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          )}
          <div>
            <h3></h3>
          </div>
        </div>
      </div>
    </section>
  );
};
