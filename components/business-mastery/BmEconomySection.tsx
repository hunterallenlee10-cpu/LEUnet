import { Rocket, ShieldCheck, TrendingUp } from "lucide-react";
import { bmEconomy } from "@/data/business-mastery";
import { BmCta } from "@/components/business-mastery/BmCta";
import { BmRuns } from "@/components/business-mastery/BmRuns";

const featureIcons = [TrendingUp, Rocket, ShieldCheck];

/**
 * "Dominate the new economy with Business Mastery": why this matters now,
 * after The Real World's section of that name (the owner's reference,
 * 2026-10-18). The reference's abstract image is a drawn chart here, the old
 * way sliding as the new one climbs. It carries no figures: the axes are
 * unlabelled on purpose, so it reads as a picture of the argument and not as
 * data.
 *
 * Carries a glow: the page alternates one (docs/BUSINESS-MASTERY.md §3).
 */
export function BmEconomySection() {
  return (
    <section className="relative isolate overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 z-0 section-fade" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 40% at 30% 50%, rgb(var(--amber) / 0.07) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="section-container relative z-[1]">
        <div className="mx-auto mb-14 max-w-4xl text-center md:mb-20">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] indent-[0.3em] text-neutral-500">
            {bmEconomy.eyebrow}
          </p>
          <h2 className="text-4xl font-bold tracking-tight text-white text-balance md:text-6xl">
            {bmEconomy.headingLead}{" "}
            <span className="text-amber-400">{bmEconomy.headingAccent}</span>
          </h2>
        </div>

        <div className="bm-reveal grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <BmShiftChart />
          <div>
            <h3 className="text-2xl text-neutral-300 md:text-3xl">
              <BmRuns runs={bmEconomy.subheading} />
            </h3>
            <div className="mt-6 max-w-xl space-y-5 text-lg leading-relaxed text-neutral-400">
              {bmEconomy.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
        </div>

        <ul className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 text-center sm:grid-cols-3 md:mt-20">
          {bmEconomy.features.map((feature, i) => {
            const Icon = featureIcons[i] ?? TrendingUp;
            return (
              <li key={feature.title}>
                <Icon className="mx-auto mb-3 h-6 w-6 text-amber-400" aria-hidden="true" />
                <p className="font-semibold text-white">{feature.title}</p>
                <p className="mt-1 text-sm text-neutral-400">{feature.body}</p>
              </li>
            );
          })}
        </ul>

        <div className="mt-14 md:mt-16">
          <BmCta />
        </div>
      </div>
    </section>
  );
}

/** Decorative: the old way falls, the new way climbs, both drawing in. */
function BmShiftChart() {
  return (
    <div className="bm-shift-panel aspect-square w-full p-6 md:p-8" aria-hidden="true">
      <div className="flex items-center gap-5 text-xs font-semibold uppercase tracking-[0.16em]">
        <span className="inline-flex items-center gap-2 text-neutral-500">
          <span className="h-0.5 w-5 rounded bg-neutral-600" />
          The old way
        </span>
        <span className="inline-flex items-center gap-2 text-amber-400">
          <span className="h-0.5 w-5 rounded bg-amber-400" />
          The new way
        </span>
      </div>
      <svg viewBox="0 0 400 340" className="mt-4 h-[calc(100%-2rem)] w-full overflow-visible">
        <defs>
          <linearGradient id="bm-chart-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgb(var(--amber))" stopOpacity="0.22" />
            <stop offset="100%" stopColor="rgb(var(--amber))" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[60, 140, 220, 300].map((y) => (
          <line key={y} x1="0" x2="400" y1={y} y2={y} stroke="rgb(var(--ink))" strokeOpacity="0.07" />
        ))}
        <path
          d="M0 90 C 60 80, 110 95, 160 130 S 260 230, 320 270 S 380 300, 400 305"
          fill="none"
          stroke="var(--color-neutral-600)"
          strokeWidth="3"
          strokeDasharray="7 7"
          className="bm-chart-line"
        />
        <path
          d="M0 300 C 70 298, 120 285, 170 250 S 260 140, 310 95 S 375 40, 400 30 L 400 340 L 0 340 Z"
          fill="url(#bm-chart-fill)"
          className="bm-chart-area"
        />
        <path
          d="M0 300 C 70 298, 120 285, 170 250 S 260 140, 310 95 S 375 40, 400 30"
          fill="none"
          stroke="rgb(var(--amber))"
          strokeWidth="4"
          strokeLinecap="round"
          pathLength={1}
          className="bm-chart-draw"
        />
        <circle cx="400" cy="30" r="6" fill="rgb(var(--amber))" className="bm-chart-dot" />
      </svg>
    </div>
  );
}
