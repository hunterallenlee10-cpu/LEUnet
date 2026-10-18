import Image from "next/image";
import { Compass, KeyRound, Users } from "lucide-react";
import { bmWayOut } from "@/data/business-mastery";
import { BmProofRow } from "@/components/business-mastery/BmProofRow";
import { BmRuns } from "@/components/business-mastery/BmRuns";

const featureIcons = [KeyRound, Compass, Users];

/**
 * "Business Mastery. Your way out.": the case for getting out, then the
 * owner's own track record, after The Real World's "Your only way out" and
 * the row of figures under it (the owner's reference, 2026-10-18). "Only" is
 * dropped on purpose; it is a claim nobody can stand behind. The reference's
 * four figures are the owner's three here (`bmProofPoints`, drawn by
 * BmProofRow, which was its own section until this one arrived).
 *
 * The reference's photo is a drawn panel: the LEU mark at the centre of what
 * a member plugs into, with light running out along each line.
 *
 * No glow layer: the page alternates one (docs/BUSINESS-MASTERY.md §3).
 */
export function BmWayOutSection() {
  return (
    <section className="relative isolate py-20 md:py-28">
      <div className="section-container">
        <div className="bm-reveal grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-4xl font-bold leading-[1.08] tracking-tight md:text-5xl">
              <span className="font-normal text-neutral-300">{bmWayOut.headingLead}</span>{" "}
              <span className="text-white">{bmWayOut.headingAccent}</span>
            </h2>
            <div className="mt-8 max-w-xl space-y-5 text-lg leading-relaxed text-neutral-400">
              {bmWayOut.paragraphs.map((runs, i) => (
                <p key={i}>
                  <BmRuns runs={runs} />
                </p>
              ))}
            </div>
          </div>

          <BmNetworkPanel />
        </div>

        <ul className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 text-center sm:grid-cols-3 md:mt-20">
          {bmWayOut.features.map((feature, i) => {
            const Icon = featureIcons[i] ?? KeyRound;
            return (
              <li key={feature.title}>
                <Icon className="mx-auto mb-3 h-6 w-6 text-amber-400" aria-hidden="true" />
                <p className="font-semibold text-white">{feature.title}</p>
                <p className="mt-1 text-sm text-neutral-400">{feature.body}</p>
              </li>
            );
          })}
        </ul>

        <div className="mt-16 md:mt-20">
          <BmProofRow />
        </div>
      </div>
    </section>
  );
}

/** Decorative: what a member plugs into, around the LEU mark. */
function BmNetworkPanel() {
  const nodes = bmWayOut.panelNodes;
  const points = nodes.map((label, i) => {
    const angle = (-90 + (360 / nodes.length) * i) * (Math.PI / 180);
    return {
      label,
      x: 50 + 36 * Math.cos(angle),
      y: 50 + 36 * Math.sin(angle),
    };
  });

  return (
    <div className="bm-shift-panel relative aspect-square w-full" aria-hidden="true">
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
        <circle cx="50" cy="50" r="36" fill="none" stroke="rgb(var(--ink))" strokeOpacity="0.08" strokeWidth="0.3" />
        <circle cx="50" cy="50" r="22" fill="none" stroke="rgb(var(--amber))" strokeOpacity="0.12" strokeWidth="0.3" strokeDasharray="1 1.5" />
        {points.map((p, i) => (
          <g key={p.label}>
            <line x1="50" y1="50" x2={p.x} y2={p.y} stroke="rgb(var(--ink))" strokeOpacity="0.12" strokeWidth="0.35" />
            <line
              x1="50"
              y1="50"
              x2={p.x}
              y2={p.y}
              stroke="rgb(var(--amber))"
              strokeWidth="0.7"
              strokeLinecap="round"
              pathLength={1}
              className="bm-net-pulse"
              style={{ animationDelay: `${i * 0.7}s` }}
            />
          </g>
        ))}
      </svg>

      <div className="absolute left-1/2 top-1/2 flex h-[26%] w-[26%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-amber-400/30 bg-neutral-950 shadow-[0_0_60px_-10px_rgb(var(--amber)/0.45)]">
        <div className="relative h-[62%] w-[62%]">
          <Image src="/logos/leu-mark.webp" alt="" fill sizes="96px" className="object-contain" />
        </div>
      </div>

      {points.map((p, i) => (
        <span
          key={p.label}
          className="bm-net-node absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-white/10 bg-neutral-900 px-3 py-1.5 text-xs font-semibold text-neutral-300 sm:text-sm"
          style={{ left: `${p.x}%`, top: `${p.y}%`, animationDelay: `${i * 0.7}s` }}
        >
          {p.label}
        </span>
      ))}
    </div>
  );
}
