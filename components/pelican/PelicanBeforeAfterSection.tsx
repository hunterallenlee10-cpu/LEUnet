"use client";

import { Venture } from "@/types";

interface PelicanBeforeAfterSectionProps {
  venture: Venture;
}

export function PelicanBeforeAfterSection({
  venture,
}: PelicanBeforeAfterSectionProps) {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-neutral-950 to-blue-950/10 relative overflow-hidden">
      {/* Background Accent */}
      <div
        className="absolute bottom-1/4 left-0 w-96 h-96 rounded-full blur-3xl opacity-10"
        style={{ backgroundColor: venture.colors.primary }}
      />

      <div className="section-container relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 bg-cyan-500/10 border border-cyan-500/30">
            <div className="w-2 h-2 rounded-full bg-cyan-400" />
            <span className="text-sm font-semibold text-cyan-400">
              Real Results
            </span>
          </div>
          <h2 className="heading-lg text-white mb-4">
            See the Transformation
          </h2>
        </div>

        {/* Coming Soon */}
        <div className="max-w-2xl mx-auto text-center rounded-2xl border border-cyan-500/20 bg-neutral-900/50 px-8 py-16">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Coming Soon
          </h3>
          <p className="text-lg text-neutral-400">
            Before and after photos of our work will be posted here soon.
          </p>
        </div>
      </div>
    </section>
  );
}
