/**
 * Where H1 Performance lives now.
 *
 * H1's page moved to its own repo and domain on 2026-09-01, and H1 came off
 * this site altogether on 2026-09-03 (docs/H1.md). One consumer is left: the
 * `/h1-performance` and `/h1/*` redirects in next.config.mjs, which forward the
 * URLs the page used to answer on so their inbound links and search placement
 * are not thrown away. No page here links to H1, and `lib/h1-site.ts` — the
 * app-side reader this module also served — is gone with the links.
 *
 * A plain JavaScript module rather than TypeScript because next.config.mjs
 * imports it and cannot import TypeScript. It deliberately does NOT read
 * `process.env` itself: Next inlines `process.env.NEXT_PUBLIC_*` at build time
 * only in the app's own TypeScript, not in a `.mjs` module, so an env read here
 * would reach the browser as a live lookup that always comes back undefined.
 * The caller passes the variable in, which is also what kept the redirect and
 * the app agreeing on one value while both existed.
 *
 * The fallback is Vercel's default alias for a project named `h1-performance`,
 * which is only right if that project name and alias were free. Set the
 * variable rather than relying on it: the H1 site's origin, no trailing slash.
 */
const FALLBACK_H1_SITE_URL = "https://h1-performance.vercel.app";

/**
 * @param {string | undefined} configured `process.env.NEXT_PUBLIC_H1_SITE_URL`, read by the caller.
 * @returns {string} The H1 site's origin with no trailing slash.
 */
export function resolveH1SiteUrl(configured) {
  return (configured || FALLBACK_H1_SITE_URL).replace(/\/+$/, "");
}
