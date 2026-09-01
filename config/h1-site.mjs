/**
 * Where H1 Performance lives now.
 *
 * H1's page moved to its own repo and domain on 2026-09-01 (docs/H1.md). Every
 * path from this site to it — the permanent redirect in next.config.mjs, the
 * Ventures menu and footer entry in data/navigation.ts, the portfolio card in
 * data/websites.ts — resolves to the same value, computed by `resolveH1SiteUrl`
 * from the `NEXT_PUBLIC_H1_SITE_URL` environment variable.
 *
 * A plain JavaScript module rather than TypeScript because next.config.mjs
 * imports it too and cannot import TypeScript. It deliberately does NOT read
 * `process.env` itself: Next inlines `process.env.NEXT_PUBLIC_*` at build time
 * only in the app's own TypeScript, not in a `.mjs` module, so an env read here
 * would reach the browser as a live lookup that always comes back undefined.
 * Each caller passes the variable in from its own file — next.config.mjs, and
 * lib/h1-site.ts for app code — and the two agree because this is the one
 * place the fallback and the normalisation live.
 *
 * The fallback is Vercel's default alias for a project named `h1-performance`,
 * which is only right if that project name and alias were free. Set the
 * variable rather than relying on it: the H1 site's origin, no trailing slash.
 */
export const FALLBACK_H1_SITE_URL = "https://h1-performance.vercel.app";

/**
 * @param {string | undefined} configured `process.env.NEXT_PUBLIC_H1_SITE_URL`, read by the caller.
 * @returns {string} The H1 site's origin with no trailing slash.
 */
export function resolveH1SiteUrl(configured) {
  return (configured || FALLBACK_H1_SITE_URL).replace(/\/+$/, "");
}
