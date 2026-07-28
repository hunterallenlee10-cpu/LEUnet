import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { Resend } from "resend";

import { getStripe } from "@/lib/stripe";
import { formatAmount } from "@/lib/stripe-catalog";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Events we act on. Everything else is acknowledged with a 200 so Stripe stops
 * retrying, but is otherwise ignored.
 */
const HANDLED_EVENTS = new Set<Stripe.Event["type"]>([
  "checkout.session.completed",
  "checkout.session.async_payment_failed",
  "payment_intent.payment_failed",
  "invoice.paid",
  "invoice.payment_failed",
]);

/**
 * Best-effort replay guard for a single serverless instance. Stripe can deliver
 * the same event more than once, and instances are recycled constantly — so
 * before this integration writes to a database or triggers fulfillment, back
 * this with a persisted `processed_events` table keyed on event id.
 */
const recentlyProcessed = new Map<string, number>();
const REPLAY_WINDOW_MS = 10 * 60 * 1000;

function alreadyProcessed(eventId: string): boolean {
  const now = Date.now();
  for (const [id, seenAt] of recentlyProcessed) {
    if (now - seenAt > REPLAY_WINDOW_MS) recentlyProcessed.delete(id);
  }
  if (recentlyProcessed.has(eventId)) return true;
  recentlyProcessed.set(eventId, now);
  return false;
}

async function notify(subject: string, lines: string[]): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from:
        process.env.CONTACT_FROM_EMAIL || "noreply@leeenterprisesunlimited.com",
      to: process.env.CONTACT_TO_EMAIL || "ceo@leeenterprisesunlimited.com",
      subject,
      text: lines.join("\n"),
    });
  } catch (error) {
    // A failed notification must never fail the webhook — Stripe would retry
    // and we'd re-process a payment we already handled.
    console.error("[stripe] notification email failed:", error);
  }
}

async function handleEvent(event: Stripe.Event): Promise<void> {
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;

      // Async methods (bank debits) complete later. Only treat a session as
      // paid when Stripe says it is.
      if (session.payment_status !== "paid") {
        console.log(
          `[stripe] checkout ${session.id} completed but unpaid (${session.payment_status})`
        );
        return;
      }

      await notify(
        `Payment received — ${session.metadata?.ventureId ?? "LEU"} — ${formatAmount(
          session.amount_total ?? 0,
          session.currency ?? "usd"
        )}`,
        [
          `Offering: ${session.metadata?.offering ?? "unknown"}`,
          `Venture: ${session.metadata?.ventureId ?? "unknown"}`,
          `Amount: ${formatAmount(session.amount_total ?? 0, session.currency ?? "usd")}`,
          `Customer: ${session.customer_details?.name ?? "—"} <${session.customer_details?.email ?? "—"}>`,
          `Phone: ${session.customer_details?.phone ?? "—"}`,
          `Notes: ${session.metadata?.ventureContext || "—"}`,
          `Session: ${session.id}`,
        ]
      );
      return;
    }

    case "checkout.session.async_payment_failed":
    case "payment_intent.payment_failed": {
      const object = event.data.object as
        | Stripe.Checkout.Session
        | Stripe.PaymentIntent;
      console.warn(`[stripe] payment failed on ${object.id} (${event.type})`);
      return;
    }

    case "invoice.paid": {
      const invoice = event.data.object as Stripe.Invoice;
      await notify(
        `Invoice paid — ${formatAmount(invoice.amount_paid, invoice.currency)}`,
        [
          `Invoice: ${invoice.number ?? invoice.id}`,
          `Venture: ${invoice.metadata?.ventureId ?? "unknown"}`,
          `Amount paid: ${formatAmount(invoice.amount_paid, invoice.currency)}`,
          `Customer: ${invoice.customer_name ?? "—"} <${invoice.customer_email ?? "—"}>`,
        ]
      );
      return;
    }

    case "invoice.payment_failed": {
      const invoice = event.data.object as Stripe.Invoice;
      await notify(`Invoice payment failed — ${invoice.number ?? invoice.id}`, [
        `Invoice: ${invoice.number ?? invoice.id}`,
        `Customer: ${invoice.customer_email ?? "—"}`,
        `Amount due: ${formatAmount(invoice.amount_due, invoice.currency)}`,
        "Stripe will retry according to your dunning settings.",
      ]);
      return;
    }

    default:
      return;
  }
}

export async function POST(request: NextRequest) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    console.error("[stripe] STRIPE_WEBHOOK_SECRET is not set");
    return NextResponse.json({ error: "Not configured" }, { status: 500 });
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  // The signature is computed over the exact bytes Stripe sent, so the body must
  // be read raw — parsing it first would invalidate verification.
  const payload = await request.text();

  let event: Stripe.Event;
  try {
    event = await getStripe().webhooks.constructEventAsync(
      payload,
      signature,
      secret
    );
  } catch (error) {
    console.error("[stripe] webhook signature verification failed:", error);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (alreadyProcessed(event.id)) {
    return NextResponse.json({ received: true, duplicate: true });
  }

  if (!HANDLED_EVENTS.has(event.type)) {
    return NextResponse.json({ received: true, ignored: true });
  }

  try {
    await handleEvent(event);
  } catch (error) {
    // Return 500 so Stripe retries — but drop the replay guard entry first, or
    // the retry would be discarded as a duplicate.
    recentlyProcessed.delete(event.id);
    console.error(`[stripe] handler failed for ${event.type}:`, error);
    return NextResponse.json({ error: "Handler failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
