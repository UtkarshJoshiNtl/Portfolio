import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, type ReactNode } from "react";
import { motionConfig } from "@/lib/motion-config";

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

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: motionConfig.stagger.content / 1000,
        delayChildren: 0.05,
      },
    },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  const itemVariants = {
    initial: motionConfig.transforms.panel.initial,
    animate: motionConfig.transforms.panel.animate,
    exit: motionConfig.transforms.panel.exit,
  };

  return (
    <motion.div
      layoutId={`tile-${id}`}
      className="fixed inset-0 z-50 bg-tile overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.button
        onClick={onClose}
        aria-label="Close"
        className="fixed top-4 right-4 z-50 w-10 h-10 flex items-center justify-center border border-border hover:border-amber hover:text-amber transition-colors bg-background"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
      >
        <X className="w-5 h-5" />
      </motion.button>
      <motion.div
        className="max-w-5xl mx-auto px-6 md:px-10 py-12 md:py-16"
        variants={containerVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <motion.div variants={itemVariants}>{children}</motion.div>
        <motion.div
          variants={itemVariants}
          className="mt-20 pt-6 border-t border-border font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground"
        >
          © 2026 Utkarsh Joshi
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
