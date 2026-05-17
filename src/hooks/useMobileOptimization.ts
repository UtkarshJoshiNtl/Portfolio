import { useEffect, useState } from "react";
import { useMotionPreferences } from "./useMotionPreferences";

interface MobileOptimizations {
  isMobile: boolean;
  isTablet: boolean;
  reducedMotion: boolean;
  animationDuration: number; // ms
  transformScale: number; // multiplier (0-1)
}

export function useMobileOptimization(): MobileOptimizations {
  const { reducedMotion } = useMotionPreferences();
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkSize = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024); // lg breakpoint
    };

    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  // Determine animation settings based on device and preferences
  const animationDuration = reducedMotion ? 100 : isMobile ? 250 : 300;
  const transformScale = isMobile ? 0.7 : 1;

  return {
    isMobile,
    isTablet,
    reducedMotion,
    animationDuration,
    transformScale,
  };
}
