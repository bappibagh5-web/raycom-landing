"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Zap, ShieldCheck, HeadphonesIcon, Globe } from "lucide-react";
import AnimatedCounter from "@/components/AnimatedCounter";
import MagneticButton from "@/components/MagneticButton";
import SectionSeamGlow from "@/components/SectionSeamGlow";

const stats = [
  {
    icon: Zap,
    title: "Blazing Speed",
    value: "Up to 100 Mbps",
    counter: { to: 100, prefix: "Up to ", suffix: " Mbps" },
    desc: "Fibre-optic infrastructure delivering the fastest speeds in the region.",
    color: "from-yellow-500/20 to-orange-500/10",
    iconColor: "text-yellow-400",
  },
  {
    icon: ShieldCheck,
    title: "99.9% Uptime",
    value: "Always On",
    counter: null,
    desc: "Redundant network architecture with automatic failover keeps you connected.",
    color: "from-green-500/20 to-emerald-500/10",
    iconColor: "text-green-400",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    value: "Always Here",
    counter: null,
    desc: "Local support team available around the clock — real people, real answers.",
    color: "from-purple-500/20 to-violet-500/10",
    iconColor: "text-purple-400",
  },
  {
    icon: Globe,
    title: "Wide Coverage",
    value: "50+ Areas",
    counter: { to: 50, prefix: "", suffix: "+ Areas" },
    desc: "Expanding network coverage across urban and rural communities.",
    color: "from-cyan-500/20 to-blue-500/10",
    iconColor: "text-cyan-400",
  },
];

export default function WhyChooseUs() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="relative py-24" style={{ background: "linear-gradient(100deg, rgba(20,8,40,0.5) 0%, transparent 60%)" }}>
      {/* Background glow — left-anchored radial */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-[480px] h-[480px] -translate-y-1/2 -translate-x-1/4 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(139,92,246,0.14) 0%, rgba(109,40,217,0.07) 55%, transparent 75%)" }} />
        <div className="absolute top-1/3 left-1/3 w-48 h-48 bg-violet-500/6 rounded-full blur-2xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass border border-cyan-500/30 text-cyan-300 text-sm font-medium mb-4">
            Why Ray Communications
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4">
            Built for{" "}
            <span className="gradient-text">reliability</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            We obsess over uptime, speed, and support so you never have to think
            about your internet.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className={`relative rounded-2xl p-6 glass border border-white/10 hover:border-purple-500/30 bg-gradient-to-br ${stat.color} transition-all duration-300 hover:shadow-lg hover:shadow-purple-900/20`}
            >
              <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                <stat.icon size={22} className={stat.iconColor} />
              </div>
              <p className={`text-xl font-extrabold mb-1 ${stat.iconColor}`}>
                {stat.counter ? (
                  <AnimatedCounter
                    to={stat.counter.to}
                    prefix={stat.counter.prefix}
                    suffix={stat.counter.suffix}
                    duration={1.6}
                  />
                ) : (
                  stat.value
                )}
              </p>
              <h3 className="text-white font-semibold mb-2">{stat.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{stat.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA below cards */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex justify-center mt-12"
        >
          <MagneticButton>
            <motion.a
              href="#coverage"
              whileHover={{ scale: 1.05, boxShadow: "0 0 32px rgba(168,85,247,0.55)" }}
              whileTap={{ scale: 0.97 }}
              className="block px-8 py-3.5 rounded-full font-semibold text-white bg-gradient-to-r from-purple-600 to-cyan-500 shadow-lg shadow-purple-500/25 transition-shadow duration-300"
            >
              Check Your Area
            </motion.a>
          </MagneticButton>
        </motion.div>
      </div>
      <SectionSeamGlow />
    </section>
  );
}
