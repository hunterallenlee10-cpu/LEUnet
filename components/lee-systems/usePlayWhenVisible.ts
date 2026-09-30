"use client";

import { useEffect, useRef } from "react";

/**
 * For the /lee-systems demos (WebsiteBuildDemo, AutomationFlowDemo): sets
 * `data-play="true"` on the returned ref's element while at least
 * `threshold` of it is on screen, and `"false"` while it is not. Each demo's
 * CSS pauses its animations unless `data-play="true"`, so a visitor sees a
 * demo from its first frame and nothing runs unseen. Setting the attribute
 * directly rather than through state keeps it from re-rendering the demo.
 *
 * Inside the seam on /lee-systems (ExamplesSeam), a demo also waits for its
 * section to stand open, which the seam says with `data-seam-open` on the
 * section's wrapper: the run starts from its first frame as the section
 * finishes opening, rather than behind the edges while they part. Anywhere
 * else, or where the seam isn't drawn (reduced motion, no scripting), there
 * is no such attribute and nothing waits.
 */
export function usePlayWhenVisible<T extends HTMLElement>(threshold = 0.3) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const scene = el.closest<HTMLElement>("[data-seam-scene]");
    let onScreen = false;
    const sync = () => {
      const held = scene?.dataset.seamOpen === "false";
      el.dataset.play = onScreen && !held ? "true" : "false";
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        sync();
      },
      { threshold }
    );
    observer.observe(el);

    const seam = scene ? new MutationObserver(sync) : null;
    if (scene && seam) {
      seam.observe(scene, { attributes: true, attributeFilter: ["data-seam-open"] });
    }

    return () => {
      observer.disconnect();
      seam?.disconnect();
    };
  }, [threshold]);

  return ref;
}
