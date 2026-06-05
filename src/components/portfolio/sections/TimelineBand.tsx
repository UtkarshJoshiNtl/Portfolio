import { motion } from "framer-motion";
import { timeline } from "@/lib/portfolio-data";

export function TimelineBand() {
  return (
    <section className="my-6 md:my-8">
      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-amber mb-3">
        Timeline
      </div>
      <div className="flex flex-col gap-1.5">
        {timeline.map((t, i) => (
          <motion.div
            key={t.year}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="flex items-baseline gap-3 font-mono text-sm"
          >
            <span className="text-amber tabular-nums shrink-0 w-20">{t.year}</span>
            <span className="text-muted-foreground">{t.text}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
