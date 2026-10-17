import { BookOpen } from "lucide-react";
import {
  bmPillars,
  bmProgram,
  bmPageAction,
} from "@/data/business-mastery";
import { BmProgramShowcase } from "@/components/business-mastery/BmProgramShowcase";
import { pillarIcons } from "@/components/business-mastery/bmPillarIcons";

/**
 * Section 3 — what membership actually is, then the page's second "Apply".
 *
 * Six pillar cards until 2026-09-29, when the owner asked for less of a
 * cards-on-cards page: from lg up the pillars are an auto-stepping list beside
 * one large panel (BmProgramShowcase); below lg, where a list of tabs would
 * hide five of six descriptions behind taps, they are a plain numbered list
 * with hairlines between, no boxes. Same content either way.
 *
 * It sat at slot 2 until "The world is about to change" (BmShiftSection) took
 * that slot on 2026-09-29, and handed that slot its glow: the page alternates
 * one, and 3 is a plain slot.
 *
 * The Tools & Resources pillar (the one carrying a bullet list) came off at
 * the owner's request (2026-09-27). Its content is intact in the data file;
 * any pillar with `items` is still skipped here. `bmProgram.closer` came off
 * on 2026-09-07 and is intact in the data file too.
 *
 * The "Apply now" button moved here from "Who this is for" when that section
 * folded into BmShiftSection: this is now the first point where a visitor has
 * seen why, what, and who, and it keeps the owner's wording and look
 * (2026-09-28). A plain anchor to the form, like the hero's.
 */
export function BmProgramSection() {
  const pillars = bmPillars.filter((pillar) => !pillar.items);

  return (
    <section className="relative isolate py-20 md:py-28">
      <div className="section-container relative z-[1]">
        <div className="mx-auto mb-14 max-w-3xl text-center md:mb-16">
          <p className="bm-eyebrow">What Business Mastery actually is</p>
          <h2 className="heading-lg mb-4 text-white">{bmProgram.heading}</h2>
          <p className="text-lg text-neutral-400">{bmProgram.description}</p>
        </div>

        <div className="mx-auto hidden max-w-6xl lg:block">
          <BmProgramShowcase pillars={pillars} />
        </div>

        <ol className="mx-auto max-w-2xl lg:hidden">
          {pillars.map((pillar, i) => {
            const Icon = pillarIcons[pillar.id] ?? BookOpen;
            return (
              <li
                key={pillar.id}
                className="bm-reveal grid grid-cols-[auto_1fr] gap-x-5 border-t border-white/10 py-6 last:border-b"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-amber-400/30 bg-amber-400/[0.06] text-amber-300">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs font-semibold tabular-nums text-amber-400/80" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-0.5 text-lg font-bold text-white">{pillar.title}</h3>
                  <p className="mt-1.5 leading-relaxed text-neutral-400">{pillar.description}</p>
                </div>
              </li>
            );
          })}
        </ol>

        <div className="mt-14 flex justify-center md:mt-16">
          <a
            href={bmPageAction.href}
            className="inline-flex min-h-14 items-center justify-center rounded-lg bg-amber-400 px-10 py-5 text-lg font-bold uppercase tracking-[0.12em] text-neutral-950 shadow-[0_0_26px_-8px_rgb(var(--gold)/0.5)] transition-[color,background-color,box-shadow] duration-[260ms] hover:bg-amber-300 hover:shadow-[0_0_38px_-6px_rgb(var(--gold)/0.75)] focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-amber-400/85 focus-visible:shadow-[0_0_38px_-6px_rgb(var(--gold)/0.75)] max-sm:w-full sm:px-16 lg:px-20 lg:text-xl"
          >
            {/* "Apply now" here, at the owner's request (2026-09-28); the
                hero keeps "Apply to join". Once joining is by link, both
                follow `bmPageAction`. */}
            {bmPageAction.label === "Apply to join"
              ? "Apply now"
              : bmPageAction.label}
          </a>
        </div>
      </div>
    </section>
  );
}
