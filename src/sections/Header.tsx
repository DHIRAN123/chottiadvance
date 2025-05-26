"use client";  // Add this line to indicate that this component is a Client Component

import { useState, useEffect } from "react";
import ArrowRight from "@/assets/arrow-right.svg";
import Logo from "@/assets/logosaas.png";
import MenuIcon from "@/assets/menu.svg";
import Image from "next/image";
import Link from "next/link";

export const Header = () => {
  // State to track if the menu is open
  const [menuOpen, setMenuOpen] = useState(false);

  // Toggle the menu visibility
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="sticky top-0 backdrop-blur-sm z-20">
      <div className="flex justify-center items-center py-3 bg-black text-white text-sm gap-3">
        <p className="text-white/60 hidden md:block">Simplify, finance and grow with ease</p>
        <div className="inline-flex gap-1 items-center">
          <p>Get started with us</p>
          <ArrowRight className="h-4 w-4 inline-flex justify-center items-center" />
        </div>
      </div>

      <div className="py-5">
        <div className="container">
          <div className="flex items-center justify-between">
          <Link href="/">
  <Image src={Logo} alt="Saas Logo" height={80} width={80} />
</Link>
            <MenuIcon className="h-5 w-5 md:hidden cursor-pointer" onClick={toggleMenu} />

            {/* Navigation for larger screens */}
            <nav className="hidden md:flex gap-6 text-black/60 items-center">
              <Link href="/about">About</Link>
              <Link href="/terms">Terms</Link>
              <Link href="/help">Help</Link>
              <Link href="/blogs">Blogs</Link>
              {/* Link to login page */}
              <Link href="/login">
                <button className="bg-black text-white px-4 py-2 rounded-lg font-medium inline-flex align-items justify-center tracking-tight">
                  Login
                </button>
              </Link>
            </nav>
          </div>
        </div>
      </div>


      {menuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30"
          onClick={() => setMenuOpen(false)} 
        >
          <div 
            className={`absolute top-0 right-0 w-4/12 h-full p-6 transform ${menuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out`}
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.3)', 
            }}
            onClick={(e) => e.stopPropagation()} 
          >
            <div className="flex flex-col items-center gap-6 text-white">
              <Link href="/about" className="text-xl">About</Link>
              <a href="/terms" className="text-xl">Terms</a>
              <Link href="/help" className="text-xl">Help</Link>
              <Link href="/login">
                <button className="bg-black text-white px-4 py-2 rounded-lg font-medium inline-flex align-items justify-center tracking-tight">
                  Login
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
