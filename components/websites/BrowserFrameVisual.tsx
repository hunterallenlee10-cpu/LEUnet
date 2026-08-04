/**
 * The hero visual: a stylized browser window wrapping a wireframe of a typical
 * business page.
 *
 * Deliberately a wireframe rather than a screenshot. A screenshot of a real site
 * would need to be a site we actually built, and the ones we have are already
 * shown - with links - in the portfolio section further down the page. An
 * abstract frame here promises nothing it cannot back up.
 *
 * Decorative: hidden from assistive technology. The copy beside it states what
 * the offering is.
 */
export function BrowserFrameVisual() {
  return (
    <div
      aria-hidden="true"
      className="rounded-xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm md:p-7"
    >
      <div className="mb-5 flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
          Your Site
        </p>
        <span className="flex items-center gap-1.5 text-[11px] text-neutral-500">
          <span className="lmm-status h-1.5 w-1.5 rounded-full bg-amber-400" />
          Live
        </span>
      </div>

      <div className="overflow-hidden rounded-lg border border-white/10 bg-neutral-900/80">
        {/* Browser chrome */}
        <div className="flex items-center gap-2 border-b border-white/10 bg-neutral-950/60 px-3 py-2.5">
          <span className="flex gap-1.5">
            <span className="h-2 w-2 rounded-full bg-neutral-700" />
            <span className="h-2 w-2 rounded-full bg-neutral-700" />
            <span className="h-2 w-2 rounded-full bg-neutral-700" />
          </span>
          <span className="ml-1 flex-1 rounded border border-white/10 bg-neutral-900 px-2 py-1 text-[10px] text-neutral-500">
            yourbusiness.com
          </span>
        </div>

        {/* Page wireframe */}
        <div className="space-y-4 p-4">
          {/* Nav */}
          <div className="flex items-center justify-between">
            <span className="h-3 w-16 rounded bg-amber-400/50" />
            <span className="flex gap-2">
              <span className="h-2 w-8 rounded bg-neutral-700" />
              <span className="h-2 w-8 rounded bg-neutral-700" />
              <span className="h-2 w-8 rounded bg-neutral-700" />
              <span className="h-2 w-12 rounded bg-amber-400/40" />
            </span>
          </div>

          {/* Hero block */}
          <div className="rounded-md border border-white/[0.06] bg-gradient-to-br from-amber-400/[0.07] to-transparent p-4">
            <span className="mb-2.5 block h-4 w-3/4 rounded bg-neutral-600" />
            <span className="mb-2 block h-2 w-full rounded bg-neutral-800" />
            <span className="mb-4 block h-2 w-5/6 rounded bg-neutral-800" />
            <span className="inline-block h-6 w-28 rounded bg-amber-400/70" />
          </div>

          {/* Three-up feature row */}
          <div className="grid grid-cols-3 gap-2.5">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="rounded-md border border-white/[0.06] bg-neutral-950/50 p-2.5"
              >
                <span className="mb-2 block h-5 w-5 rounded border border-amber-400/25 bg-amber-400/10" />
                <span className="mb-1.5 block h-1.5 w-full rounded bg-neutral-700" />
                <span className="block h-1.5 w-2/3 rounded bg-neutral-800" />
              </div>
            ))}
          </div>

          {/* Lead capture block - the point of the whole page */}
          <div className="rounded-md border border-amber-400/20 bg-amber-400/[0.04] p-3">
            <span className="mb-2.5 block h-2 w-24 rounded bg-neutral-600" />
            <div className="grid grid-cols-2 gap-2">
              <span className="h-4 rounded border border-white/10 bg-neutral-900" />
              <span className="h-4 rounded border border-white/10 bg-neutral-900" />
            </div>
            <span className="mt-2 block h-4 rounded border border-white/10 bg-neutral-900" />
            <span className="mt-2.5 block h-5 w-24 rounded bg-amber-400/70" />
          </div>
        </div>
      </div>

      {/* A row of three chips - "Mobile ready", "Fast loading", "Built to
          convert" - used to close the frame here, and it was removed on
          purpose. Please do not add it back.

          Two of the three advertised the floor. A phone layout and a page that
          loads quickly are what any competent build starts from in 2026, so
          naming them as selling points tells a buyer our bar is low, not high.
          WebsitesOutcomeStrip made the same call and its header comment records
          it; these chips sat in the first screen, beside the H1, which made
          them the worst-placed copy on the page. Both things still get built.
          They are answered when asked - see the "Will the site work on phones?"
          answer in data/websites.ts - and they are never sold.

          The third chip was true and on-argument, but it was already said twice
          within one screen: the hero eyebrow above reads "WEBSITES BUILT TO
          CONVERT" and the outcome strip immediately below breaks that promise
          into four parts. So the row was dropped rather than rewritten, and the
          promises are carried by the strip, in real text that assistive
          technology can reach - which this frame, being decorative and
          aria-hidden, cannot. If a caption is ever wanted here, it has to be a
          claim about what gets built for the visitor's decision, not a
          specification. */}
    </div>
  );
}
