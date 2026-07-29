"use client";

import { Venture } from "@/types";
import { Check } from "lucide-react";

interface PelicanPricingSectionProps {
  venture: Venture;
}

const pricingTiers = [
  {
    id: 1,
    name: "Residential Package",
    description: "Perfect for homeowners",
    price: "$299",
    period: "Starting from",
    features: [
      "Driveway & Patio Cleaning",
      "Deck Cleaning",
      "Gutter Cleaning",
      "Free Follow-up",
      "Satisfaction Guarantee",
    ],
    highlighted: false,
  },
  {
    id: 2,
    name: "Premium Package",
    description: "Most popular for homes",
    price: "$499",
    period: "Starting from",
    features: [
      "Everything in Residential",
      "Roof Cleaning",
      "House Siding Cleaning",
      "Window Cleaning",
      "Maintenance Plan (6 months)",
      "Priority Scheduling",
    ],
    highlighted: true,
  },
  {
    id: 3,
    name: "Commercial Package",
    description: "For businesses & facilities",
    price: "$799",
    period: "Starting from",
    features: [
      "Unlimited Services",
      "Building Exterior Cleaning",
      "Parking Lot Cleaning",
      "Custom Schedule",
      "Dedicated Account Manager",
      "Monthly Maintenance",
    ],
    highlighted: false,
  },
];

export function PelicanPricingSection({
  venture,
}: PelicanPricingSectionProps) {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-neutral-950 to-blue-950/10 relative overflow-hidden">
      {/* Background Accent */}
      <div
        className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-10"
        style={{ backgroundColor: venture.colors.primary }}
      />

      <div className="section-container relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 bg-cyan-500/10 border border-cyan-500/30">
            <div className="w-2 h-2 rounded-full bg-cyan-400" />
            <span className="text-sm font-semibold text-cyan-400">
              Transparent Pricing
            </span>
          </div>
          <h2 className="heading-lg text-white mb-4">
            Affordable Pricing for Every Need
          </h2>
          <p className="text-lg text-neutral-400">
            Choose the package that fits your property and budget. All prices
            include free consultation and satisfaction guarantee.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pricingTiers.map((tier) => (
            <div
              key={tier.id}
              className={`relative rounded-lg backdrop-blur-sm transition-all duration-300 ${
                tier.highlighted
                  ? "ring-2 ring-cyan-400 bg-cyan-400/10 border border-cyan-400/50 transform md:scale-105"
                  : "bg-white/5 border border-white/10 hover:border-cyan-400/50 hover:bg-cyan-400/5"
              } p-8`}
            >
              {/* Highlighted Badge */}
              {tier.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-block px-4 py-1 bg-cyan-400 text-neutral-950 text-xs font-bold rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Tier Info */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {tier.name}
                </h3>
                <p className="text-neutral-400 text-sm mb-4">
                  {tier.description}
                </p>
                <div className="space-y-1">
                  <span className="text-neutral-400 text-sm">{tier.period}</span>
                  <div className="text-4xl font-bold text-cyan-400">
                    {tier.price}
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <button
                className={`w-full px-6 py-3 rounded-lg font-semibold mb-8 transition-all duration-200 ${
                  tier.highlighted
                    ? "bg-cyan-400 text-neutral-950 hover:bg-cyan-300"
                    : "border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400/10"
                }`}
                onClick={() => {
                  window.location.href = "/#contact-section";
                }}
              >
                Get a Quote
              </button>

              {/* Features List */}
              <div className="space-y-4">
                {tier.features.map((feature, idx) => (
                  <div key={idx} className="flex gap-3 items-start">
                    <Check className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span className="text-neutral-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-16 text-center">
          <p className="text-neutral-400">
            Custom quotes available for large commercial projects.{" "}
            <button
              className="text-cyan-400 hover:text-cyan-300 font-semibold"
              onClick={() => {
                window.location.href = "/#contact-section";
              }}
            >
              Contact us
            </button>{" "}
            for details.
          </p>
        </div>
      </div>
    </section>
  );
}
