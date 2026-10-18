"use client";

import { useCallback, useRef, useState } from "react";

/**
 * Whether an element is on screen, from one IntersectionObserver. Returns a
 * callback ref to put on the element and the current answer. `once` keeps
 * it true after the first time (for "load this when it gets close"), and
 * `rootMargin` widens the trigger area ("600px 0px" starts loading early).
 */
export function useInView<T extends Element>({
  threshold = 0,
  rootMargin = "0px",
  once = false,
}: { threshold?: number; rootMargin?: string; once?: boolean } = {}) {
  const [inView, setInView] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const ref = useCallback(
    (node: T | null) => {
      observerRef.current?.disconnect();
      observerRef.current = null;
      if (!node) return;
      if (typeof IntersectionObserver === "undefined") {
        setInView(true);
        return;
      }
      const observer = new IntersectionObserver(
        ([entry]) => {
          const visible = entry.isIntersecting;
          setInView(visible);
          if (visible && once) observer.disconnect();
        },
        { threshold, rootMargin }
      );
      observer.observe(node);
      observerRef.current = observer;
    },
    [threshold, rootMargin, once]
  );

  return [ref, inView] as const;
}
