"use client";

import { useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  /** Extra classes applied to the outer hit-zone wrapper (e.g. "w-full mt-auto") */
  className?: string;
  /**
   * Fraction of cursor offset applied as translation.
   * 0.3 → button moves ~12 px when cursor is 40 px from centre.
   */
  strength?: number;
}

export default function MagneticButton({
  children,
  className = "",
  strength = 0.32,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Spring config: responsive but not snappy — gives the "pulled" feel
  const x = useSpring(rawX, { stiffness: 180, damping: 18, mass: 0.6 });
  const y = useSpring(rawY, { stiffness: 180, damping: 18, mass: 0.6 });

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      rawX.set((e.clientX - cx) * strength);
      rawY.set((e.clientY - cy) * strength);
    },
    [rawX, rawY, strength]
  );

  const onMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  return (
    /*
     * Outer div: the magnetic field.
     * padding + negative margin extends the hit-zone ~40 px in every direction
     * without affecting surrounding layout. `inline-flex` keeps it from
     * stretching to full width unless the consumer passes "w-full".
     */
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`inline-flex ${className}`}
      style={{ padding: "40px", margin: "-40px" }}
    >
      {/* Inner div carries the spring translation */}
      <motion.div style={{ x, y }} className="w-full">
        {children}
      </motion.div>
    </div>
  );
}
