import Stripe from "stripe";

import { SITE_URL } from "@/data/company";
import { site } from "@/data/site";
import { isPaymentLinkId, type PayLinkValues } from "@/lib/pay-rules";
import { getStripe } from "@/lib/stripe";

/**
 * Client billing links (docs/PAY.md): the Stripe side of /pay. Server only;
 * every call here uses STRIPE_SECRET_KEY through lib/stripe.ts.
 *
 * Each link is a Stripe Payment Link with one Product, a one-time Price and/or
 * a monthly Price, and metadata naming the client. Nothing is stored on this
 * site: Stripe is the record, and every amount the pages show is read back
 * from the link's own line items.
 */

/** The metadata tag every link made here carries. Links without it are ignored. */
export const PAY_SOURCE = "leu-pay";

/** Where a client opens their link. */
export function payPageUrl(paymentLinkId: string): string {
  return `${SITE_URL}/pay/${paymentLinkId}`;
}

/** A link as the pages show it. Every amount comes from its Stripe line items. */
export interface PayLinkSummary {
  id: string;
  clientName: string;
  description: string;
  clientEmail: string;
  oneTimeCents: number;
  monthlyCents: number;
  /** The one-time amount plus the first month: what the client pays at checkout. */
  dueTodayCents: number;
  /** False once deactivated, here or in the Dashboard. */
  active: boolean;
  /** True once its one allowed checkout has completed. */
  paid: boolean;
  /**
   * Unix seconds. Payment Links have no `created` of their own, so this is
   * when their prices were made, which is the same moment.
   */
  createdAt: number | null;
  /** The Stripe-hosted link, for the admin's backup copy. */
  stripeUrl: string;
  /** The Stripe link with the client's email filled in, when there is one. */
  checkoutUrl: string;
  /** The branded page to text the client. */
  pageUrl: string;
}

/**
 * Reads a Payment Link into a summary, or returns null when it isn't one of
 * ours or isn't a shape this page can describe truthfully: anything but USD,
 * a non-monthly recurring price, or a trial (added in the Dashboard, say),
 * since a trial changes what's due today in a way the line items don't show.
 */
function summarize(
  link: Stripe.PaymentLink,
  items: Stripe.LineItem[]
): PayLinkSummary | null {
  const meta = link.metadata ?? {};
  if (meta.source !== PAY_SOURCE) return null;
  if (link.subscription_data?.trial_period_days) return null;
  if (items.length === 0) return null;

  let oneTimeCents = 0;
  let monthlyCents = 0;
  let createdAt: number | null = null;
  for (const item of items) {
    const price = item.price;
    if (!price || price.unit_amount === null || price.currency !== "usd") {
      return null;
    }
    const amount = price.unit_amount * (item.quantity ?? 1);
    createdAt = Math.max(createdAt ?? 0, price.created);
    if (price.type === "one_time") {
      oneTimeCents += amount;
    } else if (
      price.recurring?.interval === "month" &&
      price.recurring.interval_count === 1
    ) {
      monthlyCents += amount;
    } else {
      return null;
    }
  }

  const clientEmail = meta.client_email ?? "";
  const completed = link.restrictions?.completed_sessions;

  return {
    id: link.id,
    clientName: meta.client_name ?? "",
    description: meta.description ?? "",
    clientEmail,
    oneTimeCents,
    monthlyCents,
    dueTodayCents: oneTimeCents + monthlyCents,
    active: link.active,
    paid: Boolean(completed && completed.count >= completed.limit),
    createdAt,
    stripeUrl: link.url,
    checkoutUrl: clientEmail
      ? `${link.url}?prefilled_email=${encodeURIComponent(clientEmail)}`
      : link.url,
    pageUrl: payPageUrl(link.id),
  };
}

/** A link's line items: the expanded ones when present, else fetched. */
async function lineItemsFor(link: Stripe.PaymentLink): Promise<Stripe.LineItem[]> {
  if (link.line_items && !link.line_items.has_more) return link.line_items.data;
  return getStripe()
    .paymentLinks.listLineItems(link.id, { limit: 20 })
    .autoPagingToArray({ limit: 20 });
}

function isMissing(error: unknown): boolean {
  return (
    error instanceof Stripe.errors.StripeError &&
    (error.statusCode === 404 || error.code === "resource_missing")
  );
}

/**
 * Logs a failure without the request: the error's type, code, message and
 * Stripe's request id, which is enough to find it in the Dashboard's logs.
 * Never the body, the client's details or a key.
 */
export function logPayError(context: string, error: unknown): void {
  if (error instanceof Stripe.errors.StripeError) {
    console.error(`[pay] ${context}:`, {
      type: error.type,
      code: error.code,
      message: error.message,
      requestId: error.requestId,
    });
  } else {
    console.error(
      `[pay] ${context}:`,
      error instanceof Error ? error.message : "unknown error"
    );
  }
}

export type PayLinkLookup =
  | { status: "ok"; link: PayLinkSummary }
  /** Missing, not ours, deactivated, or already paid. */
  | { status: "inactive" }
  /** Stripe didn't answer. Not the client's fault, and not "inactive". */
  | { status: "error" };

