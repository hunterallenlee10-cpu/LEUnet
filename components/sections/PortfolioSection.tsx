"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { sectionIds, venturePages } from "@/data/navigation";

// ventureId keys into venturePages so each project links to the venture that
// produced it. An item without one renders as a plain card.
const portfolioItems = [
  {
    id: "portfolio-1",
    ventureId: "lmm",
    title: "Lee Marketing Mastery - Brand Growth Campaign",
    category: "Automation & Digital Marketing",
    image: "/placeholders/portfolio-1.png",
    description: "Results-driven marketing and intelligent automation designed to increase customer engagement, streamline operations, and generate measurable revenue growth.",
  },
  {
    id: "portfolio-2",
    ventureId: "pelican",
    title: "Pelican Power Wash - Property Transformation",
    category: "Professional Exterior Services",
    image: "/placeholders/portfolio-2.png",
    description: "Professional exterior cleaning that restores surfaces, transforms properties, and enhances curb appeal for residential and commercial clients.",
  },
  {
    id: "portfolio-3",
    ventureId: "h1",
    title: "H1 Performance - Athlete Training Program",
    category: "Personal & Professional Athletic Training",
    image: "/placeholders/portfolio-3.png",
    description: "Elite development programs built to increase strength, explosive power, athleticism, for on & off field performance.",
  },
  {
    id: "portfolio-4",
    ventureId: "thread",
    title: "Thread T-Shirts - Premium Apparel Collection",
    category: "Confidence & Meaning",
    image: "/placeholders/portfolio-4.png",
    description: "Premium apparel designed for everyday style and lasting quality, with custom designs created for individuals, brands, teams, and special events.",
  },
];

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
        <div className="text-center mb-16 md:mb-20">
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

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {portfolioItems.map((item) => {
            const venturePage = venturePages[item.ventureId];

            const cardClasses =
              "group block overflow-hidden rounded-lg backdrop-blur-md bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300";

            const cardBody = (
              <>
                {/* Image */}
                <div className="relative h-64 md:h-72 overflow-hidden bg-neutral-900">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">
                  <p className="text-amber-400 text-sm font-semibold uppercase tracking-widest mb-2">
                    {item.category}
                  </p>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-neutral-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </>
            );

            if (venturePage) {
              return (
                <Link
                  key={item.id}
                  href={venturePage}
                  aria-label={item.title}
                  className={`${cardClasses} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950`}
                >
                  {cardBody}
                </Link>
              );
            }

            return (
              <div key={item.id} className={cardClasses}>
                {cardBody}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
