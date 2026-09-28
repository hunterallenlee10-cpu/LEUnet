import clsx from "clsx";
import type { LucideIcon } from "lucide-react";

/**
 * A frame for something the owner will add later: the founder photo and
 * project walkthroughs. These show only while `site.showPlaceholders` is true
 * (the owner asked for them to stay visible, 2026-09-28), and each one gives
 * way to the real thing on its own once its value is filled in data/site.ts.
 */
export function ComingSoonSlot({
  label,
  Icon,
  className,
}: {
  label: string;
  Icon?: LucideIcon;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-white/15 bg-white/[0.02] p-6 text-center",
        className
      )}
    >
      {Icon && <Icon className="h-7 w-7 text-neutral-400" aria-hidden="true" />}
      <p className="text-sm text-neutral-400">{label}</p>
    </div>
  );
}
