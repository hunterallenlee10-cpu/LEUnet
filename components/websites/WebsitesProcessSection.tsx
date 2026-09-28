/**
 * Each step is described by what it contributes to the finished site converting,
 * not by which part of a traditional build it removes. The old framing sold the
 * process as a faster version of everyone else's process, which puts the whole
 * page back on production speed and invites a price comparison against tools the
 * owner could run himself.
 *
 * No typical build time is stated anywhere: every quote carries its own
 * timeline. The "Typical build time" placeholder that sat under the grid came
 * off on 2026-09-28; add a range only once real builds back it up.
 */

const steps = [
  {
    title: "Quote",
    detail:
      "A short conversation about what you sell, who buys it, and what you want a visitor to do. You get a free quote and a timeline.",
  },
  {
    title: "Structure and copy",
    detail:
      "We map a page for each service you want to sell and draft the copy for your review. If you have photos, branding or copy worth keeping, we keep them.",
  },
  {
    title: "Full build",
    detail:
      "We build the complete, working site. Not a mockup: the real thing, on a private link you can open on your own phone.",
  },
  {
    title: "Review and revisions",
    detail:
      "You use it the way a customer would and tell us what to change. We revise until it is right.",
  },
  {
    title: "Review and approve",
    detail:
      "When the site is right, you approve it. Nothing goes live until you do.",
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
          <p className="mb-3 text-sm font-semibold text-brass-300">The process</p>
          <h2 className="heading-lg mb-6 text-white">
            From first call to launch
          </h2>
          <p className="text-lg leading-relaxed text-neutral-300">
            Six steps from the first conversation to a launched site.
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

      </div>
    </section>
  );
}
