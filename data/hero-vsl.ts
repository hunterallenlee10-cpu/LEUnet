/**
 * The homepage hero's animation: "The Vault", a short 3D film of what Lee
 * Systems Co. sets up, about 28 seconds long (components/sections/HeroVsl.tsx
 * holds its words, heroVslEngine.ts draws it, heroVslPlayer.ts decides when
 * it plays). These are the parts meant to be edited: how long the hero waits
 * and holds, the two amounts in the running count, and what each business
 * type's version says. The end card's figures are the ribbon's, from
 * data/site.ts.
 *
 * The owner's plan (2026-09-29): the regular hero shows first, the animation
 * plays in its place once per page load, its end card holds, then the hero
 * comes back with a "Replay animation" button. People whose device asks for
 * less motion get a "Play animation" button instead of the autoplay. The
 * owner picked this film, Take 1 of three, on 2026-10-08; it replaced the
 * gold line drawing that played here before.
 */

import { site, type Stat } from "@/data/site";

export const heroVsl = {
  /** Seconds the regular hero shows before the animation starts. The count
   *  only runs while the hero is on screen and the tab is open. */
  startDelay: 3,
  /** Seconds the end card stays up before the regular hero comes back. It
   *  waits longer while a mouse is on the end card's button or links, or
   *  keyboard focus is inside the animation. */
  hold: 7,
  /** The red count beside the film climbs to this while the gaps leak, and
   *  freezes on it once the automations switch on: "−$4,200 lost". */
  lossEnd: 4200,
  /** Then it turns gold and climbs on from `lossEnd` towards this, a step
   *  for each coin that lands in the vault: "+$12,800 recovered" is where
   *  the vault ends up, though the count gives way to the end card a little
   *  before (at about +$10,850 with these two amounts). Keep it above
   *  `lossEnd`: the count never goes back down. */
  recoveredEnd: 12800,
} as const;

export interface HeroVslNiche {
  /** What leaks from each crack in the pipe, top to bottom. */
  gaps: [string, string, string];
  /** What the AI says when it answers the call (typed out on the first
   *  fix's card). */
  call: string;
  /** The follow-up text, in the second fix's bubble. */
  text: string;
  /** The new entry on the third fix's CRM card. */
  lead: string;
}

/**
 * One version of the animation per business type. A link with
 * `?niche=roofing` (or law, trainer) plays that version; anything else plays
 * the general one.
 */
export const heroVslNiches = {
  general: {
    gaps: ["Missed call", "No reply", "Lost details"],
    call: "Thanks for calling! Can I grab your name?",
    text: "Hey, following up on your quote request 👋",
    lead: "New lead",
  },
  roofing: {
    gaps: ["Missed estimate request", "No reply to the quote", "Lost job details"],
    call: "Thanks for calling! What's the address for your estimate?",
    text: "Hi, following up on your estimate request 👋",
    lead: "New estimate request",
  },
  law: {
    gaps: ["Missed consult call", "No reply to the inquiry", "Lost case details"],
    call: "Thanks for calling. Can I take a few details about your case?",
    text: "Hi, following up on your consultation request.",
    lead: "New consultation",
  },
  trainer: {
    gaps: ["Missed trial session inquiry", "No reply to the DM", "Lost client details"],
    call: "Thanks for calling! Want to book a trial session?",
    text: "Hey! Following up on your trial session inquiry 👋",
    lead: "New trial booking",
  },
} satisfies Record<string, HeroVslNiche>;

export type HeroVslNicheKey = keyof typeof heroVslNiches;

/** Other spellings a `?niche=` link may use. */
export const heroVslNicheAliases: Record<string, HeroVslNicheKey> = {
  general: "general",
  roofing: "roofing",
  roofer: "roofing",
  roofers: "roofing",
  law: "law",
  "law-firm": "law",
  lawfirm: "law",
  legal: "law",
  trainer: "trainer",
  "personal-trainer": "trainer",
  fitness: "trainer",
};

export interface HeroVslStat {
  /** The whole figure as published, e.g. "$150,000+". */
  text: string;
  label: string;
  /** The same figure split for the count-up: "$", 150000, "+". Null when
   *  the figure isn't one plain number, which then shows as it is. */
  count: { prefix: string; value: number; suffix: string } | null;
}

function toHeroVslStat(stat: Stat): HeroVslStat {
  const parts = /^(\D*?)(\d[\d,]*)(\D*)$/.exec(stat.value.trim());
  return {
    text: stat.value,
    label: stat.label,
    count: parts
      ? {
          prefix: parts[1],
          value: Number(parts[2].replaceAll(",", "")),
          suffix: parts[3],
        }
      : null,
  };
}

/**
 * The end card's figures: the hero ribbon's (`site.stats`), last first. The
 * ribbon builds up to its biggest figure, and the end card leads with it,
 * shown first and largest.
 */
export const heroVslStats: HeroVslStat[] = [...site.stats]
  .reverse()
  .map(toHeroVslStat);
