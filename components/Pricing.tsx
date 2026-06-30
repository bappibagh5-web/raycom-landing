"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check, Zap, Star } from "lucide-react";
import AnimatedCounter from "@/components/AnimatedCounter";
import MagneticButton from "@/components/MagneticButton";
import SectionSeamGlow from "@/components/SectionSeamGlow";

interface Plan {
  name: string;
  priceNum: number;
  speedNum: number;
  oldSpeed: string;       // struck-through previous speed
  bonusNote: string | null; // null = no bonus note (Package 1)
  features: string[];
  highlighted: boolean;
}

const plans: Plan[] = [
  {
    name: "Package 1",
    priceNum: 500,
    speedNum: 20,
    oldSpeed: "10 Mbps",
    bonusNote: null,
    features: [
      "8×2K YouTube",
      "8×2K Facebook",
      "Gaming Cache / CDN",
      "100 Mbps BDIX & FTP",
    ],
    highlighted: false,
  },
  {
    name: "Package 2",
    priceNum: 600,
    speedNum: 25,
    oldSpeed: "12 Mbps",
    bonusNote: "25 Mbps from 12AM–6AM bonus speed",
    features: [
      "100 Mbps YouTube",
      "100 Mbps Facebook",
      "Gaming Cache / CDN",
      "100 Mbps BDIX & FTP",
    ],
    highlighted: false,
  },
  {
    name: "Package 3",
    priceNum: 800,
    speedNum: 30,
    oldSpeed: "15 Mbps",
    bonusNote: "30 Mbps from 12AM–6AM bonus speed",
    features: [
      "100 Mbps YouTube",
      "100 Mbps Facebook",
      "Gaming Cache / CDN",
      "100 Mbps BDIX & FTP",
    ],
    highlighted: true,
  },
  {
    name: "Package 4",
    priceNum: 1000,
    speedNum: 40,
    oldSpeed: "20 Mbps",
    bonusNote: "40 Mbps from 12AM–6AM bonus speed",
    features: [
      "100 Mbps YouTube",
      "100 Mbps Facebook",
      "Gaming Cache / CDN",
      "100 Mbps BDIX & FTP",
    ],
    highlighted: false,
  },
  {
    name: "Package 5",
    priceNum: 1500,
    speedNum: 50,
    oldSpeed: "25 Mbps",
    bonusNote: "50 Mbps from 12AM–6AM bonus speed",
    features: [
      "100 Mbps YouTube",
      "100 Mbps Facebook",
      "Gaming Cache / CDN",
      "100 Mbps BDIX & FTP",
    ],
    highlighted: false,
  },
];

export default function Pricing() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="plans" className="relative py-24" style={{ background: "linear-gradient(180deg, transparent 0%, rgba(30,12,54,0.55) 45%, rgba(18,8,38,0.35) 100%)" }}>
      {/* Section ambient — warm/slightly lighter than hero base */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Wide soft glow centered behind Most Popular card (3rd of 5) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full blur-[80px]"
          style={{ background: "radial-gradient(circle, rgba(147,51,234,0.14) 0%, rgba(6,182,212,0.06) 55%, transparent 75%)" }} />
        {/* Faint warm upper-right accent */}
        <div className="absolute top-0 right-1/4 w-64 h-48 bg-violet-600/7 rounded-full blur-3xl" />
      </div>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass border border-purple-500/30 text-purple-300 text-sm font-medium mb-4">
            Simple Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4">
            Plans that fit{" "}
            <span className="gradient-text">every need</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            No hidden fees, no contracts. Upgrade any time.
          </p>
        </motion.div>

        {/* Cards — 1 col → 2 col → 3 col → 5 col */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 items-start">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className={`relative rounded-2xl p-5 flex flex-col gap-5 transition-shadow duration-300 ${
                plan.highlighted
                  ? "border border-purple-400/40 shadow-xl shadow-purple-500/30 scale-[1.03]"
                  : "glass border border-white/10 hover:border-purple-500/30"
              }`}
              style={plan.highlighted ? {
                background: "linear-gradient(135deg, #4f1b8a 0%, #3b2070 30%, #1a3a6b 65%, #0e4d6e 100%)",
                backdropFilter: "blur(16px)",
              } : undefined}
            >
              {/* Most Popular badge */}
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white text-xs font-bold shadow-lg">
                    <Star size={10} fill="white" />
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan name + price */}
              <div>
                <div className="flex items-center gap-1.5 mb-2">
                  <Zap
                    size={14}
                    className={plan.highlighted ? "text-cyan-400" : "text-purple-400"}
                  />
                  <span className="text-xs font-semibold text-white/60 uppercase tracking-wider">
                    {plan.name}
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-end gap-0.5 mb-3">
                  <span className="text-3xl font-extrabold text-white leading-none">
                    <AnimatedCounter to={plan.priceNum} prefix="৳" duration={1.4} />
                  </span>
                  <span className="text-white/40 text-xs mb-0.5 ml-0.5">/month</span>
                </div>

                {/* Speed — old struck through + new bold */}
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-white/35 text-xs line-through">{plan.oldSpeed}</span>
                  <span className={`text-base font-extrabold ${plan.highlighted ? "text-cyan-300" : "text-cyan-400"}`}>
                    <AnimatedCounter to={plan.speedNum} suffix=" Mbps" duration={1.6} />
                  </span>
                </div>

                {/* Bonus speed note */}
                {plan.bonusNote ? (
                  <p className="text-purple-300/70 text-[11px] leading-snug mt-1">
                    ⚡ {plan.bonusNote}
                  </p>
                ) : (
                  <p className="text-white/35 text-[11px] leading-snug mt-1">
                    Upgraded from {plan.oldSpeed}
                  </p>
                )}
              </div>

              {/* Feature list */}
              <ul className="flex flex-col gap-2 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xs text-white/70">
                    <Check size={13} className="text-green-400 mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <MagneticButton className="w-full">
                <motion.a
                  href="#coverage"
                  tabIndex={0}
                  whileHover={{
                    scale: 1.04,
                    boxShadow: plan.highlighted
                      ? "0 0 28px rgba(168,85,247,0.55)"
                      : "0 0 16px rgba(168,85,247,0.25)",
                  }}
                  whileTap={{ scale: 0.97 }}
                  className={`block text-center py-2.5 rounded-full text-xs font-semibold transition-shadow duration-300 ${
                    plan.highlighted
                      ? "bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-lg shadow-purple-500/30"
                      : "border border-white/20 text-white hover:border-purple-400/50 hover:bg-white/5"
                  }`}
                >
                  Order Now
                </motion.a>
              </MagneticButton>
            </motion.div>
          ))}
        </div>
      </div>
      <SectionSeamGlow />
    </section>
  );
}
