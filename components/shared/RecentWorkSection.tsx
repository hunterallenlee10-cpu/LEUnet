import Image from "next/image";
import { ArrowUpRight, Globe } from "lucide-react";
import { isExternalHref, site, type Project } from "@/data/site";
import { ComingSoonSlot } from "@/components/shared/ComingSoonSlot";
import { BuildsRing } from "@/components/shared/BuildsRing";

/** Fewer real builds than this and the section doesn't show them alone. */
const MIN_PROJECTS = 1;

/** While placeholders show, "coming soon" boxes fill the row out to this. */
const MIN_BOXES = 3;

/**
 * "Recent Builds", on the homepage and /lee-systems: a row of boxes, one per
 * website in `site.projects`, each showing the site's first screen in a
 * browser frame. The whole box links to the live site. The owner asked for
 * boxes in place of the 360° ring on 2026-10-05, then for a sideways row in
 * place of the grid on 2026-10-06 so the section can take any number of
 * builds without growing taller, and that afternoon for a 360° ring that
 * turns on its own and shows the builds round the back (BuildsRing).
 *
 * While `site.showPlaceholders` is true, "coming soon" boxes fill the row out
 * to three, and each real build takes the place of one. With placeholders
 * off, the section shows only real builds and hides with none. Nothing here
 * ever stands in a made-up project.
 */
export function RecentWorkSection({ id }: { id?: string }) {
  const { projects } = site;
  const openSlots = site.showPlaceholders
    ? Math.max(0, MIN_BOXES - projects.length)
    : 0;

  if (projects.length < MIN_PROJECTS && openSlots === 0) return null;

  return (
    <section
      id={id}
      aria-labelledby="recent-work-title"
      className="relative isolate py-20 md:py-28"
    >
      <div className="section-container">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 id="recent-work-title" className="heading-lg text-white">
            Recent Builds
          </h2>
          <p className="mt-4 text-lg text-neutral-300">
            Some of our favorite most recent work.
          </p>
        </div>

        <BuildsRing
          label="Recent Builds"
          items={[
            ...projects.map((project) => (
              <BuildBox key={project.href} project={project} />
            )),
            ...Array.from({ length: openSlots }, (_, i) => (
              <ComingSoonSlot
                key={`open-slot-${i}`}
                label="More builds coming soon"
                Icon={Globe}
                className="min-h-40 w-full"
              />
            )),
          ]}
        />
      </div>
    </section>
  );
}

/** "https://www.acme.com/" -> "acme.com". */
function hostname(href: string): string {
  return new URL(href).hostname.replace(/^www\./, "");
}

export function BuildBox({ project }: { project: Project }) {
  const external = isExternalHref(project.href);
  const domain = external ? hostname(project.href) : null;

  return (
    <a
      href={project.href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group flex w-full flex-col overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] transition-colors hover:border-brass-300/60 focus-visible:border-brass-300/60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brass-300"
    >
      {project.image && (
        <div className="border-b border-white/10">
          <div
            className="flex h-8 items-center gap-1.5 bg-white/[0.04] px-3"
            aria-hidden="true"
          >
            <span className="h-2 w-2 rounded-full bg-white/20" />
            <span className="h-2 w-2 rounded-full bg-white/20" />
            <span className="h-2 w-2 rounded-full bg-white/20" />
            {domain && (
              <span className="ml-2 truncate text-xs text-neutral-400">
                {domain}
              </span>
            )}
          </div>
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={project.image}
              alt={`${project.name} website, first screen`}
              fill
              sizes="(min-width: 1024px) 24rem, (min-width: 640px) 45vw, 85vw"
              className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            />
          </div>
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brass-300">
          {project.category}
        </p>
        <h3 className="mt-2 text-lg font-bold text-white">{project.name}</h3>
        {project.upgradedFrom && (
          <p className="mt-1 text-sm text-neutral-400">
            Upgraded from {hostname(project.upgradedFrom)}
          </p>
        )}
        {project.summary && (
          <p className="mt-2 leading-relaxed text-neutral-400">
            {project.summary}
          </p>
        )}
        {project.built.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2" aria-label="What we built">
            {project.built.map((item) => (
              <li
                key={item}
                className="rounded-md border border-white/10 px-2.5 py-1 text-xs text-neutral-300"
              >
                {item}
              </li>
            ))}
          </ul>
        )}
        <span className="mt-auto inline-flex items-center gap-1 pt-5 font-semibold text-brass-300 group-hover:underline group-hover:underline-offset-4">
          Visit site
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          {external && <span className="sr-only">(opens in a new tab)</span>}
        </span>
      </div>
    </a>
  );
}
