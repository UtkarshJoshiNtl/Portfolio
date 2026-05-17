/**
 * Centralized motion configuration for consistent fluidity across all animations.
 * Ensures animations feel organic, responsive, and performant.
 */

export const motionConfig = {
  // Spring animations - tuned for different feels
  springs: {
    smooth: {
      type: "spring",
      stiffness: 180,
      damping: 26,
      mass: 1,
    } as const,
    snappy: {
      type: "spring",
      stiffness: 280,
      damping: 24,
      mass: 1,
    } as const,
    bouncy: {
      type: "spring",
      stiffness: 360,
      damping: 20,
      mass: 1,
    } as const,
    gelatinous: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      mass: 1.2,
    } as const,
  },

  // Duration for tween-based animations (ms)
  durations: {
    instant: 100,
    fast: 150,
    normal: 300,
    slow: 500,
    slowest: 800,
  },

  // Easing functions for tweens
  eases: {
    easeOut: "easeOut",
    easeInOut: "easeInOut",
    anticipate: "anticipate",
    circOut: "circOut",
  },

  // Stagger delays for sequential animations (ms)
  stagger: {
    tile: 80, // Gap between tile entrance animations
    content: 50, // Gap between panel content elements
    tileVariation: 20, // Random variation added to tile stagger for organic feel
  },

  // Viewport intersection thresholds
  viewport: {
    once: true, // Animate only once, don't repeat on scroll
    amount: 0.3, // Trigger when 30% of element is in view
  },

  // Transform values for animations
  transforms: {
    tile: {
      initial: { opacity: 0, scale: 0.92, y: 8 },
      animate: { opacity: 1, scale: 1, y: 0 },
      hover: { y: -4 },
      press: { scale: 0.95 },
    },
    panel: {
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 12 },
    },
    backdrop: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
  },

  // Device-aware motion preferences
  reducedMotion: {
    tile: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      hover: { y: 0 }, // No lift on hover
    },
    duration: 100, // Snappier for accessibility
  },
};

/**
 * Helper to get stagger delay with organic variation
 */
export const getStaggerDelay = (index: number, baseDelay: number = motionConfig.stagger.tile) => {
  // Add subtle random variation (-20% to +20%) for organic feel
  const variation = (Math.random() - 0.5) * motionConfig.stagger.tileVariation;
  return index * baseDelay + variation;
};

/**
 * Check if user prefers reduced motion
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};
