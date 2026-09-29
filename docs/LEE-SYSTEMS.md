# Lee Systems Co.

Lee Systems Co. ("A Lee Enterprises Unlimited company") replaced Lee Marketing
Mastery on 2026-09-25. It sells **AI automation** (the lead offer, AI call
answering included) and **website builds**. Websites were sold with a pay-after-the-build guarantee until
2026-09-28, when the owner stopped offering it; the site no longer makes that
claim anywhere. The first step is always a free consultation call, booked with **"Book a
free call"**.

## Pages

Everything about Lee Systems Co. is on one page, `/lee-systems`. The
automation and websites pages folded into it on 2026-09-29, and their URLs
301 to its sections (see Redirects below).

| URL | What it is | Built from |
| --- | --- | --- |
| `/lee-systems` | The page, in order: hero, two paths, what we do (the two offerings side by side), what we automate (`#automation`), websites (`#websites`), who we help (`#industries`), our projects, onboarding process (Audit, Build, Take off), FAQ (`#faq`), the choice is yours, and the form (`#contact-form`) | `app/lee-systems/page.tsx`, `components/lee-systems/` |
| `/lee-systems/law-firms` | A page for law firms, to send prospects in that industry: the industry's summary as the headline, what we automate for them, the pricing promise, Audit → Build → Run, final CTA | `app/lee-systems/law-firms/page.tsx`, `components/lee-systems/IndustryPage.tsx` |
| `/lee-systems/home-services` | The same page for home services and roofing | `app/lee-systems/home-services/page.tsx`, `components/lee-systems/IndustryPage.tsx` |

What came over from the folded pages: the automation page's seven areas
(AI call answering first, full width; it was titled "Calls" there), its
industry cards with their example lists (which replaced the main page's
shorter cards), its FAQ and its form; the websites page's "Included in every
site", its FAQ and its form; and each page's hero animation (below). Their
heroes, the automation page's "The problem", the websites page's "How
pricing works", both process sections (the onboarding process covers them)
and the "See automation" bridge did not come over. The seven areas and
"Included in every site" came off again the same day (see What was retired).

The two industry pages use only copy already on the site (the industry's
entry in `leeSystemsIndustries`, which also holds each page's title and
description). Their cards in "Who we help" link to them, their "See what we
automate" button goes to `/lee-systems#automation`, and both are in the
sitemap.

## The two animations

Each folded page's hero animation is now a self-contained component on
`/lee-systems`. Placing one is a single line, anywhere on any page, and
`className` sizes or positions it:

| Component | What it shows | Where it is now |
| --- | --- | --- |
| `AutomationFlowDemo` (`components/lee-systems/AutomationFlowDemo.tsx`) | "Example: a new lead" with a "Running" badge: a new lead through instant reply and intake into the CRM, then follow-up, a booked appointment and the daily report | Beside the heading of What we automate: `<AutomationFlowDemo />` in `components/lee-systems/LeeSystemsAutomationSection.tsx` |
| `WebsiteBuildDemo` (`components/lee-systems/WebsiteBuildDemo.tsx`) | "Your site" with a "Live" badge: a browser at yourbusiness.com and a dot walking the three stops a page needs | Beside the heading of the websites section: `<WebsiteBuildDemo className="lg:order-1" />` in `components/lee-systems/LeeSystemsWebsitesSection.tsx` (the class puts it on the left from `lg`) |

Each keeps its keyframes, timing and geometry in its own file (a `<style>`
React hoists into the page head once), needs no client-side JS, respects
`prefers-reduced-motion`, and takes nothing from `app/globals.css` beyond
the Tailwind theme's brass colours. When they were extracted, 72 screenshots
of them (phone, tablet and desktop, eleven frozen moments each, plus reduced
motion) matched the originals byte for byte.

## Two paths, and the choice

Two sections of the main page follow The Real World's landing page
(jointherealworld.com), which the owner sent as the reference on 2026-09-29.

