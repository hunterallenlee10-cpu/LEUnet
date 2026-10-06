"use client";

import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { CheckCircle2 } from "lucide-react";
import clsx from "clsx";
import { contactInterests, type ContactInterest } from "@/data/contact";
import { site } from "@/data/site";
import {
  FIELD_LIMITS,
  INVALID_NAME_MESSAGE,
  filterInput,
  isValidEmail,
  isValidName,
  isValidPhone,
} from "@/lib/validation";
import { BookCallLink } from "@/components/ui/BookCallLink";

type Field = "name" | "email" | "phone" | "interest" | "message";
type FieldErrors = Partial<Record<Field | "form", string>>;

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

/** The house form idiom, as on the site's other forms. */
const labelClass = "mb-2 block text-sm font-semibold text-neutral-200";
const fieldClass =
  "w-full rounded-lg border bg-neutral-900 px-4 py-3 text-white placeholder-neutral-500 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400/60";
const borderFor = (error?: string) =>
  error ? "border-red-500/60" : "border-neutral-700";

/** The order errors are checked in, which is the order focus goes to them. */
const fieldOrder: Field[] = ["name", "email", "phone", "interest", "message"];

function RequiredMark() {
  return (
    <>
      {" "}
      <span className="text-amber-400" aria-hidden="true">
        *
      </span>
    </>
  );
}

function ErrorText({ id, children }: { id: string; children?: string }) {
  if (!children) return null;
  return (
    <p id={id} role="alert" className="mt-2 text-sm text-red-400">
      {children}
    </p>
  );
}

export interface ContactFormProps {
  /** Preselects "I'm interested in", e.g. from a link's ?interest=. */
  initialInterest?: ContactInterest | "";
  /** The success message's heading level: it sits under the page's H1 on
   *  /contact and under a section's H2 on the homepage. */
  headingLevel?: "h2" | "h3";
}

/**
 * The shared contact form, on the homepage (#contact) and on /contact. Five
 * fields, three required, and one question that routes the inquiry: Lee
 * Systems Co. or something else. It posts to /api/contact,
 * which checks the same rules and emails the owner with the choice in the
 * subject line.
 */
