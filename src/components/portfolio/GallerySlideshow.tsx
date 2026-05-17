"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryItem {
  id: number;
  title: string;
  artist: string;
  imageUrl: string;
}

const INTERVAL_MS = 5500;

export function GallerySlideshow() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/gallery")
      .then((res) => res.json())
      .then((data) => {
        if (data.items?.length) {
          setItems(data.items);
          setError(false);
        } else {
          setError(true);
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const next = useCallback(() => {
    setIndex((i) => (items.length ? (i + 1) % items.length : 0));
  }, [items.length]);

  const prev = useCallback(() => {
    setIndex((i) => (items.length ? (i - 1 + items.length) % items.length : 0));
  }, [items.length]);

  useEffect(() => {
    if (items.length < 2) return;
    const timer = setInterval(next, INTERVAL_MS);
    return () => clearInterval(timer);
  }, [items.length, next]);

  const current = items[index];

  if (loading) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
        <div className="h-6 w-6 border-2 border-white/30 border-t-cyan-400 rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !current) {
    return (
      <motion.div className="absolute inset-0 flex flex-col justify-end p-3">
        <p className="text-xs text-cyan-100/70 font-mono">Gallery unavailable</p>
      </motion.div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden group">
      <AnimatePresence mode="wait">
        <motion.img
          key={current.id}
          src={current.imageUrl}
          alt={current.title}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />
      <div className="absolute bottom-10 left-3 right-3 z-10 pointer-events-none">
        <p className="text-sm font-semibold text-white line-clamp-1">{current.title}</p>
        <p className="text-[10px] font-mono text-cyan-100/70 line-clamp-1">{current.artist}</p>
      </div>
      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1 z-10 pointer-events-none">
        {items.map((_, i) => (
          <span
            key={i}
            className={`h-1 rounded-full transition-all ${i === index ? "w-3 bg-cyan-300" : "w-1 bg-white/40"}`}
          />
        ))}
      </div>
      {items.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-1 top-1/2 -translate-y-1/2 z-20 p-1 bg-black/40 hover:bg-black/60 text-white opacity-70 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
            aria-label="Previous"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-1 top-1/2 -translate-y-1/2 z-20 p-1 bg-black/40 hover:bg-black/60 text-white opacity-70 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
            aria-label="Next"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </>
      )}
    </div>
  );
}
