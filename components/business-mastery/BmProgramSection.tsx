import {
  BookOpen,
  Hammer,
  MessagesSquare,
  Phone,
  Presentation,
  UserRound,
  Wrench,
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
  tools: <Wrench className="h-6 w-6" aria-hidden="true" />,
};

/**
 * Section 5 — what membership actually is. Seven pillars; the Tools &
 * Resources pillar carries its list and spans wider so ten bullets don't
 * squeeze into a narrow card.
 *
 * `bmProgram.closer` used to run as one centred paragraph under the grid and
 * came off at the owner's request (2026-09-07). The section ends on the pillars
 * now, so the last thing read here is what membership includes rather than a
 * caveat about not knowing what to build yet — which is a question section 3
 * already answers, with "Aspiring Entrepreneurs" as its first audience. The
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

        {/* Every card in the grid is the same size. The one pillar that is a
            list rather than a description (Tools & Resources) used to be an
            extra-wide card spanning the whole row, which broke the grid's
            rhythm; it now sits under the grid as plain text instead. */}
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

        {bmPillars
          .filter((pillar) => pillar.items)
          .map((pillar) => (
            <div key={pillar.id} className="mx-auto mt-14 max-w-4xl text-center">
              <div className="mb-4 flex justify-center text-amber-400">
                {pillarIcons[pillar.id]}
              </div>
              <h3 className="mb-2 text-lg font-bold text-white">{pillar.title}</h3>
              <p className="mb-6 leading-relaxed text-neutral-300">
                {pillar.description}
              </p>
              <ul className="mx-auto grid max-w-3xl grid-cols-1 gap-x-6 gap-y-2 text-left sm:grid-cols-2 lg:grid-cols-3">
                {pillar.items!.map((item) => (
                  <li
                    key={item}
                    className="flex items-baseline gap-2.5 text-neutral-300"
                  >
                    <span
                      className="h-1.5 w-1.5 shrink-0 translate-y-[-1px] rounded-full bg-amber-400"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
      </div>
    </section>
  );
}
