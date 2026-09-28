"use client";

import type { MouseEvent, ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { smoothScrollToElement } from "@/lib/scrollUtils";

/**
 * A link to a homepage section, for MainFooter, which is a server component
 * and cannot hold the click handler itself. On / it scrolls in place, as the
 * header's `#` entries do: a plain <Link> there would be a same-page
 * navigation once the address bar already ends in that hash (a second click
 * on Contact), which refetches the page and scrolls nowhere. Anywhere else it
 * is an ordinary link to `/#id`.
 */
export function HomeSectionLink({
  sectionId,
  className,
  children,
}: {
  sectionId: string;
  className?: string;
  children: ReactNode;
}) {
  const isHome = usePathname() === "/";

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!isHome || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    smoothScrollToElement(sectionId, { focus: true });
    window.history.replaceState(null, "", `#${sectionId}`);
  };

  return (
    <Link href={`/#${sectionId}`} onClick={handleClick} className={className}>
      {children}
    </Link>
  );
}
