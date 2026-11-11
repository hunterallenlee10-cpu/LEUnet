import type { MetadataRoute } from "next";
import { LAST_UPDATED, PAGE_URL as HARDEST_WORKER_URL } from "@/data/hardest-worker";

/**
 * /sitemap.xml: only the pages this .net site is canonical for, which today
 * is just The Hardest Worker in Maryland. The shared pages (home, How It
 * Works, services, Business Mastery, contact, legal) are also served by
 * leeenterprisesunlimited.com and name their .com twin as canonical
 * (primaryUrl in data/company.ts), so they belong in the .com sitemap.
 *
 * The page carries its real content date (data/hardest-worker.ts), not the
 * build time.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: HARDEST_WORKER_URL, lastModified: LAST_UPDATED }];
}
