"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Wifi } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";

export default function CTABanner() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-700 via-violet-600 to-cyan-600 p-12 sm:p-16 text-center"
        >
          {/* Decorative blobs inside banner */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

          {/* Grid pattern overlay */}
          <div className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />

          <div className="relative z-10 flex flex-col items-center gap-6">
            <div className="w-14 h-14 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center">
              <Wifi size={28} className="text-white" />
            </div>

            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-3">
                Ready for internet that
                <br />
                <span className="text-yellow-300">actually works?</span>
              </h2>
              <p className="text-white/70 text-lg max-w-xl mx-auto">
                Join thousands of happy customers. Get connected in as little as
                24 hours — no hidden fees, no contracts.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <MagneticButton>
                <motion.a
                  href="#coverage"
                  whileHover={{ scale: 1.05, boxShadow: "0 0 36px rgba(255,255,255,0.3)" }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-8 py-4 rounded-full bg-white text-purple-700 font-bold text-base shadow-xl transition-shadow duration-300"
                >
                  Check Availability
                  <ArrowRight size={18} />
                </motion.a>
              </MagneticButton>
              <MagneticButton>
                <motion.a
                  href="#plans"
                  whileHover={{ scale: 1.04, boxShadow: "0 0 20px rgba(255,255,255,0.15)" }}
                  whileTap={{ scale: 0.97 }}
                  className="block px-8 py-4 rounded-full border-2 border-white/40 text-white font-semibold text-base hover:bg-white/10 transition-all duration-300"
                >
                  View Plans
                </motion.a>
              </MagneticButton>
            </div>

            <p className="text-white/50 text-sm">
              ✓ No setup fees &nbsp;·&nbsp; ✓ Cancel anytime &nbsp;·&nbsp; ✓ 30-day money-back guarantee
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
