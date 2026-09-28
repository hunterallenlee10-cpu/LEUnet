import { ArrowRight, X, Check } from "lucide-react";

/**
 * The same five moments of a lead's life, twice: once handled by memory and
 * once by a system. Paired line for line so the reader compares like with like.
 */
const manualSteps = [
  "A lead calls while you are on a job",
  "Nobody calls back until the evening",
  "Intake details live in someone's inbox",
  "The quote goes out, then nothing",
  "The review never gets asked for",
];

const automatedSteps = [
  "The lead gets a reply in under a minute",
  "You get a text with who, what and when",
  "Intake answers land in your CRM",
  "Follow-ups go out until they say yes or no",
  "A review request sends when the job closes",
];

export function AutomationProblemSection() {
  return (
    <section className="relative isolate py-20 md:py-28">
      <div className="section-container">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold text-brass-300">
            The problem
          </p>
          <h2 className="heading-lg mb-6 text-white">
            Most lost business is not lost to a competitor. It is lost to a
            slow reply.
          </h2>
          <p className="text-lg leading-relaxed text-neutral-300">
            When follow-up depends on someone remembering, it slips on the busy
            weeks, which are exactly the weeks the most leads come in. We
            replace those steps with systems that run the same way every time.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 items-stretch gap-6 lg:grid-cols-[1fr_auto_1fr]">
          <div className="rounded-xl border border-white/10 bg-white/[0.04] p-6 md:p-8">
            <div className="mb-6 flex items-center gap-3">
              <X className="h-7 w-7 text-neutral-400" aria-hidden="true" />
              <h3 className="font-semibold text-neutral-300">Run on memory</h3>
            </div>
            <ol className="divide-y divide-white/5">
              {manualSteps.map((step, i) => (
                <li key={step} className="flex items-center gap-3 py-3">
                  <span className="font-mono text-xs text-neutral-500">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm text-neutral-400">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="flex items-center justify-center lg:px-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-brass-400/40 bg-brass-400/10">
              <ArrowRight
                className="h-5 w-5 rotate-90 text-brass-300 lg:rotate-0"
                aria-hidden="true"
              />
            </span>
          </div>

          <div className="rounded-xl border border-brass-400/30 bg-gradient-to-b from-brass-400/[0.07] to-transparent p-6 md:p-8">
            <div className="mb-6 flex items-center gap-3">
              <Check className="h-7 w-7 text-brass-300" aria-hidden="true" />
              <h3 className="font-semibold text-white">Run by a system</h3>
            </div>
            <ol className="divide-y divide-white/5">
              {automatedSteps.map((step, i) => (
                <li key={step} className="flex items-center gap-3 py-3">
                  <span className="font-mono text-xs text-brass-300/80">
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
