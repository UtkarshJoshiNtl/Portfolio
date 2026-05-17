import { motion } from "framer-motion";
import type { MouseEvent, ReactNode } from "react";

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
}: TileProps) {
  const inner = (
    <motion.div
      layoutId={id ? `tile-${id}` : undefined}
      transition={{ type: "spring", stiffness: 420, damping: 34 }}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.985 }}
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
