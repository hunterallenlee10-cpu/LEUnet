import { Target, BadgeCheck, LayoutGrid, LineChart } from "lucide-react";

/**
 * These four outcomes are the hero promise broken into its parts, in the order
 * the visitor experiences them: they choose you, they can check your claims,
 * they land somewhere specific, and you can see what arrives. Keep this summary
 * in step with the tiles below - a stale line here describing a tile that was
 * removed for honesty reasons is how the removed claim gets restored.
 *
 * Deliberately absent: anything about how quickly the site gets produced, and
 * anything that is table stakes in 2026. The strip used to lead with "Launched
 * Sooner" and claim "Works on Every Screen" and "Built to Be Found" - a mobile
 * layout and real page titles are the floor now, so advertising them signals a
 * low bar rather than a high one. They still get built; they are just not the
 * reason to buy.
 *
 * Two tiles were rewritten for honesty and must not drift back:
 *
 * 1. "Trusted in Seconds" promised a stranger's reaction, which nobody can
 *    guarantee, and its supporting line ("loads fast, reads clearly, looks
 *    current on a phone") was exactly the table-stakes copy the paragraph above
 *    says was purged. A tile has to promise what gets built, not how someone
 *    will feel about it.
 * 2. The measurement tile claimed forms and calls were tracked. There is no
 *    form-fill event tracking and no call tracking anywhere in this codebase.
 *    What exists is Vercel Analytics in app/layout.tsx, which reports pageviews
 *    and landing pages, and the submit handlers in app/api/*, which email every
 *    enquiry with a subject line naming the form it came from. The label now
 *    says precisely that and nothing more.
 */
const outcomes = [
  {
    Icon: Target,
    title: "Chosen, Not Just Found",
    label: "Written for the decision the visitor came to make",
  },
  {
    Icon: BadgeCheck,
    title: "Proof, Not Adjectives",
    label: "Plain claims and work a visitor can open and check",
  },
  {
    Icon: LayoutGrid,
    title: "A Page Per Offer",
    label: "Each service and campaign gets its own focused page",
  },
  {
    Icon: LineChart,
    title: "You See What Arrives",
    label:
      "Traffic tracked from day one, and every enquiry emailed to you as it is sent",
  },
];

export function WebsitesOutcomeStrip() {
  return (
    <section className="border-y border-white/10 bg-neutral-950/60 py-12">
      <div className="section-container">
        <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {outcomes.map(({ Icon, title, label }) => (
            <li key={title} className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-amber-400/30 bg-amber-400/10">
                <Icon className="h-5 w-5 text-amber-400" aria-hidden="true" />
              </span>
              <div>
                <p className="font-semibold text-white">{title}</p>
                <p className="mt-1 text-sm text-neutral-400">{label}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
