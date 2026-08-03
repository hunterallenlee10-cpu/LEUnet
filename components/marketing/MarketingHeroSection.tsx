"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Megaphone } from "lucide-react";
import { smoothScrollToElement } from "@/lib/scrollUtils";
import { ChannelMixVisual } from "@/components/marketing/ChannelMixVisual";
import { LmmSiblingLinks } from "@/components/lmm/LmmSiblingLinks";

export function MarketingHeroSection() {
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
                <Megaphone
                  className="h-4 w-4 text-amber-400"
                  aria-hidden="true"
                />
                <span className="text-sm font-semibold tracking-wide text-amber-400">
                  TRADITIONAL &amp; DIGITAL MARKETING
                </span>
              </div>
            </div>

            <h1 className="heading-xl mb-6 text-white">
              Get Your Business{" "}
              <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-orange-400 bg-clip-text text-transparent">
                In Front of People.
              </span>
            </h1>

            <p className="mb-8 max-w-2xl text-lg leading-relaxed text-neutral-300">
              Your next customer is not all in one place. Some are searching
              right now, some scroll past you every day, and some will drive by
              your sign before they ever type your name. Lee Marketing Mastery
              covers both sides - print, signage, and vehicles offline, and
              search, ads, social, and email online - so the same message
              reaches them wherever they are.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <button
                onClick={() =>
                  smoothScrollToElement("marketing-inquiry-form", {
                    focus: true,
                  })
                }
                className="btn-primary inline-flex items-center justify-center gap-2 group"
              >
                Get a Free Marketing Quote
                <ArrowRight
                  className="h-5 w-5 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </button>
              <button
                onClick={() => smoothScrollToElement("marketing-services")}
                className="btn-secondary inline-flex items-center justify-center gap-2"
              >
                See What We Do
              </button>
            </div>

            <p className="mt-6 text-sm text-neutral-400">
              Take one channel or all of them.{" "}
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
            <LmmSiblingLinks current="/lee-marketing-mastery/marketing" />
            <ChannelMixVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
