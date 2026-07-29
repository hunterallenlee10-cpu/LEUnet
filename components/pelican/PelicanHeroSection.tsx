"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { Venture } from "@/types";
import { smoothScrollToElement } from "@/lib/scrollUtils";

interface PelicanHeroSectionProps {
  venture: Venture;
}

export function PelicanHeroSection({ venture }: PelicanHeroSectionProps) {
  const handleContactScroll = () => {
    // Navigate to homepage and scroll to contact
    window.location.href = "/#contact-section";
  };

  return (
    <section className="relative py-32 md:py-48 overflow-hidden bg-gradient-to-br from-neutral-950 via-neutral-950 to-blue-950/20">
      {/* Animated Background Accents */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute top-20 right-10 w-96 h-96 rounded-full blur-3xl opacity-20 animate-pulse"
          style={{ backgroundColor: venture.colors.primary }}
        />
        <div
          className="absolute bottom-20 left-20 w-80 h-80 rounded-full blur-3xl opacity-15 animate-pulse"
          style={{ backgroundColor: venture.colors.accent }}
        />
        <div
          className="absolute top-1/2 left-1/4 w-72 h-72 rounded-full blur-3xl opacity-10"
          style={{ backgroundColor: venture.colors.primary }}
        />
      </div>

      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="max-w-3xl">
              {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 bg-cyan-500/10 border border-cyan-500/30">
              <div className="w-2 h-2 rounded-full bg-cyan-400" />
              <span className="text-sm font-semibold text-cyan-400">
                Professional Exterior Cleaning
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="heading-xl text-white mb-6">
              Your Property Deserves to
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-300">
                Shine With Confidence
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-xl text-neutral-300 mb-8 leading-relaxed max-w-2xl">
              Trusted power washing and exterior cleaning for residential and
              commercial properties. We deliver exceptional results with
              professional-grade equipment and unmatched attention to detail.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleContactScroll}
                className="px-8 py-4 bg-cyan-400 text-neutral-950 rounded-lg font-bold hover:bg-cyan-300 transition-all duration-200 transform hover:scale-105 active:scale-95 inline-flex items-center justify-center gap-2 group"
              >
                Get Your Free Quote
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                className="px-8 py-4 border-2 border-cyan-400 text-cyan-400 rounded-lg font-bold hover:bg-cyan-400/10 transition-all duration-200"
                onClick={() => {
                  const servicesSection = document.getElementById("services");
                  if (servicesSection) {
                    servicesSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                View Our Services
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-col sm:flex-row gap-8 mt-16 pt-8 border-t border-neutral-800">
              <div>
                <div className="text-3xl font-bold text-cyan-400 mb-2">500+</div>
                <p className="text-neutral-400 text-sm">Satisfied Customers</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-cyan-400 mb-2">10+</div>
                <p className="text-neutral-400 text-sm">Years Experience</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-cyan-400 mb-2">100%</div>
                <p className="text-neutral-400 text-sm">Satisfaction Guaranteed</p>
              </div>
            </div>
          </div>

          {/* Right Logo Section */}
          <div className="hidden lg:flex justify-center items-center">
            <div className="relative w-full max-w-sm">
              <Image
                src="/pelican/logo.png"
                alt="Pelican Power Wash mascot"
                width={400}
                height={400}
                className="w-full h-auto drop-shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
