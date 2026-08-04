import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * The Lee Marketing Mastery logo, in the sizes the three LMM pages actually use.
 *
 * The mark appears repeatedly down each page - hero, a section eyebrow, a
 * divider above the FAQ, the closing panel, the form, the final CTA - so it is
 * worth having one component decide how it is drawn. Every instance is the same
 * circular crop at a size picked from this list, which is what keeps six
 * appearances reading as one brand rather than six separate decisions.
 *
 * `next.config.mjs` sets `images.unoptimized`, so the source PNG is served
 * as-is and every instance after the first is a cache hit. Extra placements
 * cost layout, not bandwidth.
 */
const sizeClasses = {
  /** Beside an uppercase section eyebrow. */
  xs: "h-7 w-7",
  /** Standalone on a divider rule. */
  sm: "h-10 w-10",
  /** Anchoring a closing panel or CTA block. */
  md: "h-14 w-14",
} as const;

/**
 * Intrinsic dimensions passed to `next/image` so it reserves the right box
 * before the PNG arrives. These track `sizeClasses`; change them together.
 */
const sizePixels: Record<keyof typeof sizeClasses, number> = {
  xs: 28,
  sm: 40,
  md: 56,
};

interface LmmMarkProps {
  size?: keyof typeof sizeClasses;
  className?: string;
}

/**
 * Decorative by default, and deliberately so. The hero, the consultation form
 * and the final CTA each name the venture in text next to or under their mark,
 * and the header names it again. A page that announced "Lee Marketing Mastery"
 * six times to a screen reader would be worse for the reader it is meant to
 * help, so these supporting marks stay silent. Any instance that ends up
 * somewhere with no adjacent brand name should render its own `Image` with a
 * real `alt` instead - `LmmFinalCTA` is the example.
 */
export function LmmMark({ size = "xs", className }: LmmMarkProps) {
  return (
    <Image
      src="/lee-marketing-mastery-logo.png"
      alt=""
      width={sizePixels[size]}
      height={sizePixels[size]}
      loading="lazy"
      className={cn("shrink-0 rounded-full", sizeClasses[size], className)}
    />
  );
}

/**
 * A hairline rule with the mark set into the middle of it, used to open a
 * section that would otherwise start cold on its eyebrow. The rules fade out at
 * both ends so the divider reads as a breath between sections rather than a
 * hard border - several sections already carry their own `border-y`, and two
 * stacked lines look like a mistake.
 */
export function LmmMarkDivider({ className }: { className?: string }) {
  return (
    <div
      className={cn("mx-auto flex max-w-md items-center gap-5", className)}
      aria-hidden="true"
    >
      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-amber-400/30" />
      <LmmMark size="sm" className="opacity-90" />
      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-amber-400/30" />
    </div>
  );
}
