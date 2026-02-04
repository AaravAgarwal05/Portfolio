import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NumberLoaderProps {
  onLoadingComplete: () => void;
}

const NumberLoader: React.FC<NumberLoaderProps> = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentNumber, setCurrentNumber] = useState(0);

  useEffect(() => {
    const duration = 2500; // 2.5 seconds
    const interval = 20; // Update every 20ms for smooth animation
    const steps = duration / interval;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + increment;
        const newNumber = Math.floor(newProgress);
        setCurrentNumber(newNumber);

        if (newProgress >= 100) {
          clearInterval(timer);
          // Add a small delay before completing
          setTimeout(() => {
            onLoadingComplete();
          }, 300);
          return 100;
        }
        return newProgress;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black-100"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col items-center space-y-8">
          {/* Main number display */}
          <motion.div
            className="relative"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-purple to-blue-100 bg-clip-text text-transparent">
              {currentNumber.toString().padStart(2, "0")}
            </span>
            <span className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple to-blue-100 bg-clip-text text-transparent">
              %
            </span>
          </motion.div>

          {/* Wavy Progress Bar */}
          <div className="relative w-80 h-6 mb-4">
            {/* Background Track */}
            <div className="absolute inset-0 bg-gray-800 rounded-full opacity-30" />

            {/* Animated Wavy Progress */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 320 24"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient
                  id="waveGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#7877c6" />
                  <stop offset="50%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <motion.path
                d={`M0,12 Q${(progress * 3.2) / 4},6 ${(progress * 3.2) / 2},12 T${progress * 3.2},12 L${progress * 3.2},20 Q${(progress * 3.2) / 2},14 0,20 Z`}
                fill="url(#waveGradient)"
                filter="url(#glow)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.1, ease: "easeOut" }}
              />

              {/* Wave animation overlay */}
              <motion.path
                d={`M0,12 Q20,8 40,12 T80,12 T120,12 T160,12 T200,12 T240,12 T280,12 T320,12`}
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1"
                fill="none"
                strokeDasharray="5,5"
                animate={{
                  strokeDashoffset: [0, -10],
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  clipPath: `polygon(0 0, ${progress}% 0, ${progress}% 100%, 0 100%)`,
                }}
              />
            </svg>

            {/* Sparkle effects */}
            <motion.div
              className="absolute top-0 h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
              style={{
                width: "20px",
                left: `${Math.max(0, progress * 3.2 - 10)}px`,
                clipPath: "polygon(0 0, 100% 0, 90% 100%, 10% 100%)",
              }}
              animate={{
                opacity: [0, 0.6, 0],
                scale: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>

          {/* Loading text */}
          <motion.p
            className="text-white-200 text-lg tracking-wider"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Loading Portfolio...
          </motion.p>

          {/* Animated dots */}
          <div className="flex space-x-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-purple rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </div>

        {/* Background animation */}
        <motion.div
          className="absolute inset-0 opacity-10"
          style={{
            background: `radial-gradient(circle at 50% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default NumberLoader;
