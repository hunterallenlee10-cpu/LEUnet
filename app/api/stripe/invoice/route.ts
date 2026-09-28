import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

import { isAuthorizedAdmin } from "@/lib/admin-auth";
import { readJsonBody, stringField } from "@/lib/api";
import { getStripe } from "@/lib/stripe";
import { isValidEmail } from "@/lib/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Ventures allowed on an invoice, used for reporting in the Dashboard. */
const VENTURE_IDS = ["lmm", "h1", "thread"] as const;
type VentureId = (typeof VENTURE_IDS)[number];

interface InvoiceLineInput {
  description: string;
  amountCents: number;
  quantity?: number;
}

interface InvoiceRequest {
  customer: {
    email: string;
    name?: string;
    phone?: string;
  };
  ventureId: VentureId;
  lines: InvoiceLineInput[];
  /** Net terms. Defaults to 14 days. */
  daysUntilDue?: number;
  /** Shown at the top of the invoice. */
  description?: string;
  /** Shown at the bottom of the invoice. */
  footer?: string;
  /** When false, the invoice is left as a reviewable draft. Defaults to true. */
  send?: boolean;
}

const MAX_LINES = 50;
const MAX_LINE_AMOUNT_CENTS = 5_000_000; // $50,000 per line

function validate(body: Partial<InvoiceRequest>): string | null {
  const email = stringField(body.customer?.email).trim();
  if (!email || !isValidEmail(email)) {
    return "A valid customer.email is required";
  }

  if (!body.ventureId || !VENTURE_IDS.includes(body.ventureId)) {
    return `ventureId must be one of: ${VENTURE_IDS.join(", ")}`;
  }

  if (!Array.isArray(body.lines) || body.lines.length === 0) {
    return "At least one line item is required";
  }

  if (body.lines.length > MAX_LINES) {
    return `No more than ${MAX_LINES} line items per invoice`;
  }

  for (const line of body.lines) {
    if (typeof line?.description !== "string" || !line.description.trim()) {
      return "Every line item needs a description";
    }
    if (
      typeof line?.amountCents !== "number" ||
      !Number.isInteger(line.amountCents) ||
      line.amountCents <= 0 ||
      line.amountCents > MAX_LINE_AMOUNT_CENTS
    ) {
      return "Every line item needs amountCents as a positive whole number of cents";
    }
    if (
      line.quantity !== undefined &&
      (!Number.isInteger(line.quantity) || line.quantity < 1)
    ) {
      return "Line item quantity must be a positive whole number";
    }
  }

  if (
    body.daysUntilDue !== undefined &&
    (!Number.isInteger(body.daysUntilDue) ||
      body.daysUntilDue < 0 ||
      body.daysUntilDue > 365)
  ) {
    return "daysUntilDue must be a whole number between 0 and 365";
  }

  return null;
}

export async function POST(request: NextRequest) {
  if (!isAuthorizedAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const parsed = await readJsonBody(request);
  if (parsed instanceof NextResponse) return parsed;
  const body = parsed as Partial<InvoiceRequest>;

  const validationError = validate(body);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  const input = body as InvoiceRequest;
  const email = input.customer.email.trim();

  try {
    const stripe = getStripe();

    // Reuse an existing customer when we've billed this email before, so the
    // Dashboard shows one contact with a full payment history.
    const existing = await stripe.customers.list({ email, limit: 1 });
    const customer =
      existing.data[0] ??
      (await stripe.customers.create({
        email,
        name: stringField(input.customer.name).trim() || undefined,
        phone: stringField(input.customer.phone).trim() || undefined,
        metadata: { ventureId: input.ventureId },
      }));

    // Create the invoice first, then attach items directly to it.
    // `pending_invoice_items_behavior: "exclude"` stops any unrelated pending
    // item on the customer from being swept onto this invoice.
    const invoice = await stripe.invoices.create({
      customer: customer.id,
      collection_method: "send_invoice",
      days_until_due: input.daysUntilDue ?? 14,
      description: stringField(input.description).trim() || undefined,
      footer: stringField(input.footer).trim() || undefined,
      pending_invoice_items_behavior: "exclude",
      // Stripe Tax is intentionally left off. Enabling `automatic_tax` without an
      // active tax registration silently collects nothing. See docs/STRIPE.md.
      auto_advance: false,
      metadata: { ventureId: input.ventureId },
    });

    if (!invoice.id) {
      throw new Error("Stripe returned an invoice without an id");
    }

    for (const line of input.lines) {
      await stripe.invoiceItems.create({
        customer: customer.id,
        invoice: invoice.id,
        description: line.description.trim(),
        currency: "usd",
        quantity: line.quantity ?? 1,
        // InvoiceItem price_data requires an existing Product, so ad-hoc quote
        // lines use a unit amount instead.
        unit_amount_decimal: Stripe.Decimal.from(line.amountCents),
      });
    }

    const shouldSend = input.send !== false;
    let result: Stripe.Invoice;
    if (shouldSend) {
      const finalized = await stripe.invoices.finalizeInvoice(invoice.id);
      result = finalized.id
        ? await stripe.invoices.sendInvoice(finalized.id)
        : finalized;
    } else {
      // Left as a draft, since finalizing numbers the invoice and locks its
      // lines. Re-read because `invoice` predates the line items, so its
      // totals are still zero. A draft has no hosted page or PDF yet, so
      // those two fields come back null.
      result = await stripe.invoices.retrieve(invoice.id);
    }

    return NextResponse.json({
      id: result.id,
      status: result.status,
      total: result.total,
      currency: result.currency,
      customerId: customer.id,
      hostedInvoiceUrl: result.hosted_invoice_url,
      invoicePdf: result.invoice_pdf,
      sent: shouldSend,
    });
  } catch (error) {
    console.error("[stripe] invoice creation failed:", error);
    return NextResponse.json(
      { error: "Unable to create the invoice" },
      { status: 500 }
    );
  }
}
