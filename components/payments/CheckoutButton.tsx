"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { OfferingSlug } from "@/lib/stripe-catalog";

interface CheckoutButtonProps {
  offering: OfferingSlug;
  label: string;
  quantity?: number;
  email?: string;
  ventureContext?: string;
  className?: string;
}

/**
 * Starts a Stripe Checkout Session on the server and hands the browser off to
 * Stripe's hosted page. No amount is ever sent from here — the server resolves
 * pricing from the catalog using the offering slug alone.
 */
export function CheckoutButton({
  offering,
  label,
  quantity,
  email,
  ventureContext,
  className,
}: CheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function startCheckout() {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ offering, quantity, email, ventureContext }),
      });

      const data = await response.json();

      if (!response.ok || !data.url) {
        setError(data.error ?? "Unable to start checkout. Please try again.");
        setIsLoading(false);
        return;
      }

      window.location.assign(data.url);
    } catch {
      setError("Network error. Please check your connection and try again.");
      setIsLoading(false);
    }
  }

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Button
        onClick={startCheckout}
        disabled={isLoading}
        size="lg"
        aria-busy={isLoading}
      >
        {isLoading ? "Redirecting…" : label}
      </Button>

      {error && (
        <p role="alert" className="text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
