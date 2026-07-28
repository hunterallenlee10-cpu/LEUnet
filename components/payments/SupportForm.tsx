"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatAmountCompact } from "@/lib/money";
import {
  SUPPORT_MAX_CENTS,
  SUPPORT_MIN_CENTS,
  SUPPORT_PRESETS_CENTS,
} from "@/lib/support-config";

type Selection = number | "custom";

interface SupportFormProps {
  className?: string;
  /** Optional heading override. */
  title?: string;
}

/**
 * Pay-what-you-choose contribution form.
 *
 * Preset buttons post a fixed amount that the server re-validates. "Other
 * amount" posts no amount at all — Stripe collects it on its own hosted page,
 * bounded by the Price's minimum and maximum. Either way the browser cannot
 * set an amount the server hasn't agreed to.
 */
export function SupportForm({ className, title = "Support our work" }: SupportFormProps) {
  const [selection, setSelection] = useState<Selection>(SUPPORT_PRESETS_CENTS[1]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function startCheckout() {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/stripe/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          selection === "custom" ? {} : { amountCents: selection }
        ),
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
    <div className={cn("flex flex-col gap-5", className)}>
      <div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="mt-1 text-sm text-neutral-400">
          One-time contribution. Choose an amount below.
        </p>
      </div>

      <fieldset className="flex flex-wrap gap-2">
        <legend className="sr-only">Contribution amount</legend>

        {SUPPORT_PRESETS_CENTS.map((amount) => (
          <button
            key={amount}
            type="button"
            aria-pressed={selection === amount}
            onClick={() => setSelection(amount)}
            className={cn(
              "rounded-lg border px-4 py-2 text-sm font-medium transition-colors",
              selection === amount
                ? "border-amber-300 bg-amber-300/15 text-amber-200"
                : "border-white/15 text-neutral-300 hover:border-white/30"
            )}
          >
            {formatAmountCompact(amount)}
          </button>
        ))}

        <button
          type="button"
          aria-pressed={selection === "custom"}
          onClick={() => setSelection("custom")}
          className={cn(
            "rounded-lg border px-4 py-2 text-sm font-medium transition-colors",
            selection === "custom"
              ? "border-amber-300 bg-amber-300/15 text-amber-200"
              : "border-white/15 text-neutral-300 hover:border-white/30"
          )}
        >
          Other amount
        </button>
      </fieldset>

      {selection === "custom" && (
        <p className="text-sm text-neutral-400">
          You&apos;ll choose your amount on the next page — anywhere from{" "}
          {formatAmountCompact(SUPPORT_MIN_CENTS)} to{" "}
          {formatAmountCompact(SUPPORT_MAX_CENTS)}.
        </p>
      )}

      <Button
        onClick={startCheckout}
        disabled={isLoading}
        size="lg"
        aria-busy={isLoading}
        className="self-start"
      >
        {isLoading ? "Redirecting…" : "Continue"}
      </Button>

      {error && (
        <p role="alert" className="text-sm text-red-400">
          {error}
        </p>
      )}

      <p className="text-xs text-neutral-500">
        Lee Enterprises Unlimited is a for-profit company. Contributions are not
        tax-deductible charitable donations.
      </p>
    </div>
  );
}
