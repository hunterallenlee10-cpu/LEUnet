"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { navigationItems, ventureNavItems, sectionIds } from "@/data/navigation";
import { companyInfo } from "@/data/company";
import { getScrollPosition, smoothScrollToElement, debounce } from "@/lib/scrollUtils";
import { LEU_COLORS } from "@/lib/colors";

export function MainHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [venturesDropdownOpen, setVenturesDropdownOpen] = useState(false);
  // Which dropdown row's submenu is open (e.g. Lee Marketing Mastery's three
  // pages). Same debounced-close pattern as the dropdown itself, and for the
  // same reason: the pointer crosses a gap on its way into the flyout.
  const [openSubmenuId, setOpenSubmenuId] = useState<string | null>(null);

  // Refs rather than state. A fast flick from the trigger into the panel
  // lands every boundary event in one task, before React re-renders — a
  // handler reading the timeout id out of state sees the value from the
  // previous render, misses the close timer the leave handler just armed,
  // and the menu shuts 200ms later underneath the pointer.
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const submenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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

  // Handle hover interactions for desktop dropdown
  const handleMouseEnter = () => {
    // Clear any pending close timeout when entering
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setVenturesDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    // Set a debounced close with 200ms delay to prevent flickering
    closeTimeoutRef.current = setTimeout(() => {
      setVenturesDropdownOpen(false);
      setOpenSubmenuId(null);
    }, 200);
  };

  const handleSubmenuEnter = (id: string) => {
    if (submenuTimeoutRef.current) {
      clearTimeout(submenuTimeoutRef.current);
      submenuTimeoutRef.current = null;
    }
    setOpenSubmenuId(id);
  };

  const handleSubmenuLeave = () => {
    submenuTimeoutRef.current = setTimeout(() => {
      setOpenSubmenuId(null);
    }, 200);
  };

  const handleNavClick = (href: string, id: string) => {
    setMobileMenuOpen(false);
    setVenturesDropdownOpen(false);
    setOpenSubmenuId(null);

    // A venture with its own page uses a real route rather than a homepage
    // anchor, so it navigates directly from wherever the visitor happens to be.
    if (href.startsWith("/")) {
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
    smoothScrollToElement(sectionId, { focus: true });

    // Update URL
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", href);
    }
  };

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
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
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
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

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navigationItems.map((item) => (
            <div key={item.id} className={item.featured ? "relative" : ""}>
              {item.featured ? (
                <button
                  onClick={() => setVenturesDropdownOpen(!venturesDropdownOpen)}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  className="flex items-center gap-1 text-white hover:text-amber-400 transition-colors relative group"
                  aria-haspopup="true"
                  aria-expanded={venturesDropdownOpen}
                >
                  {item.label}
                  <ChevronDown 
                    className={`w-4 h-4 transition-transform duration-200 ${venturesDropdownOpen ? "rotate-180" : ""}`} 
                  />
                  <span className="absolute bottom-0 left-0 w-0 group-hover:w-full h-0.5 bg-amber-400 transition-all duration-300" />
                </button>
              ) : (
                <button
                  onClick={() => handleNavClick(item.href, item.id)}
                  className="text-white hover:text-amber-400 transition-colors relative group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 group-hover:w-full h-0.5 bg-amber-400 transition-all duration-300" />
                </button>
              )}

              {/* Desktop Ventures Dropdown - Premium Redesign.

                  No `overflow-hidden` on the panel: it would clip the submenu
                  flyout, which is positioned outside the panel's right edge.
                  The first and last rows round their own hover backgrounds
                  instead, which is all the clipping was doing. */}
              {item.featured && venturesDropdownOpen && (
                <div
                  className="absolute top-[calc(100%+10px)] left-1/2 -translate-x-1/2 w-72 bg-neutral-950/95 backdrop-blur-md border border-neutral-800 border-t-amber-500/30 rounded-lg shadow-2xl z-50 opacity-100 animate-fade-in"
                  style={{
                    animation: "fadeInSlide 200ms ease-out forwards"
                  }}
                  role="menu"
                  aria-label="Ventures"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  {ventureNavItems.map((ventureItem, index) => (
                    <div
                      key={ventureItem.id}
                      className="relative"
                      onMouseEnter={
                        ventureItem.subItems
                          ? () => handleSubmenuEnter(ventureItem.id)
                          : undefined
                      }
                      onMouseLeave={
                        ventureItem.subItems ? handleSubmenuLeave : undefined
                      }
                    >
                      <button
                        onClick={() => handleNavClick(ventureItem.href, ventureItem.id)}
                        onFocus={
                          ventureItem.subItems
                            ? () => handleSubmenuEnter(ventureItem.id)
                            : undefined
                        }
                        role="menuitem"
                        aria-haspopup={ventureItem.subItems ? "true" : undefined}
                        aria-expanded={
                          ventureItem.subItems
                            ? openSubmenuId === ventureItem.id
                            : undefined
                        }
                        className={`w-full text-left px-4 py-3.5 text-white hover:bg-neutral-900/80 hover:text-amber-400 hover:translate-x-0.5 transition-all duration-150 group flex items-center justify-between ${
                          index !== ventureNavItems.length - 1 ? "border-b border-neutral-800/50" : ""
                        } ${index === 0 ? "rounded-t-lg" : ""} ${
                          index === ventureNavItems.length - 1 ? "rounded-b-lg" : ""
                        }`}
                      >
                        <span className="font-medium text-sm">{ventureItem.label}</span>
                        {ventureItem.subItems ? (
                          // Always visible, unlike the arrow below: it promises
                          // a submenu, not a navigation.
                          <ChevronRight
                            className="w-4 h-4 text-neutral-500 group-hover:text-amber-400 transition-colors duration-150"
                            aria-hidden="true"
                          />
                        ) : (
                          <span className="text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-150">→</span>
                        )}
                      </button>

                      {/* Submenu flyout. The `pl-1.5` wrapper spans the gap
                          between the row and the panel, so the pointer never
                          leaves the row's DOM on the way across and the
                          submenu doesn't flicker shut mid-crossing. */}
                      {ventureItem.subItems &&
                        openSubmenuId === ventureItem.id && (
                          <div className="absolute left-full top-0 pl-1.5 z-50">
                            <div
                              className="w-64 bg-neutral-950/95 backdrop-blur-md border border-neutral-800 border-t-amber-500/30 rounded-lg shadow-2xl"
                              style={{
                                // Not fadeInSlide: that keyframe carries the
                                // parent dropdown's translateX(-50%) centring
                                // and would leave this panel half its width
                                // to the left.
                                animation: "fadeInSlideStatic 200ms ease-out forwards"
                              }}
                              role="menu"
                              aria-label={ventureItem.label}
                            >
                              {ventureItem.subItems.map((subItem, subIndex) => (
                                <button
                                  key={subItem.id}
                                  onClick={() =>
                                    handleNavClick(subItem.href, subItem.id)
                                  }
                                  role="menuitem"
                                  className={`w-full text-left px-4 py-3 text-white hover:bg-neutral-900/80 hover:text-amber-400 hover:translate-x-0.5 transition-all duration-150 group flex items-center justify-between ${
                                    subIndex !== ventureItem.subItems!.length - 1
                                      ? "border-b border-neutral-800/50"
                                      : ""
                                  } ${subIndex === 0 ? "rounded-t-lg" : ""} ${
                                    subIndex === ventureItem.subItems!.length - 1
                                      ? "rounded-b-lg"
                                      : ""
                                  }`}
                                >
                                  <span className="font-medium text-sm">
                                    {subItem.label}
                                  </span>
                                  <span className="text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-150">→</span>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
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
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-white hover:text-amber-400 transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-neutral-900 border-t border-neutral-800 backdrop-blur-md">
          <nav className="px-4 py-4 space-y-2">
            {navigationItems.map((item) => (
              <div key={item.id}>
                {item.featured ? (
                  <button
                    onClick={() => setVenturesDropdownOpen(!venturesDropdownOpen)}
                    className="w-full text-left px-4 py-3 text-white hover:bg-neutral-800 rounded-lg flex items-center justify-between"
                  >
                    {item.label}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        venturesDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                ) : (
                  <button
                    onClick={() => handleNavClick(item.href, item.id)}
                    className="w-full text-left px-4 py-3 text-white hover:bg-neutral-800 rounded-lg"
                  >
                    {item.label}
                  </button>
                )}

                {/* Mobile Ventures Dropdown. Same panel treatment as the
                    desktop flyout — dark surface, hairline separators, white
                    labels with amber reserved for the pressed state — so the
                    menu reads as one design on both breakpoints. There is no
                    hover here, so a venture's sub-pages sit indented under
                    its row instead of behind a flyout, and the desktop rows'
                    chevron/arrow hover affordances don't apply. The sub-item
                    that repeats the venture's own href is kept, exactly as on
                    desktop: it was dropped once on the theory that the venture
                    row directly above already links there, but the row is
                    labelled "Lee Marketing Mastery" and the offering is
                    "Business Automation", so dropping it read as the
                    automation page simply missing from the menu. Two rows to
                    one page is the cheaper confusion. Unlike the desktop
                    panel, `overflow-hidden` is safe (no flyout to clip) and
                    rounds the end rows' pressed backgrounds. */}
                {item.featured && venturesDropdownOpen && (
                  <div className="mt-2 bg-neutral-950/95 border border-neutral-800 border-t-amber-500/30 rounded-lg shadow-2xl overflow-hidden">
                    {ventureNavItems.map((ventureItem, ventureIndex) => {
                      const subItems = ventureItem.subItems ?? [];
                      const isLastVenture =
                        ventureIndex === ventureNavItems.length - 1;
                      return (
                        <div key={ventureItem.id}>
                          <button
                            onClick={() => handleNavClick(ventureItem.href, ventureItem.id)}
                            className={`w-full text-left px-4 py-3.5 font-medium text-sm text-white hover:bg-neutral-900/80 hover:text-amber-400 active:bg-neutral-900/80 active:text-amber-400 transition-all duration-150 ${
                              subItems.length > 0 || !isLastVenture
                                ? "border-b border-neutral-800/50"
                                : ""
                            }`}
                          >
                            {ventureItem.label}
                          </button>
                          {subItems.map((subItem, subIndex) => (
                            <button
                              key={subItem.id}
                              onClick={() => handleNavClick(subItem.href, subItem.id)}
                              className={`w-full text-left pl-8 pr-4 py-3 font-medium text-sm text-neutral-300 hover:bg-neutral-900/80 hover:text-amber-400 active:bg-neutral-900/80 active:text-amber-400 transition-all duration-150 ${
                                !isLastVenture ||
                                subIndex !== subItems.length - 1
                                  ? "border-b border-neutral-800/50"
                                  : ""
                              }`}
                            >
                              {subItem.label}
                            </button>
                          ))}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}

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
          </nav>
        </div>
      )}
    </header>
  );
}
