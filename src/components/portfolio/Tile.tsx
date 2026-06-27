import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { TileCornerFlourish } from "./TileCornerFlourish";

type TileProps = {
  id?: string;
  label: string;
  onClick?: () => void;
  href?: string;
  external?: boolean;
  className?: string;
  children: ReactNode;
  bg?: string;
  orbitalOffset?: { dx: number; dy: number };
  depth?: number;
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
  orbitalOffset,
  depth = 0,
}: TileProps) {
  const isLink = !!href;
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick?.();
    }
  };

  const offsetStyle = orbitalOffset
    ? { transform: `translate(${orbitalOffset.dx}px, ${orbitalOffset.dy}px)` }
    : {};

  const depthOffset = depth * 8;

  const hoverConfig = prefersReducedMotion
    ? { scale: 1.01, boxShadow: "0 8px 16px rgba(0,0,0,0.2)" }
    : {
        rotateY: 12,
        rotateX: -8,
        scale: 1.02,
        z: 40 + depthOffset,
        boxShadow: "0 20px 40px rgba(0,0,0,0.3), 0 8px 16px rgba(0,0,0,0.2)",
      };

  const content = (
    <motion.div
      layoutId={id ? `tile-${id}` : undefined}
      whileHover={hoverConfig}
      whileTap={prefersReducedMotion ? { scale: 0.99 } : { scale: 0.975, rotateY: 0, rotateX: 0 }}
      transition={prefersReducedMotion ? { duration: 0.1 } : { type: "spring", stiffness: 280, damping: 20 }}
      style={{
        minHeight: 0,
        transformStyle: "preserve-3d",
        transformOrigin: depth % 2 === 0 ? "center bottom" : "center top",
        zIndex: 10 + depth,
        ...offsetStyle,
      }}
      className={`group relative overflow-hidden border border-transparent hover:border-amber focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${isLink ? "" : "cursor-pointer"} ${bg} ${className}`}
      {...(isLink
        ? {}
        : {
            tabIndex: 0,
            role: "button" as const,
            "aria-label": label,
            onKeyDown: handleKeyDown,
          })}
    >
      <TileCornerFlourish />
      <div
        className="relative z-10 h-full w-full p-5 flex flex-col"
        style={{ transform: `translateZ(${20 + depthOffset}px)` }}
      >
        {children}
      </div>
      <div
        className="absolute bottom-3 left-4 z-20 font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground group-hover:text-amber transition-colors"
        style={{ transform: `translateZ(${30 + depthOffset}px)` }}
      >
        {label}
      </div>
    </motion.div>
  );

  if (href) {
    return (
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="block h-full"
        style={{ touchAction: "manipulation" }}
      >
        {content}
      </a>
    );
  }
  return (
    <button
      onClick={onClick}
      className="block h-full w-full text-left"
      style={{ touchAction: "manipulation" }}
    >
      {content}
    </button>
  );
}
