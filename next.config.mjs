import { resolveH1SiteUrl } from "./config/h1-site.mjs";

// Resolved once here and handed to the app through `env` below, so the
// redirect and every link in the app read the same value. docs/H1.md §3.
const H1_SITE_URL = resolveH1SiteUrl(process.env.NEXT_PUBLIC_H1_SITE_URL);

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
      // Permanent, so the old URL's inbound links and search placement carry
      // over instead of landing on a 404. The H1 site is one page, so any
      // sub-path collapses to its root; a `#section` fragment survives the
      // redirect in the browser and the section ids are unchanged there.
      {
        source: "/h1-performance",
        destination: H1_SITE_URL,
        permanent: true,
      },
      {
        source: "/h1-performance/:path*",
        destination: H1_SITE_URL,
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
