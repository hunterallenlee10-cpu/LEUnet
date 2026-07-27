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
      className="relative overflow-hidden bg-black"
      style={{ 
        minHeight: "calc(100vh - 80px)",
        height: "calc(100vh - 80px)",
      }}
    >
      {/* Animated background layers - Black and gold brand palette */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
        {/* Base dark gradient - deep navy and black */}
        <div className="absolute inset-0 bg-black" />

        {/* Deep navy gradient base layer - adds depth without color distraction */}
        <div 
          className="absolute inset-0 blur-2xl opacity-50"
          style={{
            background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.4) 0%, rgba(10, 40, 70, 0.2) 50%, transparent 100%)',
            animation: 'hero-base-drift 20s ease-in-out infinite'
          }}
        />

        {/* Top-right - Dark electric blue glow (atmospheric) */}
        <div 
          className="absolute blur-3xl"
          style={{
            right: "-10%",
            top: "5%",
            width: "700px",
            height: "700px",
            background: 'radial-gradient(ellipse at center, rgba(30, 58, 138, 0.25) 0%, rgba(15, 40, 90, 0.1) 30%, transparent 70%)',
            animation: 'hero-glow-blue-1 16s ease-in-out infinite',
            willChange: 'transform'
          }}
        />

        {/* Bottom-right - Subtle teal accent (minimal, atmospheric) */}
        <div 
          className="absolute blur-3xl"
          style={{
            right: "-5%",
            bottom: "-15%",
            width: "650px",
            height: "650px",
            background: 'radial-gradient(ellipse at center, rgba(13, 110, 110, 0.12) 0%, rgba(6, 80, 90, 0.05) 35%, transparent 70%)',
            animation: 'hero-glow-cyan 18s ease-in-out infinite',
            willChange: 'transform'
          }}
        />

        {/* Left-center - Subtle dark blue (replacing purple) */}
        <div 
          className="absolute blur-3xl"
          style={{
            left: "-15%",
            top: "20%",
            width: "600px",
            height: "600px",
            background: 'radial-gradient(ellipse at center, rgba(20, 50, 110, 0.12) 0%, rgba(10, 30, 70, 0.05) 40%, transparent 70%)',
            animation: 'hero-glow-purple 19s ease-in-out infinite',
            willChange: 'transform'
          }}
        />

        {/* Center-right - Warm gold glow near logo (brand highlight) */}
        <div 
          className="absolute blur-3xl"
          style={{
            right: "15%",
            top: "50%",
            transform: 'translateY(-50%)',
            width: "700px",
            height: "700px",
            background: 'radial-gradient(ellipse at center, rgba(217, 119, 6, 0.15) 0%, rgba(180, 83, 9, 0.08) 40%, transparent 75%)',
            animation: 'hero-glow-electric 14s ease-in-out infinite',
            willChange: 'transform'
          }}
        />

        {/* Bottom-left - Very subtle teal (minimal atmospheric accent) */}
        <div 
          className="absolute blur-3xl"
          style={{
            left: "5%",
            bottom: "-5%",
            width: "500px",
            height: "500px",
            background: 'radial-gradient(ellipse at center, rgba(10, 90, 100, 0.08) 0%, rgba(5, 60, 70, 0.02) 40%, transparent 70%)',
            animation: 'hero-glow-cyan-accent 22s ease-in-out infinite reverse',
            willChange: 'transform'
          }}
        />

        {/* Center subtle wave - minimal navy accent */}
        <div 
          className="absolute blur-2xl"
          style={{
            left: "50%",
            top: "40%",
            transform: 'translateX(-50%)',
            width: "800px",
            height: "400px",
            background: 'radial-gradient(ellipse at center, rgba(20, 50, 100, 0.06) 0%, transparent 70%)',
            animation: 'hero-wave-pulse 8s ease-in-out infinite',
            willChange: 'transform'
          }}
        />
      </div>

      {/* Content Container */}
      <div 
        className="relative flex flex-col justify-center h-full"
        style={{ zIndex: 1 }}
      >
        <div 
          className="mx-auto w-full flex items-center justify-center px-6 sm:px-8 lg:px-0"
          style={{
            maxWidth: "min(1440px, calc(100% - 64px))",
            width: "100%",
          }}
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
                  className="text-white font-bold leading-tight tracking-tight"
                  style={{
                    fontSize: "clamp(48px, 4.5vw, 76px)",
                  }}
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
                  onClick={() => handleCTA(sectionIds.ventureSnapshot)}
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
                  {/* Pulsing logo glow */}
                  <div
                    className="absolute rounded-full blur-3xl"
                    style={{
                      width: "100%",
                      height: "100%",
                      background: 'radial-gradient(ellipse at center, rgba(251, 191, 36, 0.25) 0%, rgba(212, 175, 55, 0.08) 50%, transparent 80%)',
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

      {/* Scroll Indicator - Bottom */}
      <div 
        className="absolute left-1/2 transform -translate-x-1/2 z-20 pointer-events-none"
        style={{ 
          bottom: "24px",
          animation: 'bounce 2s infinite',
        }}
      >
        <div className="flex flex-col items-center gap-2">
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
