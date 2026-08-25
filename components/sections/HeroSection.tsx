"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { smoothScrollToElement } from "@/lib/scrollUtils";
import { companyInfo } from "@/data/company";
import { sectionIds } from "@/data/navigation";
import { GlassCardPadded } from "@/components/cards/GlassCard";

export function HeroSection() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCTA = (sectionId: string) => {
    smoothScrollToElement(sectionId, { focus: true });

    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `#${sectionId}`);
    }
  };

  return (
    <section
      id={sectionIds.hero}
      // Below lg the height is a floor, not a lock: the stacked mobile content
      // is taller than a phone viewport, and a fixed height left the bottom
      // button underneath the scroll cue.
      className="relative overflow-hidden bg-black min-h-[calc(100vh-80px)] lg:h-[calc(100vh-80px)]"
    >
      {/* Animated background — "Aurora Veil". Two counter-rotating masked
          gradients over a warm pool, then grain and a scrim that keeps the
          logo column dark. Geometry, palette and the reasoning behind each
          layer live with the styles in app/globals.css. */}
      <div className="leu-hero-bg" aria-hidden="true">
        <div className="leu-veil leu-veil--a" />
        <div className="leu-veil leu-veil--b" />
        <div className="leu-horizon" />
        <div className="leu-grain" />
        <div className="leu-scrim" />
      </div>

      {/* Content Container. On phones the wrapper carries the viewport-height
          minimum itself so the copy still centres when it is shorter than the
          screen, and the bottom padding reserves the band the absolutely
          positioned scroll cue occupies. */}
      <div
        className="relative flex flex-col justify-center min-h-[calc(100vh-80px)] pt-20 pb-28 lg:min-h-0 lg:h-full lg:pt-0 lg:pb-0"
        style={{ zIndex: 1 }}
      >
        <div
          className="mx-auto w-full flex items-center justify-center px-6 sm:px-8 lg:px-0 lg:max-w-[min(1440px,calc(100%-64px))]"
        >
          {/* Two Column Layout */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left Column - 52% */}
            <div className="w-full space-y-6 md:space-y-8">
              {/* Eyebrow */}
              <div className="flex items-center gap-3 w-fit">
                <div className="relative w-10 h-10">
                  <Image
                    src={companyInfo.logo}
                    alt={companyInfo.logoAlt}
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-amber-400 tracking-widest uppercase">
                  Lee Enterprises
                </span>
              </div>

              {/* Headline */}
              <div className="space-y-3">
                <h1
                  // The clamp only applies from lg up; its 48px floor was the
                  // mobile size too, which is outsized on a phone column.
                  className="text-white font-bold leading-tight tracking-tight text-[40px] sm:text-[44px] lg:text-[clamp(48px,4.5vw,76px)]"
                >
                  {companyInfo.heroTitle}
                </h1>

                {/* Gold Subheading */}
                <p 
                  className="font-semibold text-amber-400 leading-tight"
                  style={{
                    fontSize: "clamp(22px, 2vw, 32px)",
                  }}
                >
                  {companyInfo.heroSubtitle}
                </p>
              </div>

              {/* Description */}
              <p 
                className="text-neutral-300 leading-relaxed max-w-xl"
                style={{
                  fontSize: "clamp(17px, 1.1vw, 20px)",
                }}
              >
                {companyInfo.heroDescription}
              </p>

              {/* Statistic Cards - Horizontal Row */}
              <div className="grid grid-cols-3 gap-4 pt-2" style={{ maxWidth: "620px" }}>
                <GlassCardPadded size="sm">
                  <div className="text-center">
                    <p className="text-2xl sm:text-3xl font-bold text-amber-400">1</p>
                    <p className="text-xs sm:text-sm text-neutral-300 mt-2 leading-snug">
                      Unified Vision
                    </p>
                  </div>
                </GlassCardPadded>
                <GlassCardPadded size="sm">
                  <div className="text-center">
                    <p className="text-2xl sm:text-3xl font-bold text-amber-400">100%</p>
                    <p className="text-xs sm:text-sm text-neutral-300 mt-2 leading-snug">
                      Results Focused
                    </p>
                  </div>
                </GlassCardPadded>
                <GlassCardPadded size="sm">
                  <div className="text-center">
                    <p className="text-2xl sm:text-3xl font-bold text-amber-400">∞</p>
                    <p className="text-xs sm:text-sm text-neutral-300 mt-2 leading-snug">
                      Growth Potential
                    </p>
                  </div>
                </GlassCardPadded>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={() => handleCTA(sectionIds.contact)}
                  className="btn-primary flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleCTA(sectionIds.portfolio)}
                  className="btn-secondary flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  Explore Ventures
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Column - 48% - Logo */}
            <div className="w-full flex items-center justify-center hidden lg:flex">
              <div
                className="relative"
                style={{
                  width: "clamp(360px, 38vw, 600px)",
                  maxWidth: "100%",
                  aspectRatio: "1",
                  transform: `translateY(${scrollY * 0.1}px)`,
                }}
              >
                {/* Logo Glow Layers */}
                <div className="absolute inset-0 -z-10 flex items-center justify-center">
                  {/* Pulsing logo glow. Centred on the artwork rather than on
                      the box: the mark's drawn area sits at 55%/49% of the
                      square PNG, so a glow centred at 50%/50% reads as offset
                      from its own logo. */}
                  <div
                    className="absolute rounded-full blur-3xl"
                    style={{
                      width: "100%",
                      height: "100%",
                      background: 'radial-gradient(ellipse at 55% 49%, rgba(251, 191, 36, 0.25) 0%, rgba(212, 175, 55, 0.08) 50%, transparent 80%)',
                      animation: 'hero-logo-pulse 6s ease-in-out infinite',
                      willChange: 'transform',
                    }}
                  />
                </div>

                {/* Main Logo */}
                <Image
                  src={companyInfo.logo}
                  alt={companyInfo.logoAlt}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Bottom. The bounce lives on the inner div: the
          keyframes animate `transform`, which on the outer div would override
          the -translate-x-1/2 that centres the cue. */}
      <div
        className="absolute left-1/2 transform -translate-x-1/2 z-20 pointer-events-none"
        style={{
          bottom: "24px",
        }}
      >
        <div
          className="flex flex-col items-center gap-2"
          style={{ animation: 'bounce 2s infinite' }}
        >
          <p className="text-xs sm:text-sm text-neutral-400 font-medium">Scroll to explore</p>
          <div className="w-6 h-10 border-2 border-amber-400/60 rounded-full flex justify-center">
            <div 
              className="w-1 h-2 bg-amber-400 rounded-full mt-2"
              style={{
                animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
