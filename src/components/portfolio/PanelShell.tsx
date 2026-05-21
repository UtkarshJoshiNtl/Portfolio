import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, type ReactNode } from "react";

export function PanelShell({
  id,
  onClose,
  children,
}: {
  id: string;
  onClose: () => void;
  children: ReactNode;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      layoutId={`tile-${id}`}
      className="fixed inset-0 z-50 bg-tile overflow-y-auto"
      transition={{ type: "spring", stiffness: 260, damping: 32 }}
    >
      <button
        onClick={onClose}
        aria-label="Close"
        className="fixed top-4 right-4 z-50 w-10 h-10 flex items-center justify-center border border-border hover:border-amber hover:text-amber transition-colors bg-background"
      >
        <X className="w-5 h-5" />
      </button>
      <motion.div
        className="max-w-5xl mx-auto px-6 md:px-10 py-12 md:py-16"
        initial={{ clipPath: "inset(0 0 100% 0)" }}
        animate={{ clipPath: "inset(0 0 0% 0)" }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
      >
        {children}
        <div className="mt-20 pt-6 border-t border-border font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
          © 2026 Utkarsh Joshi
        </div>
      </motion.div>
    </motion.div>
  );
}
