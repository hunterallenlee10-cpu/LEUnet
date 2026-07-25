"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { navigationItems, ventureNavItems, sectionIds } from "@/data/navigation";
import { companyInfo } from "@/data/company";
import { getScrollPosition, smoothScrollToElement, debounce } from "@/lib/scrollUtils";
import { LEU_COLORS } from "@/lib/colors";

export function MainHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [venturesDropdownOpen, setVenturesDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = debounce(() => {
      setIsScrolled(getScrollPosition() > 200);
    }, 10);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string, id: string) => {
    setMobileMenuOpen(false);
    setVenturesDropdownOpen(false);

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
        <Link href="#hero" className="flex items-center group">
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
            <div key={item.id}>
              {item.featured ? (
                <button
                  onClick={() => setVenturesDropdownOpen(!venturesDropdownOpen)}
                  className="flex items-center gap-1 text-white hover:text-amber-400 transition-colors relative group"
                >
                  {item.label}
                  <ChevronDown className="w-4 h-4" />
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

              {/* Desktop Ventures Dropdown */}
              {item.featured && venturesDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden backdrop-blur-md min-w-56">
                  {ventureNavItems.map((ventureItem) => (
                    <button
                      key={ventureItem.id}
                      onClick={() => handleNavClick(ventureItem.href, ventureItem.id)}
                      className="w-full text-left px-4 py-3 text-white hover:bg-neutral-800 hover:text-amber-400 transition-colors border-b border-neutral-800 last:border-0"
                    >
                      {ventureItem.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* CTA Button - Desktop */}
        <button
          onClick={() => handleNavClick(`#${sectionIds.contact}`, "nav-contact")}
          className="hidden sm:block px-6 py-2 bg-amber-400 text-neutral-950 rounded-lg font-semibold hover:bg-amber-300 transition-colors"
        >
          Get Started
        </button>

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

                {/* Mobile Ventures Dropdown */}
                {item.featured && venturesDropdownOpen && (
                  <div className="pl-4 space-y-1 mt-2 bg-neutral-800/50 rounded-lg">
                    {ventureNavItems.map((ventureItem) => (
                      <button
                        key={ventureItem.id}
                        onClick={() => handleNavClick(ventureItem.href, ventureItem.id)}
                        className="w-full text-left px-4 py-2 text-amber-400 hover:bg-neutral-700 rounded"
                      >
                        {ventureItem.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

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
