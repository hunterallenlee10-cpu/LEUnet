"use client";

import { Venture } from "@/types";
import { Droplets, Building2, Home, Sparkles, Wind, Zap } from "lucide-react";

interface PelicanServicesSectionProps {
  venture: Venture;
}

const services = [
  {
    id: "residential",
    title: "Residential Cleaning",
    description:
      "Complete home exterior cleaning including driveways, siding, decks, and roofs.",
    icon: Home,
  },
  {
    id: "commercial",
    title: "Commercial Cleaning",
    description:
      "Large-scale cleaning solutions for commercial properties and facilities.",
    icon: Building2,
  },
  {
    id: "driveway",
    title: "Driveway & Patio",
    description:
      "Remove stubborn stains, algae, and debris from concrete and paved surfaces.",
    icon: Sparkles,
  },
  {
    id: "roof",
    title: "Roof & Gutter",
    description:
      "Safe, professional roof cleaning and gutter maintenance to protect your home.",
    icon: Wind,
  },
  {
    id: "pressure",
    title: "Pressure Washing",
    description:
      "High-power cleaning for tough jobs and deep restoration of hard surfaces.",
    icon: Zap,
  },
  {
    id: "soft",
    title: "Soft Wash Services",
    description:
      "Gentle cleaning for delicate surfaces like siding, vinyl, and landscaping.",
    icon: Droplets,
  },
];

export function PelicanServicesSection({ venture }: PelicanServicesSectionProps) {
  return (
    <section
      id="services"
      className="py-20 md:py-32 bg-neutral-950 relative overflow-hidden"
    >
      {/* Background Accent */}
      <div
        className="absolute top-1/4 right-0 w-96 h-96 rounded-full blur-3xl opacity-10"
        style={{ backgroundColor: venture.colors.primary }}
      />

      <div className="section-container relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 bg-cyan-500/10 border border-cyan-500/30">
            <div className="w-2 h-2 rounded-full bg-cyan-400" />
            <span className="text-sm font-semibold text-cyan-400">
              Our Services
            </span>
          </div>
          <h2 className="heading-lg text-white mb-4">
            Professional Cleaning Solutions
          </h2>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            From residential homes to large commercial properties, we have the
            expertise and equipment to handle any exterior cleaning challenge.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="group backdrop-blur-sm bg-white/5 border border-white/10 rounded-lg p-8 hover:border-cyan-400/50 hover:bg-cyan-400/5 transition-all duration-300"
              >
                <div className="mb-4 inline-block p-4 rounded-lg bg-cyan-400/10 group-hover:bg-cyan-400/20 transition-colors duration-300">
                  <Icon className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-neutral-400 leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
