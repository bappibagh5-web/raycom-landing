"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import Splash      from "@/components/Splash";
import Particles   from "@/components/Particles";
import Navbar      from "@/components/Navbar";
import Hero        from "@/components/Hero";
import Pricing     from "@/components/Pricing";
import HowItWorks  from "@/components/HowItWorks";
import WhyChooseUs    from "@/components/WhyChooseUs";
import Infrastructure from "@/components/Infrastructure";
import Coverage       from "@/components/Coverage";
import Testimonials from "@/components/Testimonials";
import FAQ           from "@/components/FAQ";
import QuickServices from "@/components/QuickServices";
import CTABanner     from "@/components/CTABanner";
import Footer      from "@/components/Footer";

export default function Home() {
  // false  → splash is showing, hero animations are held
  // true   → splash has exited, hero is free to animate in
  const [splashDone, setSplashDone] = useState(false);

  return (
    <>
      {/* Splash sits outside <main> so it overlays everything via z-[200] */}
      <AnimatePresence>
        {!splashDone && (
          <Splash key="splash" onComplete={() => setSplashDone(true)} />
        )}
      </AnimatePresence>

      <main
        className="relative min-h-screen"
        style={{
          background: "linear-gradient(160deg, #0a0a1a 0%, #0f0a1f 40%, #1a1230 100%)",
        }}
      >
        <Particles />
        <Navbar />
        {/* ready prop gates hero entrance animations until splash has exited */}
        <Hero ready={splashDone} />
        <Pricing />
        <HowItWorks />
        <WhyChooseUs />
        <Infrastructure />
        <Coverage />
        <Testimonials />
        <FAQ />
        <QuickServices />
        <CTABanner />
        <Footer />
      </main>
    </>
  );
}
