"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { Check, Loader2, Lock, ShieldCheck } from "lucide-react";

import { formatAmountCompact } from "@/lib/money";
import {
  SUPPORT_MAX_CENTS,
  SUPPORT_MIN_CENTS,
  SUPPORT_PRESET_CENTS,
  SUPPORT_PRESETS_CENTS,
} from "@/lib/support-config";

type Selection = number | "custom";

/**
 * Pay-what-you-choose contribution form.
 *
 * Preset buttons post a fixed amount that the server re-validates. "Other
 * amount" posts no amount at all — Stripe collects it on its own hosted page,
 * bounded by the Price's minimum and maximum. Either way the browser cannot
 * set an amount the server hasn't agreed to.
 */
export function SupportForm() {
  const [selection, setSelection] = useState<Selection>(SUPPORT_PRESETS_CENTS[1]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // A successful start leaves isLoading set while the browser heads to
  // Stripe. Pressing Back can restore this page from the back/forward cache
  // with that state intact, so re-enable the button when it does.
  useEffect(() => {
    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted) setIsLoading(false);
    };
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, []);

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
    <div className="flex flex-col">
      <div>
        <h2 className="text-xl font-semibold tracking-tight text-white">
          Support our work
        </h2>
        <p className="mt-1.5 text-sm text-neutral-400">
          One-time contribution. Choose an amount below.
        </p>
      </div>

      <fieldset className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <legend className="sr-only">Contribution amount</legend>

        {SUPPORT_PRESETS_CENTS.map((amount) => (
          <AmountOption
            key={amount}
            selected={selection === amount}
            onSelect={() => setSelection(amount)}
            label={formatAmountCompact(amount)}
            note={amount === SUPPORT_PRESET_CENTS ? "Suggested" : undefined}
          />
        ))}

        <AmountOption
          selected={selection === "custom"}
          onSelect={() => setSelection("custom")}
          label="Other"
          note="You choose"
        />
      </fieldset>

      {selection === "custom" && (
        <p className="mt-4 text-sm leading-relaxed text-neutral-400">
          You&apos;ll choose your amount on the next page, anywhere from{" "}
          {formatAmountCompact(SUPPORT_MIN_CENTS)} to{" "}
          {formatAmountCompact(SUPPORT_MAX_CENTS)}.
        </p>
      )}

      {/* The 1px transparent border (bg-clip-padding keeps the gradient
          inside it) and focus-visible:border-ring, which reads --ring in
          globals.css, are part of the look. The press stays
          active:not-aria-[haspopup] because that extra specificity is what
          lets it beat the hover lift. */}
      <button
        type="button"
        onClick={startCheckout}
        disabled={isLoading}
        aria-busy={isLoading}
        className="inline-flex shrink-0 items-center justify-center border border-transparent bg-clip-padding whitespace-nowrap outline-none select-none focus-visible:border-ring focus-visible:ring-3 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 mt-7 h-12 w-full gap-2 rounded-xl px-6 text-base font-semibold bg-gradient-to-b from-amber-300 to-amber-400 text-neutral-950 shadow-[0_8px_30px_-8px_rgba(212,175,55,0.55)] transition-[transform,box-shadow,filter] duration-200 hover:from-amber-200 hover:to-amber-300 hover:shadow-[0_10px_36px_-8px_rgba(212,175,55,0.7)] motion-safe:hover:-translate-y-0.5 focus-visible:ring-amber-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 disabled:opacity-70 disabled:shadow-none"
      >
        {isLoading ? (
          <>
            <Loader2
              className="size-4 motion-safe:animate-spin"
              aria-hidden="true"
            />
            Redirecting…
          </>
        ) : (
          "Continue to secure checkout"
        )}
      </button>

      {error && (
        <p
          role="alert"
          className="mt-3 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300"
        >
          {error}
        </p>
      )}

      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-neutral-400">
        <span className="inline-flex items-center gap-1.5">
          <Lock className="size-3.5 text-amber-300/80" aria-hidden="true" />
          Secure checkout powered by Stripe
        </span>
        <span className="inline-flex items-center gap-1.5">
          <ShieldCheck className="size-3.5 text-amber-300/80" aria-hidden="true" />
          Card details never touch this site
        </span>
      </div>

      <div className="mt-6 border-t border-white/10 pt-5">
        <p className="text-xs leading-relaxed text-neutral-500">
          Lee Enterprises Unlimited is a for-profit company. Contributions are
          not tax-deductible charitable donations.
        </p>
      </div>
    </div>
  );
}

interface AmountOptionProps {
  selected: boolean;
  onSelect: () => void;
  label: string;
  note?: string;
}

/**
 * One choice in the amount selector. Kept as a plain button with `aria-pressed`
 * rather than a radio group so every option stays reachable with Tab — there
 * are four of them at most.
 */
function AmountOption({ selected, onSelect, label, note }: AmountOptionProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onSelect}
      className={clsx(
        "relative flex h-20 flex-col items-center justify-center rounded-xl border",
        "outline-none transition-all duration-200",
        "focus-visible:ring-3 focus-visible:ring-amber-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900",
        "motion-safe:hover:-translate-y-0.5",
        selected
          ? "border-amber-300/70 bg-amber-300/10 shadow-[0_0_0_1px_rgba(252,211,77,0.25),0_8px_24px_-12px_rgba(212,175,55,0.8)]"
          : "border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.06]"
      )}
    >
      {selected && (
        <span
          className="absolute top-2 right-2 flex size-4 items-center justify-center rounded-full bg-amber-300 text-neutral-950"
          aria-hidden="true"
        >
          <Check className="size-3" strokeWidth={3} />
        </span>
      )}

      <span
        className={clsx(
          "text-xl font-semibold tracking-tight transition-colors",
          selected ? "text-amber-200" : "text-white"
        )}
      >
        {label}
      </span>

      {/* Positioned rather than stacked so the amount stays optically centred
          whether or not this option carries a note. */}
      {note && (
        <span
          className={clsx(
            "absolute inset-x-0 bottom-2.5 text-[11px] font-medium tracking-wide uppercase transition-colors",
            selected ? "text-amber-300/80" : "text-neutral-500"
          )}
        >
          {note}
        </span>
      )}
    </button>
  );
}