export function ContactForm({
  initialInterest = "",
  headingLevel = "h3",
}: ContactFormProps) {
  const [formData, setFormData] = useState(emptyForm);
  const [interest, setInterest] = useState<ContactInterest | "">(initialInterest);
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  /** The path the sent inquiry was about, so the thanks can match it. */
  const [sentInterest, setSentInterest] = useState<ContactInterest | null>(null);
  const successRef = useRef<HTMLDivElement>(null);

  // The success panel replaces the form, taking the focused submit button with
  // it, so focus would fall back to <body>. Moving it to the panel keeps a
  // keyboard or screen reader user on the confirmation.
  useEffect(() => {
    if (sentInterest) successRef.current?.focus();
  }, [sentInterest]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value: typed } = e.target;
    const { value, dropped } = filterInput(
      name === "name" ? "name" : name === "phone" ? "phone" : null,
      typed
    );
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: dropped, form: undefined }));
  };

  const chooseInterest = (value: ContactInterest) => {
    setInterest(value);
    setErrors((prev) => ({ ...prev, interest: undefined, form: undefined }));
  };

  const validate = (): FieldErrors => {
    const next: FieldErrors = {};
    const name = formData.name.trim();
    const email = formData.email.trim();
    const phone = formData.phone.trim();

    if (!name) next.name = "Please enter your name.";
    else if (name.length < 2) next.name = "Please enter at least 2 characters.";
    else if (!isValidName(name)) next.name = INVALID_NAME_MESSAGE;

    if (!email) next.email = "Please enter your email address.";
    else if (!isValidEmail(email))
      next.email = "Please enter a valid email address, like name@example.com.";

    if (!phone) next.phone = "Please enter your phone number.";
    else if (!isValidPhone(phone))
      next.phone = "Please enter a valid phone number, including the area code.";

    if (!interest) next.interest = "Please choose what you're interested in.";

    return next;
  };

  /** Puts focus on the first field that needs fixing. Callers apply the
   *  errors with flushSync first, so the field is already marked invalid and
   *  described by its message when focus lands on it. */
  const focusFirstError = (found: FieldErrors) => {
    const first = fieldOrder.find((field) => found[field]);
    if (!first) return;
    const target =
      first === "interest"
        ? document.querySelector<HTMLInputElement>('input[name="interest"]')
        : document.getElementById(`contact-${first}`);
    target?.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const found = validate();
    if (Object.keys(found).length > 0) {
      flushSync(() => setErrors(found));
      focusFirstError(found);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, interest, honeypot }),
      });

      if (response.ok) {
        setSentInterest(interest || "something-else");
        setFormData(emptyForm);
        setHoneypot("");
        return;
      }

      const data = await response.json().catch(() => null);
      if (data?.errors) {
        flushSync(() => setErrors(data.errors as FieldErrors));
        focusFirstError(data.errors as FieldErrors);
      } else {
        setErrors({
          form: `Your message didn't send. Please try again, or email ${site.email}. Reference: ${
            data?.code || "unknown"
          }, http_${response.status}`,
        });
      }
    } catch {
      setErrors({
        form: "We couldn't reach the server. Please check your connection and try again. Reference: network_error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (sentInterest) {
    const Heading = headingLevel;
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="rounded-xl border border-amber-400/30 bg-amber-400/[0.06] p-8 text-center focus:outline-none md:p-10"
      >
        <CheckCircle2
          className="mx-auto mb-5 h-12 w-12 text-amber-400"
          aria-hidden="true"
        />
        <Heading className="mb-3 text-2xl font-bold text-white">
          Thanks, your message is in.
        </Heading>
        <p className="text-neutral-300">
          {site.replyTime
            ? `I'll reply ${site.replyTime}.`
            : "I'll get back to you soon."}
        </p>

        {sentInterest === "lee-systems" && site.bookingUrl && (
          <div className="mt-6">
            <p className="mb-4 text-neutral-300">Rather pick a time now?</p>
            <BookCallLink />
          </div>
        )}

        <button
          type="button"
          onClick={() => {
            setSentInterest(null);
            setInterest("");
          }}
          className="mt-8 inline-flex min-h-11 items-center text-sm font-semibold text-amber-400 underline-offset-4 hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-describedby="contact-form-description"
      className="rounded-xl border border-white/10 bg-white/[0.04] p-6 md:p-8"
    >
      <p id="contact-form-description" className="mb-6 text-sm text-neutral-400">
        Fields marked with an asterisk are required.
      </p>

      {errors.form && (
        <p
          role="alert"
          className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400"
        >
          {errors.form}
        </p>
      )}

      {/* Honeypot. Off-screen with a real label rather than `display: none`,
          matching the site's other forms: a bot that skips hidden inputs walks
          past the first and fills the second. The body posts it as
          `honeypot`, the key /api/contact checks. */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="contact-website-ext">Leave this field empty</label>
        <input
          id="contact-website-ext"
          type="text"
          name="website"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          autoComplete="off"
          tabIndex={-1}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={labelClass}>
            Name
            <RequiredMark />
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            maxLength={FIELD_LIMITS.short}
            value={formData.name}
            onChange={handleChange}
            aria-required="true"
            aria-invalid={errors.name ? "true" : undefined}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            className={`${fieldClass} ${borderFor(errors.name)}`}
          />
          <ErrorText id="contact-name-error">{errors.name}</ErrorText>
        </div>

        <div>
          <label htmlFor="contact-email" className={labelClass}>
            Email
            <RequiredMark />
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            maxLength={FIELD_LIMITS.email}
            value={formData.email}
            onChange={handleChange}
            aria-required="true"
            aria-invalid={errors.email ? "true" : undefined}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            className={`${fieldClass} ${borderFor(errors.email)}`}
          />
          <ErrorText id="contact-email-error">{errors.email}</ErrorText>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="contact-phone" className={labelClass}>
            Phone
            <RequiredMark />
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            maxLength={FIELD_LIMITS.phone}
            value={formData.phone}
            onChange={handleChange}
            aria-required="true"
            aria-invalid={errors.phone ? "true" : undefined}
            aria-describedby={errors.phone ? "contact-phone-error" : undefined}
            className={`${fieldClass} ${borderFor(errors.phone)}`}
          />
          <ErrorText id="contact-phone-error">{errors.phone}</ErrorText>
        </div>
      </div>

      {/* Pills rather than the browser's radios. The inputs are still radios
          and still keyboard-operable: they are `sr-only` inside each label,
          and `focus-within` puts the ring on the pill. */}
      <fieldset
        className="mt-5 min-w-0 border-0 p-0"
        aria-describedby={errors.interest ? "contact-interest-error" : undefined}
      >
        <legend className={labelClass}>
          I&apos;m interested in
          <RequiredMark />
        </legend>
        <div className="flex flex-wrap gap-2">
          {contactInterests.map((option) => {
            const checked = interest === option.value;
            return (
              <label
                key={option.value}
                className={clsx(
                  "inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-colors focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-amber-400",
                  checked
                    ? "border-amber-400/60 bg-amber-400/[0.14] text-amber-200"
                    : errors.interest
                      ? "border-red-500/60 bg-neutral-900 text-neutral-300"
                      : "border-neutral-700 bg-neutral-900 text-neutral-300 hover:border-amber-400/40"
                )}
              >
                <input
                  type="radio"
                  name="interest"
                  value={option.value}
                  checked={checked}
                  onChange={() => chooseInterest(option.value)}
                  required
                  className="sr-only"
                />
                <span
                  aria-hidden="true"
                  className={`h-2 w-2 shrink-0 rounded-full ${
                    checked ? "bg-amber-400" : "bg-neutral-600"
                  }`}
                />
                {option.label}
              </label>
            );
          })}
        </div>
        <ErrorText id="contact-interest-error">{errors.interest}</ErrorText>
      </fieldset>

      <div className="mt-5">
        <label htmlFor="contact-message" className={labelClass}>
          Message <span className="font-normal text-neutral-400">(optional)</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          maxLength={FIELD_LIMITS.long}
          value={formData.message}
          onChange={handleChange}
          placeholder="What do you need help with?"
          aria-invalid={errors.message ? "true" : undefined}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          className={`${fieldClass} ${borderFor(errors.message)} resize-y`}
        />
        <ErrorText id="contact-message-error">{errors.message}</ErrorText>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary mt-6 inline-flex min-h-11 w-full items-center justify-center disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
      >
        {isSubmitting ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}
