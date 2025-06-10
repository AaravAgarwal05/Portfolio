"use client";

import { useState, useEffect, useRef } from "react";
import { IoCopyOutline } from "react-icons/io5";
import Lottie from "lottie-react";
import { FaDownload } from "react-icons/fa";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { techStack, resumeLink } from "@/data";

import { BackgroundGradientAnimation } from "./GradientBg";
import GridGlobe from "./GridGlobe";
import animationData from "@/data/confetti.json";
import MagicButton from "../MagicButton";
import LeetCodeBadges from "../LeetcodeBadges";

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
  onClick,
}: {
  className?: string;
  id: number;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  img?: string;
  imgClassName?: string;
  titleClassName?: string;
  spareImg?: string;
  onClick?: () => void;
}) => {
  const leftLists = techStack.leftColumn;
  const rightLists = techStack.rightColumn;

  const [copied, setCopied] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const leftListRef = useRef<HTMLDivElement>(null);
  const rightListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (id !== 3 || !leftListRef.current || !rightListRef.current) return;

    const leftEl = leftListRef.current;
    const rightEl = rightListRef.current;

    const scrollSpeed = 0.5;
    let animationFrameId: number;

    const animateScroll = () => {
      if (!leftEl || !rightEl) return;

      // Increment scroll position
      leftEl.scrollTop += scrollSpeed;
      rightEl.scrollTop += scrollSpeed;

      // Create seamless loop
      const leftScrollHeight = leftEl.scrollHeight - leftEl.clientHeight;
      const rightScrollHeight = rightEl.scrollHeight - rightEl.clientHeight;

      if (leftEl.scrollTop >= leftScrollHeight) {
        leftEl.scrollTop = 0;
      }
      if (rightEl.scrollTop >= rightScrollHeight) {
        rightEl.scrollTop = 0;
      }

      animationFrameId = requestAnimationFrame(animateScroll);
    };

    animationFrameId = requestAnimationFrame(animateScroll);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [id]);

  const handleCopy = () => {
    if (typeof navigator !== "undefined") {
      const text = "aarav.knp.08@gmail.com";
      navigator.clipboard.writeText(text);
      setCopied(true);
    }
  };

  const handleDownload = () => {
    setDownloading(true);
    setCopied(true);

    setTimeout(() => {
      setDownloading(false);

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
              className={cn(imgClassName, "object-cover object-top ")}
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
                  className="flex flex-col gap-3 md:gap-3 lg:gap-8 max-h-[300px] overflow-hidden cursor-pointer"
                >
                  {[...leftLists, ...leftLists, ...leftLists].map((item, i) => (
                    <span
                      key={`left-${i}`}
                      className="lg:py-4 lg:px-3 w-28 py-2 px-3 text-xs lg:text-base opacity-50 
                      lg:opacity-100 rounded-lg text-center bg-[#10132E] transition-opacity duration-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div
                  ref={rightListRef}
                  className="flex flex-col gap-3 md:gap-3 lg:gap-8 max-h-[300px] overflow-hidden cursor-pointer mt-[22px] md:mt-[26px] lg:mt-[42px]"
                >
                  {[...rightLists, ...rightLists, ...rightLists].map(
                    (item, i) => (
                      <span
                        key={`right-${i}`}
                        className="lg:py-4 lg:px-3 py-2 px-3 w-28 text-xs lg:text-base opacity-50 
                      lg:opacity-100 rounded-lg text-center bg-[#10132E] transition-opacity duration-300"
                      >
                        {item}
                      </span>
                    )
                  )}
                </div>
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
            <div className="relative h-full w-full">
              <div className="absolute inset-0 flex items-center justify-center">
                {isClient && (
                  <Lottie
                    animationData={animationData}
                    loop={true}
                    autoplay={true}
                    style={{ height: "400%", width: "400%" }}
                  />
                )}
              </div>
              <div className="relative z-10 w-full mt-5 lg:mt-8">
                <LeetCodeBadges username="AaravAgarwal05" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export { BentoGrid, BentoGridItem };
