"use client";

import Link from "next/link";
import { businessMasteryPage, sectionIds } from "@/data/navigation";
import { aboutSection } from "@/data/company";
import { GlassCardPadded } from "@/components/cards/GlassCard";
import { Heart, Zap, TrendingUp, Shield, ArrowRight } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  excellence: <Heart className="w-8 h-8 text-amber-400" />,
  integrity: <Shield className="w-8 h-8 text-amber-400" />,
  innovation: <Zap className="w-8 h-8 text-amber-400" />,
  growth: <TrendingUp className="w-8 h-8 text-amber-400" />,
};

export function AboutSection() {
  return (
    <section
      id={sectionIds.about}
      className="relative py-20 md:py-32 bg-neutral-950 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl" />
      </div>

      <div className="section-container">
        {/* Header. Heading and subtitle only: the paragraph that used to sit
            here was two thirds the mission card's statement restated, so the
            two were merged into that card. See `aboutSection.mission`. */}
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
          <h2 className="heading-lg text-white mb-4">{aboutSection.title}</h2>
          <p className="text-xl text-amber-400 font-semibold">
            {aboutSection.subtitle}
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {aboutSection.values.map((value) => (
            <GlassCardPadded
              key={value.id}
              size="md"
              glassOpacity="bg-white/5"
              borderColor="border-white/10"
            >
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  {iconMap[value.id]}
                </div>
                <h3 className="text-xl font-bold text-white">
                  {value.title}
                </h3>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            </GlassCardPadded>
          ))}
        </div>

        {/* Mission Statement */}
        <div className="max-w-3xl mx-auto">
          <GlassCardPadded
            size="lg"
            glassOpacity="bg-white/5"
            borderColor="border-amber-400/20"
          >
            <div className="text-center space-y-6">
              <h3 className="heading-md text-white">
                {aboutSection.mission.heading}
              </h3>
              <p className="text-lg text-neutral-300 leading-relaxed">
                {aboutSection.mission.statement}
              </p>
            </div>
          </GlassCardPadded>

          {/* Mission CTA. The statement above ends on turning an idea into a
              business of your own, so this sends readers to Business Mastery,
              the program that does exactly that. It is also the section's only
              ask now: both merged paragraphs closed by asking for contact,
              which competed with this button and pointed somewhere else. */}
          <div className="mt-10 flex justify-center">
            <Link
              href={businessMasteryPage}
              className="btn-primary group inline-flex items-center justify-center gap-2 px-8 py-4 text-base sm:text-lg shadow-lg shadow-amber-400/20 hover:shadow-xl hover:shadow-amber-400/30"
            >
              Get started on your dreams
              <ArrowRight
                className="h-5 w-5 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
