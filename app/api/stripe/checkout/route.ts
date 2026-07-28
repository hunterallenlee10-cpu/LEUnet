import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";

import {
  CHECKOUT_INTEGRATION_ID,
  getSiteUrl,
  getStripe,
} from "@/lib/stripe";
import {
  getOffering,
  isOfferingSlug,
  resolvePriceId,
} from "@/lib/stripe-catalog";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface CheckoutRequest {
  offering?: unknown;
  quantity?: unknown;
  email?: unknown;
  ventureContext?: unknown;
}

export async function POST(request: NextRequest) {
  try {
    const body: CheckoutRequest = await request.json();

    if (!isOfferingSlug(body.offering)) {
      return NextResponse.json(
        { error: "Unknown offering" },
        { status: 400 }
      );
    }

    const offering = getOffering(body.offering);

    // Quantity is the only number the client is allowed to influence, and it is
    // clamped to the offering's own ceiling.
    const requestedQuantity =
      typeof body.quantity === "number" ? Math.floor(body.quantity) : 1;
    if (!Number.isFinite(requestedQuantity) || requestedQuantity < 1) {
      return NextResponse.json(
        { error: "Quantity must be a positive whole number" },
        { status: 400 }
      );
    }
    const quantity = Math.min(requestedQuantity, offering.maxQuantity);

    const email =
      typeof body.email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email.trim())
        ? body.email.trim()
        : undefined;

    const stripe = getStripe();
    const siteUrl = getSiteUrl();
    const priceId = resolvePriceId(offering);

    // Prefer a Price modelled in the Dashboard; fall back to the inline amount
    // from the server-side catalog.
    const lineItem: Stripe.Checkout.SessionCreateParams.LineItem = priceId
      ? { price: priceId, quantity }
      : {
          quantity,
          price_data: {
            currency: offering.currency,
            unit_amount: offering.amountCents,
            product_data: {
              name: offering.name,
              description: offering.description,
            },
          },
        };

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      // `payment_method_types` is deliberately omitted so Stripe can pick the
      // highest-converting eligible methods per customer. Configure which
      // methods are available from the Dashboard, not from code.
      line_items: [lineItem],
      customer_email: email,
      client_reference_id: offering.ventureId,
      integration_identifier: CHECKOUT_INTEGRATION_ID,
      billing_address_collection: "auto",
      phone_number_collection: { enabled: true },
      metadata: {
        offering: body.offering,
        ventureId: offering.ventureId,
        ventureContext:
          typeof body.ventureContext === "string"
            ? body.ventureContext.slice(0, 400)
            : "",
      },
      payment_intent_data: {
        description: `${offering.name} — Lee Enterprises Unlimited`,
        metadata: {
          offering: body.offering,
          ventureId: offering.ventureId,
        },
      },
      success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/checkout/canceled`,
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Stripe did not return a Checkout URL" },
        { status: 502 }
      );
    }

    return NextResponse.json({ url: session.url, id: session.id });
  } catch (error) {
    // Never surface raw Stripe errors to the browser — they can leak account
    // and configuration detail.
    console.error("[stripe] checkout session creation failed:", error);
    return NextResponse.json(
      { error: "Unable to start checkout. Please try again." },
      { status: 500 }
    );
  }
}
