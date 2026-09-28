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

// The same arrangement for Thread T-Shirts, which moved to its own site and
// came off this one on 2026-09-25: the redirects below are the only thing left
// here that points at it, so the value is resolved once, here, for them, and
// no app code reads it. docs/THREAD.md, config/thread-site.mjs.
const THREAD_SITE_URL = resolveThreadSiteUrl(
  process.env.NEXT_PUBLIC_THREAD_SITE_URL
);

// The same rule as H1's: a temporary 307 while the variable is unset and the
// target is only the fallback, a permanent 308 once it names the real host.
const THREAD_REDIRECT_PERMANENT = Boolean(
  process.env.NEXT_PUBLIC_THREAD_SITE_URL
);

/**
 * Content Security Policy. Everything the site loads is same-origin, Vercel
 * Analytics included (/_vercel/insights).
 *
 * Stripe needs no allowances: invoices are paid on Stripe's own hosted page,
 * and nothing here loads Stripe.js or embeds Stripe UI. If Stripe.js or
 * embedded Checkout is ever adopted, add https://*.stripe.com to script-src,
 * img-src, connect-src and frame-src (replacing its 'none'), and
 * https://*.link.com (Link) to connect-src and frame-src.
 *
 * The same goes for the booking link in data/site.ts: "Book a free call" is a
 * plain link to the scheduler's own page. Embedding a scheduler here instead
 * would need its origin in frame-src and script-src.
 *
 * `'unsafe-inline'` in script-src is required by Next's inline hydration
 * bootstrap. To remove it, generate a per-request nonce in proxy.ts (Next 16's
 * name for middleware) and emit the CSP from there instead. Note that `'unsafe-inline'` is ignored by browsers
 * whenever a nonce or hash is present, so the two cannot simply be combined.
 */
const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "frame-src 'none'",
  "form-action 'self'",
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
  poweredByHeader: false,
  // Images are served as-is, and this also turns /_next/image off (it 404s),
  // so there is no optimizer endpoint to attack or bill for. Every <Image> is a
  // small local webp (the footer draws its own 96px logo copy); give any new
  // one a copy sized for its slot rather than turning optimisation on.
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
      // The Support Us contribution page and the Partners page came off the
      // site on 2026-09-28 (it covers LEU, Lee Systems Co. and Business
      // Mastery only). Both go to the homepage, as does /sponsors, the name
      // /partners had before 2026-09-18. 301s, like the Lee Marketing Mastery
      // rename below, because the owner asked for 301s on permanent moves.
      {
        source: "/support",
        destination: "/",
        statusCode: 301,
      },
      {
        source: "/support/:path*",
        destination: "/",
        statusCode: 301,
      },
      {
        source: "/partners",
        destination: "/",
        statusCode: 301,
      },
      {
        source: "/sponsors",
        destination: "/",
        statusCode: 301,
      },
      // Lee Marketing Mastery became Lee Systems Co. on 2026-09-25 and moved
      // from /lee-marketing-mastery to /lee-systems. Same-origin rename with
      // no plan to go back, so these are permanent. 301 rather than Next's
      // default 308 for `permanent: true` because the owner asked for 301s;
      // for page GETs the two are equivalent to browsers and search engines.
      // The two offerings map to their new pages; the retired Traditional &
      // Digital Marketing page, and any other old path, goes to the main
      // page. Specific rules first: Next uses the first match.
      {
        source: "/lee-marketing-mastery",
        destination: "/lee-systems",
        statusCode: 301,
      },
      {
        source: "/lee-marketing-mastery/automation",
        destination: "/lee-systems/automation",
        statusCode: 301,
      },
      {
        source: "/lee-marketing-mastery/websites",
        destination: "/lee-systems/websites",
        statusCode: 301,
      },
      {
        source: "/lee-marketing-mastery/:path*",
        destination: "/lee-systems",
        statusCode: 301,
      },
      // The old logo and social-sharing image went with the brand. Anything
      // still linking to them (a cached share card, say) gets the new card.
      {
        source: "/og/lee-marketing-mastery.png",
        destination: "/lee-systems/opengraph-image",
        statusCode: 301,
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
      // Thread T-Shirts moved to its own site and came off this one on
      // 2026-09-25 (docs/THREAD.md). Like H1's, these redirects outlive the
      // listing on purpose: /thread-t-shirts was a real page here for months,
      // and the H1 site's footer still links to it for H1 apparel, so it
      // forwards rather than 404ing. Nothing on this site links here any more.
      // The Thread site is one page, so any sub-path collapses to its root; a
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
