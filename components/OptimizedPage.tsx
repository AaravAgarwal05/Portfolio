import React, { useState, useEffect, Suspense, lazy } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NumberLoader from "./NumberLoader";
import PerformanceMonitor from "./PerformanceMonitor";
import {
  HeroSkeleton,
  GridSkeleton,
  RecentProjectsSkeleton,
  ExperienceSkeleton,
  ApproachSkeleton,
  FooterSkeleton,
} from "./Skeletons";
import { FloatingNav } from "./ui/FloatingNavbar";
import { navItems } from "@/data";

// Lazy load components for better performance
const Hero = lazy(() => import("./Hero"));
const Grid = lazy(() => import("./Grid"));
const RecentProjects = lazy(() => import("./RecentProjects"));
const Experience = lazy(() => import("./Experience"));
const Approach = lazy(() => import("./Approach"));
const Footer = lazy(() => import("./Footer"));
const ScrollToTop = lazy(() => import("./ScrollToTop"));

interface OptimizedPageProps {
  children?: React.ReactNode;
}

const OptimizedPage: React.FC<OptimizedPageProps> = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [componentsLoaded, setComponentsLoaded] = useState({
    hero: false,
    grid: false,
    projects: false,
    experience: false,
    approach: false,
    footer: false,
  });

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  // Preload components in sequence with small delays for smooth experience
  useEffect(() => {
    const loadComponents = async () => {
      const delays = [100, 200, 300, 400, 500, 600];
      const componentKeys = Object.keys(
        componentsLoaded,
      ) as (keyof typeof componentsLoaded)[];

      componentKeys.forEach((key, index) => {
        setTimeout(() => {
          setComponentsLoaded((prev) => ({ ...prev, [key]: true }));
        }, delays[index]);
      });
    };

    if (!isLoading) {
      loadComponents();
    }
  }, [isLoading]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <NumberLoader onLoadingComplete={handleLoadingComplete} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <motion.main
          className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Performance Monitor (only in development) */}
          {process.env.NODE_ENV === "development" && <PerformanceMonitor />}

          <div className="max-w-7xl w-full">
            <FloatingNav navItems={navItems} />

            {/* Hero Section */}
            <Suspense fallback={<HeroSkeleton />}>
              {componentsLoaded.hero ? <Hero /> : <HeroSkeleton />}
            </Suspense>

            {/* Grid Section */}
            <Suspense fallback={<GridSkeleton />}>
              {componentsLoaded.grid ? <Grid /> : <GridSkeleton />}
            </Suspense>

            {/* Recent Projects Section */}
            <Suspense fallback={<RecentProjectsSkeleton />}>
              {componentsLoaded.projects ? (
                <RecentProjects />
              ) : (
                <RecentProjectsSkeleton />
              )}
            </Suspense>

            {/* Experience Section */}
            <Suspense fallback={<ExperienceSkeleton />}>
              {componentsLoaded.experience ? (
                <Experience />
              ) : (
                <ExperienceSkeleton />
              )}
            </Suspense>

            {/* Approach Section */}
            <Suspense fallback={<ApproachSkeleton />}>
              {componentsLoaded.approach ? <Approach /> : <ApproachSkeleton />}
            </Suspense>

            {/* Footer Section */}
            <Suspense fallback={<FooterSkeleton />}>
              {componentsLoaded.footer ? (
                <>
                  <Footer />
                  <ScrollToTop />
                </>
              ) : (
                <FooterSkeleton />
              )}
            </Suspense>
          </div>
        </motion.main>
      )}
    </>
  );
};

export default OptimizedPage;
