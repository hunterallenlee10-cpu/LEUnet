import { timingSafeEqual } from "node:crypto";

/**
 * Guards the internal Stripe endpoints (invoice creation, etc.) with a shared
 * bearer token. These routes can move real money and email real customers, so
 * they must never be reachable from the public site.
 *
 * This is deliberately simple because the site has no user accounts yet. If you
 * add staff logins later, replace this with a session check.
 */
export function isAuthorizedAdmin(request: Request): boolean {
  const expected = process.env.STRIPE_ADMIN_TOKEN;

  // Fail closed: with no token configured, the endpoint is unusable rather than
  // wide open.
  if (!expected || expected.length < 24) return false;

  const header = request.headers.get("authorization") ?? "";
  const provided = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (!provided) return false;

  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;

  return timingSafeEqual(a, b);
}
