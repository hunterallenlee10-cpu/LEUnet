import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/company";

/** /robots.txt: everything may be crawled, and the sitemap is on the www host. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
