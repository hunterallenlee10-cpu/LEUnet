import { NextResponse } from "next/server";

import { deactivatePayLink, logPayError } from "@/lib/pay";
import { rejectPayAdminRequest } from "@/lib/pay-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const NO_STORE = { "Cache-Control": "no-store" };

/**
 * POST /pay/admin/api/links/{id}/deactivate: turns a billing link off, so
 * both its /pay page and the Stripe link stop taking payments. Can't be
 * undone from here; the Stripe Dashboard can turn it back on.
 */
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const rejected = rejectPayAdminRequest(request);
  if (rejected) return rejected;

  const { id } = await params;

  try {
    const result = await deactivatePayLink(id);
    if (result === "not_found") {
      return NextResponse.json(
        { error: "No billing link with that id." },
        { status: 404, headers: NO_STORE }
      );
    }
    return NextResponse.json({ ok: true }, { headers: NO_STORE });
  } catch (error) {
    logPayError("deactivating a link failed", error);
    return NextResponse.json(
      { error: "Stripe didn't deactivate the link. Try again." },
      { status: 502, headers: NO_STORE }
    );
  }
}
