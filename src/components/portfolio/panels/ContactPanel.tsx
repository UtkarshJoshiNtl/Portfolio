"use client";

import { PanelShell } from "../PanelShell";
import { useState } from "react";
import { motion } from "framer-motion";
import { links } from "@/lib/portfolio-data";

export function ContactPanel({ onClose }: { onClose: () => void }) {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 800));
      setSubmitted(true);
      setFormState({ name: "", email: "", message: "" });
      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formState.name && formState.email && formState.message;

  return (
    <PanelShell id="contact" onClose={onClose}>
      <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber">Contact</div>
      <h2 className="mt-2 text-3xl md:text-5xl font-semibold">Get in touch</h2>

      <div className="mt-8 max-w-2xl">
        <p className="text-foreground/80 mb-8">
          Interested in discussing performance work, GPU systems, or technical projects? Reach out
          via the form below or contact directly.
        </p>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 border border-metro-green/50 bg-metro-green/10 text-metro-green text-sm"
          >
            Thanks for reaching out! I&apos;ll get back to you soon.
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block font-mono text-xs uppercase tracking-[0.15em] mb-2"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formState.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-background border border-border hover:border-white/30 focus:border-white/50 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block font-mono text-xs uppercase tracking-[0.15em] mb-2"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formState.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-background border border-border hover:border-white/30 focus:border-white/50 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block font-mono text-xs uppercase tracking-[0.15em] mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formState.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-2 bg-background border border-border hover:border-white/30 focus:border-white/50 focus:outline-none transition-colors resize-none"
              />
            </div>

            <motion.button
              type="submit"
              disabled={!isFormValid || isSubmitting}
              whileHover={isFormValid ? { scale: 1.02 } : {}}
              whileTap={isFormValid ? { scale: 0.98 } : {}}
              className="w-full px-4 py-3 bg-white/10 border border-border hover:border-white/50 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-mono text-xs uppercase tracking-[0.15em]"
            >
              {isSubmitting ? "Sending..." : "Send"}
            </motion.button>
          </form>
        )}

        <div className="mt-12 pt-8 border-t border-border">
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground mb-4">
            Or reach out directly
          </p>
          <div className="space-y-3">
            <a
              href={`mailto:${links.email}`}
              className="block text-foreground hover:text-amber transition-colors"
            >
              {links.email}
            </a>
            <a
              href={links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-foreground hover:text-amber transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-foreground hover:text-amber transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </PanelShell>
  );
}
