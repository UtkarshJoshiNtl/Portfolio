import { motion } from "framer-motion";
import { timeline } from "@/lib/portfolio-data";
import { SectionHeader } from "../SectionHeader";

export function TimelineBand() {
  return (
    <section className="my-6 md:my-8">
      <SectionHeader label="Timeline" />
      <div className="relative pl-6 border-l border-ornament/20">
        {timeline.map((t, i) => (
          <motion.div
            key={t.year}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="relative pb-4 pl-4 font-mono text-sm"
          >
            {/* Timeline dot */}
            <div
              className="absolute left-[-25px] top-[5px] w-2 h-2 rounded-full bg-ornament/40"
              aria-hidden="true"
            />
            <span className="text-amber tabular-nums">{t.year}</span>
            <span className="text-muted-foreground ml-3">{t.text}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
