import { BrainCircuit, HandCoins } from "lucide-react";
import { bmNewSkills } from "@/data/business-mastery";
import { BmCta } from "@/components/business-mastery/BmCta";

/**
 * "New skills": what gets added as business changes, after The Real World's
 * section of that name (the owner's reference, 2026-10-18). The band in the
 * middle shows one subject at a time over a faint circuit, cycling on CSS
 * alone (`.bm-cycle`); every subject is in the DOM, so a screen reader reads
 * the list and reduced motion shows the first one, still.
 *
 * Carries a glow: the page alternates one (docs/BUSINESS-MASTERY.md §3).
 */
export function BmNewSkillsSection() {
  const count = bmNewSkills.items.length;

  return (
    <section className="relative isolate overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 z-0 section-fade" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(50% 40% at 50% 50%, rgb(var(--amber) / 0.07) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="section-container relative z-[1]">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="inline-flex items-center gap-3 text-3xl font-bold uppercase tracking-tight text-white md:text-4xl">
            <HandCoins className="h-9 w-9 text-amber-400 md:h-10 md:w-10" aria-hidden="true" />
            {bmNewSkills.heading}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-neutral-400 text-balance">
            {bmNewSkills.description}
          </p>
        </div>

        <div className="bm-circuit relative mx-auto mt-12 max-w-4xl border-y border-white/10 py-10">
          <ul
            className="bm-cycle relative mx-auto h-20 max-w-md"
            style={{ ["--bm-cycle-count" as string]: count }}
          >
            {bmNewSkills.items.map((item, i) => (
              <li
                key={item.title}
                className="bm-cycle-item absolute inset-0 flex items-center justify-center gap-4"
                style={{ animationDelay: `${i * 3}s` }}
              >
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-amber-400/30 bg-amber-400/[0.06] text-amber-300">
                  <BrainCircuit className="h-7 w-7" aria-hidden="true" />
                </span>
                <span className="text-left">
                  <span className="block text-2xl font-bold text-white md:text-3xl">
                    {item.title}
                  </span>
                  <span className="block text-neutral-400">{item.note}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12">
          <BmCta note={bmNewSkills.ctaNote} />
        </div>
      </div>
    </section>
  );
}
