"use client";

import { useState, useEffect, useRef } from "react";
import { IoCopyOutline } from "react-icons/io5";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import { FaDownload } from "react-icons/fa";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { techStack, resumeLink } from "@/data";

import { BackgroundGradientAnimation } from "./GradientBg";
import GridGlobe from "./GridGlobe";
import animationData from "@/data/confetti.json";
import MagicButton from "../MagicButton";

const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-6 lg:grid-cols-5 md:grid-row-7 gap-4 lg:gap-8 mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

const BentoGridItem = ({
  className,
  id,
  title,
  description,
  img,
  imgClassName,
  titleClassName,
  spareImg,
}: {
  className?: string;
  id: number;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  img?: string;
  imgClassName?: string;
  titleClassName?: string;
  spareImg?: string;
}) => {
  const leftLists = techStack.leftColumn;
  const rightLists = techStack.rightColumn;

  const [copied, setCopied] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(false);
  const [showLeftScrollDown, setShowLeftScrollDown] = useState(false);
  const [showRightScrollDown, setShowRightScrollDown] = useState(false);
  const [showLeftScrollUp, setShowLeftScrollUp] = useState(false);
  const [showRightScrollUp, setShowRightScrollUp] = useState(false);
  const [isLeftScrolling, setIsLeftScrolling] = useState(false);
  const [isRightScrolling, setIsRightScrolling] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const leftListRef = useRef<HTMLDivElement>(null);
  const rightListRef = useRef<HTMLDivElement>(null);
  const leftScrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const rightScrollTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (id === 3) {
      const checkScrollable = () => {
        if (leftListRef.current) {
          const { scrollHeight, clientHeight, scrollTop } = leftListRef.current;
          const isScrollable = scrollHeight > clientHeight;
          setShowLeftScroll(isScrollable);
          setShowLeftScrollDown(
            isScrollable && scrollTop < scrollHeight - clientHeight - 5
          );
          setShowLeftScrollUp(scrollTop > 5);
        }
        if (rightListRef.current) {
          const { scrollHeight, clientHeight, scrollTop } =
            rightListRef.current;
          const isScrollable = scrollHeight > clientHeight;
          setShowRightScroll(isScrollable);
          setShowRightScrollDown(
            isScrollable && scrollTop < scrollHeight - clientHeight - 5
          );
          setShowRightScrollUp(scrollTop > 5);
        }
      };

      checkScrollable();
      window.addEventListener("resize", checkScrollable);

      return () => {
        window.removeEventListener("resize", checkScrollable);
      };
    }
  }, [id]);

  const handleLeftScroll = () => {
    setIsLeftScrolling(true);

    if (leftScrollTimeout.current) {
      clearTimeout(leftScrollTimeout.current);
    }

    leftScrollTimeout.current = setTimeout(() => {
      setIsLeftScrolling(false);
    }, 1000);

    if (leftListRef.current) {
      const { scrollHeight, clientHeight, scrollTop } = leftListRef.current;
      setShowLeftScrollDown(scrollTop < scrollHeight - clientHeight - 5);
      setShowLeftScrollUp(scrollTop > 5);
    }
  };

  const handleRightScroll = () => {
    setIsRightScrolling(true);

    if (rightScrollTimeout.current) {
      clearTimeout(rightScrollTimeout.current);
    }

    rightScrollTimeout.current = setTimeout(() => {
      setIsRightScrolling(false);
    }, 1000);

    if (rightListRef.current) {
      const { scrollHeight, clientHeight, scrollTop } = rightListRef.current;
      setShowRightScrollDown(scrollTop < scrollHeight - clientHeight - 5);
      setShowRightScrollUp(scrollTop > 5);
    }
  };

  useEffect(() => {
    return () => {
      if (leftScrollTimeout.current) clearTimeout(leftScrollTimeout.current);
      if (rightScrollTimeout.current) clearTimeout(rightScrollTimeout.current);
    };
  }, []);

  const handleCopy = () => {
    if (typeof navigator !== "undefined") {
      const text = "aarav.knp.08@gmail.com";
      navigator.clipboard.writeText(text);
      setCopied(true);
    }
  };

  const scrollLeftDown = () => {
    if (leftListRef.current) {
      leftListRef.current.scrollBy({
        top: 100,
        behavior: "smooth",
      });
    }
  };

  const scrollLeftUp = () => {
    if (leftListRef.current) {
      leftListRef.current.scrollBy({
        top: -100,
        behavior: "smooth",
      });
    }
  };

  const scrollRightDown = () => {
    if (rightListRef.current) {
      rightListRef.current.scrollBy({
        top: 100,
        behavior: "smooth",
      });
    }
  };

  const scrollRightUp = () => {
    if (rightListRef.current) {
      rightListRef.current.scrollBy({
        top: -100,
        behavior: "smooth",
      });
    }
  };

  const handleDownload = () => {
    setDownloading(true);
    setCopied(true);

    setTimeout(() => {
      setDownloading(false);

      // Keep confetti animation running for longer
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }, 3000);

    window.open(resumeLink, "_blank");
  };

  return (
    <div
      className={cn(
        "row-span-1 relative overflow-hidden rounded-3xl border border-white/[0.1] group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none justify-between flex flex-col space-y-4",
        className
      )}
      style={{
        background: "rgb(4,7,29)",
        backgroundColor:
          "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
      }}
    >
      <div
        className={`${(id === 6 || id === 4) && "flex justify-center"} h-full`}
      >
        <div className="w-full h-full absolute">
          {img && (
            <Image
              src={img}
              alt={img}
              className={cn(imgClassName, "object-cover object-center ")}
              width={500}
              height={500}
            />
          )}
        </div>
        <div
          className={`absolute right-0 -bottom-5 ${
            id === 5 && "w-full opacity-80"
          } `}
        >
          {spareImg && (
            <Image
              src={spareImg}
              alt={spareImg}
              className="object-cover object-center w-full h-full"
              width={500}
              height={500}
            />
          )}
        </div>
        {(id === 6 || id === 4) && (
          <BackgroundGradientAnimation>
            <div className="absolute z-50 inset-0 flex items-center justify-center text-white font-bold px-4 pointer-events-none text-3xl text-center md:text-4xl lg:text-7xl"></div>
          </BackgroundGradientAnimation>
        )}

        <div
          className={cn(
            titleClassName,
            "group-hover/bento:translate-x-2 transition duration-200 relative md:h-full min-h-40 flex flex-col px-5 p-5 lg:p-10"
          )}
        >
          <div className="font-sans font-extralight md:max-w-32 md:text-xs lg:text-base text-sm text-[#C1C2D3] z-10">
            {description}
          </div>
          <div
            className={`font-sans text-lg lg:text-3xl max-w-96 font-bold z-10`}
          >
            {title}
          </div>

          {id === 2 && <GridGlobe />}

          {id === 3 && (
            <div className="flex gap-1 lg:gap-5 w-fit absolute -right-3 lg:-right-2">
              <div className="relative">
                <div
                  ref={leftListRef}
                  className="flex flex-col gap-3 md:gap-3 lg:gap-8 max-h-[300px] overflow-y-auto scrollbar-hide cursor-pointer scroll-smooth"
                  onScroll={handleLeftScroll}
                >
                  {leftLists.map((item, i) => (
                    <span
                      key={i}
                      className="lg:py-4 lg:px-3 py-2 px-3 text-xs lg:text-base opacity-50 
                      lg:opacity-100 rounded-lg text-center bg-[#10132E]"
                    >
                      {item}
                    </span>
                  ))}
                  <span className="lg:py-4 lg:px-3 py-4 px-3 rounded-lg text-center bg-[#10132E]"></span>
                </div>
                {showLeftScrollDown && !isLeftScrolling && (
                  <motion.div
                    className="absolute bottom-2 left-1/2 -translate-x-1/2 text-white/90 bg-[#10132E]/90 rounded-full p-1.5 backdrop-blur-sm shadow-lg z-10 cursor-pointer hover:bg-[#10132E] hover:scale-110 transition-all duration-200"
                    animate={{ y: [0, 5, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.5,
                      ease: "easeInOut",
                    }}
                    onClick={scrollLeftDown}
                    title="Scroll down"
                  >
                    <IoIosArrowDown size={16} />
                  </motion.div>
                )}

                {showLeftScrollUp && !isLeftScrolling && (
                  <motion.div
                    className="absolute top-2 left-1/2 -translate-x-1/2 text-white/90 bg-[#10132E]/90 rounded-full p-1.5 backdrop-blur-sm shadow-lg z-10 cursor-pointer hover:bg-[#10132E] hover:scale-110 transition-all duration-200"
                    animate={{ y: [0, -5, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.5,
                      ease: "easeInOut",
                    }}
                    onClick={scrollLeftUp}
                    title="Scroll up"
                  >
                    <IoIosArrowUp size={16} />
                  </motion.div>
                )}
              </div>
              <div className="relative">
                <div
                  ref={rightListRef}
                  className="flex flex-col gap-3 md:gap-3 lg:gap-8 max-h-[300px] overflow-y-auto scrollbar-hide cursor-pointer scroll-smooth"
                  onScroll={handleRightScroll}
                >
                  <span className="lg:py-4 lg:px-3 py-4 px-3 rounded-lg text-center bg-[#10132E]"></span>
                  {rightLists.map((item, i) => (
                    <span
                      key={i}
                      className="lg:py-4 lg:px-3 py-2 px-3 text-xs lg:text-base opacity-50 
                      lg:opacity-100 rounded-lg text-center bg-[#10132E]"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                {showRightScrollDown && !isRightScrolling && (
                  <motion.div
                    className="absolute bottom-2 left-1/2 -translate-x-1/2 text-white/90 bg-[#10132E]/90 rounded-full p-1.5 backdrop-blur-sm shadow-lg z-10 cursor-pointer hover:bg-[#10132E] hover:scale-110 transition-all duration-200"
                    animate={{ y: [0, 5, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.5,
                      ease: "easeInOut",
                    }}
                    onClick={scrollRightDown}
                    title="Scroll down"
                  >
                    <IoIosArrowDown size={16} />
                  </motion.div>
                )}

                {showRightScrollUp && !isRightScrolling && (
                  <motion.div
                    className="absolute top-2 left-1/2 -translate-x-1/2 text-white/90 bg-[#10132E]/90 rounded-full p-1.5 backdrop-blur-sm shadow-lg z-10 cursor-pointer hover:bg-[#10132E] hover:scale-110 transition-all duration-200"
                    animate={{ y: [0, -5, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.5,
                      ease: "easeInOut",
                    }}
                    onClick={scrollRightUp}
                    title="Scroll up"
                  >
                    <IoIosArrowUp size={16} />
                  </motion.div>
                )}
              </div>
            </div>
          )}
          {id === 4 && (
            <div className="mt-5 relative">
              <div
                className={`absolute -bottom-5 right-0 ${
                  downloading || copied ? "block" : "block"
                }`}
              >
                {isClient && (
                  <Lottie
                    animationData={animationData}
                    loop={downloading || copied}
                    autoplay={downloading || copied}
                    style={{ height: 200, width: 400 }}
                  />
                )}
              </div>

              <MagicButton
                title={downloading ? "Resume on its way! 🚀" : "View My Resume"}
                icon={<FaDownload />}
                position="left"
                handleClick={handleDownload}
                otherClasses="!bg-[#161A31]"
              />
            </div>
          )}
          {id === 6 && (
            <div className="mt-5 relative">
              <div
                className={`absolute -bottom-5 right-0 ${
                  copied ? "block" : "block"
                }`}
              >
                {isClient && (
                  <Lottie
                    animationData={animationData}
                    loop={copied}
                    autoplay={copied}
                    style={{ height: 200, width: 400 }}
                  />
                )}
              </div>

              <MagicButton
                title={copied ? "Email is Copied!" : "Copy my email address"}
                icon={<IoCopyOutline />}
                position="left"
                handleClick={handleCopy}
                otherClasses="!bg-[#161A31]"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export { BentoGrid, BentoGridItem };
