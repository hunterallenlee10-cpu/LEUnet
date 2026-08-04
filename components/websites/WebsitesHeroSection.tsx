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

            {/* This paragraph offers recognition, not a diagnosis. The earlier
                version stated as fact that the reader's traffic had fallen and
                that their visitors were comparing them against two or three
                businesses - we have never seen this reader's analytics and the
                count was invented, so both were removed. A conditional opening
                is also harder to argue with: an owner who recognizes it agrees
                on his own terms, and one who does not has not been told
                something false about his own business. The "a few seconds"
                interval went with them; that idea now appears once, in the
                Shift section, phrased as how people behave rather than as a
                measured time. */}
            <p className="mb-8 max-w-2xl text-lg leading-relaxed text-neutral-300">
              Lee Marketing Mastery builds business websites around that one job.
              If your traffic looks flatter than it used to, and the visitors who
              do arrive rarely call, the visit is landing later in the decision
              than it once did - your site is being checked by someone who has
              already narrowed the list, not discovered by someone starting out.
              It has to be the reason they stop looking.
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
                  websites for five separate businesses; the portfolio is five
                  routes on this one domain, two of which are the page the
                  visitor is reading. Pointing at live work makes the same
                  promise - you can open it right now - without counting sites
                  we do not have. */}
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
