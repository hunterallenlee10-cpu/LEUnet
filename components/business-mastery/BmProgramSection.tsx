import {
  BookOpen,
  Hammer,
  MessagesSquare,
  Phone,
  Presentation,
  UserRound,
} from "lucide-react";
import { bmPillars, bmProgram } from "@/data/business-mastery";

// Keyed by pillar id so the icon travels with the content if the order
// changes in data/business-mastery.ts.
const pillarIcons: Record<string, React.ReactNode> = {
  classes: <BookOpen className="h-6 w-6" aria-hidden="true" />,
  webinars: <Presentation className="h-6 w-6" aria-hidden="true" />,
  calls: <Phone className="h-6 w-6" aria-hidden="true" />,
  coaching: <UserRound className="h-6 w-6" aria-hidden="true" />,
  "hands-on": <Hammer className="h-6 w-6" aria-hidden="true" />,
  community: <MessagesSquare className="h-6 w-6" aria-hidden="true" />,
};

/**
 * Section 5 — what membership actually is. Six pillar cards.
 *
 * The Tools & Resources pillar (the one carrying a bullet list) used to sit
 * under the grid as plain text and came off at the owner's request
 * (2026-09-27). Its content is intact in the data file; the grid still skips
 * any pillar with `items`, so it stays hidden until rendered here again.
 *
 * `bmProgram.closer` used to run as one centred paragraph under the grid and
 * came off at the owner's request (2026-09-07). The section ends on the pillars
 * now, so the last thing read here is what membership includes rather than a
 * caveat about not knowing what to build yet — which is a question section 3
 * already answers, with "Starting From Zero" as its first stage. The
 * string is intact in the data file.
 */
export function BmProgramSection() {
  return (
    <section className="relative isolate py-20 md:py-28">
      <div className="section-container">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-amber-400">
            What Business Mastery Actually Is
          </p>
          <h2 className="heading-lg mb-4 text-white">{bmProgram.heading}</h2>
          <p className="text-lg text-neutral-400">{bmProgram.description}</p>
        </div>

        {/* Every card in the grid is the same size. Pillars that are a list
            rather than a description (Tools & Resources) are left out; see
            the note above. */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {bmPillars
            .filter((pillar) => !pillar.items)
            .map((pillar) => (
              <div
                key={pillar.id}
                className="glass-card p-6 transition-colors duration-300 hover:border-amber-400/30 md:p-8"
              >
                <div className="mb-4 text-amber-400">
                  {pillarIcons[pillar.id]}
                </div>
                <h3 className="mb-2 text-lg font-bold text-white">
                  {pillar.title}
                </h3>
                <p className="leading-relaxed text-neutral-300">
                  {pillar.description}
                </p>
              </div>
            ))}
        </div>

      </div>
    </section>
  );
}
