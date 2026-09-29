import Link from "next/link";
import { WebsiteBuildDemo } from "@/components/lee-systems/WebsiteBuildDemo";
import { LeeSystemsSiblingLinks } from "@/components/lee-systems/LeeSystemsSiblingLinks";
import { BookCallLink } from "@/components/ui/BookCallLink";
import { leeSystemsAnchors, leeSystemsRoutes } from "@/data/lee-systems";

/**
 * Leads with what the site is for, then the flat quote. It led with the
 * pay-after-the-build guarantee until the owner stopped offering it on
 * 2026-09-28. The label names the offering and the footnote names the
 * company.
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
            <p className="mb-6 text-sm font-semibold text-brass-300">
              Website builds
            </p>

            <h1 className="heading-xl mb-6 text-white">
              A website that brings in customers.{" "}
              <span className="text-brass-300">Flat quote up front.</span>
            </h1>

            <p className="mb-8 max-w-2xl text-lg leading-relaxed text-neutral-300">
              We build conversion-focused websites for small businesses: clear
              about what you do, fast on a phone, and built around one next
              step for the visitor.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <BookCallLink />
              <a
                href={`#${leeSystemsAnchors.websiteForm}`}
                className="btn-ls-secondary inline-flex min-h-11 items-center justify-center text-center"
              >
                Get a free quote
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
            <WebsiteBuildDemo />
          </div>
        </div>
      </div>
    </section>
  );
}
