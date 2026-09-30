"use client";

import { useEffect, useRef } from "react";

/**
 * For the /lee-systems demos (WebsiteBuildDemo, AutomationFlowDemo): sets
 * `data-play="true"` on the returned ref's element while at least
 * `threshold` of it is on screen, and `"false"` while it is not. Each demo's
 * CSS pauses its animations unless `data-play="true"`, so a visitor sees a
 * demo from its first frame and nothing runs unseen. Setting the attribute
 * directly rather than through state keeps it from re-rendering the demo.
 */
export function usePlayWhenVisible<T extends HTMLElement>(threshold = 0.3) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        el.dataset.play = entry.isIntersecting ? "true" : "false";
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}
