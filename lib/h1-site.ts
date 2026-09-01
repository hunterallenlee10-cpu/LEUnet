import { resolveH1SiteUrl } from "@/config/h1-site.mjs";

/**
 * Where H1 Performance lives, for app code. See config/h1-site.mjs for why
 * the env read has to happen in this TypeScript file rather than there.
 *
 * `process.env.NEXT_PUBLIC_H1_SITE_URL` is inlined here at build time, and
 * next.config.mjs sets it through its `env` key from the same resolver, so
 * the value is defined in every bundle — server, client, and the redirect —
 * and all of them agree. The resolver's fallback only matters outside a Next
 * build, e.g. a script importing this file directly.
 */
export const H1_SITE_URL = resolveH1SiteUrl(
  process.env.NEXT_PUBLIC_H1_SITE_URL
);
