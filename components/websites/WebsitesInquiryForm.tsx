"use client";

import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { CheckCircle2 } from "lucide-react";
import { websiteProjectTypes } from "@/data/lee-systems";
import { site } from "@/data/site";
import { FIELD_LIMITS, isValidEmail, isValidPhone } from "@/lib/validation";
import { BookCallLink } from "@/components/ui/BookCallLink";

const emptyForm = {
  fullName: "",
  businessName: "",
  email: "",
  phone: "",
  currentWebsite: "",
  projectType: "",
  businessDescription: "",
  goals: "",
};

type FormState = typeof emptyForm;
type FieldErrors = Partial<Record<keyof FormState | "form", string>>;

const labelClass = "block text-sm font-semibold text-neutral-200 mb-2";
const fieldClass =
  "w-full rounded-lg border bg-neutral-900 px-4 py-3 text-white placeholder-neutral-500 transition-colors focus:outline-none focus:ring-2 focus:ring-brass-400/60";

export function WebsitesInquiryForm() {
  const [formData, setFormData] = useState<FormState>(emptyForm);
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const successRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // The success panel replaces the form, taking the focused submit button with
  // it, so focus would fall back to <body>. Moving it to the panel keeps a
  // keyboard or screen reader user on the confirmation.
  useEffect(() => {
    if (submitted) {
      successRef.current?.focus();
    }
  }, [submitted]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined, form: undefined }));
  };

  const validate = (): FieldErrors => {
    const next: FieldErrors = {};
    if (formData.fullName.trim().length < 2)
      next.fullName = "Please enter your full name";
    if (!formData.businessName.trim())
      next.businessName = "Please enter your business name";
    if (!isValidEmail(formData.email.trim()))
      next.email = "Please enter a valid email address";
    if (!isValidPhone(formData.phone.trim()))
      next.phone = "Please enter a valid phone number";
    if (!formData.projectType)
      next.projectType = "Please select what you are looking for";
    if (formData.businessDescription.trim().length < 10)
      next.businessDescription =
        "Please tell us a little more about what your business does";
    return next;
  };

  /** Shows the errors, then puts focus on the first field that needs fixing,
   *  in the order the form lists them, which on a phone also scrolls it into
   *  view. The errors are applied first so the field is already marked
   *  invalid and described by its message when focus lands on it. */
  const showErrors = (found: FieldErrors) => {
    flushSync(() => setErrors(found));
    const names = Object.keys(found).filter((name) => name !== "form");
    if (names.length === 0) return;
    formRef.current
      ?.querySelector<HTMLElement>(
        names.map((name) => `[name="${CSS.escape(name)}"]`).join(", ")
      )
      ?.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const found = validate();
    if (Object.keys(found).length > 0) {
      showErrors(found);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      // The recipient is set server side in app/api/website-inquiry/route.ts,
      // never posted from the browser.
      const response = await fetch("/api/website-inquiry", {
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
        showErrors(data.errors as FieldErrors);
      } else {
        setErrors({
          form: `We couldn't send your request. Please try again, or email ${site.email}. Reference: ${
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

  if (submitted) {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="mx-auto max-w-2xl rounded-xl border border-brass-400/30 bg-brass-400/[0.06] p-10 text-center focus:outline-none md:p-12"
      >
        <CheckCircle2
          className="mx-auto mb-5 h-12 w-12 text-brass-300"
          aria-hidden="true"
        />
        <h3 className="mb-3 text-2xl font-bold text-white">
          Website request received
        </h3>
        <p className="mb-6 text-neutral-300">
          Thank you. We will review what you described and follow up with a
          free quote and a timeline.
        </p>
        {site.bookingUrl && (
          <div className="mb-6">
            <p className="mb-4 text-neutral-300">Want to talk it through now?</p>
            <BookCallLink />
          </div>
        )}
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="inline-flex min-h-11 items-center text-sm font-semibold text-brass-300 underline-offset-4 hover:underline"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      aria-describedby="website-form-description"
      className="mx-auto max-w-3xl rounded-xl border border-white/10 bg-white/[0.04] p-6 md:p-10"
    >
      <div className="mb-2">
        <h3 className="text-2xl font-bold text-white">
          Request a website quote
        </h3>
      </div>
      <p id="website-form-description" className="mb-8 text-sm text-neutral-400">
        Fields marked with an asterisk are required. Tell us what your business
        does and we will follow up with a quote and a timeline.
      </p>

      {/* Honeypot - visually hidden, ignored by real visitors */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="website-company-fax">Leave this field empty</label>
        <input
          id="website-company-fax"
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

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <Field
          id="fullName"
          label="Full name"
          required
          error={errors.fullName}
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Your name"
          autoComplete="name"
          maxLength={FIELD_LIMITS.short}
        />
        <Field
          id="businessName"
          label="Business name"
          required
          error={errors.businessName}
          value={formData.businessName}
          onChange={handleChange}
          placeholder="Your company"
          autoComplete="organization"
          maxLength={FIELD_LIMITS.short}
        />
        <Field
          id="email"
          label="Email address"
          type="email"
          required
          error={errors.email}
          value={formData.email}
          onChange={handleChange}
          placeholder="you@company.com"
          autoComplete="email"
          maxLength={FIELD_LIMITS.email}
        />
        <Field
          id="phone"
          label="Phone number"
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

      <div className="mt-5">
        <Field
          id="currentWebsite"
          label="Current website"
          type="url"
          error={errors.currentWebsite}
          value={formData.currentWebsite}
          onChange={handleChange}
          placeholder="https://yourcompany.com (optional, leave blank if you don't have one)"
          autoComplete="url"
          maxLength={FIELD_LIMITS.short}
        />
      </div>

      <div className="mt-5">
        <label htmlFor="projectType" className={labelClass}>
          What are you looking for?{" "}
          <span className="text-brass-300" aria-hidden="true">
            *
          </span>
        </label>
        <select
          id="projectType"
          name="projectType"
          value={formData.projectType}
          onChange={handleChange}
          required
          aria-required="true"
          aria-invalid={errors.projectType ? "true" : undefined}
          aria-describedby={errors.projectType ? "projectType-error" : undefined}
          className={`${fieldClass} ${
            errors.projectType ? "border-red-500/60" : "border-neutral-700"
          }`}
        >
          <option value="">Select an option...</option>
          {websiteProjectTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        {errors.projectType && (
          <p id="projectType-error" role="alert" className="mt-2 text-sm text-red-400">
            {errors.projectType}
          </p>
        )}
      </div>

      <div className="mt-5">
        <label htmlFor="businessDescription" className={labelClass}>
          What does your business do?{" "}
          <span className="text-brass-300" aria-hidden="true">
            *
          </span>
        </label>
        <textarea
          id="businessDescription"
          name="businessDescription"
          rows={4}
          value={formData.businessDescription}
          onChange={handleChange}
          maxLength={FIELD_LIMITS.long}
          required
          aria-required="true"
          aria-invalid={errors.businessDescription ? "true" : undefined}
          aria-describedby={
            errors.businessDescription ? "businessDescription-error" : undefined
          }
          placeholder="What you sell or provide, and who your customers are"
          className={`${fieldClass} resize-none ${
            errors.businessDescription
              ? "border-red-500/60"
              : "border-neutral-700"
          }`}
        />
        {errors.businessDescription && (
          <p
            id="businessDescription-error"
            role="alert"
            className="mt-2 text-sm text-red-400"
          >
            {errors.businessDescription}
          </p>
        )}
      </div>

      <div className="mt-5">
        <label htmlFor="goals" className={labelClass}>
          What should the website accomplish?
        </label>
        <textarea
          id="goals"
          name="goals"
          rows={3}
          value={formData.goals}
          onChange={handleChange}
          maxLength={FIELD_LIMITS.long}
          placeholder="More quote requests, online bookings, looking credible to new customers, or anything else"
          className={`${fieldClass} resize-none border-neutral-700`}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-ls-primary mt-8 inline-flex min-h-11 w-full items-center justify-center disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Sending..." : "Request my free quote"}
      </button>

      <p className="mt-4 text-center text-sm text-neutral-400">
        Free quote, no obligation.
      </p>
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
            <span className="text-brass-300" aria-hidden="true">
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
