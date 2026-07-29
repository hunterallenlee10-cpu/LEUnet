"use client";

import { Venture } from "@/types";
import { MapPin } from "lucide-react";

interface PelicanServiceAreasSectionProps {
  venture: Venture;
}

const serviceAreas = [
  { id: 1, name: "Downtown District", coverage: "Full Coverage" },
  { id: 2, name: "Riverside Heights", coverage: "Full Coverage" },
  { id: 3, name: "Westside Valley", coverage: "Full Coverage" },
  { id: 4, name: "North Shore", coverage: "Full Coverage" },
  { id: 5, name: "Business Park", coverage: "Full Coverage" },
  { id: 6, name: "Suburban Estates", coverage: "Full Coverage" },
];

export function PelicanServiceAreasSection({
  venture,
}: PelicanServiceAreasSectionProps) {
  return (
    <section className="py-20 md:py-32 bg-neutral-950 relative overflow-hidden">
      {/* Background Accent */}
      <div
        className="absolute top-1/2 right-0 w-96 h-96 rounded-full blur-3xl opacity-10"
        style={{ backgroundColor: venture.colors.primary }}
      />

      <div className="section-container relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 bg-cyan-500/10 border border-cyan-500/30">
            <div className="w-2 h-2 rounded-full bg-cyan-400" />
            <span className="text-sm font-semibold text-cyan-400">
              Service Coverage
            </span>
          </div>
          <h2 className="heading-lg text-white mb-4">
            Service Areas
          </h2>
          <p className="text-lg text-neutral-400">
            We proudly serve multiple neighborhoods and districts. Don&apos;t see
            your area listed? Contact us to check if we service your location.
          </p>
        </div>

        {/* Service Areas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {serviceAreas.map((area) => (
            <div
              key={area.id}
              className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-lg p-6 hover:border-cyan-400/50 hover:bg-cyan-400/5 transition-all duration-300 group cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-400/10 group-hover:bg-cyan-400/20 transition-colors">
                    <MapPin className="h-5 w-5 text-cyan-400" />
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg font-bold text-white mb-1">
                    {area.name}
                  </h3>
                  <p className="text-neutral-400 text-sm">{area.coverage}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-16 max-w-2xl mx-auto text-center">
          <p className="text-neutral-300 mb-6">
            Not sure if we service your area? We&apos;re expanding constantly and may
            be able to accommodate special requests.
          </p>
          <button
            className="px-8 py-4 bg-cyan-400 text-neutral-950 rounded-lg font-bold hover:bg-cyan-300 transition-all duration-200 transform hover:scale-105 active:scale-95"
            onClick={() => {
              window.location.href = "/#contact-section";
            }}
          >
            Ask About Your Area
          </button>
        </div>
      </div>
    </section>
  );
}
