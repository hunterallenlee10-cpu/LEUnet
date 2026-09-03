import { resolveH1SiteUrl } from "./config/h1-site.mjs";

// Resolved once here and handed to the app through `env` below, so the
// redirect and every link in the app read the same value. docs/H1.md §3.
const H1_SITE_URL = resolveH1SiteUrl(process.env.NEXT_PUBLIC_H1_SITE_URL);

// A 308 is cached by browsers indefinitely and treated by crawlers as a
// permanent move, so it must not ship pointing at a host that might not be the
// final one. While NEXT_PUBLIC_H1_SITE_URL is unset the redirect targets the
// fallback alias and stays a 307 (temporary), which nothing caches hard; set
// the variable to the real domain and it becomes a 308. docs/H1.md §3 spells
// out the deploy order.
const H1_REDIRECT_PERMANENT = Boolean(process.env.NEXT_PUBLIC_H1_SITE_URL);

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
  // applied, trailing slash stripped), so lib/h1-site.ts never sees an unset
  // variable inside a Next build.
  env: {
    NEXT_PUBLIC_H1_SITE_URL: H1_SITE_URL,
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
      // H1 Performance moved to its own site (docs/H1.md, config/h1-site.mjs).
      // Carries the old URL's inbound links and search placement over instead
      // of landing on a 404. The H1 site is one page, so any sub-path collapses
      // to its root; a `#section` fragment survives the redirect in the browser
      // and the section ids are unchanged there.
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
    ];
  },
};

export default nextConfig;
