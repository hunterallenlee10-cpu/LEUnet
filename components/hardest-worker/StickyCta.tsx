"use client";

import { useEffect, useState } from "react";
import { BookCallLink } from "@/components/ui/BookCallLink";
import { trackHardestWorkerCta } from "@/components/hardest-worker/TrackCta";

/**
 * The slim "Book a free call" bar at the bottom of the screen on phones.
 * It shows once the hero's button has scrolled away and hides again as soon
 * as the closing call to action reaches the screen, so it never sits on top
 * of that section or the footer. Fixed and moved with a transform, so showing
 * or hiding it never shifts the page (no CLS). Hidden from `md` up, where the
 * header's button is always in reach. While hidden it is `inert`, so its link
 * can't be tabbed to.
 */
export function StickyCta({
  href,
  label,
  showAfterId,
  hideAtId,
}: {
  href: string;
  label: string;
  /** The element whose scrolling off the top shows the bar. */
  showAfterId: string;
  /** The element whose arrival on screen hides it. */
  hideAtId: string;
}) {
  const [pastStart, setPastStart] = useState(false);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const start = document.getElementById(showAfterId);
    const end = document.getElementById(hideAtId);
    if (!start || !end || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const above = entry.boundingClientRect.top < 0;
        if (entry.target === start) setPastStart(!entry.isIntersecting && above);
        // On screen, or already scrolled past (the footer is showing).
        if (entry.target === end) setAtEnd(entry.isIntersecting || above);
      }
    });
    observer.observe(start);
    observer.observe(end);
    return () => observer.disconnect();
  }, [showAfterId, hideAtId]);

  const visible = pastStart && !atEnd;

  return (
    <div
      aria-hidden={!visible}
      inert={!visible}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-neutral-950/95 px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur-sm transition-transform duration-300 motion-reduce:transition-none md:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <p className="min-w-0 text-sm font-semibold leading-snug text-white">{label}</p>
        <span className="contents" onClick={() => trackHardestWorkerCta("sticky")}>
          <BookCallLink href={href} className="shrink-0 whitespace-nowrap px-4 py-2 text-sm" />
        </span>
      </div>
    </div>
  );
}
