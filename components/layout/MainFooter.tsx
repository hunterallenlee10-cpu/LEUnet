"use client";

import Image from "next/image";
import Link from "next/link";
import { smoothScrollToElement } from "@/lib/scrollUtils";
import { companyInfo, footerContent } from "@/data/company";
import { sectionIds } from "@/data/navigation";
import { ventures } from "@/data/ventures";

export function MainFooter() {
  const handleLinkClick = (sectionId: string) => {
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
                <h3 className="font-bold text-white text-lg">LEU</h3>
                <p className="text-xs text-amber-400">Enterprises</p>
              </div>
            </div>
            <p className="text-neutral-400 text-sm">{companyInfo.tagline}</p>
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
              {ventures.map((venture) => (
                <li key={venture.id}>
                  <button
                    onClick={() => handleLinkClick(venture.id)}
                    className="text-neutral-400 hover:text-amber-400 transition-colors text-sm"
                  >
                    {venture.name}
                  </button>
                </li>
              ))}
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
