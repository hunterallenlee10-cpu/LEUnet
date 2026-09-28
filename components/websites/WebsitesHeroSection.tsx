import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BrowserFrameVisual } from "@/components/websites/BrowserFrameVisual";
import { LeeSystemsMark } from "@/components/lee-systems/LeeSystemsMark";
import { LeeSystemsSiblingLinks } from "@/components/lee-systems/LeeSystemsSiblingLinks";
import { leeSystemsAnchors, leeSystemsRoutes } from "@/data/lee-systems";

/**
 * Leads with the guarantee, because it is the one thing about these builds a
 * buyer cannot get from most web designers: the site is finished before any
 * money changes hands. The eyebrow names the offering and the footnote names
 * the company, the same rule the automation hero follows.
 */
export function WebsitesHeroSection() {
  return (
    <section className="relative isolate overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 -z-10 section-fade">
        <div className="absolute right-10 top-20 h-96 w-96 rounded-full bg-brass-400/10 blur-3xl" />
        <div className="absolute bottom-10 left-10 h-80 w-80 rounded-full bg-slate-400/5 blur-3xl" />
      </div>

      <div className="section-container">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <div>
            <div className="mb-6 flex flex-wrap items-center gap-4">
              <LeeSystemsMark size="md" />
              <p className="text-sm font-semibold uppercase tracking-widest text-brass-300">
                Website Builds
              </p>
            </div>

            <h1 className="heading-xl mb-6 text-white">
              A website that brings in customers.{" "}
              <span className="text-brass-300">Built before you pay.</span>
            </h1>

            <p className="mb-8 max-w-2xl text-lg leading-relaxed text-neutral-300">
              We build conversion-focused websites for small businesses: clear
              about what you do, fast on a phone, and built around one next
              step for the visitor. Your site is fully built and in your hands
              to review before you pay anything.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                href={`#${leeSystemsAnchors.websiteForm}`}
                className="btn-ls-primary group inline-flex items-center justify-center gap-2 text-center"
              >
                Get a Free Website Quote
                <ArrowRight
                  className="h-5 w-5 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </a>
              <a
                href="#website-includes"
                className="btn-ls-secondary inline-flex items-center justify-center gap-2 text-center"
              >
                What Every Site Includes
              </a>
            </div>

            <p className="mt-6 text-sm text-neutral-400">
              New builds and redesigns, quoted per project.{" "}
              <Link
                href={leeSystemsRoutes.home}
                className="font-semibold text-neutral-300 underline-offset-4 transition-colors hover:text-brass-300 hover:underline"
              >
                Part of Lee Systems Co.
              </Link>
            </p>
          </div>

          <div>
            <LeeSystemsSiblingLinks current={leeSystemsRoutes.websites} />
            <BrowserFrameVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
