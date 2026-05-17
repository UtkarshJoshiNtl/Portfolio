import { motion } from "framer-motion";
import type { MouseEvent, ReactNode } from "react";
import { motionConfig } from "@/lib/motion-config";

type TileProps = {
  id?: string;
  label?: string;
  onClick?: (e: MouseEvent) => void;
  href?: string;
  external?: boolean;
  className?: string;
  children: ReactNode;
  bg?: string;
  ariaLabel?: string;
  index?: number;
  animationVariant?: "bounce" | "fade" | "swing" | "default";
  asButton?: boolean;
};

export function Tile({
  id,
  label,
  onClick,
  href,
  external,
  className = "",
  children,
  bg = "bg-tile",
  ariaLabel,
  index = 0,
  animationVariant = "default",
  asButton = true,
}: TileProps) {
  // Animation variants for different tile entrance styles
  const getAnimationVariant = (variant: string) => {
    switch (variant) {
      case "bounce":
        return {
          initial: { opacity: 0, scale: 0.8, y: 16 },
          animate: { opacity: 1, scale: 1, y: 0 },
          transition: {
            ...motionConfig.springs.bouncy,
            delay: (index * motionConfig.stagger.tile) / 1000,
          },
        };
      case "fade":
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { delay: (index * motionConfig.stagger.tile) / 1000, duration: 0.3 },
        };
      case "swing":
        return {
          initial: { opacity: 0, scale: 0.9, rotate: -2 },
          animate: { opacity: 1, scale: 1, rotate: 0 },
          transition: {
            ...motionConfig.springs.smooth,
            delay: (index * motionConfig.stagger.tile) / 1000,
          },
        };
      default:
        return {
          initial: motionConfig.transforms.tile.initial,
          animate: motionConfig.transforms.tile.animate,
          transition: {
            ...motionConfig.springs.smooth,
            delay: (index * motionConfig.stagger.tile) / 1000,
          },
        };
    }
  };

  const animation = getAnimationVariant(animationVariant);

  const inner = (
    <motion.div
      layoutId={id ? `tile-${id}` : undefined}
      initial={animation.initial}
      animate={animation.animate}
      transition={animation.transition}
      whileHover={motionConfig.transforms.tile.hover}
      whileTap={motionConfig.transforms.tile.press}
      className={`h-full w-full group relative overflow-hidden border border-white/10 ${bg}`}
      style={{ minHeight: 0 }}
    >
      <div className="relative z-10 h-full w-full p-4 md:p-5 flex flex-col">{children}</div>
      {label ? (
        <div className="absolute bottom-3 left-4 right-4 z-20 font-mono text-[10px] tracking-[0.15em] uppercase text-white/75 group-hover:text-white transition-colors">
          {label}
        </div>
      ) : null}
      <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity bg-white/[0.055]" />
    </motion.div>
  );

  if (href) {
    return (
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        aria-label={ariaLabel ?? label}
        className={`block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 ${className}`}
      >
        {inner}
      </a>
    );
  }
  if (!asButton) {
    return (
      <div
        aria-label={ariaLabel ?? label}
        className={`block h-full w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 ${className}`}
      >
        {inner}
      </div>
    );
  }
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel ?? label}
      className={`block h-full w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 ${className}`}
    >
      {inner}
    </button>
  );
}
