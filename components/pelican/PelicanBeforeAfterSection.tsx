"use client";

import { Venture } from "@/types";
import { BeforeAfterSlider } from "./PelicanBeforeAfterSlider";

interface PelicanBeforeAfterSectionProps {
  venture: Venture;
}

const beforeAfterProjects = [
  {
    id: 1,
    title: "Driveway Restoration",
    before: "/pelican/before-1.png",
    after: "/pelican/after-1.png",
  },
  {
    id: 2,
    title: "Roof Cleaning",
    before: "/pelican/before-2.png",
    after: "/pelican/after-2.png",
  },
  {
    id: 3,
    title: "Patio Cleaning",
    before: "/pelican/before-3.png",
    after: "/pelican/after-3.png",
  },
];

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
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            Drag the slider to see the dramatic before and after results of our
            professional cleaning services.
          </p>
        </div>

        {/* Before/After Sliders Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {beforeAfterProjects.slice(0, 2).map((project) => (
            <BeforeAfterSlider
              key={project.id}
              beforeImage={project.before}
              afterImage={project.after}
              title={project.title}
            />
          ))}
        </div>

        {/* Single Wide Slider */}
        <div className="max-w-4xl mx-auto">
          <BeforeAfterSlider
            beforeImage={beforeAfterProjects[2].before}
            afterImage={beforeAfterProjects[2].after}
            title={beforeAfterProjects[2].title}
          />
        </div>
      </div>
    </section>
  );
}
