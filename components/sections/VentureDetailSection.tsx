"use client";

import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { Venture } from "@/types";
import { ventureServices, ventureValuesProps } from "@/data/services";
import { smoothScrollToElement } from "@/lib/scrollUtils";
import { sectionIds, venturePages } from "@/data/navigation";
import { GlassCardPadded } from "@/components/cards/GlassCard";

interface VentureDetailSectionProps {
  venture: Venture;
}

export function VentureDetailSection({ venture }: VentureDetailSectionProps) {
  const services = ventureServices[venture.id as keyof typeof ventureServices] || [];
  const valueProps = ventureValuesProps[venture.id as keyof typeof ventureValuesProps] || [];

  const handleCTA = () => {
    smoothScrollToElement(sectionIds.contact, { focus: true });
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `#${sectionIds.contact}`);
    }
  };

  const handleLearnMore = () => {
    // Ventures with a dedicated page go there; the rest fall back to contact.
    const venturePage = venturePages[venture.id];
    if (venturePage) {
      window.location.href = venturePage;
      return;
    }
    handleCTA();
  };

  return (
    <section
      id={venture.id}
      className="relative py-20 md:py-32 bg-neutral-950 overflow-hidden"
    >
      {/* Background decoration based on venture color */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ backgroundColor: `${venture.colors.primary}33` }}
        />
        <div
          className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-10"
          style={{ backgroundColor: `${venture.colors.accent}22` }}
        />
      </div>

      <div className="section-container">
        {/* Hero Section for Venture */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Left: Logo and Description */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20">
                <Image
                  src={venture.logo}
                  alt={venture.logoAlt}
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h2 className="heading-lg text-white">{venture.name}</h2>
                <p className="text-amber-400 font-semibold mt-1">{venture.tagline}</p>
              </div>
            </div>

            <p className="text-lg text-neutral-300 leading-relaxed">
              {venture.heroDescription}
            </p>

            {/* Wraps rather than shrinking: "Explore Lee Marketing Mastery" is
                long enough that the pair exceeds the grid column, and flex
                items shrink below their content width by default - which broke
                both labels across two lines mid-phrase. Wrapping drops the
                second button to its own row at full width instead. */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 pt-4">
              <button
                onClick={handleCTA}
                className="btn-primary inline-flex items-center justify-center gap-2 whitespace-nowrap"
              >
                {venture.ctaPrimary}
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>
              <button
                onClick={handleLearnMore}
                className="btn-secondary inline-flex items-center justify-center gap-2 whitespace-nowrap"
              >
                Explore {venture.name}
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>
            </div>
          </div>

          {/* Right: Logo Display or Image */}
          <div className="relative h-80 md:h-96 flex items-center justify-center">
            <div
              className="absolute inset-0 -z-10 rounded-lg blur-3xl opacity-30"
              style={{ backgroundColor: `${venture.colors.primary}44` }}
            />
            <div className="relative w-full h-full flex items-center justify-center p-8">
              <Image
                src={venture.logo}
                alt={venture.logoAlt}
                fill
                className="object-contain filter drop-shadow-2xl"
              />
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="mb-20">
          <h3 className="heading-md text-white mb-12 text-center">
            Our Services
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <GlassCardPadded
                key={service.id}
                size="md"
                glassOpacity="bg-white/5"
                borderColor="border-white/10"
              >
                <div className="space-y-3">
                  <div className="text-3xl">{service.icon}</div>
                  <h4 className="text-lg font-bold text-white">
                    {service.title}
                  </h4>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </GlassCardPadded>
            ))}
          </div>
        </div>

        {/* Why Choose Us - Two Column */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Value Props */}
          <div className="space-y-6">
            <h3 className="heading-md text-white">Why Choose {venture.name}?</h3>
            <div className="space-y-4">
              {valueProps.map((prop) => (
                <div
                  key={prop.id}
                  className="flex gap-4 items-start"
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                    style={{ backgroundColor: `${venture.colors.primary}44` }}
                  >
                    <Check
                      className="w-5 h-5"
                      style={{ color: venture.colors.primary }}
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">
                      {prop.title}
                    </h4>
                    <p className="text-neutral-400 text-sm">
                      {prop.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: About */}
          <GlassCardPadded
            size="lg"
            glassOpacity="bg-white/5"
            borderColor="border-white/10"
          >
            <div className="space-y-4">
              <h4 className="text-2xl font-bold text-white">
                About {venture.name}
              </h4>
              <p className="text-neutral-300 leading-relaxed">
                {venture.description}
              </p>
              <button
                onClick={handleCTA}
                className="btn-primary w-full inline-flex items-center justify-center gap-2 mt-6"
              >
                Get Started Today
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </GlassCardPadded>
        </div>
      </div>
    </section>
  );
}
