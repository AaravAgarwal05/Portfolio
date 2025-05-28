"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowUp } from "react-icons/fa";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed bottom-8 right-8 z-50">
          <motion.div
            className="absolute inset-0 rounded-full bg-purple/20"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: 1.5,
              opacity: [0, 0.2, 0],
              transition: {
                repeat: Infinity,
                duration: 2,
              },
            }}
          />

          <AnimatePresence>
            {isHovered && (
              <motion.div
                className="absolute -top-20 right-0 bg-[#10132E] px-3 py-1 rounded-md text-sm text-white shadow-lg border border-white/10"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
              >
                Back to top
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            onClick={scrollToTop}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative p-4 rounded-full bg-[#10132E] border border-white/10 text-white shadow-lg backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: { type: "spring", stiffness: 260, damping: 20 },
            }}
            exit={{ opacity: 0, scale: 0.5 }}
            whileHover={{
              scale: 1.1,
              boxShadow: "0px 0px 12px rgba(203, 172, 249, 0.8)",
              borderColor: "rgba(203, 172, 249, 0.8)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: "easeInOut",
              }}
            >
              <FaArrowUp size={20} className="text-purple" />
            </motion.div>
          </motion.button>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
