"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { CheckCircle, ChevronDown, MapPin } from "lucide-react";
import { coverageData } from "@/data/coverage-areas";
import SectionSeamGlow from "@/components/SectionSeamGlow";
import MagneticButton from "@/components/MagneticButton";

// ─── Reusable styled select ───────────────────────────────────────────────────

interface SelectProps {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  disabled: boolean;
  options: string[];
  onChange: (v: string) => void;
}

function GlassSelect({ id, label, placeholder, value, disabled, options, onChange }: SelectProps) {
  const active = !disabled;
  const hasValue = value !== "";

  return (
    <div className="flex flex-col gap-2 flex-1 min-w-0">
      {/* Label */}
      <label
        htmlFor={id}
        className={`text-[11px] font-bold uppercase tracking-[0.12em] px-1 transition-colors duration-200 ${
          disabled ? "text-white/20" : hasValue ? "text-cyan-400" : "text-white/45"
        }`}
      >
        {label}
      </label>

      {/* Select wrapper */}
      <div className="relative group">
        {/* Gradient border glow on focus/active — sits behind the select */}
        <div
          className={`absolute inset-0 rounded-xl transition-opacity duration-300 pointer-events-none ${
            active && hasValue ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background: "linear-gradient(135deg, rgba(168,85,247,0.5), rgba(6,182,212,0.4))",
            padding: 1,
            borderRadius: "0.75rem",
          }}
        />

        <select
          id={id}
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          className={`
            relative w-full appearance-none rounded-xl px-4 py-3.5 pr-10
            text-sm font-medium outline-none transition-all duration-200
            ${disabled
              ? "bg-white/[0.025] border border-white/[0.06] text-white/20 cursor-not-allowed"
              : hasValue
                ? "bg-white/[0.09] border border-purple-500/40 text-white cursor-pointer shadow-[0_0_18px_rgba(139,92,246,0.12)]"
                : "bg-white/[0.05] border border-white/10 text-white/60 cursor-pointer hover:border-purple-500/30 hover:bg-white/[0.07] focus:border-purple-500/60 focus:bg-white/[0.08] focus:shadow-[0_0_20px_rgba(139,92,246,0.18)]"
            }
          `}
          style={{ colorScheme: "dark" }}
        >
          <option value="" disabled className="bg-[#0f0a1f] text-white/40">
            {disabled ? placeholder : `Select ${label}`}
          </option>
          {options.map((opt) => (
            <option key={opt} value={opt} className="bg-[#0f0a1f] text-white py-2">
              {opt}
            </option>
          ))}
        </select>

        {/* Chevron */}
        <ChevronDown
          size={14}
          className={`absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-200 ${
            disabled ? "text-white/12" : hasValue ? "text-cyan-400/70" : "text-white/30"
          }`}
        />
      </div>
    </div>
  );
}

// ─── Step number badge ────────────────────────────────────────────────────────

function StepBadge({ n, done }: { n: number; done: boolean }) {
  return (
    <div
      className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 transition-all duration-300 ${
        done
          ? "bg-gradient-to-br from-purple-500 to-cyan-500 text-white shadow-[0_0_12px_rgba(139,92,246,0.5)]"
          : "border border-white/15 text-white/25 bg-white/5"
      }`}
    >
      {n}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function Coverage() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [district, setDistrict] = useState("");
  const [upazila,  setUpazila]  = useState("");
  const [union,    setUnion]    = useState("");
  const [area,     setArea]     = useState("");

  // ── Derived option lists ──────────────────────────────────────────────────

  const districtOptions  = coverageData.map((d) => d.name);
  const selectedDistrict = coverageData.find((d) => d.name === district);
  const upazilaOptions   = selectedDistrict?.upazilas.map((u) => u.name) ?? [];
  const selectedUpazila  = selectedDistrict?.upazilas.find((u) => u.name === upazila);
  const unionOptions     = selectedUpazila?.unions.map((u) => u.name) ?? [];
  const selectedUnion    = selectedUpazila?.unions.find((u) => u.name === union);
  const areaOptions      = selectedUnion?.areas.map((a) => a.name) ?? [];

  const hasFullCoverage = !!area;
  const coverageLabel   = area.startsWith("All areas in")
    ? `${union}, ${upazila}, ${district}`
    : `${area}, ${union}, ${upazila}, ${district}`;

  // ── Cascade reset handlers ────────────────────────────────────────────────

  function handleDistrict(v: string) { setDistrict(v); setUpazila(""); setUnion(""); setArea(""); }
  function handleUpazila(v: string)  { setUpazila(v);  setUnion(""); setArea(""); }
  function handleUnion(v: string)    { setUnion(v);    setArea(""); }

  // ─────────────────────────────────────────────────────────────────────────

  return (
    <section id="coverage" className="relative py-24">

      {/* Section-level ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-1/4 left-1/4 w-[480px] h-[280px] bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[240px] bg-purple-600/12 rounded-full blur-3xl" />
      </div>

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass border border-cyan-500/30 text-cyan-300 text-sm font-medium mb-4">
            Coverage Checker
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4">
            Are we in{" "}
            <span className="gradient-text">your area?</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Select your location step by step to instantly check if Ray
            Communications broadband is available at your address.
          </p>
        </motion.div>

        {/* ── Checker card ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.18 }}
          className="relative max-w-5xl mx-auto"
        >
          {/* Card ambient glow — sits outside the card, behind it */}
          <div
            className="absolute -inset-px rounded-[28px] opacity-60 pointer-events-none"
            style={{
              background: "linear-gradient(135deg, rgba(139,92,246,0.2) 0%, rgba(6,182,212,0.12) 100%)",
              filter: "blur(18px)",
            }}
          />

          {/* Gradient border ring */}
          <div
            className="absolute -inset-px rounded-[28px] pointer-events-none"
            style={{
              background: "linear-gradient(135deg, rgba(139,92,246,0.35) 0%, rgba(255,255,255,0.06) 50%, rgba(6,182,212,0.25) 100%)",
              WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
              padding: 1,
              borderRadius: 28,
            }}
          />

          {/* Card body */}
          <div
            className="relative rounded-[26px] p-6 sm:p-8 lg:p-10 overflow-hidden"
            style={{
              background: "rgba(10,8,28,0.55)",
              backdropFilter: "blur(24px)",
            }}
          >
            {/* Inner top-left glow */}
            <div className="absolute -top-12 -left-12 w-48 h-48 bg-purple-600/15 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

            {/* Header row */}
            <div className="relative flex items-center gap-3 mb-8">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{
                  background: "linear-gradient(135deg, rgba(139,92,246,0.3), rgba(6,182,212,0.2))",
                  border: "1px solid rgba(139,92,246,0.35)",
                  boxShadow: "0 0 16px rgba(139,92,246,0.2)",
                }}
              >
                <MapPin size={16} className="text-cyan-400" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Check your coverage</p>
                <p className="text-xs text-white/40 mt-0.5">4 quick steps — takes under 10 seconds</p>
              </div>

              {/* Step progress pills */}
              <div className="ml-auto hidden sm:flex items-center gap-1.5">
                <StepBadge n={1} done={!!district} />
                <div className={`w-4 h-px transition-colors duration-300 ${upazila ? "bg-gradient-to-r from-purple-500 to-cyan-500" : "bg-white/10"}`} />
                <StepBadge n={2} done={!!upazila} />
                <div className={`w-4 h-px transition-colors duration-300 ${union ? "bg-gradient-to-r from-purple-500 to-cyan-500" : "bg-white/10"}`} />
                <StepBadge n={3} done={!!union} />
                <div className={`w-4 h-px transition-colors duration-300 ${area ? "bg-gradient-to-r from-purple-500 to-cyan-500" : "bg-white/10"}`} />
                <StepBadge n={4} done={!!area} />
              </div>
            </div>

            {/* Divider */}
            <div className="relative h-px mb-7" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)" }} />

            {/* ── 4 cascading dropdowns ── */}
            <div className="relative flex flex-col sm:flex-row gap-4">
              <GlassSelect
                id="district"
                label="District"
                placeholder="Select District"
                value={district}
                disabled={false}
                options={districtOptions}
                onChange={handleDistrict}
              />
              <GlassSelect
                id="upazila"
                label="Upazila / Thana"
                placeholder="Select District first"
                value={upazila}
                disabled={!district}
                options={upazilaOptions}
                onChange={handleUpazila}
              />
              <GlassSelect
                id="union"
                label="Union"
                placeholder="Select Upazila first"
                value={union}
                disabled={!upazila}
                options={unionOptions}
                onChange={handleUnion}
              />
              <GlassSelect
                id="area"
                label="Village / Area"
                placeholder="Select Union first"
                value={area}
                disabled={!union}
                options={areaOptions}
                onChange={setArea}
              />
            </div>

            {/* ── Success banner ── */}
            <AnimatePresence>
              {hasFullCoverage && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 12, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="relative mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl px-5 py-4 overflow-hidden"
                  style={{
                    background: "rgba(16,185,129,0.07)",
                    backdropFilter: "blur(16px)",
                    border: "1px solid rgba(52,211,153,0.25)",
                    boxShadow: "0 0 32px rgba(16,185,129,0.12), inset 0 1px 0 rgba(52,211,153,0.15)",
                  }}
                >
                  {/* Inner green glow */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-12 bg-green-400/10 rounded-full blur-2xl pointer-events-none" />

                  <div className="relative flex items-start gap-3">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                      style={{
                        background: "rgba(16,185,129,0.15)",
                        border: "1px solid rgba(52,211,153,0.3)",
                        boxShadow: "0 0 12px rgba(16,185,129,0.25)",
                      }}
                    >
                      <CheckCircle size={18} className="text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-green-300">
                        Congratulations! We have coverage in your area.
                      </p>
                      <p className="text-xs text-white/45 mt-0.5">{coverageLabel}</p>
                    </div>
                  </div>

                  <MagneticButton className="relative shrink-0">
                    <motion.a
                      href="#plans"
                      whileHover={{ scale: 1.05, boxShadow: "0 0 28px rgba(168,85,247,0.55)" }}
                      whileTap={{ scale: 0.97 }}
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-cyan-500 shadow-lg shadow-purple-500/25 transition-shadow duration-300"
                    >
                      Connect Now →
                    </motion.a>
                  </MagneticButton>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Expansion note */}
            <p className="relative mt-6 text-center text-white/30 text-xs">
              Don&apos;t see your area listed?{" "}
              <a href="tel:01610001981" className="text-purple-300/60 hover:text-purple-300 transition-colors duration-200">
                Call us
              </a>{" "}
              — we&apos;re rapidly expanding to new areas.
            </p>
          </div>
        </motion.div>
      </div>

      <SectionSeamGlow />
    </section>
  );
}
