"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import {
  auditIndustryOptions,
  auditTeamSizeOptions,
  leeSystems,
} from "@/data/lee-systems";
import { site } from "@/data/site";
import { FIELD_LIMITS, isValidEmail, isValidPhone } from "@/lib/validation";
import { BookCallLink } from "@/components/ui/BookCallLink";

const emptyForm = {
  fullName: "",
  businessName: "",
  industry: "",
  teamSize: "",
  timeWaster: "",
  email: "",
  phone: "",
};

type FormState = typeof emptyForm;
type FieldErrors = Partial<Record<keyof FormState | "form", string>>;

const labelClass = "block text-sm font-semibold text-neutral-200 mb-2";
const fieldClass =
  "w-full rounded-lg border bg-neutral-900 px-4 py-3 text-white placeholder-neutral-500 transition-colors focus:outline-none focus:ring-2 focus:ring-brass-400/60";

/**
 * The free consultation request on the automation page (it requested the free
 * Automation Audit until 2026-09-28). Posts to /api/automation-audit, which
 * checks the same rules server side and emails the request; the recipient is
 * set there and never sent from the browser.
 */
export function AutomationAuditForm() {
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
    if (!formData.industry) next.industry = "Please choose your industry";
    if (!formData.teamSize) next.teamSize = "Please choose your team size";
    if (formData.timeWaster.trim().length < 10)
      next.timeWaster = "Please add a little more detail";
    if (!isValidEmail(formData.email.trim()))
      next.email = "Please enter a valid email address";
    if (!isValidPhone(formData.phone.trim()))
      next.phone = "Please enter a valid phone number";
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
      const response = await fetch("/api/automation-audit", {
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
          form: `We couldn't send your request. Please try again, or email ${leeSystems.contactEmail}. Reference: ${
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
          Details received
        </h3>
        <p className="mb-6 text-neutral-300">
          Thank you.{" "}
          {site.replyTime
            ? `We'll reply ${site.replyTime} to set up your free consultation call.`
            : "We'll get back to you to set up your free consultation call."}
        </p>
        {site.bookingUrl && (
          <div className="mb-6">
            <p className="mb-4 text-neutral-300">Rather pick a time now?</p>
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
      onSubmit={handleSubmit}
      noValidate
      aria-describedby="audit-form-description"
      className="mx-auto max-w-3xl rounded-xl border border-white/10 bg-white/[0.04] p-6 md:p-10"
    >
      <div className="mb-2">
        <h3 className="text-2xl font-bold text-white">
          Request your free consultation
        </h3>
      </div>
      <p id="audit-form-description" className="mb-8 text-sm text-neutral-400">
        All fields are required.{site.replyTime && ` We reply ${site.replyTime}.`}
      </p>

      {/* Honeypot - visually hidden, ignored by real visitors */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="ls-audit-company-website">Leave this field empty</label>
        <input
          id="ls-audit-company-website"
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
          label="Name"
          error={errors.fullName}
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Your name"
          autoComplete="name"
          maxLength={FIELD_LIMITS.short}
        />
        <Field
          id="businessName"
          label="Business"
          error={errors.businessName}
          value={formData.businessName}
          onChange={handleChange}
          placeholder="Your business name"
          autoComplete="organization"
          maxLength={FIELD_LIMITS.short}
        />
        <SelectField
          id="industry"
          label="Industry"
          error={errors.industry}
          value={formData.industry}
          onChange={handleChange}
          options={auditIndustryOptions}
        />
        <SelectField
          id="teamSize"
          label="Team size"
          error={errors.teamSize}
          value={formData.teamSize}
          onChange={handleChange}
          options={auditTeamSizeOptions}
        />
      </div>

      <div className="mt-5">
        <label htmlFor="timeWaster" className={labelClass}>
          Biggest time-waster{" "}
          <span className="text-brass-400" aria-hidden="true">
            *
          </span>
        </label>
        <textarea
          id="timeWaster"
          name="timeWaster"
          rows={4}
          value={formData.timeWaster}
          onChange={handleChange}
          maxLength={FIELD_LIMITS.long}
          required
          aria-required="true"
          aria-invalid={errors.timeWaster ? "true" : undefined}
          aria-describedby={errors.timeWaster ? "timeWaster-error" : undefined}
          placeholder="What eats the most time each week, or where do leads slip through?"
          className={`${fieldClass} resize-none ${
            errors.timeWaster ? "border-red-500/60" : "border-neutral-700"
          }`}
        />
        {errors.timeWaster && (
          <p id="timeWaster-error" role="alert" className="mt-2 text-sm text-red-400">
            {errors.timeWaster}
          </p>
        )}
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <Field
          id="email"
          label="Email"
          type="email"
          error={errors.email}
          value={formData.email}
          onChange={handleChange}
          placeholder="you@company.com"
          autoComplete="email"
          maxLength={FIELD_LIMITS.email}
        />
        <Field
          id="phone"
          label="Phone"
          type="tel"
          error={errors.phone}
          value={formData.phone}
          onChange={handleChange}
          placeholder="(240) 000-0000"
          autoComplete="tel"
          maxLength={FIELD_LIMITS.phone}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-ls-primary mt-8 inline-flex min-h-11 w-full items-center justify-center disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Sending..." : "Send my details"}
      </button>

      <p className="mt-4 text-center text-sm text-neutral-400">
        Free, with no obligation.
      </p>
    </form>
  );
}

function RequiredMark() {
  return (
    <>
      {" "}
      <span className="text-brass-400" aria-hidden="true">
        *
      </span>
    </>
  );
}

interface FieldProps {
  id: keyof FormState;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
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
  error,
  placeholder,
  autoComplete,
  maxLength,
}: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
        <RequiredMark />
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        required
        aria-required="true"
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

interface SelectFieldProps {
  id: keyof FormState;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: readonly string[];
  error?: string;
}

function SelectField({ id, label, value, onChange, options, error }: SelectFieldProps) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
        <RequiredMark />
      </label>
      <select
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        required
        aria-required="true"
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`${fieldClass} ${error ? "border-red-500/60" : "border-neutral-700"}`}
      >
        <option value="">Select...</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-2 text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
