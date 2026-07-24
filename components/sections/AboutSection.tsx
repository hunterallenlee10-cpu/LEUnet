"use client";

import { sectionIds } from "@/data/navigation";
import { aboutSection } from "@/data/company";
import { GlassCardPadded } from "@/components/cards/GlassCard";
import { Heart, Zap, TrendingUp, Shield } from "lucide-react";

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
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
          <h2 className="heading-lg text-white mb-4">{aboutSection.title}</h2>
          <p className="text-xl text-amber-400 font-semibold mb-4">
            {aboutSection.subtitle}
          </p>
          <p className="text-lg text-neutral-400 leading-relaxed">
            {aboutSection.description}
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
              <h3 className="heading-md text-white">Our Mission</h3>
              <p className="text-lg text-neutral-300 leading-relaxed">
                To build and scale exceptional ventures that deliver measurable results, drive positive change, and set new standards for excellence in their respective industries. We are committed to empowering our clients, supporting our team members, and creating lasting value through innovation, integrity, and unwavering focus on results.
              </p>
            </div>
          </GlassCardPadded>
        </div>
      </div>
    </section>
  );
}
