/**
 * Where Business Mastery lives on this site: its own subdomain,
 * mastery.leeenterprisesunlimited.net, served by this same project. This repo
 * is the .net site, so it has its own copy of the page, separate from the .com
 * site's mastery.leeenterprisesunlimited.com. docs/BUSINESS-MASTERY.md has the
 * whole arrangement.
 *
 * next.config.mjs answers that host with the /business-mastery page at its
 * root and sends every other page on it back to the www host. Those host rules
 * are always on: until the subdomain is attached in Vercel, no request ever
 * arrives on it, so they do nothing.
 *
 * `BUSINESS_MASTERY_SITE_LIVE` is the switch for everything else: the links
 * across the site, the page's canonical address, the sitemap entry and the
 * www /business-mastery redirect. While it is off they all use
 * www.leeenterprisesunlimited.net/business-mastery. Flip it to true only once
 * https://mastery.leeenterprisesunlimited.net shows the Business Mastery page,
 * or every one of those would point at an address that does not answer yet.
 *
 * A plain JavaScript module rather than TypeScript because next.config.mjs
 * imports it and cannot import TypeScript; the app imports it too.
 */
export const BUSINESS_MASTERY_HOST = "mastery.leeenterprisesunlimited.net";

/** The subdomain's origin, no trailing slash. */
export const BUSINESS_MASTERY_SITE_URL = `https://${BUSINESS_MASTERY_HOST}`;

/**
 * On since 2026-10-18, when mastery.leeenterprisesunlimited.net was attached
 * to this project in Vercel.
 * @type {boolean}
 */
export const BUSINESS_MASTERY_SITE_LIVE = true;
