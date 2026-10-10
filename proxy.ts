import { NextResponse, type NextRequest } from "next/server";

import { isPayAdminAuthorized, payAdminChallenge } from "@/lib/pay-auth";

/**
 * Next 16's name for middleware. It does one job: HTTP Basic Auth in front of
 * the billing admin, /pay/admin and the API routes under it (docs/PAY.md). A
 * hidden URL alone is not protection. The routes check again themselves.
 *
 * The admin's API lives under /pay/admin/api rather than /api so the browser
 * sends the credentials it already has for /pay/admin with every request the
 * page makes, instead of asking again.
 */
export function proxy(request: NextRequest) {
  if (!isPayAdminAuthorized(request.headers.get("authorization"))) {
    return payAdminChallenge();
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/pay/admin", "/pay/admin/:path*"],
};
