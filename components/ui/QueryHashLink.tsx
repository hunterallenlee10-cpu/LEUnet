"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ComponentProps, MouseEvent } from "react";

/**
 * A link like /services?demo=ai-calls#demo-lab that changes the query and
 * jumps to a section. On another page it is an ordinary link. On the page it
 * points at, a plain link changes the query but lands nowhere (the router and
 * the smooth scroller both stand down when only the query changes), so this
 * swaps the query in place and scrolls to the section itself. Whatever reads
 * the query (the Demo Lab's tab, the form's "What do you need?") picks up the
 * new value.
 */
export function QueryHashLink({
  href,
  onClick,
  ...rest
}: Omit<ComponentProps<typeof Link>, "href"> & { href: string }) {
  const router = useRouter();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const target = new URL(href, window.location.href);
    if (target.pathname !== window.location.pathname) return;

    event.preventDefault();
    // Keeps Lenis from also handling the click as a plain #anchor.
    event.stopPropagation();
    router.replace(`${target.pathname}${target.search}${target.hash}`, { scroll: false });
    const section = target.hash ? document.getElementById(target.hash.slice(1)) : null;
    if (!section) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    section.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    // A section with tabIndex={-1} (the form) takes focus, so the next Tab
    // lands inside it.
    if (section.tabIndex === -1) section.focus({ preventScroll: true });
  };

  return <Link href={href} onClick={handleClick} {...rest} />;
}
