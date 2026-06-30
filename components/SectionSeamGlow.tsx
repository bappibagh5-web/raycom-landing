/**
 * A thin, soft gradient glow strip centred on the bottom edge of its parent
 * section. translateY(50%) lets it bleed equally into both sections so the
 * seam feels lit rather than cut.
 *
 * Usage: place as the last child inside a `relative` section element.
 * The parent section must have `position: relative` (or `className="relative"`).
 */
export default function SectionSeamGlow() {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%) translateY(50%)",
        width: "80%",
        maxWidth: 900,
        height: 120,
        background:
          "radial-gradient(ellipse 100% 100% at 50% 100%, rgba(139,92,246,0.18) 0%, rgba(6,182,212,0.10) 45%, transparent 72%)",
        filter: "blur(18px)",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}
