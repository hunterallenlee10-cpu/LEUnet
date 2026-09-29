# Lee Systems Co.

Lee Systems Co. ("A Lee Enterprises Unlimited company") replaced Lee Marketing
Mastery on 2026-09-25. It sells **AI automation** (the lead offer, AI call
answering included) and **website builds**. Websites were sold with a pay-after-the-build guarantee until
2026-09-28, when the owner stopped offering it; the site no longer makes that
claim anywhere. The first step is always a free consultation call, booked with **"Book a
free call"**.

## Pages

| URL | What it is | Built from |
| --- | --- | --- |
| `/lee-systems` | Main page: hero, offerings (large Automation card, smaller Websites card), what gets automated, industries, recent work, Audit → Build → Run, final CTA (the About section came out on 2026-09-29) | `app/lee-systems/page.tsx`, `components/lee-systems/` |
| `/lee-systems/automation` | Hero, problem, the automation areas, industries (law firms, home services), how it works, FAQ, the consultation form | `app/lee-systems/automation/page.tsx`, `components/automation/` |
| `/lee-systems/websites` | Hero, how pricing works (flat quote, no hidden fees, you own the site), what every site includes, recent work, process, FAQ, bridge to automation, quote form | `app/lee-systems/websites/page.tsx`, `components/websites/` |
| `/lee-systems/law-firms` | A page for law firms, to send prospects in that industry: the industry's summary as the headline, what we automate for them, the pricing promise, Audit → Build → Run, final CTA | `app/lee-systems/law-firms/page.tsx`, `components/lee-systems/IndustryPage.tsx` |
| `/lee-systems/home-services` | The same page for home services and roofing | `app/lee-systems/home-services/page.tsx`, `components/lee-systems/IndustryPage.tsx` |

The two industry pages use only copy already on the site (the industry's
entry in `leeSystemsIndustries`, which also holds each page's title and
description). The industry cards on `/lee-systems` and
`/lee-systems/automation` link to them, and both are in the sitemap.

AI call answering leads both the main page's "what gets automated" grid and
the automation page's areas, drawn full width. Its capabilities list is the
owner's own, word for word, in `site.callAnswering` (`data/site.ts`).

Shared copy (brand details, FAQs, industries, the pricing promise, form
dropdowns) is in `data/lee-systems.ts`. Business facts (phone, email, the
booking link, the reply time) are in `data/site.ts`.

## Booking

Every "Book a free call" on the site goes through `BookCallLink`
(`components/ui/BookCallLink.tsx`) to `bookHref` in `data/site.ts`:

- `bookingUrl` set (a Google Calendar booking page, say): straight to it.
- `bookingUrl` empty (today): `/contact?interest=lee-systems`, the contact form
  with Lee Systems Co. already picked.

`/book` forwards to the same place, for print and word of mouth. The forms'
thank-you messages and the "Rather talk now?" blocks show a "Book a free call"
button only once `bookingUrl` is set.

The offer changed on 2026-09-28 at the owner's request: the free
**Automation Audit**, with its written plan in 5 business days, became a free
**consultation call** followed by a flat quote up front. The automation form
keeps the anchor id `audit` so old links still land on it.

## Forms

| Form | Endpoint | Email subject |
| --- | --- | --- |
| Automation consultation (name, business, industry, team size, biggest time-waster, email, phone) | `/api/automation-audit` | `Lee Systems Co.: New Consultation Request from {name}, {business}` |
| Website quote | `/api/website-inquiry` | `Lee Systems Co.: New Website Request from {name}, {business}` |
| The shared contact form, with Lee Systems Co. picked | `/api/contact` | `[Lee Systems Co.] New inquiry from {name}` |

The first two send through Resend to `LEE_SYSTEMS_TO_EMAIL`, then
`LMM_TO_EMAIL`, then `CONTACT_TO_EMAIL` (website requests check
`WEBSITE_TO_EMAIL` first). With none set, they go to
ceo@leeenterprisesunlimited.com. The contact form goes to `CONTACT_TO_EMAIL`.

## Redirects (301, `next.config.mjs`)

| Old | New |
| --- | --- |
| `/lee-marketing-mastery` | `/lee-systems` |
| `/lee-marketing-mastery/automation` | `/lee-systems/automation` |
| `/lee-marketing-mastery/websites` | `/lee-systems/websites` |
| `/lee-marketing-mastery/marketing` (retired) | `/lee-systems` |
| any other `/lee-marketing-mastery/*` | `/lee-systems` |
| `/og/lee-marketing-mastery.png` | `/lee-systems/opengraph-image` |

## Still to fill in (all in `data/site.ts`)

| What | Key | Until then |
| --- | --- | --- |
| Booking link | `bookingUrl` | "Book a free call" goes to the contact form |
| Finished projects (name, one line, link or walkthrough) | `projects` | "Our projects" shows two "Project walkthrough coming soon" frames |
| Call-answering demo number | `callAnswering.demoPhone` | No demo line |

Set `showPlaceholders` to `false` to hide every "coming soon" frame at once;
empty slots then disappear instead.

## Settled choices

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
