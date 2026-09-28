import { site, type Tool } from "@/data/site";

/**
 * The moving strip of tool logos under the homepage hero, in the style the
 * owner pointed to (synvolo.com): two rows of pills sliding in opposite
 * directions, faded at the edges. It replaced the "No surprises on price."
 * band on the homepage on 2026-09-28; that band still runs on the industry
 * pages.
 *
 * The tools are `site.tools` in data/site.ts. The logos are symbols in
 * public/tools/sprite.svg, drawn through `<use>` so they cost one cached file
 * rather than markup on every page load, and take their colour from the pill.
 *
 * Each row is its list twice, and the track slides by exactly one copy, so
 * the loop has no seam. Screen readers get the first copy only. Under
 * prefers-reduced-motion the rows stop and wrap instead (`.tools-*` in
 * app/globals.css).
 */
export function ToolsMarqueeSection() {
  const rows = site.tools.filter((row) => row.length > 0);
  if (rows.length === 0) return null;

  return (
    <section
      aria-labelledby="tools-title"
      className="relative isolate overflow-hidden bg-neutral-950 py-16 md:py-20"
    >
      <h2
        id="tools-title"
        className="section-container mb-10 text-center text-sm font-semibold text-neutral-400 md:text-base"
      >
        Built cutting-edge, connected to the tools you already use.
      </h2>

      <div className="space-y-4">
        {rows.map((row, i) => (
          <div key={i} className="tools-row">
            <div
              className={`tools-track ${i % 2 === 1 ? "tools-track--reverse" : ""}`}
            >
              <ToolList tools={row} />
              <ToolList tools={row} hidden />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ToolList({ tools, hidden = false }: { tools: Tool[]; hidden?: boolean }) {
  return (
    <ul className="tools-list" aria-hidden={hidden || undefined}>
      {tools.map(({ name, icon }) => (
        <li key={name} className="tools-pill">
          <svg aria-hidden="true" focusable="false" className="h-5 w-5 shrink-0">
            <use href={`/tools/sprite.svg#${icon}`} />
          </svg>
          {name}
        </li>
      ))}
    </ul>
  );
}
