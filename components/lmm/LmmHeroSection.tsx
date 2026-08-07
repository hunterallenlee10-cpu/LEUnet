"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Workflow } from "lucide-react";
import { smoothScrollToElement } from "@/lib/scrollUtils";
import { AutomationFlowVisual } from "@/components/lmm/AutomationFlowVisual";
import { LmmSiblingLinks } from "@/components/lmm/LmmSiblingLinks";

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
              {/* Decorative here: the venture is named in text a few lines
                  below, in the "Part of Lee Marketing Mastery" footnote, so an
                  alt would repeat it to a screen reader. Same arrangement as
                  the two sibling heroes. */}
              <Image
                src="/lee-marketing-mastery-logo.png"
                alt=""
                width={64}
                height={64}
                priority
                className="h-14 w-14 shrink-0 rounded-full md:h-16 md:w-16"
              />
              {/* The eyebrow names the OFFERING, not the venture. It read "LEE
                  MARKETING MASTERY" for as long as this file served
                  /lee-marketing-mastery and was the venture's page - which put
                  one of three offerings under the whole company's name and
                  implied Lee Marketing Mastery was primarily an automation
                  business. The venture now has a hub of its own, and all three
                  offering heroes follow one rule: offering in the badge,
                  venture in the footnote link. The label matches the nav
                  sub-item and the `LmmSiblingLinks` pill, per
                  docs/CROSS-LINKS.md §2. */}
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2">
                <Workflow className="h-4 w-4 text-amber-400" aria-hidden="true" />
                <span className="text-sm font-semibold tracking-wide text-amber-400">
                  BUSINESS AUTOMATION
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

            {/* The link back to the venture hub is new here, and it is the one
                thing this hero was missing that its two siblings already had:
                until the hub existed this page WAS /lee-marketing-mastery, so
                there was nowhere upward to point. All three offerings now sit
                one level down and all three say so the same way. */}
            <p className="mt-6 text-sm text-neutral-400">
              Custom-built around your business, your workflow, and your growth
              goals.{" "}
              <Link
                href="/lee-marketing-mastery"
                className="font-semibold text-neutral-300 underline-offset-4 transition-colors hover:text-amber-400 hover:underline"
              >
                Part of Lee Marketing Mastery
              </Link>
              .
            </p>
          </div>

          <div>
            <LmmSiblingLinks current="/lee-marketing-mastery/automation" />

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
