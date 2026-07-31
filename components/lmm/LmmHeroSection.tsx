"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Megaphone, Sparkles } from "lucide-react";
import { smoothScrollToElement } from "@/lib/scrollUtils";
import { AutomationFlowVisual } from "@/components/lmm/AutomationFlowVisual";

const siblingOfferings = [
  {
    href: "/lee-marketing-mastery/websites",
    label: "New Websites, Built with AI",
    Icon: Sparkles,
  },
  {
    href: "/lee-marketing-mastery/marketing",
    label: "Traditional & Digital Marketing",
    Icon: Megaphone,
  },
];

export function LmmHeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-neutral-950 via-neutral-950 to-amber-950/10 py-24 md:py-32">
      <div className="absolute inset-0 -z-10">
        <div className="absolute right-10 top-20 h-96 w-96 rounded-full bg-amber-400/10 blur-3xl" />
        <div className="absolute bottom-10 left-10 h-80 w-80 rounded-full bg-slate-400/5 blur-3xl" />
      </div>

      <div className="section-container">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <div>
            <div className="mb-6 flex flex-wrap items-center gap-4">
              {/* Decorative here: the eyebrow beside it already names the
                  venture, so an alt would just repeat it to a screen reader. */}
              <Image
                src="/lee-marketing-mastery-logo.png"
                alt=""
                width={64}
                height={64}
                priority
                className="h-14 w-14 shrink-0 rounded-full md:h-16 md:w-16"
              />
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2">
                <span className="h-2 w-2 rounded-full bg-amber-400" />
                <span className="text-sm font-semibold tracking-wide text-amber-400">
                  LEE MARKETING MASTERY
                </span>
              </div>
            </div>

            <h1 className="heading-xl mb-6 text-white">
              Build a Business That{" "}
              <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-orange-400 bg-clip-text text-transparent">
                Runs Smarter.
              </span>
            </h1>

            <p className="mb-8 max-w-2xl text-lg leading-relaxed text-neutral-300">
              Lee Marketing Mastery builds custom automation systems that help
              growing businesses find opportunities, organize leads, follow up
              faster, streamline operations, and create more revenue without
              adding unnecessary manual work.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <button
                onClick={() => smoothScrollToElement("consultation-form", { focus: true })}
                className="btn-primary inline-flex items-center justify-center gap-2 group"
              >
                Book an Automation Consultation
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => smoothScrollToElement("automation-services")}
                className="btn-secondary inline-flex items-center justify-center gap-2"
              >
                Explore Our Systems
              </button>
            </div>

            <p className="mt-6 text-sm text-neutral-400">
              Custom-built around your business, your workflow, and your growth
              goals.
            </p>
          </div>

          <div>
            {/* Routes to LMM's sibling offerings, sitting above the System Flow
                panel rather than in the headline column: pills in the eyebrow
                row crowded the brand badge, and the two CTAs under the headline
                are this page's primary conversion. Pills rather than solid
                buttons for the same reason - these are alternate destinations,
                not competing actions. The hover fill and arrow keep them
                reading as links.

                They wrap to two lines below roughly 1400px, which is why the
                row is flex-wrap rather than a fixed two-up grid. */}
            <div className="mb-4 flex flex-wrap gap-3">
              {siblingOfferings.map(({ href, label, Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className="group inline-flex items-center gap-2 rounded-full border border-amber-400/60 bg-amber-400/[0.14] px-4 py-2 text-sm font-semibold text-amber-200 transition-colors hover:bg-amber-400 hover:text-neutral-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {label}
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm md:p-7">
              <div className="mb-5 flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
                  System Flow
                </p>
                <span className="flex items-center gap-1.5 text-[11px] text-neutral-500">
                  <span className="lmm-status h-1.5 w-1.5 rounded-full bg-amber-400" />
                  Active
                </span>
              </div>
              <AutomationFlowVisual />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
