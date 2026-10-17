import { Bot, Hourglass, Lightbulb, Rocket, Route, Sparkles, TrendingUp } from "lucide-react";
import { BmAiWindow } from "@/components/business-mastery/BmAiWindow";
import { BmYearClock } from "@/components/business-mastery/BmYearClock";
import {
  bmAudienceHeading,
  bmAudienceSubheading,
  bmAudiences,
  bmShift,
} from "@/data/business-mastery";

const rowIcons = {
  time: Hourglass,
  ai: Bot,
  "way-out": Route,
} as const;

const stageIcons: Record<string, typeof Lightbulb> = {
  starting: Lightbulb,
  early: Rocket,
  growing: TrendingUp,
};

/**
 * Section 2 — "The world is about to change": why now, in three alternating
 * rows (the owner's reference layout, 2026-09-29; see `bmShift`). Text on one
 * side, a live panel on the other, swapping sides each row from lg up and
 * stacking text-first below it.
 *
 * It replaced "Who this is for" (BmAudienceSection, deleted): the third row's
 * panel is that section's three stages drawn as a lit path, headed by its
 * heading and closed by its subheading, both the owner's lines verbatim.
 *
 * The panels are the motion: a year clock and an AI window (client
 * components, both decorative) and the path, whose light runs on CSS. Rows
 * rise in as they scroll into view (`.bm-reveal`, a scroll-driven animation,
 * so nothing is ever hidden waiting on JS). Everything holds still under
 * reduced motion.
 *
 * Carries the page's slot-2 glow (docs/BUSINESS-MASTERY.md §3).
 */
export function BmShiftSection() {
  return (
    <section className="relative isolate overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 z-0 section-fade" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 40% at 50% 8%, rgba(251, 191, 36, 0.08) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="section-container relative z-[1]">
        <div className="mx-auto mb-16 max-w-3xl text-center md:mb-24">
          <p className="bm-pill mx-auto mb-5">
            <span className="bm-pill-badge">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              {bmShift.eyebrow}
            </span>
            <span className="pr-1">Business Mastery</span>
          </p>
          <h2 className="heading-lg text-white text-balance">{bmShift.heading}</h2>
        </div>

        <div className="space-y-20 md:space-y-28">
          {bmShift.rows.map((row, index) => {
            const Icon = rowIcons[row.id];
            const flip = index % 2 === 1;
            return (
              <article
                key={row.id}
                aria-labelledby={`bm-shift-${row.id}`}
                className="bm-reveal grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16"
              >
                <div className={flip ? "lg:order-2" : undefined}>
                  <p className="bm-pill mb-6">
                    <span className="bm-pill-icon">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="pr-1">{row.label}</span>
                  </p>
                  <h3
                    id={`bm-shift-${row.id}`}
                    className="text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl"
                  >
                    <span className="block text-neutral-500">{row.dim}</span>
                    <span className="block text-white">{row.bright}</span>
                  </h3>
                  <p className="mt-6 max-w-xl text-lg leading-relaxed text-neutral-400">
                    {row.body.map((run, i) =>
                      "strong" in run && run.strong ? (
                        <strong key={i} className="font-semibold text-white">
                          {run.text}
                        </strong>
                      ) : (
                        <span key={i}>{run.text}</span>
                      )
                    )}
                  </p>
                </div>

                <div className={flip ? "lg:order-1" : undefined}>
                  {row.id === "time" && <BmYearClock />}
                  {row.id === "ai" && <BmAiWindow />}
                  {row.id === "way-out" && <BmPathPanel />}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/**
 * The three stages as a path, top to bottom, with a light running down the
 * line and each stop glowing as it passes. Real content (the stages are who
 * the program is for), so unlike the other two panels it is not aria-hidden.
 */
function BmPathPanel() {
  return (
    <div className="bm-shift-panel px-6 py-7 md:px-8 md:py-8">
      <h4 className="text-xl font-bold text-white md:text-2xl">{bmAudienceHeading}</h4>

      <ol className="mt-7 space-y-7">
        {bmAudiences.map((stage, i) => {
          const StageIcon = stageIcons[stage.id] ?? Lightbulb;
          const delay = { animationDelay: `${i * 1.2}s` };
          return (
            <li key={stage.id} className="relative flex gap-5">
              {/* The link down to the next stop, with the light that runs
                  along it; the stop glows as the light reaches it. */}
              {i < bmAudiences.length - 1 && (
                <span className="bm-path-link" aria-hidden="true">
                  <span className="bm-path-light" style={delay} />
                </span>
              )}
              <span className="bm-path-node" style={delay} aria-hidden="true">
                <StageIcon className="h-5 w-5" />
              </span>
              <div className="pt-1.5">
                <p className="text-lg font-bold text-white">{stage.title}</p>
                <p className="mt-1 leading-relaxed text-neutral-400">{stage.description}</p>
              </div>
            </li>
          );
        })}
      </ol>

      <p className="mt-8 border-t border-white/10 pt-5 text-sm italic text-neutral-500">
        {bmAudienceSubheading}
      </p>
    </div>
  );
}
