/**
 * Where Business Mastery lives: its own subdomain, mastery.leeenterprisesunlimited.com,
 * served by this same project (the owner's call, 2026-10-06). docs/BUSINESS-MASTERY.md
 * has the whole arrangement.
 *
 * next.config.mjs answers that host with the /business-mastery page at its
 * root and sends every other page on it back to the www host. Those host rules
 * are always on: until the subdomain is attached in Vercel and its DNS record
 * exists, no request ever arrives on it, so they do nothing.
 *
 * `BUSINESS_MASTERY_SITE_LIVE` is the switch for everything else: the links
 * across the site, the page's canonical address, the sitemap entry and the
 * www /business-mastery redirect. Flip it to true only once
 * https://mastery.leeenterprisesunlimited.com shows the Business Mastery page,
 * or every one of those would point at an address that does
 * not answer yet.
 *
 * A plain JavaScript module rather than TypeScript because next.config.mjs
 * imports it and cannot import TypeScript; the app imports it too.
 */
export const BUSINESS_MASTERY_HOST = "mastery.leeenterprisesunlimited.com";

/** The subdomain's origin, no trailing slash. */
export const BUSINESS_MASTERY_SITE_URL = `https://${BUSINESS_MASTERY_HOST}`;

/**
 * On since 2026-10-06, when the subdomain first answered with the page.
 * @type {boolean}
 */
export const BUSINESS_MASTERY_SITE_LIVE = true;
