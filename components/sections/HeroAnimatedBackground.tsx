"use client";

import { useEffect, useRef, useState } from "react";

export function HeroAnimatedBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const parallaxLayerRef = useRef<HTMLDivElement>(null);
  const rafIdRef = useRef<number | null>(null);
  const [showAnimation, setShowAnimation] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Desktop mouse parallax
  useEffect(() => {
    if (prefersReducedMotion || typeof window === "undefined") return;

    // Only apply parallax on desktop (md breakpoint and up)
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    if (!isDesktop) return;

    // Skip on touch devices
    const isTouchDevice = () => {
      return (
        (window.matchMedia("(hover: none)").matches &&
          window.matchMedia("(pointer: coarse)").matches) ||
        ("ontouchstart" in window)
      );
    };

    if (isTouchDevice()) return;

    let mouseX = 0;
    let mouseY = 0;
    let isInHero = false;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      isInHero = e.clientY >= rect.top && e.clientY <= rect.bottom;

      if (isInHero) {
        mouseX = (e.clientX - rect.left - rect.width / 2) / rect.width;
        mouseY = (e.clientY - rect.top - rect.height / 2) / rect.height;
      }

      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }

      rafIdRef.current = requestAnimationFrame(() => {
        if (parallaxLayerRef.current && isInHero) {
          const offsetX = mouseX * -15;
          const offsetY = mouseY * -10;

          parallaxLayerRef.current.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        }
      });
    };

    const handleMouseLeave = () => {
      isInHero = false;
      if (parallaxLayerRef.current) {
        parallaxLayerRef.current.style.transform = "translate(0, 0)";
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    containerRef.current?.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      containerRef.current?.removeEventListener("mouseleave", handleMouseLeave);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [prefersReducedMotion]);

  // SVG grain texture data URI
  const grainSVG = `
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="400">
      <filter id="noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" result="noise" />
        <feColorMatrix in="noise" type="saturate" values="0" />
        <feBlend in="SourceGraphic" in2="noise" mode="overlay" />
      </filter>
      <rect width="400" height="400" fill="rgba(255,255,255,0.05)" filter="url(#noise)" />
    </svg>
  `;
  const grainDataUri = `data:image/svg+xml;utf8,${encodeURIComponent(grainSVG)}`;

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{
        zIndex: 0,
        isolation: "isolate",
      }}
    >
      {/* CSS Variables for brand colors */}
      <style>{`
        :root {
          --hero-void: #0A0A0D;
          --hero-brass: #C9A15C;
          --hero-brass-light: #E8C98A;
          --hero-steel: #4A6F94;
          --hero-steel-deep: #223247;
          --hero-ember: #A85F3F;
        }

        @keyframes heroGradientDrift1 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.6;
          }
          25% {
            transform: translate(60px, -40px) scale(1.08);
            opacity: 0.65;
          }
          50% {
            transform: translate(-50px, 80px) scale(0.95);
            opacity: 0.55;
          }
          75% {
            transform: translate(40px, -60px) scale(1.05);
            opacity: 0.62;
          }
        }

        @keyframes heroGradientDrift2 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.5;
          }
          33% {
            transform: translate(-80px, 50px) scale(1.1);
            opacity: 0.58;
          }
          66% {
            transform: translate(70px, -70px) scale(0.92);
            opacity: 0.48;
          }
        }

        @keyframes heroGradientDrift3 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.45;
          }
          25% {
            transform: translate(50px, 60px) scale(1.06);
            opacity: 0.52;
          }
          50% {
            transform: translate(-60px, -50px) scale(0.94);
            opacity: 0.4;
          }
          75% {
            transform: translate(30px, 70px) scale(1.04);
            opacity: 0.48;
          }
        }

        @keyframes heroGradientDrift4 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.35;
          }
          25% {
            transform: translate(-40px, -50px) scale(1.05);
            opacity: 0.4;
          }
          50% {
            transform: translate(50px, 40px) scale(0.96);
            opacity: 0.3;
          }
          75% {
            transform: translate(-30px, -40px) scale(1.03);
            opacity: 0.38;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          [data-animated] {
            animation: none !important;
          }
        }
      `}</style>

      {/* Base void background */}
      <div className="absolute inset-0" style={{ backgroundColor: "#0A0A0D" }} />

      {/* Parallax container for all gradient layers */}
      <div
        ref={parallaxLayerRef}
        className="absolute inset-0"
        style={{
          transition: prefersReducedMotion ? "transform 0.3s ease-out" : "none",
        }}
      >
        {/* Gradient 1: Brass-toned (top-right) */}
        <div
          data-animated="true"
          className="absolute blur-3xl"
          style={{
            right: "-5%",
            top: "-10%",
            width: "clamp(400px, 45vw, 650px)",
            height: "clamp(400px, 45vw, 650px)",
            background: `radial-gradient(
              ellipse 65% 65% at 40% 40%,
              rgba(201, 161, 92, 0.35) 0%,
              rgba(201, 161, 92, 0.15) 25%,
              rgba(232, 201, 138, 0.08) 45%,
              transparent 75%
            )`,
            animation: showAnimation && !prefersReducedMotion ? "heroGradientDrift1 24s cubic-bezier(0.4, 0.1, 0.6, 0.9) infinite" : "none",
            willChange: "transform",
            filter: "drop-shadow(0 0 80px rgba(201, 161, 92, 0.1))",
          }}
        />

        {/* Gradient 2: Steel-toned (bottom-left) */}
        <div
          data-animated="true"
          className="absolute blur-3xl"
          style={{
            left: "-15%",
            bottom: "-20%",
            width: "clamp(380px, 42vw, 620px)",
            height: "clamp(380px, 42vw, 620px)",
            background: `radial-gradient(
              ellipse 60% 70% at 45% 35%,
              rgba(74, 111, 148, 0.3) 0%,
              rgba(34, 50, 71, 0.2) 30%,
              rgba(34, 50, 71, 0.08) 55%,
              transparent 80%
            )`,
            animation: showAnimation && !prefersReducedMotion ? "heroGradientDrift2 28s cubic-bezier(0.3, 0.2, 0.7, 0.8) infinite" : "none",
            willChange: "transform",
            filter: "drop-shadow(0 0 60px rgba(74, 111, 148, 0.08))",
          }}
        />

        {/* Gradient 3: Brass-toned accent (center-right, near logo) */}
        <div
          data-animated="true"
          className="absolute blur-3xl"
          style={{
            right: "5%",
            top: "35%",
            width: "clamp(420px, 48vw, 680px)",
            height: "clamp(420px, 48vw, 680px)",
            background: `radial-gradient(
              ellipse 70% 70% at 35% 40%,
              rgba(201, 161, 92, 0.25) 0%,
              rgba(232, 201, 138, 0.12) 35%,
              rgba(168, 95, 63, 0.08) 55%,
              transparent 80%
            )`,
            animation: showAnimation && !prefersReducedMotion ? "heroGradientDrift3 26s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite" : "none",
            willChange: "transform",
            filter: "drop-shadow(0 0 70px rgba(201, 161, 92, 0.12))",
          }}
        />

        {/* Gradient 4: Ember accent (very subtle, used sparingly) */}
        <div
          data-animated="true"
          className="absolute blur-3xl"
          style={{
            left: "20%",
            top: "15%",
            width: "clamp(350px, 38vw, 550px)",
            height: "clamp(350px, 38vw, 550px)",
            background: `radial-gradient(
              ellipse 65% 65% at 50% 45%,
              rgba(168, 95, 63, 0.12) 0%,
              rgba(168, 95, 63, 0.05) 35%,
              transparent 70%
            )`,
            animation: showAnimation && !prefersReducedMotion ? "heroGradientDrift4 30s cubic-bezier(0.35, 0.15, 0.65, 0.85) infinite" : "none",
            willChange: "transform",
            filter: "drop-shadow(0 0 50px rgba(168, 95, 63, 0.05))",
          }}
        />
      </div>

      {/* Vignette overlay for text readability */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(
            ellipse 120% 100% at 30% 40%,
            transparent 0%,
            rgba(10, 10, 13, 0.3) 40%,
            rgba(10, 10, 13, 0.6) 100%
          )`,
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Grain texture overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url('${grainDataUri}')`,
          backgroundRepeat: "repeat",
          backgroundSize: "400px 400px",
          opacity: 0.05,
          mixBlendMode: "overlay",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />
    </div>
  );
}
