import { Check } from "lucide-react";
import { bmHeroTrust, bmPageAction } from "@/data/business-mastery";

/**
 * The page's one action, as the sections added on 2026-10-18 end on it: the
 * program section's uppercase button, and under it a short line.
 *
 * The reference those sections follow (The Real World's landing page) puts a
 * member count under every button. This page has no count to state, so the
 * default line is `bmHeroTrust`, the three facts the hero already states.
 * A section can pass its own `note` instead.
 */
export function BmCta({
  note,
  align = "center",
}: {
  note?: string;
  align?: "center" | "start";
}) {
  const alignClass =
    align === "start" ? "items-center lg:items-start" : "items-center";

  return (
    <div className={`flex flex-col gap-4 ${alignClass}`}>
      <a
        href={bmPageAction.href}
        className="inline-flex min-h-14 items-center justify-center rounded-lg bg-amber-400 px-10 py-4 text-base font-bold uppercase tracking-[0.12em] bm-cta-glow text-neutral-950 transition-[color,background-color,box-shadow] duration-[260ms] hover:bg-amber-300 focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-amber-400/85 max-sm:w-full sm:px-14 md:text-lg"
      >
        {bmPageAction.label}
      </a>
      {note ? (
        <p className="text-sm text-neutral-400">{note}</p>
      ) : (
        <ul className="flex flex-wrap justify-center gap-x-4 gap-y-1.5 text-sm text-neutral-400">
          {bmHeroTrust.map((item) => (
            <li key={item} className="inline-flex items-center gap-1.5">
              <Check
                className="h-3.5 w-3.5 shrink-0 text-amber-400"
                strokeWidth={2.5}
                aria-hidden="true"
              />
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
