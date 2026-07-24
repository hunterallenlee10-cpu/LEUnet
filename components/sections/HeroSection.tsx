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
      className="relative min-h-screen pt-24 pb-16 md:pb-32 overflow-hidden bg-neutral-950"
    >
      {/* Animated background */}
      <div className="hero-animated-bg">
        <div className="hero-gradient-base" />
        <div className="hero-gradient-blob-1" />
        <div className="hero-gradient-blob-2" />
        <div className="hero-gradient-blob-3" />
      </div>

      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div
            className="space-y-6 md:space-y-8 z-10"
            style={{
              transform: `translateY(${scrollY * 0.3}px)`,
            }}
          >
            {/* Logo mini */}
            <div className="flex items-center gap-3 w-fit">
              <div className="relative w-10 h-10">
                <Image
                  src={companyInfo.logo}
                  alt={companyInfo.logoAlt}
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-sm font-semibold text-amber-400 tracking-widest uppercase">
                Lee Enterprises
              </span>
            </div>

            {/* Main heading */}
            <div className="space-y-4">
              <h1 className="heading-xl text-white">
                {companyInfo.heroTitle}
              </h1>
              <p className="text-xl md:text-2xl font-semibold text-amber-400 leading-tight">
                {companyInfo.heroSubtitle}
              </p>
            </div>

            {/* Description */}
            <p className="text-lg text-neutral-300 leading-relaxed max-w-xl">
              {companyInfo.heroDescription}
            </p>

            {/* Value Props */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <GlassCardPadded size="sm">
                <div className="text-center">
                  <p className="text-3xl font-bold text-amber-400">4</p>
                  <p className="text-sm text-neutral-300 mt-2">
                    Distinct Ventures
                  </p>
                </div>
              </GlassCardPadded>
              <GlassCardPadded size="sm">
                <div className="text-center">
                  <p className="text-3xl font-bold text-amber-400">100%</p>
                  <p className="text-sm text-neutral-300 mt-2">
                    Results Focused
                  </p>
                </div>
              </GlassCardPadded>
              <GlassCardPadded size="sm">
                <div className="text-center">
                  <p className="text-3xl font-bold text-amber-400">∞</p>
                  <p className="text-sm text-neutral-300 mt-2">
                    Growth Potential
                  </p>
                </div>
              </GlassCardPadded>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={() => handleCTA(sectionIds.contact)}
                className="btn-primary flex items-center justify-center gap-2"
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleCTA(sectionIds.ventureSnapshot)}
                className="btn-secondary flex items-center justify-center gap-2"
              >
                Explore Ventures
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Side - Logo Animation */}
          <div className="relative h-96 md:h-full flex items-center justify-center">
            <div
              className="relative w-full h-full max-w-md"
              style={{
                transform: `translateY(${scrollY * 0.1}px) scale(${1 + scrollY * 0.0005})`,
              }}
            >
              {/* Floating gradient orbs */}
              <div className="absolute inset-0 -z-10">
                <div className="absolute top-20 right-20 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-20 left-10 w-48 h-48 bg-amber-400/5 rounded-full blur-3xl" />
              </div>

              {/* Main Logo */}
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="w-80 h-80 relative">
                  <Image
                    src={companyInfo.logo}
                    alt={companyInfo.logoAlt}
                    fill
                    className="object-contain filter drop-shadow-2xl"
                    priority
                  />
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-10 right-10 w-20 h-20 border-2 border-amber-400/30 rounded-lg animate-bounce" />
              <div className="absolute bottom-10 left-10 w-20 h-20 border-2 border-amber-400/20 rounded-full opacity-50" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <div className="flex flex-col items-center gap-2">
          <p className="text-sm text-neutral-400">Scroll to explore</p>
          <div className="w-6 h-10 border-2 border-amber-400/50 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-amber-400 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}
