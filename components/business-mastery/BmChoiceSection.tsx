import { Check, ShieldCheck, TriangleAlert } from "lucide-react";
import { bmChoice, bmPageAction } from "@/data/business-mastery";
import { site } from "@/data/site";
import { BmCta } from "@/components/business-mastery/BmCta";
import { BmRuns } from "@/components/business-mastery/BmRuns";

/**
 * "The choice is yours": a "Take action" card beside "Or do nothing...",
 * then the decision, after The Real World's closing pair (the owner's
 * reference, 2026-10-18). It sits directly above the member offer and the
 * form, so every button here is a short scroll.
 *
 * What the reference has and this does not, on purpose (§6 of
 * docs/BUSINESS-MASTERY.md):
 *  - A price. The card shows `site.businessMastery.price` once the owner sets
 *    it, and nothing until then.
 *  - "Lock in your price before it increases" and the price it rises to.
 *    No increase is planned, so it would be false urgency. The card's line
 *    says what is true instead: applying is free.
 *  - A member count under the last button. `BmCta`'s default line, the
 *    hero's three facts, stands in for it, as everywhere on the page.
 *
 * No glow layer of its own: the page alternates one, and this is a plain
 * slot; the warning icon carries a small one.
 */
export function BmChoiceSection() {
  const { action, nothing, decision } = bmChoice;

  return (
    <section className="relative isolate py-20 md:py-28">
      <div className="section-container">
        <h2 className="mb-10 text-4xl font-light uppercase tracking-tight text-white md:mb-14 md:text-5xl">
          {bmChoice.heading}
        </h2>

        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="bm-reveal rounded-2xl border border-white/10 bg-neutral-900 px-7 py-10 text-center shadow-[0_30px_80px_-40px_rgb(0_0_0/0.9)] md:px-12">
            <h3 className="text-3xl font-bold uppercase tracking-tight text-white md:text-4xl">
              {action.heading}
            </h3>
            <p className="mt-1 text-lg font-semibold text-white">{action.subheading}</p>

            {site.businessMastery.price && (
              <p className="mt-6 text-2xl font-bold text-amber-400">
                {site.businessMastery.price}
              </p>
            )}

            <ul className="mx-auto mt-8 w-fit space-y-3.5 text-left text-lg text-neutral-300">
              {action.items.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <Check className="h-5 w-5 shrink-0 text-amber-400" strokeWidth={3} aria-hidden="true" />
                  {item}
                </li>
              ))}
              <li className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 shrink-0 text-amber-400" aria-hidden="true" />
                {action.guarantee}
              </li>
            </ul>

            <a
              href={bmPageAction.href}
              className="mt-10 inline-flex min-h-14 items-center justify-center rounded-lg bg-amber-400 px-10 py-4 text-base font-bold uppercase tracking-[0.12em] bm-cta-glow text-neutral-950 transition-[color,background-color,box-shadow] duration-[260ms] hover:bg-amber-300 focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-amber-400/85 max-sm:w-full md:text-lg"
            >
              {bmPageAction.label}
            </a>
            <p className="mt-4 text-sm text-neutral-400">{action.note}</p>
          </div>

          <div className="bm-reveal text-center lg:text-left">
            <h3 className="text-3xl font-bold uppercase tracking-tight text-white md:text-4xl">
              {nothing.heading}
            </h3>
            <div className="mt-4 space-y-1 text-lg text-neutral-300">
              {nothing.lines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
            <div className="mt-8 space-y-6 text-lg leading-relaxed text-neutral-500">
              {nothing.paragraphs.map((runs, i) => (
                <p key={i}>
                  <BmRuns runs={runs} />
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="mx-auto mt-20 max-w-3xl text-center md:mt-28">
          <div className="relative mx-auto mb-8 flex h-20 w-20 items-center justify-center">
            <span
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "radial-gradient(closest-side, rgb(var(--amber) / 0.25), transparent)",
              }}
              aria-hidden="true"
            />
            <TriangleAlert className="relative h-12 w-12 text-amber-400" aria-hidden="true" />
          </div>
          <h3 className="text-3xl font-bold uppercase tracking-tight text-white md:text-5xl">
            {decision.heading}
          </h3>
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-neutral-400 text-balance">
            {decision.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <div className="mt-10">
            <BmCta />
          </div>
        </div>
      </div>
    </section>
  );
}
