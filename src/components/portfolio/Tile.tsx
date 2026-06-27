import { motion } from "framer-motion";
import type { ReactNode } from "react";

type TileProps = {
  id?: string;
  label: string;
  onClick?: () => void;
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
  const isLink = !!href;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick?.();
    }
  };

  const content = (
    <motion.div
      layoutId={id ? `tile-${id}` : undefined}
      whileHover={{ y: -2, boxShadow: "0 12px 24px rgba(0, 0, 0, 0.15)" }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 30, duration: 0.2 }}
      className={`group relative overflow-hidden rounded-lg border border-border bg-card hover:border-accent/50 transition-colors duration-200 ${isLink ? "" : "cursor-pointer"} ${className}`}
      {...(isLink
        ? {}
        : {
            tabIndex: 0,
            role: "button" as const,
            "aria-label": label,
            onKeyDown: handleKeyDown,
          })}
    >
      <div className="relative z-10 h-full w-full p-6 flex flex-col">
        {children}
      </div>
      <div className="absolute bottom-4 left-4 z-20 font-mono text-xs tracking-wider uppercase text-muted-foreground group-hover:text-accent transition-colors duration-200">
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
