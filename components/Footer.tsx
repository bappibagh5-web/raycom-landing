"use client";

import { motion } from "framer-motion";
import {
  Wifi,
  Globe,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const socials = [
  {
    icon: Globe,
    label: "Facebook",
    href: "#",
    color: "hover:border-blue-400/50 hover:text-blue-400",
  },
  {
    icon: MessageCircle,   // WhatsApp (lucide has no brand icon — MessageCircle is closest)
    label: "WhatsApp",
    href: "https://wa.me/8801610001981",
    color: "hover:border-green-400/50 hover:text-green-400",
  },
  {
    icon: Phone,
    label: "Call us",
    href: "tel:01610001981",
    color: "hover:border-purple-400/50 hover:text-purple-400",
  },
  {
    icon: Mail,
    label: "Email us",
    href: "mailto:info@raybd.net",
    color: "hover:border-cyan-400/50 hover:text-cyan-400",
  },
];

const navColumns = [
  {
    heading: "Services",
    links: [
      { label: "Home Broadband",  href: "#plans"       },
      { label: "IPTV Streaming",  href: "#services"    },
      { label: "FTP Server",      href: "#services"    },
      { label: "Coverage Areas",  href: "#coverage"    },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us",    href: "#"     },
      { label: "Contact Us",  href: "#faq"  },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "Help Centre",     href: "#faq"                            },
      { label: "Contact Us",      href: "https://wa.me/8801610001981"     },
      { label: "Network Status",  href: "#"                               },
    ],
  },
  {
    // LEGAL PAGES — Privacy Policy and Terms of Service pages need to be
    // created at /privacy and /terms before these links go live.
    heading: "Legal",
    links: [
      { label: "Privacy Policy",    href: "#" },
      { label: "Terms of Service",  href: "#" },
    ],
  },
];

// ─── Sub-components ────────────────────────────────────────────────────────────

function ContactLine({
  icon: Icon,
  children,
}: {
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-2.5 text-sm text-white/45">
      <Icon size={14} className="text-purple-400/70 shrink-0 mt-0.5" />
      <span className="leading-relaxed">{children}</span>
    </div>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

export default function Footer() {
  return (
    <footer className="relative border-t border-white/8 mt-10">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#1a1230]/70 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">

        {/* ── Main grid ──────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-10 mb-12">

          {/* 1. Brand column — spans 2 of 7 cols on desktop */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-purple-500/25">
                <Wifi size={17} className="text-white" />
              </div>
              <span className="text-white font-bold text-lg tracking-tight">
                Ray<span className="gradient-text">Comm</span>
              </span>
            </div>

            {/* Tagline */}
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              Ultra-fast, ultra-reliable broadband for homes and businesses
              across the region.
            </p>

            {/* Social icon row */}
            <div className="flex gap-2">
              {socials.map(({ icon: Icon, label, href, color }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.92 }}
                  className={`w-8 h-8 rounded-lg glass border border-white/10 flex items-center justify-center text-white/45 transition-all duration-200 ${color}`}
                >
                  <Icon size={14} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* 2–5. Nav link columns — each spans 1 of 7 cols */}
          {navColumns.map((col) => (
            <div key={col.heading} className="flex flex-col gap-3">
              <h4 className="text-white text-sm font-semibold tracking-wide">
                {col.heading}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {col.links.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="text-white/38 text-sm hover:text-purple-300 transition-colors duration-200"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* 6. Get In Touch — spans 2 of 7 cols on desktop */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h4 className="gradient-text text-sm font-bold tracking-wide">
              Get In Touch
            </h4>

            <p className="text-white/70 text-sm font-semibold">
              Ray Communications (Head Office)
            </p>

            <div className="flex flex-col gap-3">
              {/* Address */}
              <ContactLine icon={MapPin}>
                1 No College Road, Bagachara Bazar,<br />
                Sharsha, Jashore.
              </ContactLine>

              {/* Head office phone numbers */}
              <ContactLine icon={Phone}>
                <a href="tel:01978001967" className="hover:text-purple-300 transition-colors duration-200">
                  01978001967
                </a>
                {" | "}
                <a href="tel:01735007767" className="hover:text-purple-300 transition-colors duration-200">
                  01735007767
                </a>
              </ContactLine>

              {/* Email */}
              <ContactLine icon={Mail}>
                <a href="mailto:info@raybd.net" className="hover:text-cyan-300 transition-colors duration-200">
                  info@raybd.net
                </a>
              </ContactLine>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ─────────────────────────────────────────────────────── */}
        <div
          className="border-t border-white/8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
        >
          <p className="text-white/30 text-sm">
            © 2026 RayComm. All rights reserved.
          </p>
          {/* Support line — clearly distinct from head office numbers above */}
          <p className="text-white/30 text-sm">
            Support:{" "}
            <a
              href="tel:01610001981"
              className="text-purple-300/70 hover:text-purple-300 transition-colors duration-200"
            >
              01610001981
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
