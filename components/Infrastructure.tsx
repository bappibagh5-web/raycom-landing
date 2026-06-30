"use client";

// PLACEHOLDER IMAGES — replace with real photos in /public/gallery/ once available.
// To swap: change `src` on each item below to a relative path like "/gallery/fiber-install.jpg".

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionSeamGlow from "@/components/SectionSeamGlow";

const gallery = [
  {
    src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop",
    caption: "Fiber Optic Cabling",
  },
  {
    src: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&h=400&fit=crop",
    caption: "Network Server Room",
  },
  {
    src: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=600&h=400&fit=crop",
    caption: "Field Technician Install",
  },
  {
    src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop",
    caption: "Network Operations Center",
  },
  {
    src: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=600&h=400&fit=crop",
    caption: "Router & Equipment Setup",
  },
  {
    src: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=600&h=400&fit=crop",
    caption: "Live Network Monitoring",
  },
];

export default function Infrastructure() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="infrastructure" className="relative py-16 overflow-hidden" style={{ background: "linear-gradient(180deg, rgba(5,4,14,0.6) 0%, rgba(8,5,18,0.7) 50%, rgba(5,4,14,0.6) 100%)" }}>
      {/* Ambient — muted so images pop */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-64 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-80 h-56 bg-purple-600/5 rounded-full blur-3xl" />
      </div>

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass border border-cyan-500/30 text-cyan-300 text-sm font-medium mb-4">
            Behind the Scenes
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
            Built on{" "}
            <span className="gradient-text">Real Infrastructure</span>
          </h2>
          <p className="text-white/50 text-base max-w-lg mx-auto">
            The network and team powering your connection.
          </p>
        </motion.div>

        {/* 3 × 2 uniform grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {gallery.map((item, i) => (
            <motion.div
              key={item.caption}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.07 }}
              className="group relative aspect-video overflow-hidden rounded-xl border border-white/10"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.src}
                alt={item.caption}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                loading="lazy"
              />

              {/* Dark base tint */}
              <div className="absolute inset-0 bg-[#0a0a1a]/25" />

              {/* Hover caption */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a]/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                <div className="translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white font-semibold text-xs leading-snug">
                    {item.caption}
                  </p>
                  <div className="mt-1 h-0.5 w-6 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <SectionSeamGlow />
    </section>
  );
}
