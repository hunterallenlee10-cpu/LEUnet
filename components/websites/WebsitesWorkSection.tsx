import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { websitePortfolio } from "@/data/websites";

export function WebsitesWorkSection() {
  return (
    <section
      id="website-work"
      className="scroll-mt-24 border-y border-white/10 bg-neutral-950/60 py-20 md:py-28"
    >
      <div className="section-container">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-amber-400">
            Work You Can Check Yourself
          </p>
          <h2 className="heading-lg mb-6 text-white">
            Every Site on This Domain Was Built This Way.
          </h2>
          <p className="text-lg leading-relaxed text-neutral-300">
            These are Lee Enterprises Unlimited&apos;s own ventures, not client
            projects - we are showing you our work rather than someone
            else&apos;s. Each one is live right now, so you can open it, use the
            forms, and judge the result on a real screen instead of a mockup.
          </p>
        </div>

        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {websitePortfolio.map(({ name, href, summary, highlights }) => (
            <li key={href}>
              <Link
                href={href}
                className="group flex h-full flex-col rounded-xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-colors duration-300 hover:border-amber-400/40 hover:bg-amber-400/[0.04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400 md:p-8"
              >
                <div className="mb-4 flex items-start justify-between gap-4">
                  <h3 className="text-lg font-bold text-white">{name}</h3>
                  <ArrowUpRight
                    className="h-5 w-5 shrink-0 text-amber-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </div>

                <p className="mb-5 text-sm leading-relaxed text-neutral-400">
                  {summary}
                </p>

                <ul className="mt-auto flex flex-wrap gap-2">
                  {highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-medium text-neutral-400"
                    >
                      {highlight}
                    </li>
                  ))}
                </ul>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
