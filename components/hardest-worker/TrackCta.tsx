"use client";

import type { ReactNode } from "react";
import { track } from "@vercel/analytics";
import type { CtaLocation } from "@/data/hardest-worker";

/** The Vercel Analytics event for a "Book a free call" click on this page. */
export function trackHardestWorkerCta(location: CtaLocation) {
  track("book_call_click", { page: "hardest-worker", location });
}

/**
 * Wraps one "Book a free call" so a click on it is counted in Vercel
 * Analytics with where on the page it sits. `display: contents`, so the
 * wrapper adds nothing to the layout; the link inside stays a plain link,
 * and Enter on it fires the same click.
 */
export function TrackCta({ location, children }: { location: CtaLocation; children: ReactNode }) {
  return (
    <span className="contents" onClick={() => trackHardestWorkerCta(location)}>
      {children}
    </span>
  );
}
