"use client";

import { useState } from "react";
import {
  Camera,
  ChevronDown,
  Mail,
  Palette,
  Printer,
  Search,
  Share2,
  Signpost,
  Target,
  Truck,
  type LucideIcon,
} from "lucide-react";
import type { MarketingService } from "@/data/marketing";

/**
 * Keyed by service id, and resolved here rather than passed in as a prop.
 *
 * The sections that render this grid are server components, and a React
 * component is a function - passing one across the server/client boundary
 * fails the build with "Functions cannot be passed directly to Client
 * Components." Keeping the map inside this client module sidesteps that, and
 * keeps `data/marketing.ts` free of anything unserializable so the page can
 * still read it for structured data.
 *
 * Ids are unique across the traditional and digital lists, so one map covers
 * both callers.
 */
const icons: Record<string, LucideIcon> = {
  print: Printer,
  signage: Signpost,
  vehicle: Truck,
  seo: Search,
  "paid-ads": Target,
  social: Share2,
  content: Camera,
  email: Mail,
  branding: Palette,
};

interface MarketingServiceGridProps {
  services: MarketingService[];
}

export function MarketingServiceGrid({ services }: MarketingServiceGridProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {services.map(({ id, title, description, items }) => {
        const Icon = icons[id];
        const isOpen = openId === id;
        return (
          <div
            key={id}
            className="flex flex-col rounded-xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-colors duration-300 hover:border-amber-400/40 hover:bg-amber-400/[0.04]"
          >
            <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg border border-amber-400/30 bg-amber-400/10">
              <Icon className="h-5 w-5 text-amber-400" aria-hidden="true" />
            </span>

            <h3 className="mb-3 text-lg font-bold text-white">{title}</h3>
            <p className="mb-5 text-sm leading-relaxed text-neutral-400">
              {description}
            </p>

            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : id)}
              aria-expanded={isOpen}
              aria-controls={`${id}-items`}
              className="mt-auto inline-flex items-center gap-1.5 self-start rounded text-sm font-semibold text-amber-400 transition-colors hover:text-amber-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-400"
            >
              {isOpen ? "Hide details" : "See details"}
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
                aria-hidden="true"
              />
            </button>

            <ul
              id={`${id}-items`}
              hidden={!isOpen}
              className="mt-4 space-y-2 border-t border-white/10 pt-4"
            >
              {items.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-neutral-300"
                >
                  <span
                    aria-hidden="true"
                    className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-amber-400"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
