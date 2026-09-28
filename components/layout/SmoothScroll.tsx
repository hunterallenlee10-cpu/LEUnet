"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

/**
 * Lenis smooth scrolling for the whole site, mounted once in the root layout.
 * Wheel and trackpad scrolling eases instead of stepping; touch stays native,
 * which is Lenis's default and what phones already do well.
 *
 * - `anchors`: in-page links ("#automation-services", or "/#contact" while on
 *   the homepage) glide with the same easing. Lenis reads html's
 *   `scroll-padding-top` from globals.css, so targets still land below the
 *   fixed header.
 * - `allowNestedScroll`: anything that scrolls on its own (the mobile menu's
 *   link list, a textarea, the journey's sideways strip) keeps its own
 *   scrolling rather than having the page's wheel handling take it over.
 * - `stopInertiaOnNavigate`: a link to another page cuts any glide still in
 *   progress, so it can't carry on past Next.js putting the new page at the
 *   top.
 *
 * Under prefers-reduced-motion there is no Lenis at all, so scrolling is the
 * browser's own (html's `scroll-smooth` already turns off for it in
 * globals.css). It follows the setting live if a visitor changes it.
 */
export function SmoothScroll() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | null = null;

    const sync = () => {
      lenis?.destroy();
      lenis = reduceMotion.matches
        ? null
        : new Lenis({
            autoRaf: true,
            anchors: true,
            allowNestedScroll: true,
            stopInertiaOnNavigate: true,
          });
    };

    sync();
    reduceMotion.addEventListener("change", sync);
    return () => {
      reduceMotion.removeEventListener("change", sync);
      lenis?.destroy();
    };
  }, []);

  return null;
}
