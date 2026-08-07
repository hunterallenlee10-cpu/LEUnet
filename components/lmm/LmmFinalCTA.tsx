"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { smoothScrollToElement } from "@/lib/scrollUtils";

export function LmmFinalCTA() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400/10 blur-3xl" />
      </div>

      <div className="section-container text-center">
        {/* Named here, unlike the hero: no adjacent text identifies the brand. */}
        <Image
          src="/lee-marketing-mastery-logo.png"
          alt="Lee Marketing Mastery"
          width={80}
          height={80}
          loading="lazy"
          className="mx-auto mb-8 h-20 w-20 rounded-full"
        />
        <h2 className="heading-lg mx-auto mb-6 max-w-3xl text-white">
          Stop Letting Manual Work Limit Your Growth.
        </h2>
        <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-neutral-300">
          Build a system that helps your business move faster, stay organized,
          and protect more opportunities.
        </p>

        <button
          onClick={() => smoothScrollToElement("consultation-form", { focus: true })}
          className="btn-primary inline-flex items-center justify-center gap-2 group"
        >
          Book an Automation Consultation
          <ArrowRight
            className="h-5 w-5 transition-transform group-hover:translate-x-1"
            aria-hidden="true"
          />
        </button>

        {/* Two links now, matching WebsitesFinalCTA and MarketingFinalCTA
            exactly. This block used to carry only the return-to-LEU link,
            because this page was /lee-marketing-mastery and there was no
            venture level above it to go back to. There is now, and a visitor
            who reaches the bottom of one offering without converting is more
            likely to want the other two than to want a different venture
            entirely - so the venture link goes first, as it does on both
            siblings. */}
        <p className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          <Link
            href="/lee-marketing-mastery"
            className="text-sm font-semibold text-neutral-400 underline-offset-4 transition-colors hover:text-amber-400 hover:underline"
          >
            Back to Lee Marketing Mastery
          </Link>
          <Link
            href="/"
            className="text-sm font-semibold text-neutral-400 underline-offset-4 transition-colors hover:text-amber-400 hover:underline"
          >
            Return to Lee Enterprises Unlimited
          </Link>
        </p>
      </div>
    </section>
  );
}
