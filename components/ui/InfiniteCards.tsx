"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import Image from "next/image";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
  onItemClick,
}: {
  items: any[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
  onItemClick?: (item: any) => void;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  }, []);
  const [start, setStart] = useState(false);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      getDirection();
      getSpeed();
      setStart(true);
    }
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };
  return (
    <div
      ref={containerRef}
      className={cn(
        // max-w-7xl to w-screen
        "scroller relative z-20 w-screen overflow-hidden  mask-[linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          // change gap-16
          " flex min-w-full shrink-0 gap-16 py-4 w-max flex-nowrap",
          start && "animate-scroll ",
          pauseOnHover && "hover:paused"
        )}
      >
        {[...items, ...items].map((item, idx) => {
          // Check if item is a badge or certificate based on properties
          // Badges have 'displayName', Certificates have 'thumbnailLink' or 'mimeType'
          const isUnknownType =
            !("displayName" in item) &&
            !("mimeType" in item) &&
            "quote" in item;

          // If it's the original quote type item (legacy support if this component is used elsewhere)
          if (isUnknownType) {
            return (
              <li
                className="w-[90vw] max-w-full relative rounded-2xl border border-b-0 shrink-0 border-slate-800 p-5 md:p-16 md:w-[60vw] bg-linear-to-r from-[#04071D] to-[#0C0E23]"
                key={idx}
              >
                <blockquote>
                  <div
                    aria-hidden="true"
                    className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%+4px)] w-[calc(100%+4px)]"
                  ></div>
                  <span className=" relative z-20 text-sm md:text-lg leading-[1.6] text-white font-normal">
                    {item.quote}
                  </span>
                  <div className="relative z-20 mt-6 flex flex-row items-center">
                    <div className="me-3">
                      <Image
                        src="/profile.svg"
                        alt="profile"
                        width={24}
                        height={24}
                      />
                    </div>
                    <span className="flex flex-col gap-1">
                      <span className="text-xl font-bold leading-[1.6] text-white">
                        {item.name}
                      </span>
                      <span className=" text-sm leading-[1.6] text-white-200 font-normal">
                        {item.title}
                      </span>
                    </span>
                  </div>
                </blockquote>
              </li>
            );
          }

          // Badge / Certificate Item Logic
          const isBadge = "displayName" in item;
          const imageUrl = isBadge ? item.icon : item.thumbnailLink;
          // Remove file extension from name if present
          const rawTitle = isBadge ? item.displayName : item.name;
          const title = rawTitle.replace(/\.[^/.]+$/, "");

          // Size configuration
          const liClass = isBadge
            ? "w-[150px] h-[150px] md:w-[200px] md:h-[200px]"
            : "w-[250px] h-[180px] md:w-[400px] md:h-[280px]"; // Larger certificates

          const imgContainerClass = isBadge
            ? "w-24 h-24 md:w-32 md:h-32"
            : "w-full h-full px-4 py-8";

          const imgClass = isBadge
            ? "object-contain w-full h-full rounded-lg"
            : "object-contain w-full h-full rounded-lg shadow-lg";

          return (
            <li
              className={cn(
                "relative rounded-2xl shrink-0 p-2 cursor-pointer hover:scale-110 transition-transform duration-300 flex items-center justify-center bg-[#10132E]/30 border border-white/10 group overflow-hidden",
                liClass
              )}
              key={idx}
              onClick={() => {
                // We need to pass the clicked item back.
                // Since we are cloning nodes, the onClick on cloned nodes might not work directly without event delegation
                // or ensure we only attach to originals, but user wants motion.
                // React synthetic events might get lost on cloned nodes in some setups, but usually works if attached to elements validly.
                // However, for infinite scroll with simple cloning, let's try direct attach.
                if (onItemClick) onItemClick(item);
              }}
            >
              <div
                className={cn(
                  "relative flex items-center justify-center",
                  imgContainerClass
                )}
              >
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={title}
                    width={isBadge ? 128 : 500}
                    height={isBadge ? 128 : 350}
                    className={imgClass}
                    unoptimized={!isBadge} // Unoptimized for external Google Drive links
                  />
                ) : (
                  <span className="text-gray-400 text-xs text-center">
                    {title}
                  </span>
                )}
              </div>
              {/* Hover Overlay Title */}
              <div className="absolute inset-x-0 bottom-0 p-3 bg-black/70 backdrop-blur-md translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-center z-20">
                <span className="text-white text-xs md:text-sm font-semibold text-center line-clamp-2">
                  {title}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
