"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { bmAudiences } from "@/data/business-mastery";

// The stage options are the three audience stages from the section above, so
// the applicant answers in the page's own language and the inbox reads the
// same way. "Somewhere else" catches everyone the three don't fit.
const stageOptions = [
  ...bmAudiences.map((audience) => audience.title),
  "Somewhere else, I'll explain below",
];

const emptyForm = {
  fullName: "",
  email: "",
  phone: "",
  stage: "",
  building: "",
  why: "",
};

type FormState = typeof emptyForm;
type FieldErrors = Partial<Record<keyof FormState | "form", string>>;

const labelClass = "block text-sm font-semibold text-neutral-200 mb-2";
const fieldClass =
  "w-full rounded-lg border bg-neutral-900 px-4 py-3 text-white placeholder-neutral-500 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400/60";

/**
 * The founding-member application. Same skeleton as the H1 consultation
 * form: honeypot, client validation mirrored server side, recipient set only
 * in app/api/business-mastery-application/route.ts. No payment is taken here
 * — the owner follows up personally with each applicant.
 */
export function BmApplicationForm() {
  const [formData, setFormData] = useState<FormState>(emptyForm);
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim()))
      next.email = "Please enter a valid email address";
    const phone = formData.phone.trim();
    if (!phone || !/^[\d\s\-().+]+$/.test(phone) || phone.length < 10)
      next.phone = "Please enter a valid phone number";
    if (!formData.stage) next.stage = "Please tell us where you are right now";
    if (formData.building.trim().length < 10)
      next.building = "Please tell us a little more about what you want to build";
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
      <div className="mx-auto max-w-2xl rounded-xl border border-amber-400/30 bg-amber-400/5 p-10 text-center md:p-12">
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

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <Field
          id="fullName"
          label="Full Name"
          required
          error={errors.fullName}
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Your name"
          autoComplete="name"
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
        />
        <div>
          <label htmlFor="stage" className={labelClass}>
            Where Are You Right Now?{" "}
            <span className="text-amber-400" aria-hidden="true">
              *
            </span>
          </label>
          <select
            id="stage"
            name="stage"
            value={formData.stage}
            onChange={handleChange}
            required
            aria-required="true"
            aria-invalid={errors.stage ? "true" : undefined}
            aria-describedby={errors.stage ? "stage-error" : undefined}
            className={`${fieldClass} ${
              errors.stage ? "border-red-500/60" : "border-neutral-700"
            }`}
          >
            <option value="">Select an option...</option>
            {stageOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.stage && (
            <p id="stage-error" role="alert" className="mt-2 text-sm text-red-400">
              {errors.stage}
            </p>
          )}
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="building" className={labelClass}>
          What Are You Building, or What Do You Want to Build?{" "}
          <span className="text-amber-400" aria-hidden="true">
            *
          </span>
        </label>
        <textarea
          id="building"
          name="building"
          rows={4}
          value={formData.building}
          onChange={handleChange}
          required
          aria-required="true"
          aria-invalid={errors.building ? "true" : undefined}
          aria-describedby={errors.building ? "building-error" : undefined}
          placeholder="A business you're running, an idea you're chasing, or 'I don't know yet'. All three are real answers"
          className={`${fieldClass} resize-none ${
            errors.building ? "border-red-500/60" : "border-neutral-700"
          }`}
        />
        {errors.building && (
          <p
            id="building-error"
            role="alert"
            className="mt-2 text-sm text-red-400"
          >
            {errors.building}
          </p>
        )}
      </div>

      <div className="mt-5">
        <label htmlFor="why" className={labelClass}>
          Why Do You Want In as a Member?
        </label>
        <textarea
          id="why"
          name="why"
          rows={3}
          value={formData.why}
          onChange={handleChange}
          placeholder="Optional, but it helps us understand who we're building with"
          className={`${fieldClass} resize-none border-neutral-700`}
        />
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
