import robotImg from '@/assets/robot.jpg';
import Image from 'next/image';
import { ButtonHelp } from '@/components/ButtonHelp';
// import underlineImage from '@/assets/underline.svg?url';
import Loader from '@/assets/loader.svg';
// import {Orbit} from "@/components/Orbit";
export const HeroHelp = () => {
  return (
    <section className="pb-[1000px]">
      <div className="container inset-0 bg-[radial-gradient(circle_farthest-corner,var(--color-fuchsia-900)_50%,var(--color-indigo-900)_75%,transparent)] [mask-image:radial-gradient(circle_farthest-side,black,transparent)]"></div>
        <div className="border-l border-r border-gray-200/30">
          <div className="container py-24 relative">
            <div className='absolute'>
            <h1 className="text-4xl font-semibold text-gray-500 text-center leading-tight">
              Unlock the power of AI Conversations with{' '}
              <span className="relative inline-block">
                <span>Vinnibot</span>
                <span
  className="absolute w-full left-0 top-full -translate-y-1/2 h-4 bg-[linear-gradient]"
  style={{
    background: `linear-gradient(to right, var(--color-amber-300), var(--color-teal-300), var(--color-violet-400), var(--color-fuchsia-400))`,
    // maskImage: `url(${underlineImage.src})`,
    maskSize: 'contain',
    maskPosition: 'center',
    maskRepeat: 'no-repeat',
  }}
></span>
              </span>
            </h1>
            <p className="text-center text-lg mt-8">
              Harness the power of AI with Vinnibot to elevate your response time and streamline your workflow with this cutting-edge AI Help platform.
            </p>
            <div className="flex justify-center mt-10">
              <ButtonHelp variant="secondary">Start Chatting</ButtonHelp>
            </div>
            <div className="mt-16 rounded-2xl border-2 overflow-hidden border-gradient relative">
              <Image src={robotImg} alt="Robot image" layout="responsive" />
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-full px-4 z-10">
                <div className="bg-gray-950/80 flex items-center gap-4 px-4 py-2 rounded-2xl w-[320px] max-w-full">
                  {/* Loader SVG */}
                  <Loader className="text-violet-400" />

                  <div className="font-semibold text-xl text-gray-100">
                    AI is generating <span>|</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroHelp;