/** The client page's read: one link and its line items. */
export async function getPayLink(id: string): Promise<PayLinkLookup> {
  if (!isPaymentLinkId(id)) return { status: "inactive" };

  try {
    const link = await getStripe().paymentLinks.retrieve(id, {
      expand: ["line_items"],
    });
    const summary = summarize(link, await lineItemsFor(link));
    if (!summary || !summary.active || summary.paid) return { status: "inactive" };
    return { status: "ok", link: summary };
  } catch (error) {
    if (isMissing(error)) return { status: "inactive" };
    logPayError("payment link lookup failed", error);
    return { status: "error" };
  }
}

/**
 * Every link made here, newest first. Stripe can't filter Payment Links by
 * metadata, so this reads the account's links and keeps the ones tagged
 * `source=leu-pay`.
 */
export async function listPayLinks(): Promise<PayLinkSummary[]> {
  const links = await getStripe()
    .paymentLinks.list({ limit: 100, expand: ["data.line_items"] })
    .autoPagingToArray({ limit: 1000 });

  const ours = links.filter((link) => link.metadata?.source === PAY_SOURCE);
  const summaries = await Promise.all(
    ours.map(async (link) => summarize(link, await lineItemsFor(link)))
  );

  return summaries
    .filter((summary): summary is PayLinkSummary => summary !== null)
    .sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0));
}

/** What Stripe shows anyone who opens a deactivated or used-up link directly. */
const INACTIVE_MESSAGE = `This payment link is no longer active. Questions? Call ${site.phone} or email ${site.email}.`;

/**
 * Creates the Product, its Prices and the Payment Link. `requestId` comes
 * from the admin form, one per filled-in form, and keys every call for
 * idempotency: a double click or a retried request returns the same objects
 * rather than making a second link.
 *
 * One-time and monthly together: Checkout charges both today (the one-time
 * amount plus the first month), then the monthly amount each month. Monthly
 * only makes a subscription link; one-time only, a regular payment link.
 */
export async function createPayLink(
  values: PayLinkValues,
  requestId: string
): Promise<PayLinkSummary> {
  const stripe = getStripe();
  const key = (step: string) => ({ idempotencyKey: `leu-pay-${requestId}-${step}` });

  const metadata: Stripe.MetadataParam = {
    source: PAY_SOURCE,
    client_name: values.clientName,
    description: values.description,
    ...(values.clientEmail ? { client_email: values.clientEmail } : {}),
  };
  // What rides along to the payment or subscription, so either one in the
  // Dashboard says whose it is.
  const paymentMetadata: Stripe.MetadataParam = {
    source: PAY_SOURCE,
    client_name: values.clientName,
    description: values.description,
  };

  const product = await stripe.products.create(
    {
      name: values.description,
      description: `For ${values.clientName}`,
      metadata: paymentMetadata,
    },
    key("product")
  );

  try {
    const lineItems: Stripe.PaymentLinkCreateParams.LineItem[] = [];

    if (values.oneTimeCents > 0) {
      const price = await stripe.prices.create(
        {
          product: product.id,
          currency: "usd",
          unit_amount: values.oneTimeCents,
          metadata: paymentMetadata,
        },
        key("price-one-time")
      );
      lineItems.push({ price: price.id, quantity: 1 });
    }

    const recurring = values.monthlyCents > 0;
    if (recurring) {
      const price = await stripe.prices.create(
        {
          product: product.id,
          currency: "usd",
          unit_amount: values.monthlyCents,
          recurring: { interval: "month" },
          metadata: paymentMetadata,
        },
        key("price-monthly")
      );
      lineItems.push({ price: price.id, quantity: 1 });
    }

    const link = await stripe.paymentLinks.create(
      {
        line_items: lineItems,
        metadata,
        // One completed purchase, then the link stops taking payments.
        restrictions: { completed_sessions: { limit: 1 } },
        after_completion: {
          type: "redirect",
          redirect: { url: `${SITE_URL}/pay/success` },
        },
        inactive_message: INACTIVE_MESSAGE,
        // No payment_method_types: Stripe shows the methods enabled in the
        // Dashboard. Tax stays off, as with invoicing (docs/STRIPE.md §5).
        ...(recurring
          ? { subscription_data: { metadata: paymentMetadata } }
          : {
              customer_creation: "always" as const,
              payment_intent_data: { metadata: paymentMetadata },
            }),
      },
      key("payment-link")
    );

    const summary = summarize(link, await lineItemsFor(link));
    if (!summary) throw new Error("Stripe returned a link this page can't read");
    return summary;
  } catch (error) {
    // Archive the half-made product so it doesn't sit in the catalog.
    await stripe.products.update(product.id, { active: false }).catch(() => {});
    throw error;
  }
}

/**
 * Turns a link off. Only links made here: anything else in the account is
 * reported as not found rather than touched.
 */
export async function deactivatePayLink(id: string): Promise<"ok" | "not_found"> {
  if (!isPaymentLinkId(id)) return "not_found";
  const stripe = getStripe();

  try {
    const link = await stripe.paymentLinks.retrieve(id);
    if (link.metadata?.source !== PAY_SOURCE) return "not_found";
    if (link.active) await stripe.paymentLinks.update(id, { active: false });
    return "ok";
  } catch (error) {
    if (isMissing(error)) return "not_found";
    throw error;
  }
}
