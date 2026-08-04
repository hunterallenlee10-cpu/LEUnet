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
const steps = [
  {
    title: "Consultation",
    detail:
      "A short conversation about what you sell, who buys it, and the one thing you want a visitor to do. Everything after this points at that action, so it is worth being specific here.",
  },
  {
    title: "Structure and Content",
    detail:
      "We map a page for each offer you actually want to sell, then draft the copy and produce the imagery for each one. The copy leads with the result the customer came for, not a description of the company.",
  },
  {
    // This step used to sell the contrast between a working site and a static
    // mockup, which is a statement about how the work gets made rather than
    // about what the owner gets from it. What he actually gets is a decision he
    // can make on the device his customers use, before it is expensive to
    // change. That is the line worth keeping.
    title: "Design and Build",
    detail:
      "Layout options are produced for you to choose from, then the approved direction is built into a working site - so what you sign off on is something you have actually used on your own phone. Every screen ends in one obvious next step.",
  },
  {
    title: "Review and Revisions",
    detail:
      "You use the real site the way a customer will - open it cold on your phone, find your own service, send the form. Anything confusing at that stage would have cost you calls, so it gets fixed before anyone else sees it.",
  },
  {
    // Scoped to exactly what the stack does. Vercel Analytics, wired up in
    // app/layout.tsx, reports arrivals and landing pages; the API routes email
    // every submission the moment it is sent, with a subject line naming the
    // form. This step used to promise the owner could see "which pages produce
    // calls and form fills" - there is no form-fill event tracking and no call
    // tracking anywhere in this repo, so that was attribution we cannot
    // deliver. If either is ever built, this is the step that gets to grow.
    title: "Launch",
    detail:
      "Domain, hosting, forms, and analytics are connected and tested together. From the first day you can see how many people arrive and which pages they land on, and every form emails you the moment someone sends it. Nothing goes live until you approve it.",
  },
  {
    title: "After Launch",
    detail:
      "You take it from here, or a care plan keeps the site updated, backed up, and monitored. Pages get added as you add services or run a campaign. Either way, the site is yours.",
  },
];

export function WebsitesProcessSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="section-container">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-amber-400">
            The Process
          </p>
          <h2 className="heading-lg mb-6 text-white">
            You Always Know What Happens Next.
          </h2>
          <p className="text-lg leading-relaxed text-neutral-300">
            Six steps from the first conversation to a launched site. Each one is
            aimed at the same thing - a visitor who arrives and then acts.
            Nothing is published without your approval.
          </p>
        </div>

        <ol className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {steps.map(({ title, detail }, i) => (
            <li
              key={title}
              className="rounded-xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-colors duration-300 hover:border-amber-400/40"
            >
              <span
                aria-hidden="true"
                className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg border border-amber-400/30 bg-amber-400/10 font-mono text-sm font-semibold text-amber-400"
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

        {/* The only place on the page where timeline is mentioned, and it is
            framed as what a stalled project costs the owner rather than as a
            claim about how fast we work. This paragraph used to open with "most
            builds are measured in weeks, not months", which is a typical
            duration derived from a track record that does not exist yet - no
            client build has been completed. The cost of a project that drags is
            real and reasonable to state without it, so the point survives and
            the number does not. Do not add a range here until there are enough
            finished builds to average one; docs/WEBSITES.md section 7 and the
            "how long does a build take" FAQ both make the same call. */}
        <p className="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-neutral-500">
          While a build drags on, the visitors you are paying to reach are
          landing on the old site and deciding without you. That is the real cost
          of a project that stalls, and it is why the timeline gets scoped with
          you at the consultation instead of left open.
        </p>
      </div>
    </section>
  );
}
