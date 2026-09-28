import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/company";
import { businessMasteryPage, contactPage } from "@/data/navigation";
import { leeSystemsRoutes } from "@/data/lee-systems";

/**
 * /sitemap.xml: every page worth finding in search, on the www host. /book is
 * left out on purpose (it only forwards to the booking link), and so are the
 * removed /support and /partners, which redirect to the homepage.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    leeSystemsRoutes.home,
    leeSystemsRoutes.automation,
    leeSystemsRoutes.websites,
    leeSystemsRoutes.lawFirms,
    leeSystemsRoutes.homeServices,
    businessMasteryPage,
    contactPage,
    "/legal",
  ];

  return paths.map((path) => ({
    url: path === "/" ? SITE_URL : `${SITE_URL}${path}`,
  }));
}
