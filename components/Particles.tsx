"use client";

import dynamic from "next/dynamic";

// ssr: false keeps all tsparticles browser-only code out of the SSR bundle
// so Turbopack never tries to resolve its DOM APIs on the server
const ParticlesClient = dynamic(() => import("./ParticlesClient"), { ssr: false });

export default function Particles() {
  return <ParticlesClient />;
}
