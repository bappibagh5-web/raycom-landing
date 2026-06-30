"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, LayoutList, Wrench, Wifi } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";

const steps = [
  {
    num: "01",
    icon: MapPin,
    title: "Check Availability",
    desc: "Enter your area in our coverage checker to confirm we serve your location.",
    color: "from-purple-500 to-violet-500",
    glow: "rgba(139,92,246,0.25)",
  },
  {
    num: "02",
    icon: LayoutList,
    title: "Choose Your Plan",
    desc: "Pick the speed and package that fits your needs — no hidden fees, no contracts.",
    color: "from-violet-500 to-indigo-500",
    glow: "rgba(109,40,217,0.25)",
  },
  {
    num: "03",
    icon: Wrench,
    title: "We Install",
    desc: "Our technician visits your home and completes installation within 24 hours.",
    color: "from-indigo-500 to-cyan-500",
    glow: "rgba(99,102,241,0.25)",
  },
  {
    num: "04",
    icon: Wifi,
    title: "You're Online",
    desc: "Enjoy blazing-fast, reliable WiFi with 24/7 support whenever you need us.",
    color: "from-cyan-500 to-cyan-400",
    glow: "rgba(6,182,212,0.25)",
  },
];

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  // Separate ref for the connector line so it triggers a bit later
  const lineRef = useRef<HTMLDivElement>(null);
  const lineInView = useInView(lineRef, { once: true, margin: "-60px" });

  return (
    <section id="how-it-works" className="relative py-24 overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-purple-600/8 rounded-full blur-3xl" />
      </div>

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass border border-purple-500/30 text-purple-300 text-sm font-medium mb-4">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4">
            Get Connected in{" "}
            <span className="gradient-text">4 Easy Steps</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            From sign-up to surfing — here's how fast we get you online.
          </p>
        </motion.div>

        {/* ── Steps + connector ── */}
        <div ref={lineRef} className="relative">

          {/* Horizontal connector line — desktop only */}
          <div className="hidden lg:block absolute top-[52px] left-[calc(12.5%+28px)] right-[calc(12.5%+28px)] h-px bg-white/8 overflow-hidden">
            <motion.div
              className="h-full origin-left"
              style={{
                background: "linear-gradient(90deg, #9333ea, #06b6d4)",
              }}
              initial={{ scaleX: 0 }}
              animate={lineInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>

          {/* Vertical connector line — mobile only */}
          <div className="lg:hidden absolute top-[52px] bottom-[52px] left-[27px] w-px bg-white/8 overflow-hidden">
            <motion.div
              className="w-full origin-top"
              style={{
                background: "linear-gradient(180deg, #9333ea, #06b6d4)",
              }}
              initial={{ scaleY: 0 }}
              animate={lineInView ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>

          {/* Step cards */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 lg:gap-6">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 36 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.13 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="relative glass border border-white/10 hover:border-purple-500/30 rounded-2xl p-6 flex lg:flex-col gap-5 lg:gap-4 transition-all duration-300 hover:shadow-lg"
                  style={{
                    ["--glow" as string]: step.glow,
                  }}
                >
                  {/* Subtle card glow on hover via pseudo-element approximation */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ boxShadow: `0 0 32px ${step.glow}` }}
                  />

                  {/* Number badge + icon stacked together */}
                  <div className="relative shrink-0">
                    {/* Gradient circle */}
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}
                      style={{ boxShadow: `0 4px 20px ${step.glow}` }}
                    >
                      <Icon size={22} className="text-white" strokeWidth={2} />
                    </div>
                    {/* Step number badge */}
                    <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#0f0a1f] border border-white/20 text-[10px] font-bold text-white/60 flex items-center justify-center">
                      {i + 1}
                    </span>
                  </div>

                  {/* Text */}
                  <div>
                    <p className="text-[10px] font-bold text-white/25 tracking-[0.15em] uppercase mb-1">
                      {step.num}
                    </p>
                    <h3 className="text-white font-bold text-base mb-1.5 leading-snug">
                      {step.title}
                    </h3>
                    <p className="text-white/50 text-sm leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.75 }}
          className="flex justify-center mt-12"
        >
          <MagneticButton>
            <motion.a
              href="#coverage"
              whileHover={{ scale: 1.05, boxShadow: "0 0 32px rgba(168,85,247,0.55)" }}
              whileTap={{ scale: 0.97 }}
              className="block px-8 py-3.5 rounded-full font-semibold text-white bg-gradient-to-r from-purple-600 to-cyan-500 shadow-lg shadow-purple-500/25 transition-shadow duration-300"
            >
              Check Availability →
            </motion.a>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
