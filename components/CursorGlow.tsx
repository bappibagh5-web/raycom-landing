"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function CursorGlow() {
  const rawX = useMotionValue(-9999);
  const rawY = useMotionValue(-9999);

  // Spring trailing — damping/stiffness tuned for ~180ms lag
  const springX = useSpring(rawX, { damping: 28, stiffness: 90, mass: 0.6 });
  const springY = useSpring(rawY, { damping: 28, stiffness: 90, mass: 0.6 });

  // Centre the 420px glow on the cursor
  const x = useTransform(springX, (v) => v - 210);
  const y = useTransform(springY, (v) => v - 210);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
    };
    const onLeave = () => {
      rawX.set(-9999);
      rawY.set(-9999);
    };

    window.addEventListener("mousemove", onMove);
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [rawX, rawY]);

  return (
    <motion.div
      aria-hidden
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 420,
        height: 420,
        borderRadius: "50%",
        x,
        y,
        background:
          "radial-gradient(circle, rgba(139,92,246,0.13) 0%, rgba(6,182,212,0.07) 45%, transparent 70%)",
        filter: "blur(32px)",
        pointerEvents: "none",
        zIndex: 9,           // above section backgrounds (z-0), below all content (z-10+)
        willChange: "transform",
      }}
    />
  );
}
