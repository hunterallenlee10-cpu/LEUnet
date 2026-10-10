"use client";

import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { Check, Copy, RefreshCw } from "lucide-react";
import clsx from "clsx";

import type { PayLinkSummary } from "@/lib/pay";
import { formatAmount } from "@/lib/money";
import {
  MAX_AMOUNT_CENTS,
  PAY_FIELD_LIMITS,
  validatePayLink,
  type PayLinkErrors,
  type PayLinkInput,
} from "@/lib/pay-rules";

const API = "/pay/admin/api/links";

const emptyForm: PayLinkInput = {
  clientName: "",
  description: "",
  oneTime: "",
  monthly: "",
  clientEmail: "",
};

/** The order errors are checked in, which is the order focus goes to them. */
const fieldOrder: (keyof PayLinkInput)[] = [
  "clientName",
  "description",
  "oneTime",
  "monthly",
  "clientEmail",
];

const labelClass = "mb-2 block text-sm font-medium text-neutral-200";
const hintClass = "mt-2 text-sm text-neutral-500";
const fieldClass =
  "min-h-12 w-full rounded-lg border bg-neutral-950/70 px-4 py-3 text-white placeholder-neutral-500 transition-colors focus:border-amber-400/70 focus:outline-none focus:ring-2 focus:ring-amber-400/40";
const borderFor = (error?: string) =>
  error ? "border-red-500/60" : "border-white/10 hover:border-white/20";
const buttonClass =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60";
const primaryButton = `${buttonClass} bg-amber-400 text-neutral-950 hover:bg-amber-300`;
const quietButton = `${buttonClass} border border-white/15 text-neutral-200 hover:border-amber-400/60 hover:text-white`;

const maxDollars = (MAX_AMOUNT_CENTS / 100).toLocaleString("en-US");

const dateFormat = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeZone: "America/New_York",
});

function newRequestId(): string {
  return crypto.randomUUID();
}

function ErrorText({ id, children }: { id: string; children?: string }) {
  if (!children) return null;
  return (
    <p id={id} role="alert" className="mt-2 text-sm text-red-400">
      {children}
    </p>
  );
}

/** Copies text, showing "Copied" for a moment. */
function CopyButton({
  text,
  label = "Copy",
  className = quietButton,
}: {
  text: string;
  label?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked: the URL is in a field beside the button to copy by hand.
      window.prompt("Copy this link:", text);
    }
  };

  return (
    <button type="button" onClick={copy} className={className}>
      {copied ? (
        <Check className="h-4 w-4" aria-hidden="true" />
      ) : (
        <Copy className="h-4 w-4" aria-hidden="true" />
      )}
      <span aria-live="polite">{copied ? "Copied" : label}</span>
    </button>
  );
}

/** A URL in a read-only field with its Copy button. */
function UrlRow({ id, label, url }: { id: string; label: string; url: string }) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          id={id}
          type="text"
          readOnly
          value={url}
          onFocus={(e) => e.currentTarget.select()}
          className={`${fieldClass} border-white/10 font-mono text-sm`}
        />
        <CopyButton text={url} className={`${primaryButton} sm:shrink-0`} />
      </div>
    </div>
  );
}

function StatusBadge({ link }: { link: PayLinkSummary }) {
  const [label, tone] = link.paid
    ? ["Paid", "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"]
    : link.active
      ? ["Active", "border-amber-400/30 bg-amber-400/10 text-amber-300"]
      : ["Inactive", "border-white/10 bg-white/5 text-neutral-400"];
  return (
    <span
      className={clsx(
        "inline-flex shrink-0 items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold",
        tone
      )}
    >
      {label}
    </span>
  );
}

function amountsLine(link: PayLinkSummary): string {
  const parts: string[] = [];
  if (link.oneTimeCents > 0) parts.push(`${formatAmount(link.oneTimeCents)} one-time`);
  if (link.monthlyCents > 0) parts.push(`${formatAmount(link.monthlyCents)}/month`);
  return parts.join(" + ");
}

/**
 * The billing admin: the form that makes a link, the link it just made, and
 * every link made so far. Every amount shown is what Stripe sent back.
 */
