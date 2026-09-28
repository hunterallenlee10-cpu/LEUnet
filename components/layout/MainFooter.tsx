import Image from "next/image";
import Link from "next/link";
import { HomeSectionLink } from "@/components/layout/HomeSectionLink";
import { companyInfo, footerContent } from "@/data/company";
import { businessMasteryPage, sectionIds, venturePages } from "@/data/navigation";
import { ventures } from "@/data/ventures";

/**
 * A 96px copy of `companyInfo.logo` (512px) for the 48px mark below, so a
 * subpage does not download the full logo just for the footer.
 */
const footerLogo = "/logos/leu-logo-96.webp";

// A server component. The Home and Contact rows point at homepage sections
// through HomeSectionLink, the one client piece: on / they scroll in place,
// anywhere else they navigate to `/#id` client-side.
export function MainFooter() {
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
                  src={footerLogo}
                  alt={companyInfo.logoAlt}
                  fill
                  className="object-contain"
                />
              </div>
              <div>
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
                <HomeSectionLink
                  sectionId={sectionIds.hero}
                  className="inline-block text-neutral-400 hover:text-amber-400 transition-colors text-sm"
                >
                  Home
                </HomeSectionLink>
              </li>
              <li>
                <HomeSectionLink
                  sectionId={sectionIds.contact}
                  className="inline-block text-neutral-400 hover:text-amber-400 transition-colors text-sm"
                >
                  Contact
                </HomeSectionLink>
              </li>
            </ul>
          </div>

          {/* Ventures */}
          <div>
            <h4 className="font-semibold text-white mb-4">Our Ventures</h4>
            <ul className="space-y-2">
              {ventures.map((venture) => (
                <li key={venture.id}>
                  <Link
                    href={venturePages[venture.id]}
                    className="inline-block text-neutral-400 hover:text-amber-400 transition-colors text-sm"
                  >
                    {venture.name}
                  </Link>
                </li>
              ))}

              {/* Business Mastery is the flagship program rather than a
                  venture, which is why it is a hardcoded row here instead of
                  an entry in `ventures` - that array is the ventures (one since
                  Thread T-Shirts came off this site, docs/THREAD.md), and the
                  header keeps the same separation by giving the program a nav
                  entry of its own. (It kept it when the header's Ventures menu
                  was flattened: the venture is now a top-level entry beside
                  the program rather than a row inside a menu.) Here it sits
                  last, after the venture, at the owner's request - the header
                  leads with it instead.

                  "Lee", not "LEU", is also the owner's call: the page it
                  links to is titled "LEU Business Mastery" and the nav says
                  "Business Mastery", so this row is deliberately the odd one
                  out rather than a typo to correct. It reads as a sibling of
                  "Lee Systems Co." above it. */}
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
              {/* The legal text lives on its own /legal page rather than the
                  homepage, so these are plain links, not section scrolls. */}
              {footerContent.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="inline-block text-neutral-400 hover:text-amber-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
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
