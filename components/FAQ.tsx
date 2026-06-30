"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Plus } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";

const faqs = [
  {
    q: "What should I do if my internet speed is slow?",
    a: "Restart your router first. If the issue continues, contact our 24/7 support team and we'll run a line diagnostic remotely or send a technician if needed.",
  },
  {
    q: "When is my bill payment due?",
    a: "Bills are due by the 10th of each month. You can pay via bKash, Nagad, Rocket, or our Quick Pay portal.",
  },
  {
    q: "How long does it take to get a new connection installed?",
    a: "Most installations are completed within 24 hours of your order, depending on your area's current technician schedule.",
  },
  {
    q: "Is there a separate bill for IPTV/Smart TV service?",
    a: "No, IPTV/Smart TV access is bundled at no extra cost with select plans. Check your plan details or contact us to confirm.",
  },
  {
    q: "Is there a data usage limit on my plan?",
    a: "No, all our plans come with unlimited data. Stream, download, and game without worrying about caps.",
  },
  {
    q: "Do I need to sign a long-term contract?",
    a: "No long-term contracts required. You can upgrade, downgrade, or cancel your plan anytime.",
  },
];

function AccordionItem({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: { q: string; a: string };
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className={`rounded-2xl border transition-colors duration-300 overflow-hidden ${
        isOpen
          ? "border-purple-500/40 bg-white/[0.07]"
          : "border-white/10 bg-white/[0.04] hover:border-purple-500/25"
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
        aria-expanded={isOpen}
      >
        <span className={`text-sm font-semibold leading-snug transition-colors duration-200 ${isOpen ? "text-white" : "text-white/80"}`}>
          {item.q}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="shrink-0 w-6 h-6 rounded-full border border-white/20 flex items-center justify-center"
        >
          <Plus size={13} className={isOpen ? "text-purple-300" : "text-white/50"} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}
          >
            <p className="px-5 pb-4 text-sm text-white/55 leading-relaxed">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  function toggle(i: number) {
    setOpenIndex((prev) => (prev === i ? null : i));
  }

  return (
    <section id="faq" className="relative py-24">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute top-1/3 right-0 w-64 h-64 bg-cyan-500/8 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* ── LEFT COLUMN ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
            className="lg:sticky lg:top-28 flex flex-col gap-6"
          >
            {/* Pill badge */}
            <span className="self-start inline-block px-4 py-1.5 rounded-full glass border border-purple-500/30 text-purple-300 text-sm font-medium">
              FAQ
            </span>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
              Got{" "}
              <span className="gradient-text">Questions?</span>
            </h2>

            {/* Supporting text */}
            <p className="text-white/50 text-lg leading-relaxed max-w-sm">
              Find answers to the most common questions below. Need more help?
              Call us directly.
            </p>

            {/* Call CTA */}
            <MagneticButton>
              <motion.a
                href="tel:01610001981"
                whileHover={{ scale: 1.05, boxShadow: "0 0 28px rgba(168,85,247,0.5)" }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full font-semibold text-white bg-gradient-to-r from-purple-600 to-cyan-500 shadow-lg shadow-purple-500/25 transition-shadow duration-300"
              >
                <Phone size={16} />
                01610001981
              </motion.a>
            </MagneticButton>
          </motion.div>

          {/* ── RIGHT COLUMN — accordion ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex flex-col gap-3"
          >
            {faqs.map((item, i) => (
              <AccordionItem
                key={i}
                item={item}
                index={i}
                isOpen={openIndex === i}
                onToggle={() => toggle(i)}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
