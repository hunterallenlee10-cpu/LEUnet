const steps = [
  {
    title: "Consultation",
    detail:
      "A short conversation about what the business does, who it sells to, and what the site has to accomplish. This is where scope and timeline get set.",
  },
  {
    title: "Structure and Content",
    detail:
      "We map the pages the site needs, then draft the copy and produce the imagery for each one. You review and mark up everything before design begins.",
  },
  {
    title: "Design and Build",
    detail:
      "Layout options are produced for you to choose from, then the approved direction is built out as a working site you can click through - not a flat picture of one.",
  },
  {
    title: "Review and Revisions",
    detail:
      "You use the real site on your own phone and computer and tell us what to change. Revisions happen against the live build rather than a static mockup.",
  },
  {
    title: "Launch",
    detail:
      "Domain, hosting, forms, and analytics are connected and tested. Nothing goes live until you have approved it.",
  },
  {
    title: "After Launch",
    detail:
      "You take it from here, or a care plan keeps the site updated, backed up, and monitored. Either way, the site is yours.",
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
            Six steps from first conversation to a launched site. Nothing is
            published without your approval.
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
      </div>
    </section>
  );
}
