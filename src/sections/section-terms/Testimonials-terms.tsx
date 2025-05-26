import { FC } from "react";
import Image from "next/image"; 
import image1 from "@/assets/testimonial-1.jpg";
import image2 from "@/assets/testimonial-2.jpg";
import image3 from "@/assets/testimonial-3.jpg";

const testimonials = [
  {
    name: "Sarah Chen",
    company: "Pixel Perfect",
    role: "Head of Design",
    quote:
      "Alex's expertise in both technical development and design created a beautiful, high-performing website.",
    image: image1,
    imagePositionY: 0.2,
  },
  {
    name: "Marcus Rodriguez",
    company: "Craft Coffee Co.",
    role: "Founder",
    quote:
      "Alex transformed our boutique coffee brand with a website that perfectly balances aesthetics and functionality.",
    image: image2,
    imagePositionY: 0.1,
  },
  {
    name: "Emily Watson",
    company: "Studio Minimal",
    role: "Creative Director",
    quote:
      "The collaborative process was amazing. Alex brought lots of fresh perspectives and innovative solutions.",
    image: image3,
    imagePositionY: 0.55,
  },
];

const Testimonials: FC = () => {
  return (
    <section className="py-12 bg-gray-100">
      <h2 className="text-center text-3xl font-bold mb-6">
      <span className="whitespace-nowrap self-end">
        Some nice words from my past clients
        </span>
        <span className="whitespace-nowrap self-end text-red-orange-500">Some nice words from my past clients
        </span>
      </h2>
      <div className="container mx-auto px-4">
        {/* <div className="grid md:grid-cols-3 gap-6"> */}
<div>
          {testimonials.map(({ name, company, role, quote, image
}) => (
            <div key={name} className="bg-white shadow-md p-6 rounded-lg text-center">
              <div className="mb-4">
                <Image src={image} alt={name} className="rounded-full mx-auto" width={80} height={80} />
              </div>
              <blockquote>

              <p className="italic text-gray-600">"{quote}"</p>
              </blockquote>
              <h3 className="font-bold text-lg mt-4">{name}</h3>
              <p className="text-sm text-gray-500">
                {role} at {company}
                
              </p>
            </div>
          ))}
        </div>
        <div>
          <button>
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
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
          </button>
          <button>
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

              d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
