"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const WA_URL =
  "https://wa.me/8801610001981?text=Hi%2C%20I%27m%20interested%20in%20RayComm%20broadband";

// Official WhatsApp logo path (simplified single-path mark)
function WhatsAppIcon({ size = 28 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      width={size}
      height={size}
      fill="white"
      aria-hidden
    >
      <path d="M16.003 2C8.28 2 2 8.28 2 16.003c0 2.47.648 4.786 1.776 6.8L2 30l7.397-1.736A13.94 13.94 0 0 0 16.003 30C23.72 30 30 23.72 30 16.003 30 8.28 23.72 2 16.003 2zm0 25.471a11.44 11.44 0 0 1-5.838-1.597l-.418-.249-4.33 1.016 1.037-4.22-.274-.433A11.435 11.435 0 0 1 4.53 16.003C4.53 9.677 9.677 4.53 16.003 4.53c6.325 0 11.468 5.147 11.468 11.473 0 6.325-5.143 11.468-11.468 11.468zm6.29-8.594c-.344-.172-2.038-1.006-2.354-1.12-.317-.115-.547-.172-.778.172-.23.344-.892 1.12-1.094 1.35-.2.23-.403.258-.747.086-.344-.172-1.453-.535-2.767-1.708-1.023-.912-1.713-2.038-1.914-2.382-.2-.344-.021-.53.15-.702.155-.155.344-.402.517-.603.172-.2.23-.344.344-.574.115-.23.057-.43-.029-.603-.086-.172-.778-1.874-1.065-2.566-.28-.672-.566-.581-.778-.592l-.661-.011c-.23 0-.603.086-.919.43-.316.344-1.207 1.179-1.207 2.876 0 1.697 1.236 3.336 1.408 3.566.172.23 2.431 3.71 5.889 5.203.823.355 1.464.567 1.965.726.825.263 1.578.226 2.172.137.663-.099 2.038-.833 2.325-1.638.287-.805.287-1.495.2-1.638-.085-.144-.315-.23-.659-.402z" />
    </svg>
  );
}

export default function WhatsAppButton() {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 150,        // above content (z-10), below splash (z-200)
        display: "flex",
        alignItems: "center",
        gap: 10,
        // Right-align: tooltip grows to the left
        flexDirection: "row-reverse",
      }}
    >
      {/* Main button */}
      <motion.a
        href={WA_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        // Continuous pulse on the shadow
        animate={{
          boxShadow: [
            "0 0 0px 0px rgba(37,211,102,0.0)",
            "0 0 16px 6px rgba(37,211,102,0.45)",
            "0 0 0px 0px rgba(37,211,102,0.0)",
          ],
        }}
        transition={{
          duration: 2.4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.95 }}
        style={{
          width: 56,
          height: 56,
          borderRadius: "50%",
          backgroundColor: "#25D366",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          cursor: "pointer",
          textDecoration: "none",
        }}
      >
        <WhatsAppIcon size={28} />
      </motion.a>

      {/* Tooltip — slides in from the right */}
      <AnimatePresence>
        {hovered && (
          <motion.span
            key="tooltip"
            initial={{ opacity: 0, x: 10, scale: 0.92 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.92 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{
              background: "rgba(15,10,31,0.85)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 10,
              padding: "7px 14px",
              color: "white",
              fontSize: 13,
              fontWeight: 600,
              whiteSpace: "nowrap",
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            💬 Chat with us
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
