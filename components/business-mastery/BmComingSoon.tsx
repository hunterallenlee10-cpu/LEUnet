import { Hourglass } from "lucide-react";

/**
 * The one marker for content the page is honest about not having yet — the
 * journey chapters and the full founder story (the guarantee's legal terms
 * used it until 2026-09-27).
 * docs/BUSINESS-MASTERY.md §7 lists the three places it may appear; a fourth
 * use probably means content is being deferred that should just be written.
 *
 * Quiet by design: an amber-outlined badge with an explanatory line, so an
 * unfinished section reads as intentional rather than broken.
 */
export function BmComingSoon({ note }: { note: string }) {
  return (
    <div className="inline-flex flex-col items-center gap-3 sm:flex-row sm:items-center sm:gap-4">
      <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-amber-400/40 bg-amber-400/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-amber-300">
        <Hourglass className="h-3.5 w-3.5" aria-hidden="true" />
        Coming Soon
      </span>
      <p className="text-sm text-neutral-400">{note}</p>
    </div>
  );
}
