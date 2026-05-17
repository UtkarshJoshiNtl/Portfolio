import { useInView } from "framer-motion";
import { useRef } from "react";

interface InViewAnimationConfig {
  amount?: "some" | "all" | number;
  once?: boolean;
}

export function useInViewAnimation(config: InViewAnimationConfig = {}) {
  const { amount = 0.3, once = true } = config;
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount });

  return { ref, isInView };
}
