import Link from "next/link";
import { ArrowUpRight, Globe, Workflow } from "lucide-react";

const related = [
  {
    /**
     * Titled for the job the site does, matching the websites page and the
     * pill in `LmmSiblingLinks`. The old title advertised how the site was
     * produced, which is not what this card is arguing - the argument is that
     * a campaign is only as good as the page it lands on, and that reads
     * stronger now than it did when the destination was sold on build speed.
     * The detail keeps that substance and picks up the page's own terms:
     * loading, looking current, and an obvious next step.
     */
    href: "/lee-marketing-mastery/websites",
    Icon: Globe,
    title: "Websites That Convert",
    detail:
      "Marketing sends people somewhere. If that somewhere loads slowly, looks dated, or never makes the next step obvious, the spend leaks out at the last step.",
    cta: "See websites",
  },
  {
    href: "/lee-marketing-mastery/automation",
    Icon: Workflow,
    title: "Business Automation",
    detail:
      "A campaign that produces leads faster than you can answer them creates a new problem. Automated routing and follow-up is how that gets handled.",
    cta: "See automation",
  },
];

export function MarketingRelatedSection() {
  return (
    <section className="border-y border-white/10 bg-neutral-950/60 py-20 md:py-28">
      <div className="section-container">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-amber-400">
            Works With
          </p>
          <h2 className="heading-lg mb-6 text-white">
            Marketing Is One Third of the Problem.
          </h2>
          <p className="text-lg leading-relaxed text-neutral-300">
            Getting attention, converting it, and following up are three
            different jobs. You can hire us for one of them - plenty do - but
            they are worth more together than apart.
          </p>
        </div>

        <ul className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
          {related.map(({ href, Icon, title, detail, cta }) => (
            <li key={href}>
              <Link
                href={href}
                className="group flex h-full flex-col rounded-xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-colors duration-300 hover:border-amber-400/40 hover:bg-amber-400/[0.04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400 md:p-8"
              >
                <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg border border-amber-400/30 bg-amber-400/10">
                  <Icon className="h-5 w-5 text-amber-400" aria-hidden="true" />
                </span>

                <h3 className="mb-3 text-lg font-bold text-white">{title}</h3>
                <p className="mb-5 text-sm leading-relaxed text-neutral-400">
                  {detail}
                </p>

                <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-amber-400">
                  {cta}
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
