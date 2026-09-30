"use client";

import { Children, useEffect, useRef, type ReactNode } from "react";

/**
 * Where a scene's top edge is when it starts to open and when it is fully
 * open, as shares of the viewport's height from the top. It starts as soon as
 * it shows at the bottom of the screen and is fully open well before its
 * heading reaches the middle, so nobody reads a half-open line.
 */
const OPEN_FROM = 0.9;
const OPEN_BY = 0.35;

/**
 * How far open a section has to be before the demo in it plays: nearly all
 * the way, so a run starts from its first frame as the section finishes
 * opening, not behind the edges. The seam says so on the section's wrapper
 * (`data-seam-open`), and the live demo (LeeSystemsLiveDemoSection) holds
 * its clock until it does.
 */
const STANDS_OPEN = 0.9;

/**
 * The same query the seam's CSS sits behind (app/globals.css), so the script
 * drives the seam exactly when the page draws it. Without scripting, or with
 * reduced motion, every scene is simply open.
 */
const MOTION = "(prefers-reduced-motion: no-preference) and (scripting: enabled)";

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

/** Eased in and out, so the edges set off and land gently. */
const smoothstep = (t: number) => t * t * (3 - 2 * t);

/**
 * The seam, around the live demo on /lee-systems (the owner's ask,
 * 2026-09-30, in place of the "Explore automation" and "See website builds"
 * buttons and the dashed lines that joined them in a node).
 *
 * The brass spine of "What we do" carries on down the page, and each section
 * given to this component arrives closed on it: nothing but the lit line
 * running down its middle. As it scrolls up the screen it splits open from
 * that line, two brass edges gliding apart to the sides with a warm light
 * spilling out between them, until the whole section stands open. It comes
 * from the page's own spread (two halves mirrored about a spine) and the
 * split, lit layouts of the owner's references, The Real World's "Two paths"
 * and "Their way vs our way".
 *
 * It treats each section as a black box: it wraps it, clips it and draws the
 * edges over it, and never reaches inside. So a section can change, grow or
 * be swapped without touching this, and placing one in the seam is putting
 * it between the tags in app/lee-systems/page.tsx. It holds one,
 * LeeSystemsLiveDemoSection (since 2026-09-30, when the website and
 * automation animations became that one demo), whose line from the website
 * down to the workflow runs down the middle, so the spine opens onto its
 * own continuation. Whatever is inside keeps its ids, so #automation and
 * #websites land on the demo's two halves: the seam changes nothing about
 * layout, only what is drawn.
 *
 * The demo waits on its first frame until the section stands open
 * (STANDS_OPEN), then plays: the seam says so on the section's wrapper and
 * the demo listens, so the doors open onto it and the run starts as they
 * finish.
 *
 * The motion is scrubbed by the scroll, both ways, one write per scene per
 * frame, and only while the seam is near the screen. Everything it drives is
 * a custom property (`--open`, 0 closed to 1 open) that the CSS turns into a
 * clip, an opacity and the edges' positions; the CSS for it is the "the seam"
 * block in app/globals.css, and it applies only under MOTION, so without
 * scripting or with reduced motion the sections just sit open.
 */
export function ExamplesSeam({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const scenes = Array.from(
      root.querySelectorAll<HTMLElement>("[data-seam-scene]")
    );
    const motion = window.matchMedia(MOTION);
    let frame = 0;
    let near = false;
    let listening = false;

    // A section holding keyboard focus stands fully open wherever it is, so
    // a focused link is never half clipped.
    const update = () => {
      frame = 0;
      if (!motion.matches) return;
      const vh = window.innerHeight;
      for (const scene of scenes) {
        const top = scene.getBoundingClientRect().top;
        const t = clamp01((OPEN_FROM * vh - top) / ((OPEN_FROM - OPEN_BY) * vh));
        const open = scene.contains(document.activeElement) ? 1 : smoothstep(t);
        scene.style.setProperty("--open", open.toFixed(4));
        const stands = open >= STANDS_OPEN ? "true" : "false";
        if (scene.dataset.seamOpen !== stands) scene.dataset.seamOpen = stands;
      }
    };

    // Where the seam isn't drawn, nothing is held back.
    const release = () => {
      for (const scene of scenes) delete scene.dataset.seamOpen;
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    // Listens only while the seam is within a screen of the viewport and
    // motion is allowed. Every change runs one update, so a scene is already
    // closed before it scrolls into sight, and settles exactly when a fast
    // scroll carries it away between frames.
    const sync = () => {
      const on = near && motion.matches;
      if (on && !listening) {
        window.addEventListener("scroll", schedule, { passive: true });
        window.addEventListener("resize", schedule);
      } else if (!on && listening) {
        window.removeEventListener("scroll", schedule);
        window.removeEventListener("resize", schedule);
      }
      listening = on;
      if (motion.matches) schedule();
      else release();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        near = entry.isIntersecting;
        sync();
      },
      { rootMargin: "100% 0px" }
    );

    observer.observe(root);
    motion.addEventListener("change", sync);
    root.addEventListener("focusin", schedule);
    root.addEventListener("focusout", schedule);
    sync();

    return () => {
      observer.disconnect();
      motion.removeEventListener("change", sync);
      root.removeEventListener("focusin", schedule);
      root.removeEventListener("focusout", schedule);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
      release();
    };
  }, []);

  return (
    <div ref={rootRef}>
      {Children.toArray(children).map((child, i) => (
        <div key={i} data-seam-scene className="ls-seam-scene">
          <span aria-hidden="true" className="ls-seam-light" />
          <div className="ls-seam-content">{child}</div>
          <span aria-hidden="true" className="ls-seam-edge ls-seam-edge--left" />
          <span aria-hidden="true" className="ls-seam-edge ls-seam-edge--right" />
        </div>
      ))}
    </div>
  );
}
