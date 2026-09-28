"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { FIELD_LIMITS, isValidEmail, isValidPhone } from "@/lib/validation";

const emptyForm = {
  fullName: "",
  email: "",
  phone: "",
  story: "",
};

type FormState = typeof emptyForm;
type FieldErrors = Partial<Record<keyof FormState | "form", string>>;

const labelClass = "block text-sm font-semibold text-neutral-200 mb-2";
const fieldClass =
  "w-full rounded-lg border bg-neutral-900 px-4 py-3 text-white placeholder-neutral-500 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400/60";

/**
 * The founding-member application. Same skeleton as the other site forms:
 * honeypot, client validation mirrored server side, recipient set only
 * in app/api/business-mastery-application/route.ts. No payment is taken here
 * — the owner follows up personally with each applicant.
 */
export function BmApplicationForm() {
  const [formData, setFormData] = useState<FormState>(emptyForm);
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const successRef = useRef<HTMLDivElement>(null);

  // The success panel replaces the form, taking the focused submit button with
  // it, so focus would fall back to <body>. Moving it to the panel keeps a
  // keyboard or screen reader user on the confirmation.
  useEffect(() => {
    if (submitted) {
      successRef.current?.focus();
    }
  }, [submitted]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined, form: undefined }));
  };

  const validate = (): FieldErrors => {
    const next: FieldErrors = {};
    if (formData.fullName.trim().length < 2)
      next.fullName = "Please enter your full name";
    if (!isValidEmail(formData.email.trim()))
      next.email = "Please enter a valid email address";
    if (!isValidPhone(formData.phone.trim()))
      next.phone = "Please enter a valid phone number";
    if (formData.story.trim().length < 20)
      next.story = "Please tell us a little more about where you are and what you want to build";
    return next;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const found = validate();
    if (Object.keys(found).length > 0) {
      setErrors(found);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      // The recipient is set server side in
      // app/api/business-mastery-application/route.ts, never posted from the
      // browser.
      const response = await fetch("/api/business-mastery-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, honeypot }),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData(emptyForm);
        return;
      }

      const data = await response.json().catch(() => null);
      if (data?.errors) {
        setErrors(data.errors as FieldErrors);
      } else {
        setErrors({
          form: `We couldn't send your application. Please try again. Reference: ${
            data?.code || "unknown"
          } · http_${response.status}`,
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

  if (submitted) {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="mx-auto max-w-2xl rounded-xl border border-amber-400/30 bg-amber-400/5 p-10 text-center focus:outline-none md:p-12"
      >
        <CheckCircle2
          className="mx-auto mb-5 h-12 w-12 text-amber-400"
          aria-hidden="true"
        />
        <h3 className="mb-3 text-2xl font-bold text-white">
          Application Received
        </h3>
        <p className="mb-6 text-neutral-300">
          Thank you for applying to become a member. We&apos;ll review
          your application and reach out personally to talk through the next
          step.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="text-sm font-semibold text-amber-400 underline-offset-4 hover:underline"
        >
          Submit another application
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-describedby="bm-form-description"
      className="mx-auto max-w-3xl rounded-xl border border-white/10 bg-white/[0.04] p-6 md:p-10"
    >
      <div className="mb-8 text-center">
        <h3 className="mb-2 text-2xl font-bold text-white">Apply to Join</h3>
        <p id="bm-form-description" className="text-sm text-neutral-400">
          Fields marked with an asterisk are required. No payment is taken here.
          We review every application and follow up personally.
        </p>
      </div>

      {/* Honeypot - visually hidden, ignored by real visitors */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="bm-company-fax">Leave this field empty</label>
        <input
          id="bm-company-fax"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      {errors.form && (
        <p
          role="alert"
          className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400"
        >
          {errors.form}
        </p>
      )}

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <Field
          id="fullName"
          label="Full Name"
          required
          error={errors.fullName}
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Your name"
          autoComplete="name"
          maxLength={FIELD_LIMITS.short}
        />
        <Field
          id="email"
          label="Email Address"
          type="email"
          required
          error={errors.email}
          value={formData.email}
          onChange={handleChange}
          placeholder="you@example.com"
          autoComplete="email"
          maxLength={FIELD_LIMITS.email}
        />
        <Field
          id="phone"
          label="Phone Number"
          type="tel"
          required
          error={errors.phone}
          value={formData.phone}
          onChange={handleChange}
          placeholder="(240) 000-0000"
          autoComplete="tel"
          maxLength={FIELD_LIMITS.phone}
        />
      </div>

      {/* One open question in place of the old stage dropdown and the two
          separate textareas (owner's request, 2026-09-27). The hint names
          the four things the follow-up call needs, so a single box still
          gets them. */}
      <div className="mt-5">
        <label htmlFor="story" className={labelClass}>
          Tell Us Your Story{" "}
          <span className="text-amber-400" aria-hidden="true">
            *
          </span>
        </label>
        <p id="story-hint" className="mb-3 text-sm text-neutral-400">
          Where you are right now, what you&apos;re building or want to build,
          what&apos;s holding you back, and what you&apos;re hoping to get out
          of membership. An idea, a business you already run, or &ldquo;I
          don&apos;t know yet&rdquo; are all real answers.
        </p>
        <textarea
          id="story"
          name="story"
          rows={7}
          value={formData.story}
          onChange={handleChange}
          maxLength={FIELD_LIMITS.long}
          required
          aria-required="true"
          aria-invalid={errors.story ? "true" : undefined}
          aria-describedby={
            errors.story ? "story-hint story-error" : "story-hint"
          }
          placeholder="The more we know, the better we can help."
          className={`${fieldClass} resize-y ${
            errors.story ? "border-red-500/60" : "border-neutral-700"
          }`}
        />
        {errors.story && (
          <p id="story-error" role="alert" className="mt-2 text-sm text-red-400">
            {errors.story}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary group mt-8 inline-flex w-full items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Sending..." : "Send My Application"}
        {!isSubmitting && (
          <ArrowRight
            className="h-5 w-5 transition-transform group-hover:translate-x-1"
            aria-hidden="true"
          />
        )}
      </button>
    </form>
  );
}

interface FieldProps {
  id: keyof FormState;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
  error?: string;
  placeholder?: string;
  autoComplete?: string;
  maxLength?: number;
}

function Field({
  id,
  label,
  value,
  onChange,
  type = "text",
  required,
  error,
  placeholder,
  autoComplete,
  maxLength,
}: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
        {required && (
          <>
            {" "}
            <span className="text-amber-400" aria-hidden="true">
              *
            </span>
          </>
        )}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        aria-required={required ? "true" : undefined}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        placeholder={placeholder}
        autoComplete={autoComplete}
        maxLength={maxLength}
        className={`${fieldClass} ${error ? "border-red-500/60" : "border-neutral-700"}`}
      />
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-2 text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
