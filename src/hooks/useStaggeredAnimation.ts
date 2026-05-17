import { getStaggerDelay, motionConfig, prefersReducedMotion } from "@/lib/motion-config";

interface StaggerConfig {
  index: number;
  baseDelay?: number;
  spring?: keyof typeof motionConfig.springs;
}

export function useStaggeredAnimation({
  index,
  baseDelay = motionConfig.stagger.tile,
  spring = "smooth",
}: StaggerConfig) {
  const reducedMotion = prefersReducedMotion();

  if (reducedMotion) {
    return {
      initial: motionConfig.reducedMotion.tile.initial,
      animate: motionConfig.reducedMotion.tile.animate,
      transition: {
        delay: (index * baseDelay) / 1000,
        duration: motionConfig.reducedMotion.duration / 1000,
      },
    };
  }

  return {
    initial: motionConfig.transforms.tile.initial,
    animate: motionConfig.transforms.tile.animate,
    transition: {
      ...motionConfig.springs[spring],
      delay: getStaggerDelay(index, baseDelay) / 1000,
    },
  };
}
