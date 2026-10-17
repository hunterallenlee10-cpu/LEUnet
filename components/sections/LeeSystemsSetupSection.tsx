import Link from "next/link";
import { Database, Globe, Phone, Zap } from "lucide-react";
import { homeSetupItems, leeSystemsLinks } from "@/data/lee-systems";

const icons = {
  calls: Phone,
  "follow-up": Zap,
  crm: Database,
  websites: Globe,
} as const;

/** Homepage: the four things Lee Systems Co. sets up, and where to see the rest. */
export function LeeSystemsSetupSection() {
  return (
    <section aria-labelledby="setup-title" className="relative isolate py-20 md:py-28">
      <div className="section-container">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 id="setup-title" className="heading-lg text-white">
            What Lee Systems Co. sets up
          </h2>
        </div>

        <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {homeSetupItems.map(({ id, title, body }) => {
            const Icon = icons[id];
            return (
              <li key={id} className="bg-neutral-950 p-6 md:p-8">
                <Icon className="mb-4 h-7 w-7 text-brass-300" aria-hidden="true" />
                <h3 className="mb-2 text-lg font-bold text-white">{title}</h3>
                <p className="text-sm leading-relaxed text-neutral-400">{body}</p>
              </li>
            );
          })}
        </ul>

        <p className="mt-10 text-center">
          <Link
            href={leeSystemsLinks.automation}
            className="inline-flex min-h-11 items-center font-semibold text-brass-300 underline-offset-4 hover:underline"
          >
            See what we automate
          </Link>
        </p>
      </div>
    </section>
  );
}
