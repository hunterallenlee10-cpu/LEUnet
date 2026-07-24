"use client";

import { ventures } from "@/data/ventures";
import { helpSelectorContent } from "@/data/company";
import { sectionIds } from "@/data/navigation";
import { smoothScrollToElement } from "@/lib/scrollUtils";
import { GlassCardPadded } from "@/components/cards/GlassCard";
import Image from "next/image";

export function HelpSelectorSection() {
  const handleVentureSelect = (ventureId: string) => {
    smoothScrollToElement(sectionIds.contact, { focus: true });

    // Store selected venture in sessionStorage for form context
    if (typeof window !== "undefined") {
      sessionStorage.setItem("selectedVenture", ventureId);
    }

    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `#${sectionIds.contact}`);
    }
  };

  return (
    <section
      id={sectionIds.helpSelector}
      className="relative py-20 md:py-32 bg-neutral-950 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-10 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl" />
      </div>

      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="heading-lg text-white mb-4">{helpSelectorContent.title}</h2>
          <p className="text-xl text-amber-400 font-semibold mb-4">
            {helpSelectorContent.subtitle}
          </p>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            {helpSelectorContent.description}
          </p>
        </div>

        {/* Venture Selection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ventures.map((venture) => (
            <button
              key={venture.id}
              onClick={() => handleVentureSelect(venture.id)}
              className="group"
            >
              <GlassCardPadded
                size="lg"
                glassOpacity="bg-white/5"
                borderColor="border-white/15"
                hover={true}
                className="h-full cursor-pointer transition-all duration-300 hover:bg-white/10 hover:border-amber-400/50"
              >
                <div className="flex flex-col h-full gap-4 items-center text-center">
                  {/* Logo */}
                  <div className="relative w-24 h-24 group-hover:scale-110 transition-transform duration-300">
                    <Image
                      src={venture.logo}
                      alt={venture.logoAlt}
                      fill
                      className="object-contain"
                    />
                  </div>

                  {/* Venture Name */}
                  <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                    {venture.name}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-neutral-300 flex-grow">
                    {venture.tagline}
                  </p>

                  {/* CTA Text */}
                  <p className="text-sm font-semibold text-amber-400 group-hover:text-amber-300 transition-colors">
                    Get {venture.ctaPrimary.toLowerCase()}
                  </p>
                </div>
              </GlassCardPadded>
            </button>
          ))}
        </div>

        {/* Alternative CTA */}
        <div className="text-center mt-12">
          <p className="text-neutral-400 mb-4">
            Not sure which venture is right for you?
          </p>
          <button
            onClick={() => handleVentureSelect("other")}
            className="btn-secondary inline-flex items-center gap-2"
          >
            Send Us Your Inquiry
          </button>
        </div>
      </div>
    </section>
  );
}
