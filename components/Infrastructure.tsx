"use client";

// PLACEHOLDER IMAGES — replace with real photos of our technicians and
// infrastructure in /public/gallery/ once available.
// Current source: picsum.photos (free, no-auth placeholder service).
// To swap: change `src` on each item in the `gallery` array below to
// a relative path like "/gallery/fiber-install.jpg".

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const gallery = [
  {
    src: "https://picsum.photos/seed/fiber-network/800/540",
    caption: "Fiber Network Installation",
    // desktop: spans 2 columns, standard height
    grid: "md:col-span-2",
    aspect: "aspect-[4/3]",
  },
  {
    src: "https://picsum.photos/seed/server-rack/540/720",
    caption: "Network Operations Center",
    // desktop: spans 1 column, 2 rows tall (portrait)
    grid: "md:col-span-1 md:row-span-2",
    aspect: "aspect-[3/4] md:aspect-auto md:h-full",
  },
  {
    src: "https://picsum.photos/seed/cable-install/540/540",
    caption: "Cable Installation",
    // desktop: 1 column, square
    grid: "md:col-span-1",
    aspect: "aspect-square",
  },
  {
    src: "https://picsum.photos/seed/field-tech/540/540",
    caption: "Field Technician Team",
    // desktop: 1 column, square
    grid: "md:col-span-1",
    aspect: "aspect-square",
  },
  {
    src: "https://picsum.photos/seed/network-monitor/1200/480",
    caption: "Live Network Monitoring",
    // desktop: full 3 columns, cinematic banner
    grid: "md:col-span-3",
    aspect: "aspect-[5/2]",
  },
];

// Stagger delays per item (matches visual read order)
const delays = [0, 0.08, 0.16, 0.24, 0.34];

export default function Infrastructure() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="infrastructure" className="relative py-24 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-64 bg-cyan-500/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-80 h-56 bg-purple-600/8 rounded-full blur-3xl" />
      </div>

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass border border-cyan-500/30 text-cyan-300 text-sm font-medium mb-4">
            Behind the Scenes
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4">
            Built on{" "}
            <span className="gradient-text">Real Infrastructure</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Take a look at the network and team powering your connection.
          </p>
        </motion.div>

        {/* ── Masonry-style grid ──
            Mobile:  1 column, all stacked
            Tablet:  2 columns auto
            Desktop: explicit 3-col grid with row/col spanning
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:grid-rows-[auto_auto_auto]">
          {gallery.map((item, i) => (
            <motion.div
              key={item.caption}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: delays[i] }}
              className={`group relative overflow-hidden rounded-2xl border border-white/10 ${item.grid} ${item.aspect}`}
            >
              {/* Image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.src}
                alt={item.caption}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                loading="lazy"
              />

              {/* Dark base tint so images don't blow out on the dark page */}
              <div className="absolute inset-0 bg-[#0a0a1a]/30" />

              {/* Hover caption overlay — slides up from the bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a]/90 via-[#0a0a1a]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-5">
                <motion.div
                  initial={false}
                  className="translate-y-3 group-hover:translate-y-0 transition-transform duration-400"
                >
                  <p className="text-white font-semibold text-sm leading-snug">
                    {item.caption}
                  </p>
                  <div className="mt-1.5 h-0.5 w-8 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500" />
                </motion.div>
              </div>

              {/* Always-visible subtle bottom gradient for legibility */}
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
