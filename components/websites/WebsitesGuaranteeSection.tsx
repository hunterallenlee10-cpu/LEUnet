import { ShieldCheck, Hammer, Eye, CreditCard } from "lucide-react";

/**
 * The "built before you pay" guarantee, spelled out as the order things happen
 * in. Stated once here in full; the hero, process and FAQ each refer back to
 * it in a line, and all four must say the same thing.
 */
const sequence = [
  {
    Icon: Hammer,
    title: "We build the whole site",
    body: "Every page, the copy, the forms. A working site, not a mockup.",
  },
  {
    Icon: Eye,
    title: "You review it on your phone",
    body: "Use it the way a customer will. We revise until it is right.",
  },
  {
    Icon: CreditCard,
    title: "Then you pay",
    body: "Only when you approve the finished site. Not happy? You owe nothing.",
  },
];

export function WebsitesGuaranteeSection() {
  return (
    <section className="relative isolate py-20 md:py-28">
      <div className="section-container">
        <div className="mx-auto max-w-4xl rounded-xl border border-brass-400/30 bg-gradient-to-b from-brass-400/[0.08] to-transparent p-8 md:p-12">
          <div className="mb-10 text-center">
            <ShieldCheck className="block mb-5 mx-auto h-7 w-7 text-brass-300" aria-hidden="true" />
            <p className="mb-3 text-sm font-semibold text-brass-300">
              Our guarantee
            </p>
            <h2 className="heading-lg mb-4 text-white">
              Your site is fully built before you pay anything.
            </h2>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-neutral-300">
              No deposit, no paying for a promise. You see exactly what you are
              buying before you buy it.
            </p>
          </div>

          <ol className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {sequence.map(({ Icon, title, body }, i) => (
              <li key={title} className="text-center">
                <Icon className="block mb-4 mx-auto h-7 w-7 text-brass-300" aria-hidden="true" />
                <h3 className="mb-2 font-bold text-white">
                  <span className="sr-only">Step {i + 1}: </span>
                  {title}
                </h3>
                <p className="text-sm leading-relaxed text-neutral-400">{body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
