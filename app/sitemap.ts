import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/company";
import { businessMasteryPage, contactPage } from "@/data/navigation";
import { leeSystemsRoutes } from "@/data/lee-systems";

/**
 * /sitemap.xml: every page worth finding in search, on the www host. /book is
 * left out on purpose (it only forwards to the booking link), as is /pay
 * (private client billing, docs/PAY.md), and so are the
 * removed /support and /partners, which redirect to the homepage, and the
 * Lee Systems automation, websites, law firm and home services pages, which
 * redirect to their sections and cards on /lee-systems.
 *
 * Business Mastery is listed by its full address once it is on its own
 * subdomain (config/business-mastery-site.mjs). One sitemap still covers
 * it: the subdomain serves this site's robots.txt, which names this sitemap,
 * and Google accepts a sitemap on another host when that host's robots.txt
 * points to it.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    leeSystemsRoutes.home,
    businessMasteryPage,
    contactPage,
    "/legal",
  ];

  return paths.map((path) => ({
    url: /^https?:\/\//.test(path)
      ? path
      : path === "/"
        ? SITE_URL
        : `${SITE_URL}${path}`,
  }));
}
