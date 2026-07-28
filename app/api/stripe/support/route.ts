import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";

import { CHECKOUT_INTEGRATION_ID, getSiteUrl, getStripe } from "@/lib/stripe";
import {
  SUPPORT_CURRENCY,
  SUPPORT_MAX_CENTS,
  SUPPORT_MIN_CENTS,
  SUPPORT_PRODUCT_DESCRIPTION,
  SUPPORT_PRODUCT_NAME,
  SUPPORT_STATEMENT_DESCRIPTOR_SUFFIX,
  getCustomAmountPriceId,
  isAllowedSupportAmount,
} from "@/lib/support-config";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface SupportRequest {
  /**
   * Preset amount in cents. Omit entirely to let the supporter enter their own
   * amount on Stripe's hosted page.
   */
  amountCents?: unknown;
  email?: unknown;
}

export async function POST(request: NextRequest) {
  let body: SupportRequest;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const wantsCustomAmount =
    body.amountCents === undefined || body.amountCents === null;

  if (!wantsCustomAmount && !isAllowedSupportAmount(body.amountCents)) {
    return NextResponse.json(
      {
        error: `Amount must be a whole number of cents between ${SUPPORT_MIN_CENTS} and ${SUPPORT_MAX_CENTS}`,
      },
      { status: 400 }
    );
  }

  const customPriceId = getCustomAmountPriceId();
  if (wantsCustomAmount && !customPriceId) {
    return NextResponse.json(
      { error: "Custom amounts are not configured" },
      { status: 503 }
    );
  }

  const email =
    typeof body.email === "string" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email.trim())
      ? body.email.trim()
      : undefined;

  // Custom amounts resolve to a Price whose min/max live in Stripe, so the
  // browser cannot influence the bounds. Presets are validated above.
  const lineItem: Stripe.Checkout.SessionCreateParams.LineItem =
    wantsCustomAmount
      ? { price: customPriceId, quantity: 1 }
      : {
          quantity: 1,
          price_data: {
            currency: SUPPORT_CURRENCY,
            unit_amount: body.amountCents as number,
            product_data: {
              name: SUPPORT_PRODUCT_NAME,
              description: SUPPORT_PRODUCT_DESCRIPTION,
            },
          },
        };

  try {
    const stripe = getStripe();
    const siteUrl = getSiteUrl();

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      // `submit_type: "donate"` is avoided on purpose. LEU is a for-profit
      // company, so donation framing would misrepresent what this payment is.
      submit_type: "pay",
      // `payment_method_types` is omitted so Stripe selects the eligible
      // methods with the best conversion for each supporter.
      line_items: [lineItem],
      customer_email: email,
      integration_identifier: CHECKOUT_INTEGRATION_ID,
      // Collected on Stripe's page rather than ours, so the supporter's details
      // never touch our servers.
      custom_fields: [
        {
          key: "supportername",
          label: { type: "custom", custom: "Name to show with your support" },
          type: "text",
          optional: true,
          text: { maximum_length: 100 },
        },
        {
          key: "supportermessage",
          label: { type: "custom", custom: "Message (optional)" },
          type: "text",
          optional: true,
          text: { maximum_length: 255 },
        },
      ],
      metadata: {
        kind: "support",
        amountMode: wantsCustomAmount ? "custom" : "preset",
      },
      payment_intent_data: {
        description: SUPPORT_PRODUCT_NAME,
        // Cards reject `statement_descriptor` outright — the suffix is the
        // supported field for a per-charge label.
        statement_descriptor_suffix: SUPPORT_STATEMENT_DESCRIPTOR_SUFFIX,
        metadata: { kind: "support" },
      },
      success_url: `${siteUrl}/support/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/support/canceled`,
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Stripe did not return a Checkout URL" },
        { status: 502 }
      );
    }

    return NextResponse.json({ url: session.url, id: session.id });
  } catch (error) {
    console.error("[stripe] support session creation failed:", error);
    return NextResponse.json(
      { error: "Unable to start checkout. Please try again." },
      { status: 500 }
    );
  }
}
