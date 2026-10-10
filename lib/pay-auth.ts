import { createHash, timingSafeEqual } from "node:crypto";

/**
 * HTTP Basic Auth for the billing admin (/pay/admin and its API routes,
 * docs/PAY.md). proxy.ts runs this before any of them render, and each route
 * runs it again, so a matcher change can't quietly leave one open.
 *
 * The credentials are PAY_ADMIN_USER and PAY_ADMIN_PASSWORD. With either one
 * unset, or a password shorter than MIN_PASSWORD_LENGTH, nobody gets in: the
 * admin fails closed rather than open.
 */

const MIN_PASSWORD_LENGTH = 16;

/** The realm the browser shows in its sign-in prompt. */
const REALM = "LEU billing";

/**
 * Compares in constant time. Both sides are hashed first so they are always
 * the same length: timingSafeEqual throws on unequal lengths, and checking the
 * length first would tell an attacker how long the secret is.
 */
function safeEqual(provided: string, expected: string): boolean {
  const a = createHash("sha256").update(provided).digest();
  const b = createHash("sha256").update(expected).digest();
  return timingSafeEqual(a, b);
}

/** Whether an Authorization header carries the admin's credentials. */
export function isPayAdminAuthorized(header: string | null): boolean {
  const user = process.env.PAY_ADMIN_USER;
  const password = process.env.PAY_ADMIN_PASSWORD;
  if (!user || !password || password.length < MIN_PASSWORD_LENGTH) return false;

  if (!header || !header.startsWith("Basic ")) return false;

  let decoded: string;
  try {
    decoded = Buffer.from(header.slice(6).trim(), "base64").toString("utf8");
  } catch {
    return false;
  }

  // The password may contain a colon; the user name may not (RFC 7617).
  const colon = decoded.indexOf(":");
  if (colon === -1) return false;

  // Both checks always run, so the response time doesn't show which one failed.
  const userOk = safeEqual(decoded.slice(0, colon), user);
  const passwordOk = safeEqual(decoded.slice(colon + 1), password);
  return userOk && passwordOk;
}

/**
 * The admin API routes' own check, on top of proxy.ts: the credentials again,
 * and for a POST, that it came from this site's own page as JSON. The browser
 * attaches Basic Auth credentials to any request to this origin, including one
 * another site makes it send, so a cross-site form post must not get through
 * on them. Returns the response to send instead, or null to carry on.
 */
export function rejectPayAdminRequest(request: Request): Response | null {
  if (!isPayAdminAuthorized(request.headers.get("authorization"))) {
    return payAdminChallenge();
  }

  if (request.method !== "GET") {
    const fetchSite = request.headers.get("sec-fetch-site");
    const json = (request.headers.get("content-type") ?? "").startsWith(
      "application/json"
    );
    if ((fetchSite && fetchSite !== "same-origin") || !json) {
      return Response.json({ error: "Forbidden" }, { status: 403 });
    }
  }

  return null;
}

/** The 401 that makes the browser ask for the user name and password. */
export function payAdminChallenge(): Response {
  return new Response("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": `Basic realm="${REALM}", charset="UTF-8"`,
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex, nofollow",
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