- **Two paths** (`LeeSystemsTwoPathsSection`, `TwoPathsDemo`), straight after
  the hero: a "24/7" badge, "Two paths. Only one gets the customer.", and a
  video-style frame of three panels (calls, follow-up, intake + CRM) with a
  play button. Under it the line splits into "Fall behind" and "$0" for the
  first call, with a VS between them. The play button runs one example lead
  (a customer calling at 11:48 PM) with the systems in place; "Do it by hand"
  runs the same lead without them. Every line of the example is something the
  site already says the systems do, and the frame is labelled "Example".
- **The choice is yours** (`LeeSystemsChoiceSection`) is the page's closing
  pitch, in place of `LeeSystemsFinalCTA`, which the industry pages still
  use: a dim "Do nothing" card beside a lit "Take action" card, the same six
  jobs done by hand and by the systems, "$0 / consultation call" opposite a
  red "−$$$ / every missed lead", the pricing promise as fine print, then
  "Rather call or email?". "Do it your way" is a real button: it says "Your
  competitors are hoping you pick this one." and nudges the other card. The
  form follows it.

Both "$0" figures are the free consultation call, the only price the site
states. The red "−$$$" (added at the owner's request, 2026-09-29) is a sign
for money lost, not an amount; the site claims no figure for what a missed
lead costs. The gold buttons are `BookCallLink variant="glow"`, and like
every other "Book a free call" in the page's body they scroll to the form.

What AI call answering does is the owner's own list, word for word, in
`site.callAnswering` (`data/site.ts`); the FAQ's "What can the AI phone
assistant do?" says the same. It led the page's "What we automate" cards,
full width, until those came off (2026-09-29, below). Its demo line, once
`callAnswering.demoPhone` is set, sits under that section's heading.

Shared copy (brand details, the FAQ, industries, the pricing promise, the
form's choices) is in `data/lee-systems.ts`. Business facts (phone, email,
the booking link, the reply time) are in `data/site.ts`.

## Booking

Every "Book a free call" on the site goes through `BookCallLink`
(`components/ui/BookCallLink.tsx`) to `bookHref` in `data/site.ts`:

- `bookingUrl` set (a Google Calendar booking page, say): straight to it.
- `bookingUrl` empty (today): `/contact?interest=lee-systems`, the contact form
  with Lee Systems Co. already picked.

The exception is the body of `/lee-systems`: its hero, Two paths and The
choice is yours buttons scroll down to the page's own form (`#contact-form`)
whatever `bookingUrl` says. The header's button follows `bookHref` like
everywhere else.

`/book` forwards to the same place, for print and word of mouth. The forms'
thank-you messages and the "Rather talk now?" blocks show a "Book a free call"
button only once `bookingUrl` is set; on `/lee-systems` that button, above
the form, goes to the booking page.

The offer changed on 2026-09-28 at the owner's request: the free
**Automation Audit**, with its written plan in 5 business days, became a free
**consultation call** followed by a flat quote up front.

## Forms

| Form | Endpoint | Email subject |
| --- | --- | --- |
| The Lee Systems form on `/lee-systems` (name, business name, email, phone, what they need, industry, current website, message), when they need a website or a website plus automation | `/api/lee-systems-inquiry` | `Lee Systems Co.: New Website Request from {name}, {business}` |
| The same form, for anything else (AI call answering, automation, not sure) | `/api/lee-systems-inquiry` | `Lee Systems Co.: New Consultation Request from {name}, {business}` |
| The shared contact form, with Lee Systems Co. picked | `/api/contact` | `[Lee Systems Co.] New inquiry from {name}` |

The Lee Systems form replaced the automation consultation form
(`/api/automation-audit`) and the website quote form (`/api/website-inquiry`)
on 2026-09-29, and delivers each request exactly as the old form for that
kind of request did, so the inbox and its filters see no change. It sends
through Resend to `LEE_SYSTEMS_TO_EMAIL`, then `LMM_TO_EMAIL`, then
`CONTACT_TO_EMAIL` (website requests check `WEBSITE_TO_EMAIL` first). With
none set, it goes to ceo@leeenterprisesunlimited.com. The contact form goes
to `CONTACT_TO_EMAIL`.

The form sits in `#contact-form` and keeps the two old forms' anchor ids,
`audit` and `website-quote`, on wrappers around it, so links made for either
still land on it.

## Redirects (301, `next.config.mjs`)

| Old | New |
| --- | --- |
| `/lee-systems/automation` | `/lee-systems#automation` |
| `/lee-systems/websites` | `/lee-systems#websites` |
| `/lee-systems/automation/opengraph-image`, `/lee-systems/websites/opengraph-image` | `/lee-systems/opengraph-image` |
| `/lee-marketing-mastery` | `/lee-systems` |
| `/lee-marketing-mastery/automation` | `/lee-systems#automation` |
| `/lee-marketing-mastery/websites` | `/lee-systems#websites` |
| `/lee-marketing-mastery/marketing` (retired) | `/lee-systems` |
| any other `/lee-marketing-mastery/*` | `/lee-systems` |
| `/og/lee-marketing-mastery.png` | `/lee-systems/opengraph-image` |

## Still to fill in (all in `data/site.ts`)

| What | Key | Until then |
| --- | --- | --- |
| Booking link | `bookingUrl` | "Book a free call" goes to the contact form (on `/lee-systems`, the page's own form) |
| Finished projects (name, one line, link or walkthrough) | `projects` | "Our projects" shows two "Project walkthrough coming soon" frames |
| Call-answering demo number | `callAnswering.demoPhone` | No demo line under the heading of What we automate |

Set `showPlaceholders` to `false` to hide every "coming soon" frame at once;
empty slots then disappear instead.

## Settled choices

- One page for Lee Systems Co. (2026-09-29), plus the two industry pages.
- No logo: the name is set as a wordmark (the owner's call, 2026-09-28). The
  "LS" stand-in square is gone from the pages and the link previews.
- No location or service area anywhere, including the business info search
  engines read (an Organization, with no address). The owner's call,
  2026-09-28.
- Pricing promise: flat upfront quote, no hidden fees, no revenue share, no
  required ad spend, you choose the contract terms.
- Website pricing: quoted per project (no price shown), and no typical build
  time until real builds back one up.
- Accent color: brass `#D4A857` (`--color-brass-*` in `app/globals.css`).
- The venture's internal id stays `lmm` so existing Stripe invoice tags still
  match.

## What was retired

- The Traditional & Digital Marketing page, its form and `/api/marketing-inquiry`.
- The Lee Marketing Mastery hub components, logo PNG and social-sharing image.
- The "Results" placeholder boxes, the four portfolio placeholder cards and the
  "Typical build time" box (2026-09-28).
- `MARKETING_TO_EMAIL` in `.env.example` (nothing reads it now; it can be
  removed from Vercel too).
- The `/lee-systems/automation` and `/lee-systems/websites` pages
  (2026-09-29), with their share images, `components/automation/`,
  `components/websites/`, the pill linking each to the other
  (`LeeSystemsSiblingLinks`), the parked "What gets automated" grid
  (`LeeSystemsAutomatesSection`) and the two form routes,
  `/api/automation-audit` and `/api/website-inquiry`.
- The seven "What we automate" cards (AI call answering, leads, sales
  follow-up, client communication, reviews and referrals, billing, internal
  operations) and the six "Included in every site" cards with the add-ons
  note under them (2026-09-29, at the owner's request). Both sections keep
  their headings and their animations. The automation heading is now the old
  automation page's headline, "Every lead answered. Every follow-up sent.
  Nothing missed.", and the websites label reads "Website builds". The
  offerings in "What we do" and the FAQ still cover what the cards said, and
  the "See everything we automate" links became "See what we automate".
