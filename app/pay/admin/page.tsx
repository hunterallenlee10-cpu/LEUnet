import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

import { PayAdmin } from "@/components/pay/PayAdmin";
import { listPayLinks, logPayError, type PayLinkSummary } from "@/lib/pay";
import { isPayAdminAuthorized } from "@/lib/pay-auth";

/**
 * /pay/admin: where the owner makes client billing links (docs/PAY.md).
 * proxy.ts asks for the Basic Auth user name and password before this
 * renders; the check here is a second lock in case the matcher ever changes.
 */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: { absolute: "Billing admin | Lee Enterprises Unlimited" },
};

export default async function PayAdminPage() {
  const authorization = (await headers()).get("authorization");
  if (!isPayAdminAuthorized(authorization)) notFound();

  let initialLinks: PayLinkSummary[] | null = null;
  try {
    initialLinks = await listPayLinks();
  } catch (error) {
    // The component shows the list's own error and a retry.
    logPayError("listing links failed", error);
  }

  return <PayAdmin initialLinks={initialLinks} />;
}
