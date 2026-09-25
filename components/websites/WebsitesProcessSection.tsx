/**
 * Each step is described by what it contributes to the finished site converting,
 * not by which part of a traditional build it removes. The old framing sold the
 * process as a faster version of everyone else's process, which puts the whole
 * page back on production speed and invites a price comparison against tools the
 * owner could run himself.
 *
 * Timeline lives here and only here, in the closing note below the grid, stated
 * as a consequence for the owner - a half-finished build is visitors deciding
 * without him - rather than as a boast about how the work gets done. Do not
 * promote it into a step title, the section heading, or anywhere earlier on the
 * page, and do not attach a duration to it: see the note on that paragraph.
 */
import { LeeSystemsMark } from "@/components/lee-systems/LeeSystemsMark";
import { PlaceholderBox } from "@/components/lee-systems/PlaceholderBox";

const steps = [
  {
    title: "Quote",
    detail:
      "A short conversation about what you sell, who buys it, and what you want a visitor to do. You get a free quote and a timeline.",
  },
  {
    title: "Structure and Copy",
    detail:
      "We map a page for each service you want to sell and draft the copy for your review. If you have photos, branding or copy worth keeping, we keep them.",
  },
  {
    title: "Full Build",
    detail:
      "We build the complete, working site. Not a mockup: the real thing, on a private link you can open on your own phone.",
  },
  {
    title: "Review and Revisions",
    detail:
      "You use it the way a customer would and tell us what to change. We revise until it is right.",
  },
  {
    title: "Approve and Pay",
    detail:
      "Only once you have seen the finished site and approved it do you pay. If you decide not to go ahead, you owe nothing.",
  },
  {
    title: "Launch",
    detail:
      "Domain, forms and analytics are connected and tested, then the site goes live. You own it. An optional care plan keeps it updated afterwards.",
  },
];

export function WebsitesProcessSection() {
  return (
    <section className="relative isolate py-20 md:py-28">
      <div className="section-container">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          {/* Matches the eyebrow treatment on the automation page's process
              section - the two pages are one brand and their equivalent
              sections should be recognisable as such. */}
          <p className="mb-3 flex items-center justify-center gap-2.5 text-sm font-semibold uppercase tracking-widest text-brass-300">
            <LeeSystemsMark />
            The Process
          </p>
          <h2 className="heading-lg mb-6 text-white">
            You see the finished site before you pay
          </h2>
          <p className="text-lg leading-relaxed text-neutral-300">
            Six steps from the first conversation to a launched site. Payment comes at step five, after the site is built and you have approved it.
          </p>
        </div>

        <ol className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {steps.map(({ title, detail }, i) => (
            <li
              key={title}
              className="rounded-xl border border-white/10 bg-white/[0.04] p-6 transition-colors duration-300 hover:border-brass-400/40 md:p-8"
            >
              <span
                aria-hidden="true"
                className="mb-3 block font-mono text-sm font-semibold text-brass-300"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mb-2.5 font-bold text-white">{title}</h3>
              <p className="text-sm leading-relaxed text-neutral-400">
                {detail}
              </p>
            </li>
          ))}
        </ol>

        <PlaceholderBox label="Typical build time" className="mx-auto mt-10 max-w-2xl">
          Add a typical range once a few client builds are finished, e.g. &ldquo;Most sites take 2 to 4 weeks.&rdquo; Until then, every quote includes its own timeline.
        </PlaceholderBox>
      </div>
    </section>
  );
}
