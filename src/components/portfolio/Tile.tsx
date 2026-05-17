import { motion } from "framer-motion";
import type { ReactNode } from "react";

type TileProps = {
  id?: string;
  label: string;
  onClick?: (e: React.MouseEvent) => void;
  href?: string;
  external?: boolean;
  className?: string;
  children: ReactNode;
  bg?: string;
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
}: TileProps) {
  const content = (
    <motion.div
      layoutId={id ? `tile-${id}` : undefined}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
      style={{ minHeight: 0 }}
      className={`group relative overflow-hidden border border-transparent hover:border-amber ${bg} ${className}`}
    >
      <div
        className="relative z-10 h-full w-full p-5 flex flex-col"
        style={{ transform: "translateZ(20px)" }}
      >
        {children}
      </div>
      <div
        className="absolute bottom-3 left-4 z-20 font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground group-hover:text-amber transition-colors"
        style={{ transform: "translateZ(30px)" }}
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
      >
        {content}
      </a>
    );
  }
  return (
    <button onClick={onClick} className="block h-full w-full text-left">
      {content}
    </button>
  );
}
