"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { ventures } from "@/data/ventures";
import { smoothScrollToElement } from "@/lib/scrollUtils";
import { sectionIds } from "@/data/navigation";
import { venturePortfolioIntro } from "@/data/company";
import { GlassCardPadded } from "@/components/cards/GlassCard";

export function VentureSnapshotSection() {
  const handleVentureClick = (ventureId: string) => {
    smoothScrollToElement(ventureId, { focus: true });

    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `#${ventureId}`);
    }
  };

  return (
    <section
      id={sectionIds.ventureSnapshot}
      className="relative py-20 md:py-32 bg-neutral-950 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-10 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl" />
      </div>

      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="heading-lg text-white mb-4">{venturePortfolioIntro.title}</h2>
          <p className="text-xl text-amber-400 mb-4 font-semibold">
            {venturePortfolioIntro.subtitle}
          </p>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            {venturePortfolioIntro.description}
          </p>
        </div>

        {/* Ventures Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ventures.map((venture) => (
            <GlassCardPadded
              key={venture.id}
              size="lg"
              glassOpacity={`bg-white/5`}
              borderColor={`border-white/15`}
              hover={true}
              onClick={() => handleVentureClick(venture.id)}
              className="h-full cursor-pointer group"
            >
              <div className="flex flex-col h-full gap-4">
                {/* Logo */}
                <div className="relative w-24 h-24 mx-auto">
                  <Image
                    src={venture.logo}
                    alt={venture.logoAlt}
                    fill
                    className="object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* Venture Name */}
                <h3 className="text-xl font-bold text-white text-center group-hover:text-amber-400 transition-colors">
                  {venture.name}
                </h3>

                {/* Tagline */}
                <p className="text-center text-neutral-300 text-sm flex-grow">
                  {venture.tagline}
                </p>

                {/* CTA Arrow */}
                <div className="flex justify-center pt-2">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-amber-400/10 group-hover:bg-amber-400/20 transition-colors">
                    <ArrowRight className="w-5 h-5 text-amber-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </GlassCardPadded>
          ))}
        </div>

        {/* Secondary CTA */}
        <div className="text-center mt-12">
          <p className="text-neutral-400 mb-4">
            Ready to explore how we can help you?
          </p>
          <button
            onClick={() => smoothScrollToElement(sectionIds.helpSelector, { focus: true })}
            className="btn-primary inline-flex items-center gap-2"
          >
            Tell Us What You Need
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
