"use client";

import { useCallback } from "react";
import { Particles, ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine, Container, ISourceOptions } from "@tsparticles/engine";

const CONFIG: ISourceOptions = {
  fullScreen: false,
  fpsLimit: 60,
  background: { color: { value: "transparent" } },
  particles: {
    number: {
      // 35 particles total — subtle, not a starfield
      value: 35,
      density: { enable: false },
    },
    color: {
      value: ["#ffffff", "#f5f3ff", "#e9d5ff", "#c084fc", "#a855f7", "#67e8f9"],
    },
    opacity: {
      // Lower ceiling — small particles stay faint
      value: { min: 0.08, max: 0.28 },
      animation: { enable: true, speed: 0.4, sync: false },
    },
    size: {
      value: { min: 1, max: 3.5 },
      animation: { enable: true, speed: 0.8, sync: false },
    },
    move: {
      enable: true,
      speed: { min: 0.18, max: 0.65 },
      direction: "none",
      random: true,
      straight: false,
      outModes: { default: "out" },
    },
    shape: { type: "circle" },
    links: { enable: false },
  },
  interactivity: {
    events: {
      onHover: { enable: false },
      onClick: { enable: false },
    },
  },
  detectRetina: true,
};

function Inner() {
  const onLoaded = useCallback(async (_c?: Container) => {}, []);
  return (
    <Particles
      id="hero-tsparticles"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        // Radial mask: transparent (no particles) in the center-left text zone,
        // fading to full opacity toward the right side and edges.
        // mask-image fades the CANVAS element itself — no particles paint in the masked-out area.
        maskImage:
          "radial-gradient(ellipse 55% 65% at 28% 45%, transparent 0%, transparent 30%, rgba(0,0,0,0.35) 52%, black 75%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 55% 65% at 28% 45%, transparent 0%, transparent 30%, rgba(0,0,0,0.35) 52%, black 75%)",
      }}
      options={CONFIG}
      particlesLoaded={onLoaded}
    />
  );
}

export default function ParticlesClient() {
  const init = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <ParticlesProvider init={init}>
      <Inner />
    </ParticlesProvider>
  );
}
