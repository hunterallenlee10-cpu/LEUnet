"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Target } from "lucide-react";
import { smoothScrollToElement } from "@/lib/scrollUtils";
import { BrowserFrameVisual } from "@/components/websites/BrowserFrameVisual";
import { LmmSiblingLinks } from "@/components/lmm/LmmSiblingLinks";

export function WebsitesHeroSection() {
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
              {/* The eyebrow names the outcome the buyer is paying for, not the
                  method used to produce the site. An eyebrow about production
                  invites the prospect to compare us against tools they could run
                  themselves; an eyebrow about conversion keeps the comparison on
                  the result. Target replaced Sparkles for the same reason - the
                  icon now points at the job, not at the tooling. */}
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2">
                <Target className="h-4 w-4 text-amber-400" aria-hidden="true" />
                <span className="text-sm font-semibold tracking-wide text-amber-400">
                  WEBSITES BUILT TO CONVERT
                </span>
              </div>
            </div>

            <h1 className="heading-xl mb-6 text-white">
              Your Website Has One Job:{" "}
              <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-orange-400 bg-clip-text text-transparent">
                Turn a Visitor Into a Customer.
              </span>
            </h1>

            {/* Owner-supplied copy. Two things it must keep doing, both of
                which earlier drafts of this paragraph got wrong and had to have
                taken back out:

                It says nothing about this reader's own numbers. An earlier
                version stated as fact that their traffic had fallen and that
                their visitors were weighing them against two or three
                businesses - we have never seen this reader's analytics and the
                count was invented. "Often already comparing their options" is
                general reasoning about buyers, which is defensible; a claim
                about how many competitors, or about what this owner's traffic
                did last year, is not.

                And it does not put a number on attention. "Quickly establish
                trust" describes behavior; "you have five seconds" would be a
                measured interval nobody here measured. That idea appears once
                on this page, in the Shift section, phrased the same careful
                way. See docs/WEBSITES.md section 3.4. */}
            <p className="mb-8 max-w-2xl text-lg leading-relaxed text-neutral-300">
              Lee Marketing Mastery builds professional, conversion-focused
              websites that help businesses turn more visitors into real
              customers. When someone reaches your website, they are often
              already comparing their options - so your site must quickly
              establish trust, clearly communicate your value, and give them a
              compelling reason to choose you.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <button
                onClick={() =>
                  smoothScrollToElement("website-inquiry-form", { focus: true })
                }
                className="btn-primary inline-flex items-center justify-center gap-2 group"
              >
                Get a Free Website Quote
                <ArrowRight
                  className="h-5 w-5 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </button>
              {/* Wording chosen so it stays true no matter how the Work section
                  is titled. "See Live Sites We've Built" implied five separate
                  websites for five separate businesses; the portfolio is two
                  entries, both routes on this domain, both of them the page the
                  visitor is reading. (It was four until H1 Performance came off
                  this site - docs/H1.md - and three until Thread T-Shirts did -
                  docs/THREAD.md - which is exactly the kind of change this
                  wording was written to survive.) Pointing at live work makes
                  the same promise - you can open it right now - without
                  counting sites we do not have. */}
              <button
                onClick={() => smoothScrollToElement("website-work")}
                className="btn-secondary inline-flex items-center justify-center gap-2"
              >
                See the Live Work
              </button>
            </div>

            <p className="mt-6 text-sm text-neutral-400">
              New builds, redesigns, and ongoing care.{" "}
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
            <LmmSiblingLinks current="/lee-marketing-mastery/websites" />
            <BrowserFrameVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
