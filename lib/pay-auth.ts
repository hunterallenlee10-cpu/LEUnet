import { createHash, timingSafeEqual } from "node:crypto";

/**
 * HTTP Basic Auth for the billing admin (/pay/admin and its API routes,
 * docs/PAY.md). proxy.ts runs this before any of them render, and each route
 * runs it again, so a matcher change can't quietly leave one open.
 *
 * The credentials are PAY_ADMIN_USER and PAY_ADMIN_PASSWORD. With either one
 * unset, or a password shorter than MIN_PASSWORD_LENGTH, nobody gets in: the
 * admin fails closed rather than open, and the 401 says which it is.
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

/**
 * The login from the environment, or what's wrong with it. Both values are
 * trimmed: a value pasted into Vercel often brings a trailing space or line
 * break, and nobody can type that into a sign-in box.
 */
function adminLogin(): { user: string; password: string } | { problem: string } {
  const user = (process.env.PAY_ADMIN_USER ?? "").trim();
  const password = (process.env.PAY_ADMIN_PASSWORD ?? "").trim();

  if (!user || !password) {
    return {
      problem:
        "The admin login isn't set up on this deployment. Add PAY_ADMIN_USER and PAY_ADMIN_PASSWORD in Vercel (Production), then redeploy.",
    };
  }
  if (password.length < MIN_PASSWORD_LENGTH) {
    return {
      problem: `PAY_ADMIN_PASSWORD is shorter than ${MIN_PASSWORD_LENGTH} characters, so it is refused. Set a longer one in Vercel, then redeploy.`,
    };
  }
  if (user.includes(":")) {
    return {
      problem:
        "PAY_ADMIN_USER contains a colon, which a browser sign-in can't send. Pick a name without one in Vercel, then redeploy.",
    };
  }
  return { user, password };
}

/** Whether an Authorization header carries the admin's credentials. */
export function isPayAdminAuthorized(header: string | null): boolean {
  const login = adminLogin();
  if ("problem" in login) return false;

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
  const userOk = safeEqual(decoded.slice(0, colon).trim(), login.user);
  const passwordOk = safeEqual(decoded.slice(colon + 1), login.password);
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

/**
 * The 401 that makes the browser ask for the user name and password. Its body
 * shows after the owner clicks Cancel. When the login itself is misconfigured
 * it says how, which is safe to show anyone: in that state nobody can sign in.
 */
export function payAdminChallenge(): Response {
  const login = adminLogin();
  const message =
    "problem" in login
      ? login.problem
      : "Sign-in required. If your user name and password are refused, check them against PAY_ADMIN_USER and PAY_ADMIN_PASSWORD in Vercel.";
  return new Response(message, {
    status: 401,
    headers: {
      "WWW-Authenticate": `Basic realm="${REALM}", charset="UTF-8"`,
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex, nofollow",
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
