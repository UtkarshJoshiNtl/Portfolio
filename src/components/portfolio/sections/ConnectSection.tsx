import { motion } from "framer-motion";
import { User, Send } from "lucide-react";

export function ConnectSection({ onSelect }: { onSelect: (id: string) => void }) {
  const items = [
    {
      id: "about",
      icon: User,
      label: "About",
      sub: "background · education",
      accent: "oklch(0.55 0.15 260)",
    },
    {
      id: "contact",
      icon: Send,
      label: "Contact",
      sub: "get in touch",
      accent: "oklch(0.65 0.2 345)",
    },
  ];

  return (
    <section className="mt-2">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        className="font-mono text-[10px] uppercase tracking-[0.2em] text-amber mb-3"
      >
        Connect
      </motion.div>
      <div className="grid grid-cols-2 gap-3">
        {items.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            whileHover={{ y: -2, transition: { duration: 0.2 } }}
          >
            <button
              onClick={() => onSelect(item.id)}
              className="w-full text-left bg-tile hover:bg-tile-alt transition-all duration-300 p-5 relative overflow-hidden group"
            >
              <div
                className="absolute top-0 left-0 right-0 h-[2px] opacity-40 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: item.accent }}
              />
              <item.icon className="w-5 h-5 mb-6" style={{ color: item.accent }} />
              <div className="font-mono text-sm">{item.label}</div>
              <div className="font-mono text-xs text-muted-foreground mt-1">{item.sub}</div>
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
