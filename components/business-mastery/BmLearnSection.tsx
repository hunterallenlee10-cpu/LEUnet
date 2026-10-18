import { bmLearn } from "@/data/business-mastery";
import { BmRuns } from "@/components/business-mastery/BmRuns";

/**
 * "What you'll learn": after The Real World's section of that name (the
 * owner's reference, 2026-10-18), a centred column of text, plus the
 * subjects themselves as a row of chips so the heading's promise is answered
 * on the spot. The reference's "8am every day" is "the daily calls" here:
 * daily calls are a pillar of the program; a fixed hour is not.
 *
 * Carries a glow: the page alternates one (docs/BUSINESS-MASTERY.md §3).
 */
export function BmLearnSection() {
  return (
    <section className="relative isolate overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 z-0 section-fade" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(55% 45% at 50% 30%, rgb(var(--amber) / 0.07) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="section-container relative z-[1]">
        <div className="bm-reveal mx-auto max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] indent-[0.3em] text-neutral-500">
            {bmLearn.eyebrow}
          </p>
          <h2 className="text-4xl font-bold tracking-tight text-white md:text-6xl">
            {bmLearn.heading}
          </h2>

          <p className="mt-6 text-xl text-neutral-400">{bmLearn.lead}</p>
          <p className="mt-2 text-xl text-neutral-400 text-balance">
            <BmRuns runs={bmLearn.leadRuns} />
          </p>

          <div className="mt-8 space-y-6 text-lg leading-relaxed text-neutral-400 text-pretty">
            {bmLearn.paragraphs.map((runs, i) => (
              <p key={i}>
                <BmRuns runs={runs} />
              </p>
            ))}
          </div>
        </div>

        <ul className="bm-reveal mx-auto mt-14 flex max-w-4xl flex-wrap justify-center gap-3">
          {bmLearn.topics.map((topic) => (
            <li
              key={topic}
              className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-semibold text-neutral-300"
            >
              {topic}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
