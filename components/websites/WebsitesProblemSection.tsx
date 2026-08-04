import { ArrowRight, X, Check } from "lucide-react";

/**
 * The contrast here used to run slow build vs fast build, which put both columns
 * on the axis of production time - the wrong argument entirely, since it makes
 * the site a commodity and speed the only differentiator. The axis is now what
 * the finished site does once a visitor is on it: describe the business, or move
 * the visitor toward becoming a customer. Keep it on that axis.
 *
 * The last pair used to read "no idea what is actually working" against "you
 * can see what is converting". Nothing in this codebase measures conversion:
 * Vercel Analytics reports pageviews and landing pages, and the API routes
 * email each enquiry as it is submitted. There is no form-fill event tracking
 * and no call tracking, so no page can be credited with a lead. The replacement
 * claims only those two things, which is still a real answer to the column
 * beside it. Do not put conversion measurement back without building it first.
 *
 * For the same reason the negative counts arrivals rather than identifying them.
 * It read "no way to see who is arriving", and Vercel Analytics is anonymous -
 * "who" promises visitor identity the stack cannot supply.
 */
const sitsThere = [
  "Says what you do, not why you",
  "One page carrying every offer",
  "Asks people to “get in touch”",
  "Proof is a logo and a promise",
  "No way to see how many arrive",
];

const sells = [
  "Leads with the outcome they want",
  "A focused page per offer and campaign",
  "One obvious next step on every screen",
  "Proof a visitor can check themselves",
  "Traffic you can see, enquiries emailed on arrival",
];

export function WebsitesProblemSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="section-container">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-amber-400">
            Two Kinds of Website
          </p>
          <h2 className="heading-lg mb-6 text-white">
            A Site That Sits There, or a Site That Sells.
          </h2>
          {/* Two claims came out of this paragraph. "Most small-business sites
              are brochures" is a market share nobody counted, so the brochure
              is described as a kind of site rather than as the majority of
              them. And the visitor comparing you against "two competitors" was
              an invented number; the Shift section already makes the narrowed
              list point once, which is as often as an unmeasured claim about
              the reader's own customers should appear. The argument does not
              need either one - a brochure fails on its own terms the moment
              the visitor arrives to decide rather than to browse. */}
          <p className="mb-4 text-lg leading-relaxed text-neutral-300">
            A brochure site describes the business accurately, lists the
            services, and then waits. That was enough when people browsed their
            way to a decision.
          </p>
          <p className="text-lg leading-relaxed text-neutral-400">
            It is not enough when the person on the page came to decide rather
            than to browse. The difference is not how the site looks. It is
            whether every screen is built around the decision the visitor came
            to make.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 items-stretch gap-6 lg:grid-cols-[1fr_auto_1fr]">
          {/* A site that sits there */}
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-700 bg-neutral-900">
                <X className="h-4 w-4 text-neutral-500" aria-hidden="true" />
              </span>
              <h3 className="font-semibold text-neutral-300">
                A site that sits there
              </h3>
            </div>
            <ol className="space-y-3">
              {sitsThere.map((step, i) => (
                <li
                  key={step}
                  className="flex items-center gap-3 rounded-lg border border-dashed border-neutral-800 bg-neutral-900/40 px-4 py-3"
                >
                  <span className="font-mono text-xs text-neutral-600">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm text-neutral-400">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Divider */}
          <div className="flex items-center justify-center lg:px-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-amber-400/40 bg-amber-400/10">
              <ArrowRight
                className="h-5 w-5 rotate-90 text-amber-400 lg:rotate-0"
                aria-hidden="true"
              />
            </span>
          </div>

          {/* A site that sells */}
          <div className="rounded-xl border border-amber-400/30 bg-gradient-to-b from-amber-400/[0.07] to-transparent p-6 md:p-8">
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-amber-400/40 bg-amber-400/10">
                <Check className="h-4 w-4 text-amber-400" aria-hidden="true" />
              </span>
              <h3 className="font-semibold text-white">A site that sells</h3>
            </div>
            <ol className="space-y-3">
              {sells.map((step, i) => (
                <li
                  key={step}
                  className="relative flex items-center gap-3 rounded-lg border border-white/10 bg-neutral-900/70 px-4 py-3"
                >
                  {i !== sells.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="absolute bottom-[-13px] left-8 h-3 w-px bg-amber-400/40"
                    />
                  )}
                  <span className="font-mono text-xs text-amber-400/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm text-neutral-200">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
