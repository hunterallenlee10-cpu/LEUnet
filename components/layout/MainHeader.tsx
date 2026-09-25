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
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        // Open mobile menu: opaque and full-height (dvh, so iOS Safari's
        // collapsing toolbars don't leave a strip of page peeking out at the
        // bottom), a flex column so the menu pane can take the leftover
        // height. xl:h-auto in case the state lingers across a resize to
        // desktop, where the menu markup is hidden.
        mobileMenuOpen
          ? "h-dvh xl:h-auto flex flex-col bg-neutral-950"
          : isScrolled
            ? "bg-neutral-950 backdrop-blur-md border-b border-neutral-800"
            : "bg-neutral-950/50 backdrop-blur-sm"
      }`}
      style={
        isScrolled
          ? {
              boxShadow: `0 0 30px rgba(212, 175, 55, 0.1)`,
            }
          : {}
      }
    >
      <div className="w-full shrink-0 max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href={isHome ? "#hero" : "/"} className="flex items-center group">
          <div className="relative w-10 h-10">
            <Image
              src={companyInfo.logo}
              alt={companyInfo.logoAlt}
              fill
              className="object-contain"
            />
          </div>
        </Link>

        {/* Desktop Navigation.

            `xl`, not `lg`. Flattening the Ventures tab put six entries in this
            bar instead of five, two of them long ("Marketing Mastery",
            "Thread T-Shirts"), and the row also carries the logo plus the
            Support Us / Get Started / Partners cluster. Measured in the browser
            at the Geist face this ships, back when that first label still read
            "Lee Marketing Mastery": the six items needed ~720px against the
            555px left over at 1024px, and they did not fit at any label length
            worth having — so dropping the "Lee " does not buy the breakpoint
            back. They clear it comfortably at 1280px. Between the two, the
            hamburger below serves the same links.

            Thread T-Shirts' entry came out on 2026-09-25 (docs/THREAD.md),
            leaving five. Measured again then: they need 540px against 561px
            left over at 1024px. That fits with 21px to spare - one wider font
            fallback from overflowing - so the breakpoint stays at `xl`. */}
        <nav className="hidden xl:flex items-center gap-6" aria-label="Main">
          {navigationItems.map((item) => {
            const isOpen = openDropdownId === item.id;
            const panelId = `${item.id}-desktop-menu`;

            // A plain entry is a button, not a Link, because most of them are
            // homepage anchors that handleNavClick scrolls to.
            if (!item.subItems) {
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.href, item.id)}
                  className="text-white hover:text-amber-400 transition-colors relative group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 group-hover:w-full h-0.5 bg-amber-400 transition-all duration-300" />
                </button>
              );
            }

            return (
              <div
                key={item.id}
                className="relative"
                ref={isOpen ? openWrapperRef : undefined}
                onMouseEnter={() => openDropdown(item.id)}
                onMouseLeave={closeDropdownSoon}
                onFocus={() => openDropdown(item.id)}
                onBlur={closeDropdownSoon}
                onKeyDown={(event) => {
                  if (event.key === "Escape" && isOpen) {
                    closeDropdown();
                    // Focus would otherwise fall to <body> when the panel
                    // unmounts out from under it.
                    event.currentTarget.querySelector("button")?.focus();
                    return;
                  }
                  // The tab navigates on Enter, so Enter cannot also be the
                  // "open the menu" key. Without this, Escape would be a
                  // one-way door: focus stays on the tab, and reopening the
                  // panel would mean tabbing away and back.
                  if (event.key === "ArrowDown") {
                    event.preventDefault();
                    openDropdown(item.id);
                  }
                }}
              >
                {/* The trigger navigates, like every other entry in this bar -
                    it is the venture's own page. The dropdown is disclosure on
                    top of that, opened by hover or by focus, which is why the
                    three sub-items are only its three offering pages and not a
                    fourth row repeating this destination. */}
                <button
                  onClick={() => handleNavClick(item.href, item.id)}
                  className="flex items-center gap-1 text-white hover:text-amber-400 transition-colors relative group"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                >
                  {item.label}
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  />
                  <span className="absolute bottom-0 left-0 w-0 group-hover:w-full h-0.5 bg-amber-400 transition-all duration-300" />
                </button>

                {/* The 10px offset from the tab is the wrapper's `pt-2.5`,
                    not a `top-[calc(100%+10px)]` on the panel, so the gap is
                    part of the menu's hit area. As a dead strip it armed the
                    200ms close timer every time the pointer travelled down
                    into the panel.

                    No `overflow-hidden` on the panel: it would clip the focus
                    ring on the first and last rows. They round their own hover
                    backgrounds instead, which is all it would be doing. */}
                {isOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2.5 z-50">
                    <ul
                      id={panelId}
                      className="w-72 bg-neutral-950/95 backdrop-blur-md border border-neutral-800 border-t-amber-500/30 rounded-lg shadow-2xl"
                      style={{
                        animation: "fadeInSlide 200ms ease-out forwards",
                      }}
                    >
                      {item.subItems.map((subItem, index) => (
                        <li key={subItem.id}>
                          <button
                            onClick={() => handleNavClick(subItem.href, subItem.id)}
                            className={`w-full text-left px-4 py-3.5 text-white hover:bg-neutral-900/80 hover:text-amber-400 hover:translate-x-0.5 transition-all duration-150 group flex items-center justify-between ${
                              index !== item.subItems!.length - 1
                                ? "border-b border-neutral-800/50"
                                : ""
                            } ${index === 0 ? "rounded-t-lg" : ""} ${
                              index === item.subItems!.length - 1 ? "rounded-b-lg" : ""
                            }`}
                          >
                            <span className="font-medium text-sm">{subItem.label}</span>
                            <span
                              className="text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                              aria-hidden="true"
                            >
                              →
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Support link + CTA Button - Desktop */}
        <div className="hidden sm:flex items-center gap-6">
          {/* A real route rather than a section, so this is a Link and not a
              handleNavClick button like the rest of the nav. */}
          <Link
            href="/support"
            className="text-white hover:text-amber-400 transition-colors relative group whitespace-nowrap"
          >
            Support Us
            <span className="absolute bottom-0 left-0 w-0 group-hover:w-full h-0.5 bg-amber-400 transition-all duration-300" />
          </Link>

          <button
            onClick={() => handleNavClick(`#${sectionIds.contact}`, "nav-contact")}
            className="px-6 py-2 bg-amber-400 text-neutral-950 rounded-lg font-semibold hover:bg-amber-300 transition-colors"
          >
            Get Started
          </button>

          {/* Outlined rather than filled, so Get Started stays the one
              primary CTA. A real route, like Support Us above. */}
          <Link
            href="/partners"
            className="px-6 py-2 rounded-lg font-semibold border border-amber-400/40 text-amber-300 hover:border-amber-300 hover:text-amber-200 transition-colors whitespace-nowrap"
          >
            Partners
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => {
            setMobileMenuOpen(!mobileMenuOpen);
            closeDropdown();
          }}
          className="xl:hidden p-2 text-white hover:text-amber-400 transition-colors"
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu. Fills the rest of the full-height header so the page
          never shows through under it, and scrolls its own content — inside
          a fixed header, anything past the bottom edge would otherwise be
          unreachable once a dropdown is expanded. overscroll-contain keeps
          that inner scroll from chaining to the locked page, and the bottom
          padding clears the iPhone home indicator. */}
      {mobileMenuOpen && (
        <div className="xl:hidden flex-1 min-h-0 overflow-y-auto overscroll-contain bg-neutral-900 border-t border-neutral-800">
          <nav
            className="px-4 pt-4 pb-[calc(1rem+env(safe-area-inset-bottom))] space-y-2"
            aria-label="Main"
          >
            {navigationItems.map((item) => {
              const isOpen = openDropdownId === item.id;
              const panelId = `${item.id}-mobile-menu`;

              return (
                <div key={item.id}>
                  {item.subItems ? (
                    // Split row: the label navigates to the venture's page like
                    // its siblings, and the chevron is a separate control that
                    // expands the list. There is no hover on touch, so a row
                    // that did both would have to pick one and strand the
                    // other. The chevron is a 48px square rather than a bare
                    // icon so it clears the 44px touch-target minimum.
                    <div className="flex items-stretch">
                      <button
                        onClick={() => handleNavClick(item.href, item.id)}
                        className="flex-1 text-left px-4 py-3 text-white hover:bg-neutral-800 rounded-l-lg"
                      >
                        {item.label}
                      </button>
                      <button
                        onClick={() => (isOpen ? closeDropdown() : openDropdown(item.id))}
                        className="w-12 flex items-center justify-center text-white hover:bg-neutral-800 rounded-r-lg"
                        aria-label={`${item.label} pages`}
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                      >
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleNavClick(item.href, item.id)}
                      className="w-full text-left px-4 py-3 text-white hover:bg-neutral-800 rounded-lg"
                    >
                      {item.label}
                    </button>
                  )}

                  {/* Same panel treatment as the desktop dropdown — dark
                      surface, hairline separators, white labels with amber
                      reserved for the pressed state — so the menu reads as one
                      design on both breakpoints. Unlike the desktop panel,
                      `overflow-hidden` is safe here (nothing is positioned
                      outside it) and rounds the end rows' pressed
                      backgrounds. */}
                  {item.subItems && isOpen && (
                    <ul
                      id={panelId}
                      className="mt-2 bg-neutral-950/95 border border-neutral-800 border-t-amber-500/30 rounded-lg shadow-2xl overflow-hidden"
                    >
                      {item.subItems.map((subItem, index) => (
                        <li key={subItem.id}>
                          <button
                            onClick={() => handleNavClick(subItem.href, subItem.id)}
                            className={`w-full text-left px-4 py-3.5 font-medium text-sm text-white hover:bg-neutral-900/80 hover:text-amber-400 active:bg-neutral-900/80 active:text-amber-400 transition-all duration-150 ${
                              index !== item.subItems!.length - 1
                                ? "border-b border-neutral-800/50"
                                : ""
                            }`}
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

            {/* Mobile support link */}
            <Link
              href="/support"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full px-4 py-3 text-white hover:bg-neutral-800 rounded-lg"
            >
              Support Us
            </Link>

            {/* Mobile CTA */}
            <button
              onClick={() => handleNavClick(`#${sectionIds.contact}`, "nav-contact")}
              className="w-full mt-4 px-4 py-3 bg-amber-400 text-neutral-950 rounded-lg font-semibold hover:bg-amber-300 transition-colors"
            >
              Get Started
            </button>

            {/* Partners sits after Get Started here too, mirroring the
                desktop order, in the same outlined-secondary treatment. */}
            <Link
              href="/partners"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full mt-2 px-4 py-3 text-center border border-amber-400/40 text-amber-300 rounded-lg font-semibold hover:border-amber-300 hover:text-amber-200 transition-colors"
            >
              Partners
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
