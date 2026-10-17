import { ShieldCheck } from "lucide-react";
import { leeSystemsAnchors } from "@/data/lee-systems";
import { carePlan, serviceGroups } from "@/data/services";
import { serviceIcons } from "@/components/services/serviceIcons";
import { ServiceGroupItems } from "@/components/lee-systems/ServiceGroupItems";

/**
 * "What we do" on /lee-systems (`#services`): everything Lee Systems Co.
 * does, as six groups (the owner's list, 2026-10-17), so a visitor gets it
 * in a glance and opens a group only for the detail. It replaced "Two ways
 * we take work off your plate", the two big Business automation and Website
 * builds cards (LeeSystemsOfferingsSection, kept but no longer rendered):
 * their points are all inside groups 1, 3 and 4 now, and the live demo
 * under this section still shows a website and a system working together.
 *
 * After the service grid of the owner's reference sites: per card a thin
 * line icon, the group's name and the one line saying what you get, then
 * "See what's included" (ServiceGroupItems), which shows its items as chips.
 * Three columns on wide screens, two on tablets, one on a phone; cards align
 * to the top of their row, so opening one doesn't stretch its neighbours.
 * Each card has its group's `anchor` as its id, so a link can land on it.
 * The Care Plan, an add-on to any of them, is one band under the grid.
 */
export function LeeSystemsServicesSection() {
  return (
    <section
      id={leeSystemsAnchors.services}
      aria-labelledby="ls-services-title"
      className="relative isolate py-20 md:py-28"
    >
      <div className="section-container">
        <div className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
          <p className="mb-3 text-sm font-semibold text-brass-300">What we do</p>
          <h2 id="ls-services-title" className="heading-lg text-white">
            Everything that brings customers in{" "}
            <span className="text-brass-300">and takes work off your plate</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-neutral-300">
            A website that sells, AI that answers every call and lead, and the
            marketing that keeps new customers coming. Pick one or all six.
            Built personally for you.
          </p>
        </div>

        <ul className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-5 md:grid-cols-2 lg:grid-cols-3">
          {serviceGroups.map(({ anchor, icon, name, outcome, items }) => {
            const Icon = serviceIcons[icon];
            return (
              <li
                key={anchor}
                id={anchor}
                className="relative overflow-hidden rounded-xl border border-white/10 bg-[#17181b] px-6 pt-7 pb-3 transition-colors duration-300 hover:border-brass-400/40 motion-reduce:transition-none light:bg-[#fff] light:shadow-[0_20px_50px_-24px_rgb(15_26_46/0.18)]"
              >
                {/* A soft glow behind the icon, the accent's only fill. */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_55%_at_0%_0%,rgb(var(--gold)/0.08),transparent_70%)]"
                />
                <div className="relative">
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-brass-400/30 bg-brass-400/[0.06]">
                    <Icon
                      aria-hidden="true"
                      strokeWidth={1.5}
                      className="h-[22px] w-[22px] text-brass-400"
                    />
                  </span>
                  <h3 className="mt-5 text-xl font-bold tracking-tight text-white">
                    {name}
                  </h3>
                  <p className="mt-2 leading-relaxed text-neutral-300 md:min-h-[3.25rem]">
                    {outcome}
                  </p>
                  <ServiceGroupItems name={name} items={items.map((item) => item.name)} />
                </div>
              </li>
            );
          })}
        </ul>

        <div className="mx-auto mt-6 flex max-w-6xl flex-col gap-3 rounded-xl border border-brass-400/25 bg-[#17181b] px-6 py-5 sm:flex-row sm:items-center sm:gap-5 light:bg-[#fff] light:shadow-[0_20px_50px_-24px_rgb(15_26_46/0.18)]">
          <span className="flex items-center gap-3">
            <ShieldCheck
              aria-hidden="true"
              strokeWidth={1.5}
              className="h-[22px] w-[22px] shrink-0 text-brass-400"
            />
            <span className="text-xs font-semibold tracking-[0.18em] whitespace-nowrap text-brass-300 uppercase">
              Add-on: {carePlan.name}
            </span>
          </span>
          <p className="leading-relaxed text-neutral-300">{carePlan.body}</p>
        </div>
      </div>
    </section>
  );
}
