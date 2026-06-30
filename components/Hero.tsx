"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { CheckCircle, Wifi, Signal, Activity } from "lucide-react";
import AnimatedCounter from "@/components/AnimatedCounter";
import MagneticButton from "@/components/MagneticButton";
import SectionSeamGlow from "@/components/SectionSeamGlow";

const checks = ["Lowest prices guaranteed", "Setup in 24hrs", "99.9% uptime"];

const floatVariants: Variants = {
  animate: {
    y: [0, -18, 0],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
  },
};

const driftVariants = (delay: number, range: number): Variants => ({
  animate: {
    x: [0, range, -range / 2, 0],
    y: [0, -range / 2, range, 0],
    transition: { duration: 7 + delay, repeat: Infinity, ease: "easeInOut", delay },
  },
});

const ringVariants = (delay: number): Variants => ({
  animate: {
    scale: [0.6, 1.8],
    opacity: [0.6, 0],
    transition: { duration: 2.4, repeat: Infinity, ease: "easeOut", delay },
  },
});

// ─── Ambient hue-shift layers ───────────────────────────────────────────────
// Three overlapping radial gradients in different tones cycle opacity in
// sequence so the background colour breathes through purple → navy → indigo.
const ambientLayers = [
  // deep purple
  "radial-gradient(ellipse 90% 70% at 60% 40%, rgba(109,40,217,0.18) 0%, transparent 70%)",
  // dark navy-blue
  "radial-gradient(ellipse 80% 60% at 35% 55%, rgba(30,58,138,0.20) 0%, transparent 65%)",
  // indigo-violet
  "radial-gradient(ellipse 85% 65% at 50% 30%, rgba(79,70,229,0.16) 0%, transparent 68%)",
];

// Each layer peaks at 1/3 intervals of the 18-second cycle.
// Layer 0: peaks at 0s,  Layer 1: peaks at 6s,  Layer 2: peaks at 12s
function ambientTransition(peakDelay: number) {
  return {
    opacity: [0, 0, 1, 0, 0],
    transition: {
      duration: 18,
      delay: peakDelay,
      repeat: Infinity,
      ease: "easeInOut" as const,
      times: [0, 0.15, 0.5, 0.85, 1],
    },
  };
}

interface HeroProps { ready?: boolean }

