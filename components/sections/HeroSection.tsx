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
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isTouch) return;
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleTouchStart = () => {
      setIsTouch(true);
      setMousePos({ x: 0, y: 0 });
    };

    const handleTouchEnd = () => {
      setIsTouch(false);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isTouch]);

  const handleCTA = (sectionId: string) => {
    smoothScrollToElement(sectionId, { focus: true });

    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `#${sectionId}`);
    }
  };

  // Calculate parallax offset based on mouse position
  const parallaxX = !isTouch ? (mousePos.x - window.innerWidth / 2) * 0.01 : 0;
  const parallaxY = !isTouch ? (mousePos.y - window.innerHeight / 2) * 0.01 : 0;

  return (
    <section
      id={sectionIds.hero}
      className="relative overflow-hidden bg-black"
      style={{ minHeight: 'calc(100vh - 80px)' }}
    >
      {/* Enhanced Dynamic Background with Multiple Layers */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
        {/* Base dark background */}
        <div className="absolute inset-0 bg-black" />

        {/* Large soft gold radial gradient - moving slowly behind content */}
        <div 
          className="absolute blur-3xl"
          style={{
            top: '-20%',
            right: '-30%',
            width: '800px',
            height: '800px',
            background: 'radial-gradient(ellipse at center, rgba(251, 191, 36, 0.6) 0%, rgba(212, 175, 55, 0.3) 30%, transparent 70%)',
            animation: 'glow-move-1 15s ease-in-out infinite',
            willChange: 'transform'
          }}
        />

        {/* Secondary darker amber glow moving independently near the right */}
        <div 
          className="absolute blur-3xl"
          style={{
            bottom: '-40%',
            right: '-20%',
            width: '700px',
            height: '700px',
            background: 'radial-gradient(ellipse at center, rgba(217, 119, 6, 0.4) 0%, rgba(180, 83, 9, 0.15) 40%, transparent 70%)',
            animation: 'glow-move-2 20s ease-in-out infinite',
            willChange: 'transform'
          }}
        />

        {/* Left side gold glow */}
        <div 
          className="absolute blur-3xl"
          style={{
            top: '10%',
            left: '-15%',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(ellipse at center, rgba(245, 158, 11, 0.3) 0%, rgba(212, 175, 55, 0.1) 35%, transparent 65%)',
            animation: 'glow-move-3 22s ease-in-out infinite reverse',
            willChange: 'transform'
          }}
        />

        {/* Subtle animated grid/mesh layer */}
        <div 
          className="absolute opacity-5"
          style={{
            inset: 0,
            background: 'linear-gradient(90deg, rgba(251, 191, 36, 0.1) 1px, transparent 1px) 0 0 / 100px 100px, linear-gradient(rgba(251, 191, 36, 0.1) 1px, transparent 1px) 0 0 / 100px 100px',
            animation: 'grid-drift 40s linear infinite',
            willChange: 'transform'
          }}
        />

        {/* Very subtle drifting particles - bottom layer */}
        <div className="absolute inset-0 opacity-30">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-amber-400/20 blur-sm"
              style={{
                width: Math.random() * 3 + 1 + 'px',
                height: Math.random() * 3 + 1 + 'px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                animation: `particle-drift ${20 + Math.random() * 30}s ease-in-out infinite`,
                animationDelay: Math.random() * 5 + 's',
                willChange: 'transform'
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Content Container - Full Height */}
      <div className="section-container relative flex flex-col justify-center" style={{ zIndex: 1, minHeight: 'calc(100vh - 80px)' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center py-12 lg:py-0">
          {/* Left Content - 52-55% */}
          <div
            className="space-y-8 md:space-y-10 z-10 order-2 lg:order-1"
            style={{
              transform: `translateY(${scrollY * 0.3}px)`,
            }}
          >
            {/* Logo mini */}
            <div className="flex items-center gap-3 w-fit">
              <div className="relative w-12 h-12">
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

            {/* Main heading - Larger and more commanding */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight">
                {companyInfo.heroTitle}
              </h1>
              <p className="text-2xl md:text-3xl font-semibold text-amber-400 leading-tight">
                {companyInfo.heroSubtitle}
              </p>
            </div>

            {/* Description - Slightly larger */}
            <p className="text-lg md:text-xl text-neutral-300 leading-relaxed max-w-2xl">
              {companyInfo.heroDescription}
            </p>

            {/* Value Props - Larger Cards with Enhanced Glass Effect */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
              <GlassCardPadded size="sm" glassOpacity="bg-white/10" borderColor="border-amber-400/30">
                <div className="text-center">
                  <p className="text-4xl font-bold text-amber-400">4</p>
                  <p className="text-sm text-neutral-300 mt-3 font-medium">
                    Distinct Ventures
                  </p>
                </div>
              </GlassCardPadded>
              <GlassCardPadded size="sm" glassOpacity="bg-white/10" borderColor="border-amber-400/30">
                <div className="text-center">
                  <p className="text-4xl font-bold text-amber-400">100%</p>
                  <p className="text-sm text-neutral-300 mt-3 font-medium">
                    Results Focused
                  </p>
                </div>
              </GlassCardPadded>
              <GlassCardPadded size="sm" glassOpacity="bg-white/10" borderColor="border-amber-400/30">
                <div className="text-center">
                  <p className="text-4xl font-bold text-amber-400">∞</p>
                  <p className="text-sm text-neutral-300 mt-3 font-medium">
                    Growth Potential
                  </p>
                </div>
              </GlassCardPadded>
            </div>

            {/* CTA Buttons - Enhanced Styling */}
            <div className="flex flex-col sm:flex-row gap-5 pt-6">
              <button
                onClick={() => handleCTA(sectionIds.contact)}
                className="btn-primary flex items-center justify-center gap-2 text-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-amber-400/50"
              >
                Get Started
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleCTA(sectionIds.ventureSnapshot)}
                className="btn-secondary flex items-center justify-center gap-2 text-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-amber-400/30"
              >
                Explore Ventures
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Right Side - Logo Animation & Glow - 45-48% */}
          <div className="relative flex items-center justify-center order-1 lg:order-2 min-h-96 lg:min-h-full">
            <div
              className="relative w-full h-full max-w-lg flex items-center justify-center"
              style={{
                transform: `translateY(${scrollY * 0.1}px) translate(${parallaxX}px, ${parallaxY}px)`,
              }}
            >
              {/* Animated glow behind logo */}
              <div className="absolute inset-0 -z-10 flex items-center justify-center">
                {/* Large pulsing glow */}
                <div 
                  className="absolute rounded-full blur-3xl opacity-40"
                  style={{
                    width: '450px',
                    height: '450px',
                    background: 'radial-gradient(ellipse at center, rgba(251, 191, 36, 0.8) 0%, rgba(212, 175, 55, 0.3) 40%, transparent 70%)',
                    animation: 'logo-glow-pulse 5s ease-in-out infinite',
                    willChange: 'transform'
                  }}
                />

                {/* Secondary glow */}
                <div 
                  className="absolute rounded-full blur-3xl opacity-20"
                  style={{
                    width: '550px',
                    height: '550px',
                    background: 'radial-gradient(ellipse at center, rgba(217, 119, 6, 0.4) 0%, transparent 70%)',
                    animation: 'logo-glow-pulse 6s ease-in-out infinite reverse',
                    willChange: 'transform'
                  }}
                />

                {/* Subtle animated light sweep */}
                <div 
                  className="absolute rounded-full opacity-10"
                  style={{
                    width: '500px',
                    height: '500px',
                    background: 'conic-gradient(from 0deg, transparent 0%, rgba(251, 191, 36, 0.3) 50%, transparent 100%)',
                    animation: 'logo-light-sweep 8s linear infinite',
                    willChange: 'transform'
                  }}
                />
              </div>

              {/* Main Logo - Increased by 20-30% */}
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="w-96 h-96 relative">
                  <Image
                    src={companyInfo.logo}
                    alt={companyInfo.logoAlt}
                    fill
                    className="object-contain filter drop-shadow-2xl"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex flex-col items-center gap-3 animate-bounce">
          <p className="text-sm text-neutral-400 font-medium">Scroll to explore</p>
          <div className="w-6 h-10 border-2 border-amber-400/60 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-amber-400 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}
