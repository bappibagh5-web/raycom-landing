"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Tv, Server } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";
import SectionSeamGlow from "@/components/SectionSeamGlow";

const services = [
  {
    icon: Tv,
    title: "IPTV Streaming",
    desc: "Enjoy smooth and high-quality IPTV streaming directly from Ray Communications.",
    cta: "Watch IPTV Now",
    href: "http://172.20.102.2/",
    // Accent palette
    spotlightColor: "rgba(139,92,246,0.22)",
    borderFrom: "#9333ea",
    borderTo: "#06b6d4",
    iconGlow: "rgba(139,92,246,0.45)",
    iconBg: "from-purple-600/30 to-violet-600/20",
    iconBorder: "rgba(139,92,246,0.4)",
    iconColor: "text-purple-300",
    hoverGlow: "rgba(139,92,246,0.3)",
  },
  {
    icon: Server,
    title: "FTP Server",
    desc: "Access your FTP server for file management and transfers.",
    cta: "Access FTP Server",
    href: "http://172.16.50.4/",
    // Accent palette (flipped gradient direction for variety)
    spotlightColor: "rgba(6,182,212,0.20)",
    borderFrom: "#06b6d4",
    borderTo: "#9333ea",
    iconGlow: "rgba(6,182,212,0.45)",
    iconBg: "from-cyan-600/30 to-blue-600/20",
    iconBorder: "rgba(6,182,212,0.4)",
    iconColor: "text-cyan-300",
    hoverGlow: "rgba(6,182,212,0.28)",
  },
];

export default function QuickServices() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="services" className="relative py-24">
      {/* Section ambient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[320px] bg-purple-600/8 rounded-full blur-3xl" />
      </div>

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass border border-purple-500/30 text-purple-300 text-sm font-medium mb-4">
            Quick Access
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4">
            Quick{" "}
            <span className="gradient-text">Services</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Direct access to your IPTV and file services — no extra steps.
          </p>
        </motion.div>

        {/* 2-card grid — centred, max-width capped so they don't stretch awkwardly */}
        <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
          {services.map((svc, i) => {
            const Icon = svc.icon;
            return (
              <motion.div
                key={svc.title}
                initial={{ opacity: 0, y: 44 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: i * 0.14 }}
                whileHover={{ y: -8, transition: { duration: 0.25, ease: "easeOut" } }}
                className="group relative flex flex-col gap-7 rounded-3xl p-8 overflow-hidden cursor-default"
                style={{
                  background: "rgba(10,8,28,0.6)",
                  backdropFilter: "blur(20px)",
                }}
              >
                {/* ── Animated gradient border ── */}
                {/* Outer glow ring (blurred, sits outside card) */}
                <div
                  className="absolute -inset-px rounded-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `linear-gradient(135deg, ${svc.borderFrom}, ${svc.borderTo})`,
                    filter: "blur(10px)",
                  }}
                />
                {/* Sharp 1px gradient border */}
                <div
                  className="absolute inset-0 rounded-3xl pointer-events-none"
                  style={{
                    padding: 1,
                    background: `linear-gradient(135deg, ${svc.borderFrom}88, ${svc.borderTo}55)`,
                    WebkitMask:
                      "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                    borderRadius: "inherit",
                    transition: "opacity 0.4s",
                  }}
                />

                {/* ── Inner spotlight — radial behind icon ── */}
                <div
                  className="absolute -top-16 -left-8 w-64 h-64 rounded-full pointer-events-none transition-opacity duration-500 opacity-60 group-hover:opacity-90"
                  style={{
                    background: `radial-gradient(circle, ${svc.spotlightColor} 0%, transparent 70%)`,
                    filter: "blur(8px)",
                  }}
                />

                {/* ── Hover inner overlay ── */}
                <div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse 80% 60% at 30% 20%, ${svc.hoverGlow} 0%, transparent 65%)`,
                  }}
                />

                {/* ── Icon badge ── */}
                <div className="relative self-start">
                  {/* Blurred glow behind icon */}
                  <div
                    className="absolute inset-0 rounded-2xl blur-xl transition-all duration-500 group-hover:blur-2xl group-hover:scale-150"
                    style={{ background: svc.iconGlow, opacity: 0.7 }}
                  />
                  <div
                    className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${svc.iconBg} flex items-center justify-center`}
                    style={{
                      border: `1px solid ${svc.iconBorder}`,
                      boxShadow: `0 0 20px ${svc.iconGlow}`,
                    }}
                  >
                    <Icon size={30} className={svc.iconColor} strokeWidth={1.75} />
                  </div>
                </div>

                {/* ── Text ── */}
                <div className="relative flex-1">
                  <h3 className="text-white font-extrabold text-xl mb-3 leading-snug">
                    {svc.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed">
                    {svc.desc}
                  </p>
                </div>

                {/* ── CTA ── */}
                <div className="relative">
                  <MagneticButton className="w-full">
                    <motion.a
                      href={svc.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{
                        scale: 1.04,
                        boxShadow: "0 0 28px rgba(168,85,247,0.55)",
                      }}
                      whileTap={{ scale: 0.97 }}
                      className="block text-center py-3.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-cyan-500 shadow-lg shadow-purple-500/30 transition-shadow duration-300"
                    >
                      {svc.cta}
                    </motion.a>
                  </MagneticButton>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
      <SectionSeamGlow />
    </section>
  );
}
