import {
  Smartphone,
  Gauge,
  MessageSquareText,
  Search,
  MapPin,
  KeyRound,
} from "lucide-react";

/**
 * What every build includes, whatever its size. Kept to the six things the
 * owner committed to, so nothing here is a promise that depends on scope.
 * Anything beyond these (booking, chat, automation) is quoted per project.
 */
const includes = [
  {
    Icon: Smartphone,
    title: "Built for phones first",
    body: "Most visitors find you on a phone, so that is the screen every page is designed and checked on.",
  },
  {
    Icon: Gauge,
    title: "Fast to load",
    body: "Lean pages that load quickly, so visitors do not give up before they see what you do.",
  },
  {
    Icon: MessageSquareText,
    title: "Contact and lead forms",
    body: "Forms that send enquiries straight to your inbox, with one clear next step on every page.",
  },
  {
    Icon: Search,
    title: "Basic SEO",
    body: "Page titles, descriptions and structure set up so search engines understand what you offer and where.",
  },
  {
    Icon: MapPin,
    title: "Google Business Profile help",
    body: "Help setting up or tidying your Google Business Profile so it points to the new site.",
  },
  {
    Icon: KeyRound,
    title: "You own it",
    body: "Your domain and your content are yours. If you ever move on, the site goes with you.",
  },
];

export function WebsitesServicesSection() {
  return (
    <section id="website-includes" className="relative isolate scroll-mt-24 py-20 md:py-28">
      <div className="section-container">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brass-300">
            Included in Every Site
          </p>
          <h2 className="heading-lg mb-6 text-white">
            The basics, done properly, every time
          </h2>
          <p className="text-lg leading-relaxed text-neutral-300">
            New build or redesign, one page or twenty, every site comes with
            these.
          </p>
        </div>

        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {includes.map(({ Icon, title, body }) => (
            <li
              key={title}
              className="rounded-xl border border-white/10 bg-white/[0.04] p-6"
            >
              <Icon className="mb-4 h-7 w-7 text-brass-300" aria-hidden="true" />
              <h3 className="mb-2 font-semibold text-white">{title}</h3>
              <p className="text-sm leading-relaxed text-neutral-400">{body}</p>
            </li>
          ))}
        </ul>

        <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-neutral-400">
          Booking, chat and lead automation can be added to any build and are
          quoted with the project. An optional care plan for hosting, updates
          and small changes is quoted separately.
        </p>
      </div>
    </section>
  );
}
