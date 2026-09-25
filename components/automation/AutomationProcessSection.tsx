import { LeeSystemsMark } from "@/components/lee-systems/LeeSystemsMark";
import { automationAudit } from "@/data/lee-systems";

/**
 * How the audit works, from the form to a finished system. The first three
 * steps are the audit itself and cost nothing; the fourth is only if the owner
 * decides to go ahead.
 */
const steps = [
  {
    number: "01",
    title: "Tell us what eats your time",
    body: `Fill in the short form below. We reply within ${automationAudit.responseTime} to set up a call.`,
  },
  {
    number: "02",
    title: "We walk through your process",
    body: "A short call: how leads come in, what happens next, and where things get dropped or retyped.",
  },
  {
    number: "03",
    title: "You get a written plan",
    body: `Within ${automationAudit.turnaround}: what is worth automating, in what order, how long each piece takes, and what it costs.`,
  },
  {
    number: "04",
    title: "We build it, if you want us to",
    body: "No obligation. If you go ahead, we build, test and launch each system, then show your team how it works.",
  },
];

export function AutomationProcessSection() {
  return (
    <section className="border-y border-white/10 bg-neutral-950/60 py-20 md:py-28">
      <div className="section-container">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <p className="mb-3 flex items-center justify-center gap-2.5 text-sm font-semibold uppercase tracking-widest text-brass-300">
            <LeeSystemsMark />
            How the {automationAudit.name} Works
          </p>
          <h2 className="heading-lg mb-6 text-white">
            {automationAudit.price}, written, and yours to keep
          </h2>
          <p className="text-lg leading-relaxed text-neutral-300">
            The audit is a real plan, not a sales call. Use it with us, with
            someone else, or on your own.
          </p>
        </div>

        <ol className="relative grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <span
            aria-hidden="true"
            className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-brass-400/30 to-transparent lg:block"
          />

          {steps.map(({ number, title, body }) => (
            <li key={number} className="relative">
              <span className="relative z-10 mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-brass-400/40 bg-neutral-950 font-mono text-sm font-bold text-brass-300">
                {number}
              </span>
              <h3 className="mb-3 text-lg font-bold text-white">{title}</h3>
              <p className="text-sm leading-relaxed text-neutral-400">{body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
