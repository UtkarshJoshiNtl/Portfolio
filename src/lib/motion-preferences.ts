/**
 * Hook to detect user's motion preferences
 * Returns true if user prefers reduced motion
 */
export function useReducedMotion(): boolean {
  // SSR-safe check
  if (typeof window === 'undefined') return false;
  
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Returns animation config based on motion preferences
 * When reduced motion is preferred, returns instant transitions
 */
export function getMotionConfig(prefersReduced: boolean) {
  return prefersReduced
    ? {
        duration: 0,
        delay: 0,
      }
    : {
        duration: 0.5,
        delay: 0,
      };
}

/**
 * Wraps transition config to respect reduced motion preference
 */
export function respectMotionPreference(
  prefersReduced: boolean,
  config: any,
  instantConfig?: any
) {
  if (prefersReduced) {
    return instantConfig ?? { duration: 0, delay: 0 };
  }
  return config;
}
