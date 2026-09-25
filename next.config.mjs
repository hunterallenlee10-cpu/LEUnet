import { resolveH1SiteUrl } from "./config/h1-site.mjs";
import { resolveThreadSiteUrl } from "./config/thread-site.mjs";

// The redirects below are the only thing left here that points at the H1 site.
// H1 Performance is no longer one of the ventures this site lists, so no app
// code reads this value any more and it is not exported to the bundles through
// `env`; it is resolved once, here, for the redirect. docs/H1.md.
const H1_SITE_URL = resolveH1SiteUrl(process.env.NEXT_PUBLIC_H1_SITE_URL);

// A 308 is cached by browsers indefinitely and treated by crawlers as a
// permanent move, so it must not ship pointing at a host that might not be the
// final one. While NEXT_PUBLIC_H1_SITE_URL is unset the redirect targets the
// fallback alias and stays a 307 (temporary), which nothing caches hard; set
// the variable to the real domain and it becomes a 308. docs/H1.md §5 spells
// out the wiring and the ordering.
const H1_REDIRECT_PERMANENT = Boolean(process.env.NEXT_PUBLIC_H1_SITE_URL);

// Thread T-Shirts moved to its own site on 2026-09-25 and, unlike H1, is still
// one of the ventures this site lists, so app code links to it as well as the
// redirects below pointing there. Resolved once here and handed to the app
// through `env`, so the redirect and every link read the same value.
// docs/THREAD.md, config/thread-site.mjs.
const THREAD_SITE_URL = resolveThreadSiteUrl(
  process.env.NEXT_PUBLIC_THREAD_SITE_URL
);

// The same rule as H1's: a temporary 307 while the variable is unset and the
// target is only the fallback, a permanent 308 once it names the real host.
const THREAD_REDIRECT_PERMANENT = Boolean(
  process.env.NEXT_PUBLIC_THREAD_SITE_URL
);

/**
 * Content Security Policy sized for a Stripe integration.
 *
 * Stripe.js and Stripe's hosted/embedded UIs need to load scripts and frames
 * from https://*.stripe.com and call back to it. Link needs https://*.link.com.
 *
 * `'unsafe-inline'` in script-src is required by Next's inline hydration
 * bootstrap. To remove it, generate a per-request nonce in middleware and emit
 * the CSP from there instead. Note that `'unsafe-inline'` is ignored by browsers
 * whenever a nonce or hash is present, so the two cannot simply be combined.
 */
const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://js.stripe.com https://*.stripe.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://*.stripe.com",
  "font-src 'self' data:",
  "connect-src 'self' https://api.stripe.com https://*.stripe.com https://*.link.com",
  "frame-src 'self' https://js.stripe.com https://hooks.stripe.com https://*.stripe.com https://*.link.com",
  "form-action 'self' https://checkout.stripe.com https://*.stripe.com",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Inlined into every bundle at build time, already resolved (fallback
  // applied, trailing slash stripped), so lib/thread-site.ts never sees an
  // unset variable inside a Next build.
  env: {
    NEXT_PUBLIC_THREAD_SITE_URL: THREAD_SITE_URL,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      // The sponsors page was renamed to /partners on 2026-09-18, wording and
      // all. Same-origin rename with no plan to bring /sponsors back, so a
      // permanent 308 is safe here in a way the H1 redirects below explain it
      // is not for a host that might still change.
      {
        source: "/sponsors",
        destination: "/partners",
        permanent: true,
      },
      // H1 Performance moved to its own site on 2026-09-01 and came off this
      // site entirely on 2026-09-03 (docs/H1.md, config/h1-site.mjs). These
      // redirects outlive the listing on purpose: /h1-performance was a real
      // page here for months, and forwarding it carries that URL's inbound
      // links and search placement to the live site instead of landing them on
      // a 404. Nothing on this site links here any more. The H1 site is one
      // page, so any sub-path collapses to its root; a `#section` fragment
      // survives the redirect in the browser and the section ids are unchanged
      // there.
      {
        source: "/h1-performance",
        destination: H1_SITE_URL,
        permanent: H1_REDIRECT_PERMANENT,
      },
      {
        source: "/h1-performance/:path*",
        destination: H1_SITE_URL,
        permanent: H1_REDIRECT_PERMANENT,
      },
      // The coach and athlete photos moved with the page. The new site serves
      // the identical files at the same paths under its own origin, so an old
      // /h1/... image URL (from a cached page, a shared link, a search result)
      // resolves instead of 404ing. :path* is substituted into the destination.
      {
        source: "/h1/:path*",
        destination: `${H1_SITE_URL}/h1/:path*`,
        permanent: H1_REDIRECT_PERMANENT,
      },
      // Thread T-Shirts moved to its own site on 2026-09-25 (docs/THREAD.md).
      // /thread-t-shirts was a real page here, and the H1 site's footer still
      // links to it for H1 apparel, so it forwards rather than 404ing. The
      // Thread site is one page, so any sub-path collapses to its root; a
      // `#catalog` or `#order-request` fragment survives the redirect in the
      // browser, and the section ids are unchanged there.
      {
        source: "/thread-t-shirts",
        destination: THREAD_SITE_URL,
        permanent: THREAD_REDIRECT_PERMANENT,
      },
      {
        source: "/thread-t-shirts/:path*",
        destination: THREAD_SITE_URL,
        permanent: THREAD_REDIRECT_PERMANENT,
      },
      // The product photos moved with the page. The Thread site serves the
      // identical files at the same paths, so an old /thread/... image URL
      // resolves instead of 404ing.
      {
        source: "/thread/:path*",
        destination: `${THREAD_SITE_URL}/thread/:path*`,
        permanent: THREAD_REDIRECT_PERMANENT,
      },
    ];
  },
};

export default nextConfig;
