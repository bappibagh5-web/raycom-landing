"use client";

import { useEffect } from "react";
import { motion, animate, useMotionValue, useTransform } from "framer-motion";
import { Wifi } from "lucide-react";

interface SplashProps {
  onComplete: () => void;
}

// Expanding WiFi ring — same style as the hero pulse rings
function PulseRing({ delay, size }: { delay: number; size: number }) {
  return (
    <motion.span
      className="absolute rounded-full border border-cyan-400/50"
      style={{ width: size, height: size, marginLeft: -size / 2, marginTop: -size / 2 }}
      animate={{ scale: [0.55, 1.7], opacity: [0.7, 0] }}
      transition={{ duration: 2, delay, repeat: Infinity, ease: "easeOut" }}
    />
  );
}

export default function Splash({ onComplete }: SplashProps) {
  // Drives both the progress bar width and the numeric counter
  const progress = useMotionValue(0);
  const displayPct = useTransform(progress, (v) => `${Math.round(v)}%`);
  const barWidth   = useTransform(progress, (v) => `${v}%`);

  useEffect(() => {
    // Fill progress 0 → 100 over 1.5 s, starting at t = 0.35 s
    const ctrl = animate(progress, 100, {
      duration: 1.5,
      delay: 0.35,
      ease: [0.4, 0, 0.2, 1], // Material-style ease-in-out
      onComplete: () => {
        // Short pause at 100 % before signalling parent
        const id = setTimeout(onComplete, 280);
        return () => clearTimeout(id);
      },
    });
    return () => ctrl.stop();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <motion.div
      // Exit: fade out + very slight scale up for a "lift away" feel
      exit={{ opacity: 0, scale: 1.03 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
      style={{
        background: "linear-gradient(160deg, #0a0a1a 0%, #0f0a1f 40%, #1a1230 100%)",
      }}
    >
      {/* ── Faint grid texture (matches hero) ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(168,85,247,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(168,85,247,0.035) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      {/* ── Logo ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.78 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.55, ease: [0.34, 1.56, 0.64, 1] }} // spring-ish overshoot
        className="relative z-10 flex flex-col items-center gap-8"
      >
        {/* Icon + wordmark */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
            <Wifi size={24} className="text-white" />
          </div>
          <span className="text-3xl font-extrabold tracking-tight text-white">
            Ray<span
              className="gradient-text"
              style={{
                background: "linear-gradient(135deg, #a855f7, #06b6d4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >Comm</span>
          </span>
        </div>

        {/* ── WiFi pulse rings + progress row ── */}
        <div className="flex flex-col items-center gap-5">
          {/* Pulse rings centred on a Wifi icon */}
          <div className="relative w-12 h-12 flex items-center justify-center">
            <PulseRing delay={0}    size={48} />
            <PulseRing delay={0.55} size={72} />
            <PulseRing delay={1.1}  size={96} />
            <Wifi size={18} className="relative z-10 text-cyan-400" />
          </div>

          {/* Thin progress bar */}
          <div className="w-48 h-0.5 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-purple-500 to-cyan-400"
              style={{ width: barWidth }}
            />
          </div>

          {/* Percentage counter */}
          <motion.span
            className="text-xs font-mono text-white/40 tabular-nums"
            style={{ fontVariantNumeric: "tabular-nums" }}
          >
            {displayPct}
          </motion.span>
        </div>
      </motion.div>
    </motion.div>
  );
}
