import Image from "next/image";
import Link from "next/link";
import { companyInfo, footerContent } from "@/data/company";
import { footerPages } from "@/data/navigation";
import { site, telHref } from "@/data/site";

/**
 * A 96px copy of the full logo for the 48px mark below, so a page does not
 * download a bigger copy just for the footer.
 */
const footerLogo = "/logos/leu-logo-96.webp";

/** 44px tall, so every row is a comfortable tap target on a phone. */
const footerLinkClass =
  "inline-flex min-h-11 items-center text-sm text-neutral-400 transition-colors hover:text-amber-400";

/** Headings are h2s so the outline stays in order under any page's sections. */
const footerHeadingClass = "mb-1 text-sm font-semibold text-white";

export function MainFooter() {
  return (
    <footer className="border-t border-neutral-800 bg-neutral-950">
      <div className="mx-auto max-w-7xl px-4 py-12 md:py-16">
        <div className="mb-12 grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4 md:gap-8">
          {/* Brand */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="relative h-12 w-12">
                <Image
                  src={footerLogo}
                  alt={companyInfo.logoAlt}
                  fill
                  sizes="48px"
                  className="object-contain"
                />
              </div>
              <p className="text-sm font-semibold text-amber-400">{site.name}</p>
            </div>
            {site.slogan && (
              <p className="mb-3 text-sm text-neutral-300">{site.slogan}</p>
            )}
            {/* The owner's verse. Kept as one plain line in the footer's own
                type so it reads as the company's own words rather than a
                decorated pull quote. */}
            <p className="text-sm text-neutral-400">
              Philippians 4:13, &ldquo;I can do all things through Christ who
              strengthens me.&rdquo;
            </p>
          </div>

          <nav aria-labelledby="footer-pages">
            <h2 id="footer-pages" className={footerHeadingClass}>
              Pages
            </h2>
            <ul>
              {footerPages.map((page) => (
                <li key={page.href}>
                  <Link href={page.href} className={footerLinkClass}>
                    {page.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className={footerHeadingClass}>Get in touch</h2>
            <ul>
              {site.phone && (
                <li>
                  <a href={telHref(site.phone)} className={footerLinkClass}>
                    {site.phone}
                  </a>
                </li>
              )}
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className={`${footerLinkClass} break-all`}
                >
                  {site.email}
                </a>
              </li>
              {site.instagramUrl && (
                <li>
                  <a
                    href={site.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={footerLinkClass}
                  >
                    Instagram
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              )}
            </ul>
          </div>

          <div>
            <h2 className={footerHeadingClass}>Legal</h2>
            <ul>
              {footerContent.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={footerLinkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-800 pt-8">
          <p className="text-center text-sm text-neutral-400 md:text-left">
            {footerContent.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
