import { FaLocationArrow } from "react-icons/fa6";
import { motion } from "framer-motion";
import { memo } from "react";

import MagicButton from "./MagicButton";
import { Spotlight } from "./ui/Spotlight";
import { TextGenerateEffect } from "./ui/TextGenerateEffect";
import { usePerformanceOptimizations } from "@/hooks/usePerformance";

const Hero = memo(() => {
  const { shouldReduceAnimations } = usePerformanceOptimizations();

  return (
    <div className="pb-20 pt-36 critical-content prevent-shift">
      {/* Spotlights with conditional rendering for performance */}
      {!shouldReduceAnimations && (
        <div>
          <Spotlight
            className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
            fill="white"
          />
          <Spotlight
            className="h-[80vh] w-[50vw] top-10 left-full"
            fill="purple"
          />
          <Spotlight className="left-80 top-28 h-[80vh] w-[50vw]" fill="blue" />
        </div>
      )}

      {/* Full screen background grid */}
      <div className="fixed inset-0 w-screen h-screen dark:bg-black-100 bg-white dark:bg-grid-white/[0.03] bg-grid-black-100/[0.2] -z-10" />

      {/* Radial gradient overlay */}
      <div
        className="fixed inset-0 w-screen h-screen pointer-events-none -z-10"
        style={{
          background: `radial-gradient(ellipse 80% 50% at 50% 50%, transparent 20%, hsl(var(--background)) 70%)`,
        }}
      />

      <div className="flex justify-center relative my-20 z-10">
        <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center">
          <motion.p
            className="uppercase tracking-widest text-xs text-center text-blue-100 max-w-80"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: shouldReduceAnimations ? 0.1 : 0.5,
              delay: shouldReduceAnimations ? 0 : 0.1,
            }}
          >
            Dynamic Web Magic with Next.js
          </motion.p>

          <TextGenerateEffect
            words="Transforming Concepts into Seamless User Experiences"
            className="text-center text-[40px] md:text-5xl lg:text-6xl"
          />

          <motion.h1
            className="text-4xl md:text-5xl xl:text-7xl font-bold text-center gpu-acceleration"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: shouldReduceAnimations ? 0.1 : 0.5,
              delay: shouldReduceAnimations ? 0 : 0.1,
            }}
          >
            Hi! I&apos;m Aarav, a Software Developer based in India.
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: shouldReduceAnimations ? 0.1 : 0.5,
              delay: shouldReduceAnimations ? 0 : 0.2,
            }}
          >
            <a href="#projects">
              <MagicButton
                title="Explore my projects"
                icon={<FaLocationArrow />}
                position="right"
              />
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
});

Hero.displayName = "Hero";

export default Hero;