export function PayAdmin({
  initialLinks,
}: {
  initialLinks: PayLinkSummary[] | null;
}) {
  const [form, setForm] = useState<PayLinkInput>(emptyForm);
  const [errors, setErrors] = useState<PayLinkErrors>({});
  const [submitting, setSubmitting] = useState(false);
  // One per filled-in form: the server keys Stripe's idempotency on it, so a
  // double submit returns the same link instead of making two.
  const [requestId, setRequestId] = useState(newRequestId);
  const [created, setCreated] = useState<PayLinkSummary | null>(null);
  const createdRef = useRef<HTMLHeadingElement>(null);

  const [links, setLinks] = useState<PayLinkSummary[] | null>(initialLinks);
  const [listError, setListError] = useState(
    initialLinks ? "" : "Couldn't load the links from Stripe."
  );
  const [loadingList, setLoadingList] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);

  useEffect(() => {
    if (created) createdRef.current?.focus();
  }, [created]);

  const refreshList = async () => {
    setLoadingList(true);
    try {
      const response = await fetch(API, { cache: "no-store" });
      const data = await response.json().catch(() => null);
      if (!response.ok || !data?.links) throw new Error();
      setLinks(data.links as PayLinkSummary[]);
      setListError("");
    } catch {
      setListError("Couldn't load the links from Stripe.");
    } finally {
      setLoadingList(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined, form: undefined }));
  };

  const showErrors = (found: PayLinkErrors) => {
    flushSync(() => setErrors(found));
    const first = fieldOrder.find((field) => found[field]);
    if (first) document.getElementById(`pay-${first}`)?.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    const checked = validatePayLink(form);
    if ("errors" in checked) {
      showErrors(checked.errors);
      return;
    }

    setSubmitting(true);
    setErrors({});
    try {
      const response = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, requestId }),
      });
      const data = await response.json().catch(() => null);

      if (response.ok && data?.link) {
        setCreated(data.link as PayLinkSummary);
        setForm(emptyForm);
        setRequestId(newRequestId());
        void refreshList();
        return;
      }

      if (data?.errors) showErrors(data.errors as PayLinkErrors);
      else setErrors({ form: `Something went wrong (http_${response.status}). Try again.` });
    } catch {
      setErrors({ form: "Couldn't reach the server. Check your connection and try again." });
    } finally {
      setSubmitting(false);
    }
  };

  const deactivate = async (link: PayLinkSummary) => {
    const ok = window.confirm(
      `Deactivate the link for ${link.clientName}? The client won't be able to pay with it. You can turn it back on in the Stripe Dashboard.`
    );
    if (!ok) return;

    setBusyId(link.id);
    try {
      const response = await fetch(
        `${API}/${encodeURIComponent(link.id)}/deactivate`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: "{}",
        }
      );
      if (!response.ok) throw new Error();
      if (created?.id === link.id) setCreated({ ...created, active: false });
      await refreshList();
    } catch {
      setListError(`Couldn't deactivate the link for ${link.clientName}. Try again.`);
    } finally {
      setBusyId(null);
    }
  };

  const field = (
    name: keyof PayLinkInput,
    label: string,
    props: React.InputHTMLAttributes<HTMLInputElement> & { hint?: string; prefix?: string }
  ) => {
    const { hint, prefix, ...inputProps } = props;
    const error = errors[name];
    const describedBy =
      [error && `pay-${name}-error`, hint && `pay-${name}-hint`].filter(Boolean).join(" ") ||
      undefined;
    return (
      <div>
        <label htmlFor={`pay-${name}`} className={labelClass}>
          {label}
        </label>
        <div className="relative">
          {prefix && (
            <span
              className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-neutral-400"
              aria-hidden="true"
            >
              {prefix}
            </span>
          )}
          <input
            id={`pay-${name}`}
            name={name}
            value={form[name]}
            onChange={handleChange}
            aria-invalid={error ? "true" : undefined}
            aria-describedby={describedBy}
            className={clsx(fieldClass, borderFor(error), prefix && "pl-8")}
            {...inputProps}
          />
        </div>
        {hint && (
          <p id={`pay-${name}-hint`} className={hintClass}>
            {hint}
          </p>
        )}
        <ErrorText id={`pay-${name}-error`}>{error}</ErrorText>
      </div>
    );
  };

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">
        Client billing
      </h1>
      <p className="mt-3 text-center text-neutral-400">
        Make a Stripe payment link, then text the client their page.
      </p>

      <form
        onSubmit={handleSubmit}
        noValidate
        aria-labelledby="pay-form-title"
        className="glass-card mt-10 p-6 md:p-8"
      >
        <h2 id="pay-form-title" className="text-xl font-bold text-white">
          New payment link
        </h2>

        {errors.form && (
          <p
            role="alert"
            className="mt-5 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400"
          >
            {errors.form}
          </p>
        )}

        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            {field("clientName", "Client or business name", {
              type: "text",
              autoComplete: "off",
              required: true,
              "aria-required": true,
              maxLength: PAY_FIELD_LIMITS.clientName,
            })}
          </div>
          <div className="sm:col-span-2">
            {field("description", "What it's for", {
              type: "text",
              autoComplete: "off",
              required: true,
              "aria-required": true,
              maxLength: PAY_FIELD_LIMITS.description,
              placeholder: "Website build + AI call answering",
              hint: "The client sees this on their page and at checkout.",
            })}
          </div>
          {field("oneTime", "One-time amount", {
            type: "text",
            inputMode: "decimal",
            autoComplete: "off",
            placeholder: "0",
            prefix: "$",
            hint: `0 for none. Up to $${maxDollars}.`,
          })}
          {field("monthly", "Monthly amount", {
            type: "text",
            inputMode: "decimal",
            autoComplete: "off",
            placeholder: "0",
            prefix: "$",
            hint: "0 for none. Billing starts the day the client pays.",
          })}
          <div className="sm:col-span-2">
            {field("clientEmail", "Client email (optional)", {
              type: "email",
              inputMode: "email",
              autoComplete: "off",
              maxLength: PAY_FIELD_LIMITS.email,
              hint: "Filled in for them at checkout. Stripe sends the receipt here.",
            })}
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className={`${primaryButton} mt-8 min-h-12 w-full text-base sm:w-auto sm:px-6`}
        >
          {submitting ? "Creating link…" : "Create payment link"}
        </button>
      </form>

      {created && (
        <section
          aria-labelledby="pay-created-title"
          className="glass-card mt-8 border-amber-400/40 p-6 md:p-8"
        >
          <h2
            id="pay-created-title"
            ref={createdRef}
            tabIndex={-1}
            className="text-xl font-bold text-white focus:outline-none"
          >
            Link ready for {created.clientName}
          </h2>
          <p className="mt-2 text-sm text-neutral-400">
            Due today {formatAmount(created.dueTodayCents)}
            {created.monthlyCents > 0 &&
              `, then ${formatAmount(created.monthlyCents)}/month`}
            .
          </p>
          <div className="mt-6 space-y-6">
            <UrlRow id="pay-created-page" label="Text the client this" url={created.pageUrl} />
            <UrlRow id="pay-created-stripe" label="Backup: the Stripe link" url={created.stripeUrl} />
          </div>
        </section>
      )}

      <section aria-labelledby="pay-list-title" className="mt-14">
        <div className="flex items-center justify-between gap-4">
          <h2 id="pay-list-title" className="text-xl font-bold text-white">
            Your links
          </h2>
          <button
            type="button"
            onClick={() => void refreshList()}
            disabled={loadingList}
            className={quietButton}
          >
            <RefreshCw
              className={clsx("h-4 w-4", loadingList && "motion-safe:animate-spin")}
              aria-hidden="true"
            />
            Refresh
          </button>
        </div>

        {listError && (
          <p role="alert" className="mt-4 text-sm text-red-400">
            {listError}
          </p>
        )}

        {links && links.length === 0 && (
          <p className="mt-6 text-neutral-400">No links yet.</p>
        )}

        {links && links.length > 0 && (
          <ul className="mt-6 space-y-4">
            {links.map((link) => (
              <li key={link.id} className="glass-card p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="break-words font-semibold text-white">
                      {link.clientName || "(no name)"}
                    </p>
                    <p className="mt-0.5 break-words text-sm text-neutral-400">
                      {link.description}
                    </p>
                  </div>
                  <StatusBadge link={link} />
                </div>
                <p className="mt-3 text-sm tabular-nums text-neutral-200">
                  {amountsLine(link)}
                </p>
                <p className="mt-1 text-xs text-neutral-500">
                  {link.createdAt
                    ? `Created ${dateFormat.format(new Date(link.createdAt * 1000))}`
                    : "Created date unknown"}
                  {link.clientEmail && ` · ${link.clientEmail}`}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <CopyButton text={link.pageUrl} label="Copy link" />
                  {link.active && !link.paid && (
                    <button
                      type="button"
                      onClick={() => void deactivate(link)}
                      disabled={busyId === link.id}
                      className={`${quietButton} hover:border-red-400/60 hover:text-red-300`}
                    >
                      {busyId === link.id ? "Deactivating…" : "Deactivate"}
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
