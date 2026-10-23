import { Check, X } from "lucide-react";
import { bmIntro } from "@/data/business-mastery";
import { BmCta } from "@/components/business-mastery/BmCta";
import { BmRuns } from "@/components/business-mastery/BmRuns";

/**
 * "Master the skills that build a business" and "A modern approach to
 * business education": two alternating rows, text beside a panel, after The
 * Real World's opening pair (the owner's reference, 2026-10-18). The
 * reference's photos are drawn panels here, the way the "why now" rows drew
 * theirs: a skill stack filling in, and the old route against this one.
 *
 * No glow layer: the page alternates one, and this is a plain slot
 * (docs/BUSINESS-MASTERY.md §3). Server component; the motion is CSS.
 */
export function BmIntroSection() {
  return (
    <section className="relative isolate py-20 md:py-28">
      <div className="section-container space-y-24 md:space-y-32">
        <article
          aria-labelledby="bm-intro-skills"
          className="bm-reveal grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16"
        >
          <div>
            <h2
              id="bm-intro-skills"
              className="text-4xl font-bold leading-[1.08] tracking-tight text-white md:text-5xl"
            >
              <span className="block text-balance">{bmIntro.skills.headingLines[0]}</span>{" "}
              <span className="relative inline-block pb-3">
                {bmIntro.skills.headingLines[1]}
                <svg
                  className="absolute -bottom-1 left-0 h-3 w-full text-amber-400/50"
                  viewBox="0 0 300 12"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2 8 C 40 2, 70 12, 110 6 S 190 2, 230 7 S 280 9, 298 5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h2>
            <div className="mt-8 max-w-xl space-y-5 text-lg leading-relaxed text-neutral-400">
              {bmIntro.skills.paragraphs.map((runs, i) => (
                <p key={i}>
                  <BmRuns runs={runs} />
                </p>
              ))}
            </div>
          </div>

          <BmSkillStack />
        </article>

        <article
          aria-labelledby="bm-intro-modern"
          className="bm-reveal grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16"
        >
          <div className="lg:order-2">
            <h2
              id="bm-intro-modern"
              className="text-4xl font-bold leading-[1.08] tracking-tight text-white md:text-5xl"
            >
              <span className="block">{bmIntro.modern.headingLines[0]}</span>{" "}
              <span className="block">{bmIntro.modern.headingLines[1]}</span>
            </h2>
            <div className="mt-8 max-w-xl space-y-5 text-lg leading-relaxed text-neutral-400">
              {bmIntro.modern.paragraphs.map((runs, i) => (
                <p key={i}>
                  <BmRuns runs={runs} />
                </p>
              ))}
            </div>
            <div className="mt-10">
              <BmCta align="start" />
            </div>
          </div>

          <div className="lg:order-1">
            <BmCompare />
          </div>
        </article>
      </div>
    </section>
  );
}

/** Decorative: each subject's bar fills in turn, on a loop. */
function BmSkillStack() {
  return (
    <div className="bm-shift-panel px-6 py-7 md:px-9 md:py-9" aria-hidden="true">
      <div className="mb-7 flex items-center justify-between">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-neutral-500">
          Your skill stack
        </p>
        <span className="bm-pill text-xs">
          <span className="bm-live-dot rounded-full bg-amber-400" />
          <span className="pr-1">Leveling up</span>
        </span>
      </div>
      <ul className="space-y-6">
        {bmIntro.skillsPanel.map((skill, i) => (
          <li key={skill}>
            <div className="mb-2 flex items-baseline justify-between">
              <span className="font-semibold text-white">{skill}</span>
              <span className="bm-skill-check text-xs font-semibold uppercase tracking-[0.14em] text-amber-400" style={{ animationDelay: `${i * 0.9}s` }}>
                Learned
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/[0.06]">
              <div
                className="bm-skill-bar h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-300"
                style={{ animationDelay: `${i * 0.9}s` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Real content: the old route against this one. */
function BmCompare() {
  const { old, bm } = bmIntro.compare;
  return (
    <div className="bm-shift-panel grid grid-cols-1 sm:grid-cols-2">
      <div className="border-b border-white/10 px-6 py-7 sm:border-b-0 sm:border-r md:px-8 md:py-9">
        <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-neutral-500">
          {old.label}
        </h3>
        <ul className="mt-6 space-y-5">
          {old.items.map((item) => (
            <li key={item} className="flex items-start gap-3 text-neutral-500">
              <X className="mt-0.5 h-5 w-5 shrink-0 text-neutral-600" aria-hidden="true" />
              <span className="line-through decoration-neutral-700">{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="px-6 py-7 md:px-8 md:py-9">
        <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-400">
          {bm.label}
        </h3>
        <ul className="mt-6 space-y-5">
          {bm.items.map((item) => (
            <li key={item} className="flex items-start gap-3 font-semibold text-white">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" strokeWidth={2.5} aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
