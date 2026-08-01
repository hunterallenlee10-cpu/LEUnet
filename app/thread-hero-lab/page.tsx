import type { Metadata } from "next";
import { THREAD_PALETTE } from "@/data/thread";
import { ThreadHeroSection } from "@/components/thread/ThreadHeroSection";
import {
  THREAD_BACKDROP_LABELS,
  type ThreadHeroBackdropId,
} from "@/components/thread/ThreadHeroBackdrop";

/**
 * TEMPORARY. A side-by-side of the candidate Thread hero backdrops so one can
 * be chosen against the real type, buttons, and logo rather than a mockup.
 * Delete this route and the unused backdrops once a variant is picked.
 */
export const metadata: Metadata = {
  title: "Thread hero backdrop lab",
  robots: { index: false, follow: false },
};

const ORDER: ThreadHeroBackdropId[] = [
  "current",
  "stitch",
  "weave",
  "studio",
  "strands",
  "halftone",
];

export default async function ThreadHeroLabPage({
  searchParams,
}: {
  searchParams: Promise<{ v?: string }>;
}) {
  const { v } = await searchParams;
  const only = ORDER.includes(v as ThreadHeroBackdropId)
    ? (v as ThreadHeroBackdropId)
    : null;
  const shown = only ? [only] : ORDER;

  return (
    <div style={{ backgroundColor: THREAD_PALETTE.ink }}>
      {shown.map((id) => (
        <div key={id}>
          {/* Suppressed in single-variant mode so screenshots are clean. */}
          {only ? null : (
            <p
              className="section-container py-4 text-xs font-semibold uppercase tracking-[0.2em]"
              style={{ color: THREAD_PALETTE.champagne }}
            >
              {THREAD_BACKDROP_LABELS[id]}
            </p>
          )}
          <ThreadHeroSection backdrop={id} />
        </div>
      ))}
    </div>
  );
}
