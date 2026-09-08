"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { smoothScrollToElement } from "@/lib/scrollUtils";
import { companyInfo, footerContent } from "@/data/company";
import { businessMasteryPage, sectionIds, venturePages } from "@/data/navigation";
import { ventures } from "@/data/ventures";

export function MainFooter() {
  // These all point at homepage sections, which don't exist on other routes.
  const pathname = usePathname();
  const isHome = pathname === "/";

  const handleLinkClick = (sectionId: string) => {
    if (!isHome) {
      window.location.assign(`/#${sectionId}`);
      return;
    }

    smoothScrollToElement(sectionId, { focus: true });

    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `#${sectionId}`);
    }
  };

  return (
    <footer className="bg-neutral-950 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-12 h-12">
                <Image
                  src={companyInfo.logo}
                  alt={companyInfo.logoAlt}
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg"></h3>
                <p className="text-xs text-amber-400">Lee Enterprises Unlimited</p>
              </div>
            </div>
            {/* The owner's verse, in place of the tagline that was here. Kept
                as one plain line in the footer's own type so it reads as the
                company's own words rather than a decorated pull quote. */}
            <p className="text-neutral-400 text-sm">
              Philippians 4:13, &ldquo;I can do all things through Christ who
              strengthens me.&rdquo;
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleLinkClick(sectionIds.hero)}
                  className="text-neutral-400 hover:text-amber-400 transition-colors text-sm"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick(sectionIds.about)}
                  className="text-neutral-400 hover:text-amber-400 transition-colors text-sm"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick(sectionIds.contact)}
                  className="text-neutral-400 hover:text-amber-400 transition-colors text-sm"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Ventures */}
          <div>
            <h4 className="font-semibold text-white mb-4">Our Ventures</h4>
            <ul className="space-y-2">
              {/* A venture with its own page links straight to that route; one
                  without still falls back to its homepage section anchor. */}
              {ventures.map((venture) => {
                const venturePage = venturePages[venture.id];

                return (
                  <li key={venture.id}>
                    {venturePage ? (
                      <Link
                        href={venturePage}
                        className="inline-block text-neutral-400 hover:text-amber-400 transition-colors text-sm"
                      >
                        {venture.name}
                      </Link>
                    ) : (
                      <button
                        onClick={() => handleLinkClick(venture.id)}
                        className="text-neutral-400 hover:text-amber-400 transition-colors text-sm"
                      >
                        {venture.name}
                      </button>
                    )}
                  </li>
                );
              })}

              {/* Business Mastery is the flagship program rather than a third
                  venture, which is why it is a hardcoded row here instead of
                  an entry in `ventures` - that array is the two ventures, and
                  the header keeps the same separation by giving the program a
                  nav entry of its own. (It kept it when the header's Ventures
                  menu was flattened: the two ventures are now top-level
                  entries beside the program rather than rows inside a menu.)
                  Here it sits last, after both ventures, at the owner's
                  request - the header leads with it instead.

                  "Lee", not "LEU", is also the owner's call: the page it
                  links to is titled "LEU Business Mastery" (`bmHero.title`)
                  and the nav says "Business Mastery", so this row is
                  deliberately the odd one out rather than a typo to correct.
                  It reads as a sibling of "Lee Marketing Mastery" above it. */}
              <li>
                <Link
                  href={businessMasteryPage}
                  className="inline-block text-neutral-400 hover:text-amber-400 transition-colors text-sm"
                >
                  Lee Business Mastery
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2">
              {footerContent.links.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleLinkClick(link.href.replace("#", ""))}
                    className="text-neutral-400 hover:text-amber-400 transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-neutral-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
            <p className="text-neutral-500 text-sm">{footerContent.copyright}</p>
            <p className="text-neutral-500 text-sm mt-2 md:mt-0">
              <span className="text-amber-400">Email:</span>{" "}
              <a
                href={`mailto:${companyInfo.contactEmail}`}
                className="text-neutral-400 hover:text-amber-400 transition-colors"
              >
                {companyInfo.contactEmail}
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
