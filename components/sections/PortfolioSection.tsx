"use client";

import { ArrowRight } from "lucide-react";
import { sectionIds } from "@/data/navigation";

export function PortfolioSection() {
  return (
    <section
      id={sectionIds.portfolio}
      className="relative py-20 md:py-32 bg-neutral-950 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-10 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl" />
      </div>

      <div className="section-container">
        {/* Header */}
        <div className="text-center">
          <h2 className="heading-lg text-white mb-4">Our Portfolio</h2>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            Explore the diverse projects and services that showcase our commitment to excellence across all ventures.
          </p>

          {/* Portfolio CTA - destination intentionally unwired for now */}
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              className="btn-primary group inline-flex items-center justify-center gap-2 px-8 py-4 text-base sm:text-lg shadow-lg shadow-amber-400/20 hover:shadow-xl hover:shadow-amber-400/30"
            >
              Start your own venture
              <ArrowRight
                className="h-5 w-5 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
