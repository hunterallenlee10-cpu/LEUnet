import { Receipt, BadgeCheck, KeyRound } from "lucide-react";

/**
 * How pricing works, in the owner's approved offer terms only (the same list
 * as `pricingPromise` in data/lee-systems.ts) plus site ownership. It replaced
 * the pay-after-the-build guarantee on 2026-09-28, when the owner stopped
 * offering it. State no payment timing, deposit, schedule or refund here: none
 * is set, and any that is must come from the owner.
 */
const terms = [
  {
    Icon: Receipt,
    title: "Flat quote up front",
    body: "One price for the build, and the quote is free.",
  },
  {
    Icon: BadgeCheck,
    title: "No hidden fees",
    body: "No revenue share and no required ad spend. You choose the contract terms.",
  },
  {
    Icon: KeyRound,
    title: "You own the site",
    body: "Your domain and your content are yours.",
  },
];

export function WebsitesPricingSection() {
  return (
    <section className="relative isolate py-20 md:py-28">
      <div className="section-container">
        <div className="mx-auto max-w-4xl rounded-xl border border-brass-400/30 bg-gradient-to-b from-brass-400/[0.08] to-transparent p-8 md:p-12">
          <div className="mb-10 text-center">
            <p className="mb-3 text-sm font-semibold text-brass-300">
              How pricing works
            </p>
            <h2 className="heading-lg text-white text-balance">
              No surprises on price.
            </h2>
          </div>

          <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {terms.map(({ Icon, title, body }) => (
              <li key={title} className="text-center">
                <Icon className="block mb-4 mx-auto h-7 w-7 text-brass-300" aria-hidden="true" />
                <h3 className="mb-2 font-bold text-white">{title}</h3>
                <p className="text-sm leading-relaxed text-neutral-400">{body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
