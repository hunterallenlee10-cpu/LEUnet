"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";

/** Grouped so the offline and online halves of the page stay legible here. */
const channelGroups = [
  {
    legend: "Traditional",
    options: [
      "Print & direct mail",
      "Signs & banners",
      "Vehicle graphics",
      "Branded apparel",
    ],
  },
  {
    legend: "Digital",
    options: [
      "SEO & local search",
      "Paid advertising",
      "Social media",
      "Content creation",
      "Email & reviews",
      "Branding",
    ],
  },
  {
    legend: "Other",
    options: ["Billboard, TV, radio or sponsorship", "Not sure yet"],
  },
];

const emptyForm = {
  fullName: "",
  businessName: "",
  email: "",
  phone: "",
  website: "",
  goals: "",
  additionalDetails: "",
};

type FormState = typeof emptyForm;
type FieldErrors = Partial<
  Record<keyof FormState | "channels" | "form", string>
>;

const labelClass = "block text-sm font-semibold text-neutral-200 mb-2";
const fieldClass =
  "w-full rounded-lg border bg-neutral-900 px-4 py-2.5 text-white placeholder-neutral-500 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400/60";

export function MarketingInquiryForm() {
  const [formData, setFormData] = useState<FormState>(emptyForm);
  const [channels, setChannels] = useState<string[]>([]);
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined, form: undefined }));
  };

  const toggleChannel = (option: string) => {
    setChannels((prev) =>
      prev.includes(option)
        ? prev.filter((c) => c !== option)
        : [...prev, option]
    );
    setErrors((prev) => ({ ...prev, channels: undefined, form: undefined }));
  };

  const validate = (): FieldErrors => {
    const next: FieldErrors = {};
    if (formData.fullName.trim().length < 2)
      next.fullName = "Please enter your full name";
    if (!formData.businessName.trim())
      next.businessName = "Please enter your business name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim()))
      next.email = "Please enter a valid email address";
    const phone = formData.phone.trim();
    if (!phone || !/^[\d\s\-().+]+$/.test(phone) || phone.length < 10)
      next.phone = "Please enter a valid phone number";
    if (channels.length === 0)
      next.channels = "Please select at least one option";
    if (formData.goals.trim().length < 10)
      next.goals =
        "Please tell us a little more about what you are trying to accomplish";
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
      // The recipient is set server side in app/api/marketing-inquiry/route.ts,
      // never posted from the browser.
      const response = await fetch("/api/marketing-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, channels, honeypot }),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData(emptyForm);
        setChannels([]);
        return;
      }

      const data = await response.json().catch(() => null);
      if (data?.errors) {
        setErrors(data.errors as FieldErrors);
      } else {
        setErrors({
          form: `We couldn't send your request. Please try again, or email us directly. Reference: ${
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
      <div className="mx-auto max-w-2xl rounded-xl border border-amber-400/30 bg-amber-400/[0.06] p-10 text-center md:p-12">
        <CheckCircle2
          className="mx-auto mb-5 h-12 w-12 text-amber-400"
          aria-hidden="true"
        />
        <h3 className="mb-3 text-2xl font-bold text-white">
          Marketing Request Received
        </h3>
        <p className="mb-6 text-neutral-300">
          Thank you. We will review what you are trying to accomplish and follow
          up with a channel mix and a quote - including an honest note on
          anything we would leave out.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="text-sm font-semibold text-amber-400 underline-offset-4 hover:underline"
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
      aria-describedby="marketing-form-description"
      className="mx-auto max-w-3xl rounded-xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm md:p-10"
    >
      {/* Stacked on narrow screens so the heading keeps the full width
          instead of wrapping to three lines beside the mark. */}
      <div className="mb-2 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4">
        {/* Decorative: the heading beside it names the service. */}
        <Image
          src="/lee-marketing-mastery-logo.png"
          alt=""
          width={48}
          height={48}
          loading="lazy"
          className="h-12 w-12 shrink-0 rounded-full"
        />
        <h3 className="text-2xl font-bold text-white">
          Request a Marketing Quote
        </h3>
      </div>
      <p
        id="marketing-form-description"
        className="mb-8 text-sm text-neutral-400"
      >
        Fields marked with an asterisk are required. Tell us what you are trying
        to accomplish and we will come back with a channel mix and a quote.
      </p>

      {/* Honeypot - visually hidden, ignored by real visitors */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="marketing-company-ext">Leave this field empty</label>
        <input
          id="marketing-company-ext"
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
          id="businessName"
          label="Business Name"
          required
          error={errors.businessName}
          value={formData.businessName}
          onChange={handleChange}
          placeholder="Your company"
          autoComplete="organization"
        />
        <Field
          id="email"
          label="Email Address"
          type="email"
          required
          error={errors.email}
          value={formData.email}
          onChange={handleChange}
          placeholder="you@company.com"
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
      </div>

      <div className="mt-5">
        <Field
          id="website"
          label="Business Website"
          type="url"
          error={errors.website}
          value={formData.website}
          onChange={handleChange}
          placeholder="https://yourcompany.com (optional - leave blank if you don't have one)"
          autoComplete="url"
        />
      </div>

      <fieldset
        className="mt-6"
        aria-invalid={errors.channels ? "true" : undefined}
        aria-describedby={errors.channels ? "channels-error" : undefined}
      >
        <legend className={labelClass}>
          What Are You Interested In?{" "}
          <span className="text-amber-400" aria-hidden="true">
            *
          </span>
        </legend>
        <p className="mb-4 text-sm text-neutral-500">
          Select as many as apply. Not sure is a valid answer.
        </p>

        <div className="space-y-4">
          {channelGroups.map(({ legend, options }) => (
            <div key={legend}>
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-neutral-500">
                {legend}
              </p>
              <div className="flex flex-wrap gap-2">
                {options.map((option) => {
                  const checked = channels.includes(option);
                  return (
                    <label
                      key={option}
                      className={`inline-flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-amber-400 ${
                        checked
                          ? "border-amber-400/60 bg-amber-400/[0.14] text-amber-200"
                          : "border-neutral-700 bg-neutral-900 text-neutral-300 hover:border-amber-400/40"
                      }`}
                    >
                      <input
                        type="checkbox"
                        name="channels"
                        value={option}
                        checked={checked}
                        onChange={() => toggleChannel(option)}
                        className="sr-only"
                      />
                      <span
                        aria-hidden="true"
                        className={`h-2 w-2 shrink-0 rounded-full ${
                          checked ? "bg-amber-400" : "bg-neutral-600"
                        }`}
                      />
                      {option}
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {errors.channels && (
          <p id="channels-error" role="alert" className="mt-3 text-sm text-red-400">
            {errors.channels}
          </p>
        )}
      </fieldset>

      <div className="mt-6">
        <label htmlFor="goals" className={labelClass}>
          What Are You Trying to Accomplish?{" "}
          <span className="text-amber-400" aria-hidden="true">
            *
          </span>
        </label>
        <textarea
          id="goals"
          name="goals"
          rows={4}
          value={formData.goals}
          onChange={handleChange}
          required
          aria-required="true"
          aria-invalid={errors.goals ? "true" : undefined}
          aria-describedby={errors.goals ? "goals-error" : undefined}
          placeholder="More calls, more foot traffic, getting known in a new area, or filling a slow season"
          className={`${fieldClass} resize-none ${
            errors.goals ? "border-red-500/60" : "border-neutral-700"
          }`}
        />
        {errors.goals && (
          <p id="goals-error" role="alert" className="mt-2 text-sm text-red-400">
            {errors.goals}
          </p>
        )}
      </div>

      <div className="mt-5">
        <label htmlFor="additionalDetails" className={labelClass}>
          Additional Details
        </label>
        <textarea
          id="additionalDetails"
          name="additionalDetails"
          rows={3}
          value={formData.additionalDetails}
          onChange={handleChange}
          placeholder="What you have already tried, your service area, a budget range, or a deadline"
          className={`${fieldClass} resize-none border-neutral-700`}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary mt-8 inline-flex w-full items-center justify-center gap-2 group disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
      >
        {isSubmitting ? "Sending..." : "Request My Free Quote"}
        {!isSubmitting && (
          <ArrowRight
            className="h-5 w-5 transition-transform group-hover:translate-x-1"
            aria-hidden="true"
          />
        )}
      </button>

      <p className="mt-4 text-center text-sm text-neutral-500">
        Free and no obligation. We will tell you if a channel is not worth your
        money.
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
