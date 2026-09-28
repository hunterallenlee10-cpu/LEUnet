/**
 * Whether the visitor has asked for reduced motion. The stylesheet already
 * turns html's smooth scrolling off for them, but a scroll that names its own
 * `behavior` overrides CSS, so the JS scroll below has to check for itself.
 */
function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Scroll to an element and optionally focus it. Smooth, or an instant jump
 * for visitors who prefer reduced motion. `focus` only lands on a target that
 * can take it, so targets carry `tabIndex={-1}`.
 */
export function smoothScrollToElement(
  elementId: string,
  options?: { focus?: boolean; offset?: number }
): void {
  if (typeof window === "undefined") return;

  const element = document.getElementById(elementId);
  if (!element) return;

  // The fixed header's height, the same 80px as html's `scroll-padding-top`
  // in app/globals.css.
  const offset = options?.offset ?? 80;
  const elementPosition = element.getBoundingClientRect().top + window.scrollY - offset;

  window.scrollTo({
    top: elementPosition,
    behavior: prefersReducedMotion() ? "instant" : "smooth",
  });

  // Focus on element for accessibility
  if (options?.focus) {
    setTimeout(() => {
      element.focus({ preventScroll: true });
    }, 100);
  }
}
