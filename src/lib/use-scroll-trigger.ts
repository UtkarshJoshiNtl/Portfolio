import { useReducedMotion } from "./motion-preferences";

/**
 * Returns scroll-in animation variants respecting prefers-reduced-motion
 */
export function useScrollTriggerVariants() {
  const prefersReduced = useReducedMotion();

  return {
    container: {
      hidden: prefersReduced ? {} : { opacity: 0 },
      visible: prefersReduced
        ? {}
        : {
            opacity: 1,
            transition: {
              staggerChildren: 0.08,
              delayChildren: 0.1,
            },
          },
    },
    item: {
      hidden: prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
      visible: prefersReduced
        ? { opacity: 1, y: 0 }
        : {
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1],
            },
          },
    },
  };
}

/**
 * Viewport config for scroll-triggered animations
 */
export const scrollViewportConfig = {
  once: true,
  margin: "-40px",
};
