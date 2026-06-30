"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import SectionSeamGlow from "@/components/SectionSeamGlow";

const testimonials = [
  {
    name: "Rafiqul Islam",
    role: "Subscriber, Sharsha",
    avatar: "RI",
    rating: 5,
    text: "Switched from my old ISP and the difference is night and day. No more buffering during cricket matches, even in peak hours.",
  },
  {
    name: "Tania Akter",
    role: "Subscriber, Kolaroa",
    avatar: "TA",
    rating: 5,
    text: "Running video calls all day for work with zero drops. The installation team came the same day I called.",
  },
  {
    name: "Shohel Rana",
    role: "Content Creator, Jessore",
    avatar: "SR",
    rating: 5,
    text: "Uploading footage for my YouTube channel used to take forever. Now it's done in minutes. Best decision I made this year.",
  },
  {
    name: "Arif Hossain",
    role: "Gamer, Jessore",
    avatar: "AH",
    rating: 5,
    text: "Ping dropped from 80ms to under 10ms in PUBG. Finally an ISP that actually understands gamers in Jessore.",
  },
  {
    name: "Nasrin Sultana",
    role: "Subscriber, Satkhira",
    avatar: "NS",
    rating: 5,
    text: "Five devices streaming at once and not a single lag. My kids' online classes never disconnect anymore.",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={13} className="text-yellow-400" fill="#facc15" />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState(0);

  // Auto-rotate
  useEffect(() => {
    const id = setInterval(() => {
      setActive((v) => (v + 1) % testimonials.length);
    }, 4500);
    return () => clearInterval(id);
  }, []);

  const prev = () => setActive((v) => (v - 1 + testimonials.length) % testimonials.length);
  const next = () => setActive((v) => (v + 1) % testimonials.length);

  return (
    <section className="relative py-24 overflow-hidden" style={{ background: "linear-gradient(160deg, transparent 0%, rgba(28,10,50,0.45) 50%, transparent 100%)" }}>
      <div className="absolute inset-0 pointer-events-none">
        {/* Warm purple bloom centered behind the featured quote card */}
        <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[520px] h-64 rounded-full blur-3xl"
          style={{ background: "radial-gradient(ellipse, rgba(147,51,234,0.18) 0%, rgba(139,92,246,0.08) 50%, transparent 70%)" }} />
        <div className="absolute top-1/2 right-0 w-80 h-80 bg-purple-600/8 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass border border-purple-500/30 text-purple-300 text-sm font-medium mb-4">
            Customer Stories
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4">
            Loved by{" "}
            <span className="gradient-text">thousands</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Real customers. Real experiences. Real speed.
          </p>
        </motion.div>

        {/* Featured card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-2xl mx-auto mb-10"
        >
          <div className="relative rounded-3xl p-8 sm:p-10" style={{ background: "linear-gradient(135deg, #4a1880 0%, #341b6e 35%, #163260 65%, #0c4060 100%)", backdropFilter: "blur(20px)", border: "1px solid rgba(147,51,234,0.35)", boxShadow: "0 0 60px rgba(147,51,234,0.15), inset 0 1px 0 rgba(255,255,255,0.08)" }}>
            <Quote size={32} className="text-purple-400/40 mb-4" />
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4 }}
              >
                <p className="text-white/80 text-lg leading-relaxed mb-6">
                  &ldquo;{testimonials[active].text}&rdquo;
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
                    {testimonials[active].avatar}
                  </div>
                  <div>
                    <p className="text-white font-semibold">{testimonials[active].name}</p>
                    <p className="text-white/40 text-sm">{testimonials[active].role}</p>
                  </div>
                  <div className="ml-auto">
                    <StarRating count={testimonials[active].rating} />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Controls + dots */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={prev}
            className="w-9 h-9 rounded-full glass border border-white/15 flex items-center justify-center text-white/60 hover:text-white hover:border-purple-400/40 transition-all"
          >
            <ChevronLeft size={16} />
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === active
                    ? "w-6 h-2 bg-gradient-to-r from-purple-500 to-cyan-500"
                    : "w-2 h-2 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="w-9 h-9 rounded-full glass border border-white/15 flex items-center justify-center text-white/60 hover:text-white hover:border-purple-400/40 transition-all"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Mini card row */}
        <div className="mt-10 flex gap-4 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory">
          {testimonials.map((t, i) => (
            <motion.button
              key={t.name}
              onClick={() => setActive(i)}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              className={`shrink-0 snap-start w-52 glass rounded-2xl p-4 text-left border transition-all duration-300 ${
                i === active
                  ? "border-purple-500/50 bg-purple-500/10"
                  : "border-white/10 hover:border-purple-400/30"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-white text-xs font-semibold">{t.name}</p>
                  <StarRating count={t.rating} />
                </div>
              </div>
              <p className="text-white/50 text-xs line-clamp-2">{t.text}</p>
            </motion.button>
          ))}
        </div>
      </div>
      <SectionSeamGlow />
    </section>
  );
}
