import logo from "@/assets/logosaas.png";
import SocialX from "@/assets/social-x.svg";
import SocialInsta from "@/assets/social-insta.svg";
import SocialLinkedIn from "@/assets/social-linkedin.svg";
import SocialPin from "@/assets/social-pin.svg";
import SocialYoutube from "@/assets/social-youtube.svg";
import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-black text-[#BCBCBC] text-sm py-10 text-center">
      <div className="container">
        <div className="inline-flex relative before:content-[''] before:top-2 before:bottom-0 before:w-full before:blur before:bg-[linear-gradient(to_right,#f87bff,#FB92CF,#FFDD9B,#C2F0B1,#2FD8FE)] before:absolute">
          <Image src={logo} height={80} alt="SaaS logo" className="relative" />
        </div>
        <nav className="flex flex-col md:flex-row md:justify-center gap-6 mt-6">
          <Link href="/about">About</Link>
          {/* <Link href="">Features</Link> */}
          {/* <Link href="">Customers</Link> */}
          {/* <Link href="">Pricing</Link> */}
          <Link href="/terms">Terms</Link>
          <Link href="/help">Help</Link>
        </nav>
        <div className="flex justify-center gap-6 mt-6">
        <a href="https://x.com/Vinnifinni_IN" target="_blank" rel="noopener noreferrer">
  <SocialX />
</a>
{/* <SocialInsta /> */}
<a href="https://www.linkedin.com/company/vinnifinni/" target="_blank" rel="noopener noreferrer">
  <SocialLinkedIn />
</a>

          {/* <SocialPin /> */}
          {/* <SocialYoutube /> */}
        </div>
        <p className="mt-6">&copy; 2024 Vinnifinni, Inc. All rights reserved.
          <br /><Link className="hover:text-white transition-all" href="https://github.com/MiladJoodi/Light-Saas-Landing-Page"></Link>
        </p>
      </div>
    </footer>
  );
};
