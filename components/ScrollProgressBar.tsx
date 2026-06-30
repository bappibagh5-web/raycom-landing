"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();

  // useSpring smooths out tiny jitter from scroll events while still being
  // fast enough to feel real-time (stiffness 200, no lag on slow scrolls)
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{
        scaleX,
        transformOrigin: "left",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        background: "linear-gradient(90deg, #9333ea, #06b6d4)",
        zIndex: 200,
        pointerEvents: "none",
      }}
    />
  );
}
