import { useState, useEffect, RefObject } from "react";

export const useIntersectionObserver = (
  elementRef: RefObject<Element>,
  options?: IntersectionObserverInit,
) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasIntersected) {
          setIsVisible(true);
          setHasIntersected(true);
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
        ...options,
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [elementRef, hasIntersected, options]);

  return isVisible;
};

export const usePerformanceOptimizations = () => {
  const [isLowEndDevice, setIsLowEndDevice] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check for low-end device
    const checkDeviceCapabilities = () => {
      const hardwareConcurrency = navigator.hardwareConcurrency || 1;
      const deviceMemory = (navigator as any).deviceMemory || 1;
      const connection = (navigator as any).connection;

      const isLowEnd =
        hardwareConcurrency <= 2 ||
        deviceMemory <= 2 ||
        (connection && connection.effectiveType === "slow-2g");

      setIsLowEndDevice(isLowEnd);
    };

    // Check for reduced motion preference
    const checkMotionPreference = () => {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mediaQuery.matches);

      const handleChange = (event: MediaQueryListEvent) => {
        setPrefersReducedMotion(event.matches);
      };

      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    };

    checkDeviceCapabilities();
    const cleanup = checkMotionPreference();

    return cleanup;
  }, []);

  return {
    isLowEndDevice,
    prefersReducedMotion,
    shouldReduceAnimations: prefersReducedMotion || isLowEndDevice,
  };
};

export const usePreloadImages = (imageSrcs: string[]) => {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  useEffect(() => {
    const loadImage = (src: string) => {
      return new Promise<void>((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          setLoadedImages((prev) => new Set(prev).add(src));
          resolve();
        };
        img.onerror = reject;
        img.src = src;
      });
    };

    const preloadImages = async () => {
      try {
        await Promise.all(imageSrcs.map(loadImage));
      } catch (error) {
        console.warn("Some images failed to preload:", error);
      }
    };

    if (imageSrcs.length > 0) {
      // Use requestIdleCallback if available for better performance
      if ("requestIdleCallback" in window) {
        requestIdleCallback(preloadImages);
      } else {
        setTimeout(preloadImages, 0);
      }
    }
  }, [imageSrcs]);

  return loadedImages;
};
