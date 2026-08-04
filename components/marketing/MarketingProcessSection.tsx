import { LmmMark } from "@/components/lmm/LmmMark";

const steps = [
  {
    title: "Consultation",
    detail:
      "We look at how customers find you now, what you have already tried, and what your area actually responds to. Channels get chosen after that conversation, not before it.",
  },
  {
    title: "The Plan",
    detail:
      "A channel mix with a reason attached to each one. If a channel does not earn its place for your business, we leave it out rather than padding the quote.",
  },
  {
    title: "Design & Setup",
    detail:
      "Creative is produced for every channel at once so the mailer, the sign, and the ad look like the same business. Accounts and campaigns get set up in your name.",
  },
  {
    title: "Launch",
    detail:
      "Print goes to production, campaigns go live, and tracking is in place before the first dollar is spent so results are attributable from day one.",
  },
  {
    title: "Reporting",
    detail:
      "You get the numbers that exist - impressions, clicks, cost per lead, calls - and a straight answer about which channels cannot be measured cleanly.",
  },
  {
    title: "Adjust",
    detail:
      "Budget moves toward what is working. Channels that are not earning their keep get changed or cut. This is ongoing, not a one-time setup.",
  },
];

export function MarketingProcessSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="section-container">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          {/* Matches the eyebrow treatment on the automation and websites
              process sections - the three pages are one venture and their
              equivalent sections should be recognisable as such. */}
          <p className="mb-3 flex items-center justify-center gap-2.5 text-sm font-semibold uppercase tracking-widest text-amber-400">
            <LmmMark />
            The Process
          </p>
          <h2 className="heading-lg mb-6 text-white">
            Channels Chosen for a Reason, Not a Package.
          </h2>
          <p className="text-lg leading-relaxed text-neutral-300">
            Six steps from first conversation to a running campaign you can
            actually read the results of.
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
