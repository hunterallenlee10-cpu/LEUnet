import { ArrowRight, X, Check } from "lucide-react";

const manualSteps = [
  "Search manually",
  "Copy information",
  "Update spreadsheets",
  "Remember to follow up",
  "Lose track of opportunities",
];

const automatedSteps = [
  "Find qualified opportunities",
  "Organize relevant information",
  "Route leads into the correct system",
  "Trigger follow-up actions",
  "Track progress and results",
];

export function LmmProblemSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="section-container">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-amber-400">
            The Cost of Manual Work
          </p>
          <h2 className="heading-lg mb-6 text-white">
            Your Business Should Not Depend on Repetitive Tasks.
          </h2>
          <p className="mb-4 text-lg leading-relaxed text-neutral-300">
            Many growing businesses lose valuable time and revenue because their
            most important processes still depend on manual research,
            disconnected spreadsheets, inconsistent follow-up, and information
            that must be entered more than once.
          </p>
          <p className="text-lg leading-relaxed text-neutral-400">
            Lee Marketing Mastery identifies those bottlenecks and replaces them
            with reliable systems designed around the way your business actually
            operates.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 items-stretch gap-6 lg:grid-cols-[1fr_auto_1fr]">
          {/* Manual */}
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-700 bg-neutral-900">
                <X className="h-4 w-4 text-neutral-500" aria-hidden="true" />
              </span>
              <h3 className="font-semibold text-neutral-300">
                Disconnected and manual
              </h3>
            </div>
            <ol className="space-y-3">
              {manualSteps.map((step, i) => (
                <li
                  key={step}
                  className="flex items-center gap-3 rounded-lg border border-dashed border-neutral-800 bg-neutral-900/40 px-4 py-3"
                >
                  <span className="font-mono text-xs text-neutral-600">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm text-neutral-400">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Divider */}
          <div className="flex items-center justify-center lg:px-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-amber-400/40 bg-amber-400/10">
              <ArrowRight
                className="h-5 w-5 rotate-90 text-amber-400 lg:rotate-0"
                aria-hidden="true"
              />
            </span>
          </div>

          {/* Automated */}
          <div className="rounded-xl border border-amber-400/30 bg-gradient-to-b from-amber-400/[0.07] to-transparent p-6 md:p-8">
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-amber-400/40 bg-amber-400/10">
                <Check className="h-4 w-4 text-amber-400" aria-hidden="true" />
              </span>
              <h3 className="font-semibold text-white">
                Connected and automated
              </h3>
            </div>
            <ol className="space-y-3">
              {automatedSteps.map((step, i) => (
                <li
                  key={step}
                  className="relative flex items-center gap-3 rounded-lg border border-white/10 bg-neutral-900/70 px-4 py-3"
                >
                  {i !== automatedSteps.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="absolute bottom-[-13px] left-8 h-3 w-px bg-amber-400/40"
                    />
                  )}
                  <span className="font-mono text-xs text-amber-400/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm text-neutral-200">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