export default function Hero({ ready = true }: HeroProps) {
  const heroRef = useRef<HTMLElement>(null);

  // ── Scroll-linked gradient ──────────────────────────────────────────────
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const lavenderOpacity  = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const darkOverlayOpacity = useTransform(scrollYProgress, [0.1, 0.9], [0, 0.55]);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center pt-16 overflow-hidden"
    >
      {/* ── Ambient hue-shift layers (z-0, scroll-independent) ── */}
      {ambientLayers.map((bg, i) => (
        <motion.div
          key={i}
          className="absolute inset-0 pointer-events-none z-0"
          style={{ background: bg }}
          initial={{ opacity: 0 }}
          animate={ambientTransition(i * 6)}
        />
      ))}

      {/* ── Scroll-linked overlays (z-0) ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(139,92,246,0.28) 0%, transparent 70%)",
          opacity: lavenderOpacity,
        }}
      />
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: "linear-gradient(to bottom, transparent 0%, rgba(5,5,18,0.65) 100%)",
          opacity: darkOverlayOpacity,
        }}
      />

      {/* ── Grid texture (z-0) ── */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(168,85,247,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(168,85,247,0.035) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      {/* ── Static radial glows (z-0) ── */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl" />
      </div>


      {/* ── Hero content (z-10) ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* LEFT COLUMN — animations only start once splash has exited */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={ready ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col gap-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 self-start px-4 py-2 rounded-full glass border border-purple-500/30 text-sm font-medium text-purple-300"
            >
              <span>⚡</span>
              Best Prices in Jessore &amp; Satkhira
            </motion.div>

            <motion.h1
              initial="hidden"
              animate={ready ? "visible" : "hidden"}
              variants={{
                hidden:  {},
                visible: { transition: { staggerChildren: 0.13, delayChildren: 0.35 } },
              }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-white"
            >
              <motion.span
                variants={{
                  hidden:  { opacity: 0, y: 22 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
                }}
                className="gradient-text block"
              >
                Blazing-fast WiFi
              </motion.span>
              <motion.span
                variants={{
                  hidden:  { opacity: 0, y: 22 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
                }}
                className="block"
              >
                for your home
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-white/60 text-lg leading-relaxed max-w-md"
            >
              Get unbeatable broadband prices without compromising on speed or
              reliability. Stream, game, and work from home — all without
              buffering, all at the lowest rates in the region.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <MagneticButton>
                <motion.a
                  href="#coverage"
                  whileHover={{ scale: 1.05, boxShadow: "0 0 32px rgba(168,85,247,0.6)" }}
                  whileTap={{ scale: 0.97 }}
                  className="block px-7 py-3.5 rounded-full font-semibold text-white bg-gradient-to-r from-purple-600 to-cyan-500 transition-shadow duration-300 shadow-lg shadow-purple-500/25"
                >
                  Check Availability
                </motion.a>
              </MagneticButton>
              <MagneticButton>
                <motion.a
                  href="#plans"
                  whileHover={{ scale: 1.04, borderColor: "rgba(168,85,247,0.8)" }}
                  whileTap={{ scale: 0.97 }}
                  className="block px-7 py-3.5 rounded-full font-semibold text-white border border-white/20 hover:border-purple-400/60 transition-all duration-300"
                >
                  View Plans
                </motion.a>
              </MagneticButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.75, duration: 0.6 }}
              className="flex flex-wrap gap-x-6 gap-y-2"
            >
              {checks.map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-white/60">
                  <CheckCircle size={15} className="text-cyan-400 shrink-0" />
                  {item}
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={ready ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative flex items-center justify-center"
          >
            <div className="absolute w-80 h-80 rounded-full bg-gradient-radial from-purple-600/30 via-cyan-500/10 to-transparent blur-2xl" />

            {/* WiFi pulse rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              {[0, 0.6, 1.2].map((delay, i) => (
                <motion.div
                  key={i}
                  variants={ringVariants(delay)}
                  animate="animate"
                  className="absolute rounded-full border border-cyan-400/40"
                  style={{
                    width: `${140 + i * 40}px`,
                    height: `${140 + i * 40}px`,
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                />
              ))}
            </div>

            {/* Router card */}
            <motion.div
              variants={floatVariants}
              animate="animate"
              className="relative z-10"
              style={{ rotate: -6 }}
            >
              <div className="w-56 h-56 sm:w-72 sm:h-72 flex items-center justify-center">
                <div className="w-48 h-48 sm:w-64 sm:h-64 rounded-3xl glass border border-purple-500/20 flex flex-col items-center justify-center gap-4 shadow-2xl shadow-purple-500/20">
                  <div className="relative">
                    <div className="w-20 h-12 rounded-xl bg-gradient-to-br from-purple-600/60 to-cyan-600/40 border border-white/10 flex items-center justify-center shadow-lg">
                      <Wifi size={28} className="text-cyan-300" />
                    </div>
                    <div className="absolute -top-6 left-3 w-1 h-7 rounded-full bg-gradient-to-t from-purple-500 to-purple-300" />
                    <div className="absolute -top-6 right-3 w-1 h-7 rounded-full bg-gradient-to-t from-cyan-500 to-cyan-300" />
                    <div className="absolute bottom-2 right-3 flex gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-sm shadow-green-400" />
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400" />
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-400 shadow-sm shadow-purple-400" />
                    </div>
                  </div>
                  <p className="text-white/30 text-xs tracking-widest uppercase">Ray Router</p>
                </div>
              </div>
            </motion.div>

            {/* Live Network card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="absolute bottom-4 left-0 sm:-left-6 glass rounded-2xl p-3.5 flex items-center gap-3 shadow-xl shadow-black/30 z-20"
            >
              <div className="relative">
                <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                <motion.div
                  animate={{ scale: [1, 2.5], opacity: [0.8, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute inset-0 rounded-full bg-green-400"
                />
              </div>
              <div>
                <p className="text-xs font-semibold text-white">Live Network</p>
                <p className="text-xs text-white/50">All systems operational</p>
              </div>
              <Signal size={16} className="text-green-400 ml-1" />
            </motion.div>

            {/* Speed card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="absolute top-4 right-0 sm:-right-4 glass rounded-2xl p-3.5 flex items-center gap-2 shadow-xl shadow-black/30 z-20"
            >
              <Activity size={15} className="text-cyan-400" />
              <div>
                <p className="text-xs font-semibold text-white">Avg Speed</p>
                <p className="text-xs text-cyan-400 font-bold">
                  <AnimatedCounter to={982} suffix=" Mbps" duration={2} />
                </p>
              </div>
            </motion.div>

            {/* Small drifting dots near router */}
            {[
              { top: "10%", left: "15%", delay: 0,   range: 14, color: "bg-purple-400" },
              { top: "70%", right: "10%", delay: 1.5, range: 10, color: "bg-cyan-400" },
              { top: "30%", right: "5%",  delay: 3,   range: 12, color: "bg-pink-400" },
            ].map((p, i) => (
              <motion.div
                key={i}
                variants={driftVariants(p.delay, p.range)}
                animate="animate"
                className={`absolute w-3 h-3 rounded-full ${p.color} opacity-50 blur-[1px] z-10`}
                style={{
                  top: p.top,
                  left: "left" in p ? p.left : undefined,
                  right: "right" in p ? p.right : undefined,
                }}
              />
            ))}
          </motion.div>
        </div>
      </div>
      <SectionSeamGlow />
    </section>
  );
}
