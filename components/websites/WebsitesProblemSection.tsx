import { ArrowRight, X, Check } from "lucide-react";

const oldWay = [
  "Wait weeks for a first draft",
  "Pay for every revision round",
  "Write all the copy yourself",
  "Source your own photos",
  "Launch months behind schedule",
];

const newWay = [
  "See a real draft in days",
  "Revise quickly, not expensively",
  "Get copy drafted for your review",
  "Get imagery produced for you",
  "Launch while it still matters",
];

export function WebsitesProblemSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="section-container">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-amber-400">
            Why Website Projects Stall
          </p>
          <h2 className="heading-lg mb-6 text-white">
            Most Businesses Do Not Need a Six-Month Website Project.
          </h2>
          <p className="mb-4 text-lg leading-relaxed text-neutral-300">
            The traditional build is slow for reasons that have little to do with
            the website itself. Projects stall waiting on copy that was never
            written, photos that were never taken, and revision rounds that are
            billed by the hour.
          </p>
          <p className="text-lg leading-relaxed text-neutral-400">
            AI-assisted production removes the slowest parts of that process. The
            judgment, the review, and the final approval stay with people.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 items-stretch gap-6 lg:grid-cols-[1fr_auto_1fr]">
          {/* Traditional */}
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-700 bg-neutral-900">
                <X className="h-4 w-4 text-neutral-500" aria-hidden="true" />
              </span>
              <h3 className="font-semibold text-neutral-300">
                The traditional build
              </h3>
            </div>
            <ol className="space-y-3">
              {oldWay.map((step, i) => (
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

          {/* AI-assisted */}
          <div className="rounded-xl border border-amber-400/30 bg-gradient-to-b from-amber-400/[0.07] to-transparent p-6 md:p-8">
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-amber-400/40 bg-amber-400/10">
                <Check className="h-4 w-4 text-amber-400" aria-hidden="true" />
              </span>
              <h3 className="font-semibold text-white">
                Built with AI assistance
              </h3>
            </div>
            <ol className="space-y-3">
              {newWay.map((step, i) => (
                <li
                  key={step}
                  className="relative flex items-center gap-3 rounded-lg border border-white/10 bg-neutral-900/70 px-4 py-3"
                >
                  {i !== newWay.length - 1 && (
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
