import { useEffect } from "react";

export const PerformanceMonitor = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Monitor Core Web Vitals
      const observeWebVitals = () => {
        // First Contentful Paint
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (
              entry.entryType === "paint" &&
              entry.name === "first-contentful-paint"
            ) {
              console.log("FCP:", entry.startTime);
            }
          }
        });
        observer.observe({ entryTypes: ["paint"] });

        // Largest Contentful Paint
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          console.log("LCP:", lastEntry.startTime);
        });
        lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] });

        // Cumulative Layout Shift
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            const layoutShiftEntry = entry as any; // Type assertion for layout-shift entries
            if (!layoutShiftEntry.hadRecentInput) {
              clsValue += layoutShiftEntry.value;
              console.log("CLS:", clsValue);
            }
          }
        });
        clsObserver.observe({ entryTypes: ["layout-shift"] });

        // First Input Delay
        const fidObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            const perfEntry = entry as any; // Type assertion for first-input entries
            const fid = perfEntry.processingStart - perfEntry.startTime;
            console.log("FID:", fid);
          }
        });
        fidObserver.observe({ entryTypes: ["first-input"] });

        return () => {
          observer.disconnect();
          lcpObserver.disconnect();
          clsObserver.disconnect();
          fidObserver.disconnect();
        };
      };

      // Resource loading performance
      const monitorResources = () => {
        window.addEventListener("load", () => {
          const navigation = performance.getEntriesByType(
            "navigation",
          )[0] as PerformanceNavigationTiming;
          console.log(
            "Page Load Time:",
            navigation.loadEventEnd - navigation.loadEventStart,
          );
          console.log(
            "DOM Content Loaded:",
            navigation.domContentLoadedEventEnd -
              navigation.domContentLoadedEventStart,
          );
          console.log(
            "Time to Interactive:",
            navigation.loadEventEnd - navigation.fetchStart,
          );
        });

        // Monitor long tasks
        if ("PerformanceObserver" in window) {
          const longTaskObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              console.warn("Long task detected:", entry.duration);
            }
          });
          longTaskObserver.observe({ entryTypes: ["longtask"] });
        }
      };

      const cleanup = observeWebVitals();
      monitorResources();

      return cleanup;
    }
  }, []);

  return null;
};

export default PerformanceMonitor;
