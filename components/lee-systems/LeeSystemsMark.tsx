import { cn } from "@/lib/utils";

/**
 * The Lee Systems Co. mark: an "LS" monogram in a brass-edged square.
 *
 * PLACEHOLDER for a real logo. There is no logo file yet, so the mark is drawn
 * in type rather than shipped as an image, which keeps it sharp at every size
 * and keeps it from looking like a finished logo someone forgot to swap. When
 * a logo exists, replace the body of `LeeSystemsMark` with an `Image` and keep
 * the size scale; every placement on the three pages goes through here.
 * docs/LEE-SYSTEMS.md lists this with the other placeholders.
 *
 * Square rather than the old circular crop: the brand is "systems", and a
 * squared-off frame reads as built rather than badged.
 */
const sizeClasses = {
  /** Beside an uppercase section eyebrow. */
  xs: "h-7 w-7 text-[10px] rounded-md",
  /** Standalone on a divider rule. */
  sm: "h-10 w-10 text-xs rounded-md",
  /** Anchoring a hero or closing panel. */
  md: "h-14 w-14 text-base rounded-lg",
} as const;

interface LeeSystemsMarkProps {
  size?: keyof typeof sizeClasses;
  className?: string;
}

/**
 * Decorative: every placement sits beside the name in text, so the mark is
 * hidden from screen readers rather than announcing the brand a second time.
 */
export function LeeSystemsMark({ size = "xs", className }: LeeSystemsMarkProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex shrink-0 select-none items-center justify-center border border-brass-400/60 bg-brass-400/10 font-bold tracking-wider text-brass-300",
        sizeClasses[size],
        className
      )}
    >
      LS
    </span>
  );
}

/**
 * A hairline rule with the mark set into the middle of it, used to open a
 * section that would otherwise start cold on its eyebrow. The rules fade out at
 * both ends so it reads as a pause between sections rather than a border.
 */
export function LeeSystemsMarkDivider({ className }: { className?: string }) {
  return (
    <div
      className={cn("mx-auto flex max-w-md items-center gap-5", className)}
      aria-hidden="true"
    >
      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-brass-400/30" />
      <LeeSystemsMark size="sm" />
      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-brass-400/30" />
    </div>
  );
}
