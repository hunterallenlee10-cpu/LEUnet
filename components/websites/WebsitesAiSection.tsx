import { Cpu, UserCheck } from "lucide-react";

const aiHandles = [
  "Drafting page copy from your business details",
  "Generating layout and design options to choose from",
  "Producing imagery and graphics",
  "Writing the underlying code",
  "Producing alternate versions to compare",
];

const peopleHandle = [
  "Deciding what the site needs to accomplish",
  "Editing and fact-checking every line of copy",
  "Choosing the final design direction",
  "Testing the site on real devices",
  "Approving it before anything goes live",
];

export function WebsitesAiSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="section-container">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-amber-400">
            How the AI Part Works
          </p>
          <h2 className="heading-lg mb-6 text-white">
            AI Does the Production. People Do the Judgment.
          </h2>
          <p className="text-lg leading-relaxed text-neutral-300">
            &ldquo;Built with AI&rdquo; is a real change to how fast the work
            gets done, not a claim that nobody is paying attention. Here is the
            actual division of labor.
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-amber-400/25 bg-gradient-to-b from-amber-400/[0.06] to-transparent p-6 md:p-8">
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-amber-400/40 bg-amber-400/10">
                <Cpu className="h-5 w-5 text-amber-400" aria-hidden="true" />
              </span>
              <h3 className="font-semibold text-white">AI handles</h3>
            </div>
            <ul className="space-y-3">
              {aiHandles.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm leading-relaxed text-neutral-300"
                >
                  <span
                    aria-hidden="true"
                    className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-amber-400"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-500/30 bg-slate-400/5">
                <UserCheck className="h-5 w-5 text-slate-300" aria-hidden="true" />
              </span>
              <h3 className="font-semibold text-white">We handle</h3>
            </div>
            <ul className="space-y-3">
              {peopleHandle.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm leading-relaxed text-neutral-300"
                >
                  <span
                    aria-hidden="true"
                    className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-slate-400"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-neutral-500">
          The result is standard web technology either way - these sites are
          built on Next.js and React, the same foundation as the pages below.
          What changes is how much of your budget goes to production time
          instead of to the finished product.
        </p>
      </div>
    </section>
  );
}
