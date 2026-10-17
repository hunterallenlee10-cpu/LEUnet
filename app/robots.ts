import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/company";

/**
 * /robots.txt: everything may be crawled except /pay, the private client
 * billing pages (docs/PAY.md), and the sitemap is on the www host.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/pay",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
