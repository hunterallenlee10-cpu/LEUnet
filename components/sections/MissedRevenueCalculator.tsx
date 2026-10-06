"use client";

import { useId, useState, type CSSProperties } from "react";
import { BookCallLink } from "@/components/ui/BookCallLink";

/**
 * The homepage's missed-revenue calculator (the owner's ask, 2026-10-06,
 * after a car-payment estimator they liked): the visitor slides in their own
 * numbers and sees what missed calls and a site that doesn't turn visitors
 * into leads could be costing them a month. It works out money the visitor
 * is missing, never a price, because Lee Systems Co. quotes every project on
 * the call. The math is spelled out in the note under it, and every number
 * in it is one the visitor chose.
 *
 * The defaults and ranges are below in one place so the owner can tune them.
 * The styling is `.calc-*` in app/globals.css.
 */

const WEEKS_PER_MONTH = 52 / 12;

type FieldKey = "callsPerWeek" | "missedPct" | "visitors" | "extraPer100" | "jobValue" | "closePct";

type FieldSpec = {
  label: string;
  min: number;
  max: number;
  step: number;
  initial: number;
  format: (value: number) => string;
};

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});
const count = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });

const fields: Record<FieldKey, FieldSpec> = {
  callsPerWeek: {
    label: "Calls a week",
    min: 5,
    max: 200,
    step: 5,
    initial: 40,
    format: (v) => count.format(v),
  },
  missedPct: {
    label: "Calls that go unanswered",
    min: 0,
    max: 60,
    step: 1,
    initial: 20,
    format: (v) => `${v}%`,
  },
  visitors: {
    label: "Website visitors a month",
    min: 100,
    max: 10000,
    step: 100,
    initial: 1000,
    format: (v) => count.format(v),
  },
  extraPer100: {
    label: "Extra leads per 100 visitors",
    min: 0.5,
    max: 5,
    step: 0.5,
    initial: 1,
    format: (v) => `+${v}`,
  },
  jobValue: {
    label: "Average job value",
    min: 100,
    max: 10000,
    step: 50,
    initial: 500,
    format: (v) => usd.format(v),
  },
  closePct: {
    label: "Leads you turn into customers",
    min: 10,
    max: 80,
    step: 5,
    initial: 30,
    format: (v) => `${v}%`,
  },
};

const modes = [
  { value: "automations", label: "Automations" },
  { value: "website", label: "Website" },
  { value: "both", label: "Both" },
] as const;

type Mode = (typeof modes)[number]["value"];

const fieldsFor: Record<Mode, { group: string; keys: FieldKey[] }[]> = {
  automations: [
    { group: "Your calls", keys: ["callsPerWeek", "missedPct"] },
    { group: "Your jobs", keys: ["jobValue", "closePct"] },
  ],
  website: [
    { group: "Your website", keys: ["visitors", "extraPer100"] },
    { group: "Your jobs", keys: ["jobValue", "closePct"] },
  ],
  both: [
    { group: "Your calls", keys: ["callsPerWeek", "missedPct"] },
    { group: "Your website", keys: ["visitors", "extraPer100"] },
    { group: "Your jobs", keys: ["jobValue", "closePct"] },
  ],
};

const initialValues = Object.fromEntries(
  Object.entries(fields).map(([key, spec]) => [key, spec.initial])
) as Record<FieldKey, number>;

export function MissedRevenueCalculator() {
  const id = useId();
  const [mode, setMode] = useState<Mode>("both");
  const [values, setValues] = useState(initialValues);

  const close = values.closePct / 100;
  const missedCalls = values.callsPerWeek * WEEKS_PER_MONTH * (values.missedPct / 100);
  const extraLeads = values.visitors * (values.extraPer100 / 100);
  const fromCalls = missedCalls * close * values.jobValue;
  const fromSite = extraLeads * close * values.jobValue;
  const monthly =
    mode === "automations" ? fromCalls : mode === "website" ? fromSite : fromCalls + fromSite;

  const callsPart = (
    <>
      <b>{count.format(missedCalls)} missed calls</b> a month
    </>
  );
  const sitePart = (
    <>
      <b>{count.format(extraLeads)} more leads</b> from your site
    </>
  );

  return (
    <div className="calc" role="group" aria-labelledby={`${id}-title`}>
      <h3 id={`${id}-title`} className="calc-title">
        See what you&apos;re missing
      </h3>
      <p className="calc-sub">Slide in your numbers. It&apos;s quick math, not a quote.</p>

      <div className="calc-result">
        <p className="calc-result-label">Revenue you could be missing</p>
        <p className="calc-result-value" aria-live="polite" aria-atomic="true">
          {usd.format(monthly)}
          <small>/mo</small>
        </p>
        <p className="calc-result-detail">
          About {usd.format(monthly * 12)} a year, from{" "}
          {mode === "automations" ? (
            callsPart
          ) : mode === "website" ? (
            sitePart
          ) : (
            <>
              {callsPart} and {sitePart}
            </>
          )}
          .
        </p>
        <BookCallLink variant="glow" arrow />
      </div>

      <fieldset className="calc-modes">
        <legend className="sr-only">What to work out</legend>
        {modes.map((option) => (
          <label key={option.value} className="calc-mode">
            <input
              type="radio"
              name={`${id}-mode`}
              value={option.value}
              checked={mode === option.value}
              onChange={() => setMode(option.value)}
            />
            <span>{option.label}</span>
          </label>
        ))}
      </fieldset>

      <div className="calc-fields">
        {fieldsFor[mode].map(({ group, keys }) => (
          <div key={group}>
            <p className="calc-group">{group}</p>
            {keys.map((key) => {
              const spec = fields[key];
              const value = values[key];
              const inputId = `${id}-${key}`;
              const fill = ((value - spec.min) / (spec.max - spec.min)) * 100;
              return (
                <div key={key} className="calc-field">
                  <div className="calc-field-head">
                    <label htmlFor={inputId}>{spec.label}</label>
                    <output htmlFor={inputId}>{spec.format(value)}</output>
                  </div>
                  <input
                    id={inputId}
                    type="range"
                    className="calc-range"
                    min={spec.min}
                    max={spec.max}
                    step={spec.step}
                    value={value}
                    aria-valuetext={spec.format(value)}
                    style={{ "--fill": `${fill}%` } as CSSProperties}
                    onChange={(event) =>
                      setValues((current) => ({
                        ...current,
                        [key]: Number(event.target.value),
                      }))
                    }
                  />
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <p className="calc-note">
        {mode !== "website" &&
          "Missed calls = calls a week × 4.33 × the share that go unanswered. "}
        {mode !== "automations" &&
          "Website leads = visitors × the extra leads per 100 you set. "}
        Each is then × the share you turn into customers × your average job. Estimate only,
        from the numbers you entered. Not a quote or a promise of results.
      </p>
    </div>
  );
}
