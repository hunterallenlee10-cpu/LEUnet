import { NextResponse } from "next/server";

import { readJsonBody, stringField } from "@/lib/api";
import { createPayLink, listPayLinks, logPayError } from "@/lib/pay";
import { rejectPayAdminRequest } from "@/lib/pay-auth";
import { validatePayLink } from "@/lib/pay-rules";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Nothing here may be cached anywhere: it's the admin's live list. */
const NO_STORE = { "Cache-Control": "no-store" };

/** One per filled-in form, from crypto.randomUUID() in the browser. */
const REQUEST_ID_PATTERN = /^[A-Za-z0-9-]{16,64}$/;

/** An amount as posted: the form sends the typed string, a script may send a number. */
function amountField(value: unknown): string {
  return typeof value === "number" ? String(value) : stringField(value);
}

/** GET /pay/admin/api/links: every billing link, newest first. */
export async function GET(request: Request) {
  const rejected = rejectPayAdminRequest(request);
  if (rejected) return rejected;

  try {
    const links = await listPayLinks();
    return NextResponse.json({ links }, { headers: NO_STORE });
  } catch (error) {
    logPayError("listing links failed", error);
    return NextResponse.json(
      { error: "Couldn't load the links from Stripe. Try again." },
      { status: 502, headers: NO_STORE }
    );
  }
}

/** POST /pay/admin/api/links: makes a link from the admin form. */
export async function POST(request: Request) {
  const rejected = rejectPayAdminRequest(request);
  if (rejected) return rejected;

  const body = await readJsonBody(request);
  if (body instanceof NextResponse) return body;

  const requestId = stringField(body.requestId);
  if (!REQUEST_ID_PATTERN.test(requestId)) {
    return NextResponse.json(
      { errors: { form: "Reload the page and try again." } },
      { status: 400, headers: NO_STORE }
    );
  }

  const checked = validatePayLink({
    clientName: stringField(body.clientName),
    description: stringField(body.description),
    oneTime: amountField(body.oneTime),
    monthly: amountField(body.monthly),
    clientEmail: stringField(body.clientEmail),
  });
  if ("errors" in checked) {
    return NextResponse.json(
      { errors: checked.errors },
      { status: 400, headers: NO_STORE }
    );
  }

  try {
    const link = await createPayLink(checked.values, requestId);
    return NextResponse.json({ link }, { status: 201, headers: NO_STORE });
  } catch (error) {
    logPayError("creating a link failed", error);
    return NextResponse.json(
      {
        errors: {
          form: "Stripe didn't create the link. Nothing was charged. Try again, or check the Stripe Dashboard.",
        },
      },
      { status: 502, headers: NO_STORE }
    );
  }
}
