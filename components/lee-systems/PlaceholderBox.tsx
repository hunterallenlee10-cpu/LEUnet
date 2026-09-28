import clsx from "clsx";

interface PlaceholderBoxProps {
  /** What belongs here, in the owner's terms. */
  label: string;
  /** Optional detail: what to supply, or where it comes from. */
  children?: React.ReactNode;
  /** Size and placement. Appended to the box's own classes, not merged. */
  className?: string;
}

/**
 * A visibly unfinished slot on a Lee Systems Co. page: a dashed box that says
 * PLACEHOLDER. Deliberately obvious rather than disguised as content, so an
 * empty proof section or portfolio can never be mistaken for a finished one,
 * and never ships a stand-in claim. Every instance is listed in
 * docs/LEE-SYSTEMS.md; search the repo for `PlaceholderBox` to find them all.
 */
export function PlaceholderBox({ label, children, className }: PlaceholderBoxProps) {
  return (
    <div
      className={clsx(
        "flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-neutral-700 bg-neutral-900/40 p-8 text-center",
        className
      )}
    >
      <span className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-neutral-400">
        Placeholder
      </span>
      <p className="font-semibold text-neutral-200">{label}</p>
      {children && (
        <p className="mt-2 max-w-md text-sm text-neutral-400">{children}</p>
      )}
    </div>
  );
}
