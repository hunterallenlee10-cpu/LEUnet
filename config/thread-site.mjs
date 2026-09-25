/**
 * Where Thread T-Shirts lives now.
 *
 * Thread's page moved to its own repo and site on 2026-09-25 (docs/THREAD.md),
 * and Thread stays listed here as one of the two ventures. Every path from this
 * site to it — the `/thread-t-shirts` and `/thread/*` redirects in
 * next.config.mjs, the nav and footer entry in data/navigation.ts, the venture
 * record in data/ventures.ts, the portfolio card in data/websites.ts, and the
 * apparel card in MarketingTraditionalSection — resolves to the same value,
 * computed by `resolveThreadSiteUrl` from the `NEXT_PUBLIC_THREAD_SITE_URL`
 * environment variable.
 *
 * A plain JavaScript module rather than TypeScript because next.config.mjs
 * imports it too and cannot import TypeScript. It deliberately does NOT read
 * `process.env` itself: Next inlines `process.env.NEXT_PUBLIC_*` at build time
 * only in the app's own TypeScript, not in a `.mjs` module, so an env read here
 * would reach the browser as a live lookup that always comes back undefined.
 * Each caller passes the variable in from its own file — next.config.mjs, and
 * lib/thread-site.ts for app code — and the two agree because this is the one
 * place the fallback and the normalisation live. (config/h1-site.mjs is the
 * same arrangement, and explains it at more length.)
 *
 * The fallback is a subdomain of this site's own domain, not a Vercel alias,
 * and that is on purpose. H1's fallback is Vercel's default alias for a project
 * named `h1-performance`, which is only right if that name was free. A project
 * named after the Thread repo would be `thread` or `tread`, short words whose
 * `*.vercel.app` aliases are almost certainly someone else's — and a wrong
 * guess there would send this site's visitors to a stranger's page. A wrong
 * guess on leeenterprisesunlimited.com can only fail to resolve. Either attach
 * this subdomain to the Thread project in Vercel, or set the variable to the
 * Thread site's origin, no trailing slash.
 */
export const FALLBACK_THREAD_SITE_URL = "https://thread.leeenterprisesunlimited.com";

/**
 * @param {string | undefined} configured `process.env.NEXT_PUBLIC_THREAD_SITE_URL`, read by the caller.
 * @returns {string} The Thread site's origin with no trailing slash.
 */
export function resolveThreadSiteUrl(configured) {
  return (configured || FALLBACK_THREAD_SITE_URL).replace(/\/+$/, "");
}
