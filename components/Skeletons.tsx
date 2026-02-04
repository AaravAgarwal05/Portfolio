import React from "react";
import { motion } from "framer-motion";

export const HeroSkeleton = () => (
  <div className="pb-20 pt-36">
    <div className="h-screen w-full dark:bg-black-100 bg-white dark:bg-grid-white/[0.03] bg-grid-black-100/[0.2] absolute top-0 left-0" />

    <div className="flex justify-center relative my-20 z-10">
      <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center space-y-6">
        {/* Subtitle skeleton */}
        <div className="h-4 w-60 bg-gray-800 rounded animate-pulse" />

        {/* Main title skeleton */}
        <div className="space-y-3 w-full">
          <div className="h-12 md:h-16 lg:h-20 w-full bg-gray-800 rounded animate-pulse" />
          <div className="h-12 md:h-16 lg:h-20 w-4/5 bg-gray-800 rounded animate-pulse mx-auto" />
        </div>

        {/* Name skeleton */}
        <div className="h-10 md:h-12 w-80 bg-gray-800 rounded animate-pulse" />

        {/* Description skeleton */}
        <div className="space-y-2 w-full max-w-md">
          <div className="h-4 w-full bg-gray-800 rounded animate-pulse" />
          <div className="h-4 w-3/4 bg-gray-800 rounded animate-pulse mx-auto" />
        </div>

        {/* Button skeleton */}
        <div className="h-12 w-40 bg-gray-800 rounded-full animate-pulse" />
      </div>
    </div>
  </div>
);

export const GridSkeleton = () => (
  <section id="about" className="py-20">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="h-64 bg-gray-800 rounded-lg animate-pulse"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        />
      ))}
    </div>
  </section>
);

export const RecentProjectsSkeleton = () => (
  <div className="py-20" id="projects">
    <div className="space-y-4 mb-10">
      <div className="h-8 w-64 bg-gray-800 rounded animate-pulse mx-auto" />
      <div className="h-4 w-96 bg-gray-800 rounded animate-pulse mx-auto" />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="space-y-4 p-6 bg-gray-900 rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <div className="h-48 bg-gray-800 rounded animate-pulse" />
          <div className="h-6 w-3/4 bg-gray-800 rounded animate-pulse" />
          <div className="h-4 w-full bg-gray-800 rounded animate-pulse" />
          <div className="h-4 w-2/3 bg-gray-800 rounded animate-pulse" />
          <div className="flex space-x-2">
            {[...Array(3)].map((_, j) => (
              <div
                key={j}
                className="h-6 w-16 bg-gray-800 rounded-full animate-pulse"
              />
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

export const ExperienceSkeleton = () => (
  <div className="py-20" id="experience">
    <div className="space-y-4 mb-10">
      <div className="h-8 w-48 bg-gray-800 rounded animate-pulse mx-auto" />
      <div className="h-4 w-80 bg-gray-800 rounded animate-pulse mx-auto" />
    </div>

    <div className="space-y-8">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 p-6 bg-gray-900 rounded-lg"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <div className="w-16 h-16 bg-gray-800 rounded-lg animate-pulse flex-shrink-0" />
          <div className="flex-1 space-y-3">
            <div className="h-6 w-64 bg-gray-800 rounded animate-pulse" />
            <div className="h-4 w-32 bg-gray-800 rounded animate-pulse" />
            <div className="h-4 w-full bg-gray-800 rounded animate-pulse" />
            <div className="h-4 w-5/6 bg-gray-800 rounded animate-pulse" />
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

export const ApproachSkeleton = () => (
  <section className="w-full py-20">
    <div className="space-y-4 mb-10">
      <div className="h-8 w-56 bg-gray-800 rounded animate-pulse mx-auto" />
      <div className="h-4 w-80 bg-gray-800 rounded animate-pulse mx-auto" />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="h-80 bg-gray-800 rounded-lg p-6 space-y-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1 }}
        >
          <div className="w-12 h-12 bg-gray-700 rounded-lg animate-pulse" />
          <div className="h-6 w-3/4 bg-gray-700 rounded animate-pulse" />
          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-700 rounded animate-pulse" />
            <div className="h-4 w-5/6 bg-gray-700 rounded animate-pulse" />
            <div className="h-4 w-4/5 bg-gray-700 rounded animate-pulse" />
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

export const FooterSkeleton = () => (
  <footer className="w-full pt-20 pb-10">
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="h-10 w-96 bg-gray-800 rounded animate-pulse mx-auto" />
        <div className="h-4 w-80 bg-gray-800 rounded animate-pulse mx-auto" />
      </div>

      <div className="h-12 w-48 bg-gray-800 rounded-full animate-pulse mx-auto" />

      <div className="flex justify-center space-x-6">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="w-10 h-10 bg-gray-800 rounded-full animate-pulse"
          />
        ))}
      </div>

      <div className="h-4 w-64 bg-gray-800 rounded animate-pulse mx-auto" />
    </div>
  </footer>
);
