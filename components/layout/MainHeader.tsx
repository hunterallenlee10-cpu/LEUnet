"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { navigationItems, sectionIds } from "@/data/navigation";
import { companyInfo } from "@/data/company";
import { getScrollPosition, smoothScrollToElement, debounce } from "@/lib/scrollUtils";

export function MainHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // A section tap inside the mobile menu can't scroll right away: the body
  // is still position-fixed by the scroll lock below, so the jump would be
  // swallowed. The target waits here until the lock is released. A ref, not
  // state — it must never outlive one close cycle or trigger a render.
  const pendingScrollIdRef = useRef<string | null>(null);
  // Which nav item's dropdown is open, by id — not a boolean. The menu used to
  // be a single "Ventures" tab, so one flag said all there was to say; now any
  // item carrying `subItems` can own a dropdown, and a shared boolean would
  // open every one of them at once.
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  // Refs rather than state. A fast flick from the trigger into the panel
  // lands every boundary event in one task, before React re-renders — a
  // handler reading the timeout id out of state sees the value from the
  // previous render, misses the close timer the leave handler just armed,
  // and the menu shuts 200ms later underneath the pointer.
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  // The wrapper around whichever dropdown is open, so the close timer can ask
  // whether focus is still inside it before firing.
  const openWrapperRef = useRef<HTMLDivElement | null>(null);

  // Every nav target is a section of the homepage. On any other route those
  // elements don't exist, so scrolling to them would silently do nothing.
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = debounce(() => {
      setIsScrolled(getScrollPosition() > 200);
    }, 10);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // A close timer still pending when the header unmounts would setState on a
  // gone component.
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  // Lock the page while the mobile menu is open. iOS Safari keeps scrolling
  // (and rubber-banding) the page under an overlay even with
  // `overflow: hidden` on body, so the body is pinned with `position: fixed`
  // at its current offset instead, and put back on close. The restore jump is
  // explicitly instant because html has `scroll-smooth` — otherwise closing
  // the menu would visibly animate from the top of the page back down.
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const scrollY = window.scrollY;
    const { style } = document.body;
    style.position = "fixed";
    style.top = `-${scrollY}px`;
    style.left = "0";
    style.right = "0";
    style.width = "100%";
    style.overflow = "hidden";
    return () => {
      style.position = "";
      style.top = "";
      style.left = "";
      style.right = "";
      style.width = "";
      style.overflow = "";
      window.scrollTo({ top: scrollY, behavior: "instant" });
    };
  }, [mobileMenuOpen]);

  // Runs after the lock's cleanup (declared below it, same commit), so the
  // body is scrollable again by the time the deferred section scroll fires.
  useEffect(() => {
    if (mobileMenuOpen || !pendingScrollIdRef.current) return;
    const sectionId = pendingScrollIdRef.current;
    pendingScrollIdRef.current = null;
    smoothScrollToElement(sectionId, { focus: true });
  }, [mobileMenuOpen]);

  // With hover no longer opening or closing the desktop dropdown, a click
  // anywhere outside it, or Escape, is what closes it. Also closes the mobile
  // drawer on Escape.
  useEffect(() => {
    if (!openDropdownId && !mobileMenuOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      if (mobileMenuOpen) return;
      if (openWrapperRef.current?.contains(event.target as Node)) return;
      setOpenDropdownId(null);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpenDropdownId(null);
      setMobileMenuOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [openDropdownId, mobileMenuOpen]);

  const cancelClose = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const openDropdown = (id: string) => {
    cancelClose();
    setOpenDropdownId(id);
  };

  const closeDropdown = () => {
    cancelClose();
    setOpenDropdownId(null);
    openWrapperRef.current = null;
  };

  // Debounced by 200ms so the pointer can cross the gap between the trigger and
  // the panel without the menu flickering shut. The focus check keeps a hover
  // exit from yanking the panel away from someone who opened it with the mouse
  // and then tabbed into its rows.
  const closeDropdownSoon = () => {
    cancelClose();
    closeTimeoutRef.current = setTimeout(() => {
      if (openWrapperRef.current?.contains(document.activeElement)) return;
      setOpenDropdownId(null);
      openWrapperRef.current = null;
    }, 200);
  };

  const handleNavClick = (href: string, id: string) => {
    setMobileMenuOpen(false);
    closeDropdown();

    // A page of its own uses a real route rather than a homepage anchor, so it
    // navigates directly from wherever the visitor happens to be. Only `#`
    // anchors fall through to the scroll below. Nothing in the menu is an
    // absolute URL today - H1 Performance was, while it was listed as a venture
    // on its own domain (docs/H1.md) - and the test stays because without it an
    // off-site href would fall to the `!isHome` branch below and be navigated
    // to as "/https://…".
    if (href.startsWith("/") || /^https?:\/\//.test(href)) {
      window.location.assign(href);
      return;
    }

    // Off the homepage, go there and let the browser resolve the hash on
    // arrival rather than scrolling to an element that isn't on this page.
    if (!isHome) {
      window.location.assign(`/${href}`);
      return;
    }

    const sectionId = href.replace("#", "");
    if (mobileMenuOpen) {
      // Body is scroll-locked until the close commits; scroll via the
      // pending-target effect once it has.
      pendingScrollIdRef.current = sectionId;
    } else {
      smoothScrollToElement(sectionId, { focus: true });
    }

    // Update URL
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", href);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 z-50 w-full transition-colors duration-300 ${
          isScrolled
            ? "bg-neutral-950 border-b border-neutral-800"
            : "bg-neutral-950/70 backdrop-blur-sm"
        }`}
      >
        {/* Full width with side padding rather than a centred max-w-7xl
            column: the logo sits at the left edge of the screen and the
            actions at the right, at every width. */}
        <div className="flex w-full items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-10">
          <Link href={isHome ? "#hero" : "/"} className="flex shrink-0 items-center">
            <div className="relative h-10 w-10">
              <Image
                src={companyInfo.logo}
                alt={companyInfo.logoAlt}
                fill
                sizes="40px"
                priority
                className="object-contain"
              />
            </div>
          </Link>

          {/* Desktop navigation, from `xl` up; below that the drawer serves
              the same links. Hovering an item only changes its colour: no
              underline sweep, no tooltip, no menu. The one dropdown opens
              from a click on its chevron. */}
          <nav className="hidden xl:flex items-center gap-7" aria-label="Main">
            {navigationItems.map((item) => {
              const isOpen = openDropdownId === item.id;
              const panelId = `${item.id}-desktop-menu`;

              if (!item.subItems) {
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.href, item.id)}
                    className="text-white transition-colors hover:text-amber-400"
                  >
                    {item.label}
                  </button>
                );
              }

              return (
                <div
                  key={item.id}
                  className="relative flex items-center gap-1"
                  ref={isOpen ? openWrapperRef : undefined}
                  onBlur={closeDropdownSoon}
                >
                  <button
                    onClick={() => handleNavClick(item.href, item.id)}
                    className="text-white transition-colors hover:text-amber-400"
                  >
                    {item.label}
                  </button>
                  <button
                    type="button"
                    onClick={() => (isOpen ? closeDropdown() : openDropdown(item.id))}
                    className="rounded p-1 text-white transition-colors hover:text-amber-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-400"
                    aria-label={`${item.label} pages`}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                  >
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                      aria-hidden="true"
                    />
                  </button>

                  {isOpen && (
                    <ul
                      id={panelId}
                      className="absolute left-1/2 top-full z-50 mt-3 w-64 -translate-x-1/2 overflow-hidden rounded-lg border border-neutral-800 bg-neutral-950 shadow-2xl"
                    >
                      {item.subItems.map((subItem) => (
                        <li key={subItem.id}>
                          <button
                            onClick={() => handleNavClick(subItem.href, subItem.id)}
                            className="w-full px-4 py-3 text-left text-sm font-medium text-white transition-colors hover:bg-neutral-900 hover:text-amber-400"
                          >
                            {subItem.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="flex items-center gap-3 sm:gap-5">
            {/* Desktop actions. From `sm` they sit in the bar; below that they
                live in the drawer, so nothing in the bar can crowd or clip the
                logo and the menu button on a phone. */}
            <div className="hidden sm:flex items-center gap-5">
              <Link
                href="/support"
                className="whitespace-nowrap text-white transition-colors hover:text-amber-400"
              >
                Support Us
              </Link>
              <button
                onClick={() => handleNavClick(`#${sectionIds.contact}`, "nav-contact")}
                className="whitespace-nowrap rounded-lg bg-amber-400 px-5 py-2 font-semibold text-neutral-950 transition-colors hover:bg-amber-300"
              >
                Get Started
              </button>
              <Link
                href="/partners"
                className="whitespace-nowrap rounded-lg border border-amber-400/40 px-5 py-2 font-semibold text-amber-300 transition-colors hover:border-amber-300 hover:text-amber-200"
              >
                Partners
              </Link>
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(true);
                closeDropdown();
              }}
              className="p-2 text-white transition-colors hover:text-amber-400 xl:hidden"
              aria-label="Open menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer: slides over from the right at 75% of the screen width,
          with the page dimmed behind it. Rendered outside <header> because the
          header's backdrop-filter would otherwise become the containing block
          for these fixed elements and trap them inside the bar. Tapping the
          dimmed strip, the close button, a link or Escape closes it. */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] xl:hidden">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMobileMenuOpen(false)}
            className="absolute inset-0 h-full w-full cursor-default bg-black/60"
          />
          <div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="mobile-drawer absolute inset-y-0 right-0 flex w-[75vw] flex-col border-l border-neutral-800 bg-neutral-950 shadow-2xl"
          >
            <div className="flex items-center justify-end px-4 py-4">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-white transition-colors hover:text-amber-400"
                aria-label="Close menu"
                autoFocus
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav
              className="flex-1 min-h-0 space-y-1 overflow-y-auto overscroll-contain px-4 pb-[calc(1.5rem+env(safe-area-inset-bottom))]"
              aria-label="Main"
            >
              {navigationItems.map((item) => {
                const isOpen = openDropdownId === item.id;
                const panelId = `${item.id}-mobile-menu`;

                return (
                  <div key={item.id}>
                    {item.subItems ? (
                      // Split row: the label goes to the venture's page and the
                      // 48px chevron square expands its pages.
                      <div className="flex items-stretch">
                        <button
                          onClick={() => handleNavClick(item.href, item.id)}
                          className="flex-1 rounded-l-lg px-3 py-3 text-left text-white hover:bg-neutral-900"
                        >
                          {item.label}
                        </button>
                        <button
                          onClick={() => (isOpen ? closeDropdown() : openDropdown(item.id))}
                          className="flex w-12 items-center justify-center rounded-r-lg text-white hover:bg-neutral-900"
                          aria-label={`${item.label} pages`}
                          aria-expanded={isOpen}
                          aria-controls={panelId}
                        >
                          <ChevronDown
                            className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
                            aria-hidden="true"
                          />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleNavClick(item.href, item.id)}
                        className="w-full rounded-lg px-3 py-3 text-left text-white hover:bg-neutral-900"
                      >
                        {item.label}
                      </button>
                    )}

                    {/* Indented rather than boxed, so the drawer never puts a
                        card inside itself. */}
                    {item.subItems && isOpen && (
                      <ul id={panelId} className="mb-1 ml-3 border-l border-neutral-800 pl-2">
                        {item.subItems.map((subItem) => (
                          <li key={subItem.id}>
                            <button
                              onClick={() => handleNavClick(subItem.href, subItem.id)}
                              className="w-full rounded-lg px-3 py-2.5 text-left text-sm text-neutral-300 hover:bg-neutral-900 hover:text-amber-400"
                            >
                              {subItem.label}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}

              <Link
                href="/support"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full rounded-lg px-3 py-3 text-white hover:bg-neutral-900"
              >
                Support Us
              </Link>

              <div className="space-y-2 pt-4">
                <button
                  onClick={() => handleNavClick(`#${sectionIds.contact}`, "nav-contact")}
                  className="w-full rounded-lg bg-amber-400 px-4 py-3 font-semibold text-neutral-950 transition-colors hover:bg-amber-300"
                >
                  Get Started
                </button>
                <Link
                  href="/partners"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full rounded-lg border border-amber-400/40 px-4 py-3 text-center font-semibold text-amber-300 transition-colors hover:border-amber-300 hover:text-amber-200"
                >
                  Partners
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
