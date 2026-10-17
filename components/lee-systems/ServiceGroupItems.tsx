"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";

/**
 * "See what's included" on a "What we do" card: a real <button> that shows
 * and hides the group's items as chips. It looks like the "See examples"
 * toggle on the "Who we help" cards, but is a button with `aria-expanded`
 * and `aria-controls` rather than a <details>, so the open state is spoken
 * the same way on every screen reader. Cards open independently, so two
 * groups can be compared side by side.
 *
 * The items are in the server-rendered HTML from the start, only `hidden`,
 * so they are there for search engines and for anyone without script.
 */
export function ServiceGroupItems({
  name,
  items,
}: {
  name: string;
  items: readonly string[];
}) {
  const [open, setOpen] = useState(false);
  const listId = useId();

  return (
    <div className="mt-3">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((o) => !o)}
        className="inline-flex min-h-11 items-center gap-1.5 rounded text-xs font-semibold tracking-[0.18em] text-brass-300 uppercase transition-colors hover:text-brass-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brass-300"
      >
        {open ? "Hide what's included" : "See what's included"}
        <span className="sr-only"> in {name}</span>
        <ChevronDown
          aria-hidden="true"
          className={`h-3.5 w-3.5 transition-transform duration-200 motion-reduce:transition-none ${open ? "rotate-180" : ""}`}
        />
      </button>

      <ul
        id={listId}
        hidden={!open}
        className="mt-1 mb-2 flex flex-wrap gap-2 border-t border-white/10 pt-4"
      >
        {items.map((item) => (
          <li
            key={item}
            className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[13px] leading-snug text-neutral-300"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
