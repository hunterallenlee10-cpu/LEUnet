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
301 to its sections; the law firm and home services pages came off the same
day and 301 to their cards in "Who we help" (see Redirects below).

| URL | What it is | Built from |
| --- | --- | --- |
| `/lee-systems` | The page, in order: hero, two paths, what we do (the two offerings side by side), what we automate (`#automation`), websites (`#websites`), who we help (`#industries`), our projects, onboarding process (Audit, Build, Take off), FAQ (`#faq`), the choice is yours, and the form (`#contact-form`) | `app/lee-systems/page.tsx`, `components/lee-systems/` |

What came over from the folded pages: the automation page's seven areas
(AI call answering first, full width; it was titled "Calls" there), its
industry cards with their example lists (which replaced the main page's
shorter cards), its FAQ and its form; the websites page's "Included in every
site", its FAQ and its form; and each page's hero animation (below). Their
heroes, the automation page's "The problem", the websites page's "How
pricing works", both process sections (the onboarding process covers them)
and the "See automation" bridge did not come over. The seven areas and
"Included in every site" came off again the same day (see What was retired),
and the industry cards became picture cards (see Who we help).

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

## Who we help

"Who we help" (`LeeSystemsIndustriesSection`, `#industries`) is a grid of
picture cards after The Real World's campus cards, which the owner sent as
the reference on 2026-09-29. Each card is a picture with the industry's name
set over it (Cormorant Garamond italic in brass, where The Real World letters
its campus names by hand), the industry's one-line summary, and a small
uppercase "See examples" that opens the industry's list on the card. Only one
card's list is open at a time, and opening one leaves the others their size.

The six pictures go in `public/lee-systems/industries/`, one per industry id
(`law-firms.webp`, `home-services.webp`, `real-estate.webp`, `fitness.webp`,
`dealerships.webp`, `restaurants.webp`), each 800 x 450 WebP, and a card
shows its picture once its id is in `pictured` at the top of the component.
They were generated with Everygen (Nano Banana 2) on 2026-09-29, at the
owner's choice over code-drawn art or waiting for photos, all to one brief:
a low-key, black-and-gold editorial photograph of an empty room or building
(a law office, a roofline, a house at dusk, a gym, a car showroom, a
restaurant), with no people, text, signage or logos, so nothing in them
stands for a client or a result. They are decorative (empty alt text), since
each name is set over its picture as text.

They are not in yet: this workspace's network policy blocks the host Everygen
keeps them on (see "Who we help" pictures in `docs/TODO.md`). Until they are,
each card's cover is a brass glow drawn in CSS, the same glow every picture
loads over. To use a photo instead, save it under the industry's file name at
800 x 450 and add the id to `pictured`.

## Two paths, and the choice

Two sections of the main page follow The Real World's landing page
(jointherealworld.com), which the owner sent as the reference on 2026-09-29.

- **Two paths** (`LeeSystemsTwoPathsSection`, `TwoPathsDemo`), straight after
  the hero: a "24/7" badge, "Two paths. Only one gets the customer.", and a
  video-style frame of three panels (calls, follow-up, intake + CRM) with a
  play button. Under it the line splits into two paths with a VS between
  them, each labelled with what it does to your customers and titled with
  what it does to your money: "Lose customers / Lose money" (the owner's
  wording, 2026-09-29), in the red of money lost, against "Win customers /
  $0 to start" in gold. Each path's line is the same two jobs, answering
  and following up, done by hand ("Answer when you can. Follow up when you
  remember. Miss a call, and someone else gets paid for the job.") and by AI
  ("AI answers every call, day or night, and follows up until they reply.
  They book with you, not whoever answers next."). Under the gold button,
  "No obligation · Flat upfront quote", from the FAQ and the pricing
  promise. The frame is one narrated video (see "The Two paths video"
  below): one example lead (a customer calling at 11:48 PM) handled by hand,
  then with AI. The play button starts it, and "Do it by hand" starts it at
  the by-hand run. Every line of the example is something the site already
  says the systems do, and the frame is labelled "Example".
- **The choice is yours** (`LeeSystemsChoiceSection`) is the page's closing
  pitch: a dim "Do nothing" card beside a lit "Take action" card, the same six
  jobs done by hand and by the systems, a red "−$1,000s lost to missed leads"
  opposite a gold "+$10,000s you could win from the same leads", the pricing
  promise as fine print, then
  "Rather call or email?". "Do it your way" is a real button: it says "Your
  competitors are hoping you pick this one." and nudges the other card. The
  form follows it.

The "$0" in Two paths is the free consultation call, the only price the site
states; "to start" sits beside it so it can't be read as the price of the
AI. The two figures on the choice cards are the owner's (2026-09-29):
doing nothing costs thousands, taking action can make tens of thousands.
They replaced a "−$$$" sign and "$0 / consultation call". They are ranges,
not results: the gain says "could", and neither names a client or a job. The
gold buttons are `BookCallLink variant="glow"`, and like every other "Book a
free call" in the page's body they scroll to the form.

### The Two paths video

The owner asked on 2026-09-29 for the frame's two runs (with AI from the
play button, by hand from "Do it by hand") to become one video with sound,
its captions read aloud. It plays in this order: "What happens to your next
lead?", the by-hand run ("First, by hand." through "They'd already booked
with someone who answered."), the AI run ("Now the same call, with AI."
through "Booked before you woke up.") and "Two paths. Only one gets the
customer." The lines are the old captions, plus the two run titles and the
closing line; "And" was added to the start of the CRM line so it reads
naturally aloud.

- **The lines** are in `data/two-paths-video.ts`: each line's caption, what
  the voice says where it differs ("11:48 PM" is read "Eleven forty-eight
  PM"), what the three panels show and how long a pause follows it. The
  voice and the captions both come from there, so they can't disagree.
- **The soundtrack** is one file, `public/lee-systems/two-paths/two-paths.mp3`
  (about 40 seconds): Everygen voiceovers of the lines in the Pham voice
  (the owner's pick, at its default settings: speed 0.9, stability 60,
  similarity 80, style 80, speaker boost on), one clip per line, spaced out,
  with quiet sound effects drawn in code 10 to 14 dB under them (the phone ringing, a voicemail
  beep, the callback ringing out, a clock ticking through the by-hand run,
  a whoosh into the AI run, the pickup, a text arriving, a saved chime and
  a warm chord on "Booked"). It loads only when someone reaches for the
  video.
- **The timing** (`data/two-paths-video.timing.json`) says when each
  caption appears. The video's clock is the soundtrack itself, so the
  captions can't drift from the voice. If the audio can't play, or the
  lines were changed without rebuilding it, the video plays silently on
  estimated times instead.
- **Controls**: nothing plays until the play button is pressed. Clicking the
  picture pauses and resumes it, and the corner buttons pause, turn the
  sound off and turn the captions off. It pauses by itself once scrolled
  out of view. The progress bar has two chapters, grey by hand and gold
  with AI, and the "Example" tag names the run that's playing. The fork
  under the frame lights the path the video is on.
- **Screen readers** hear the voice while the sound is on. With the sound
  off, each caption is read from a polite live region instead, so no line
  is heard twice.

To change a line or the voice: edit `data/two-paths-video.ts`, generate an
Everygen voiceover of each line on its own (the `spoken` text where a line
has one), save each as `<line id>.wav` in one folder (the two "11:48 PM"
lines can share one clip), then run

```bash
node scripts/build-two-paths-audio.mjs path/to/folder
```

with ffmpeg on the PATH (or `FFMPEG=/path/to/ffmpeg`). It rewrites the
soundtrack and the timing file. One clip per line rather than one read of
all of them: Pham reads briskly and runs one line into the next with no
pause to cut at.

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
| `/lee-systems/law-firms` | `/lee-systems#law-firms` |
| `/lee-systems/home-services` | `/lee-systems#home-services` |
| `/lee-systems/law-firms/opengraph-image`, `/lee-systems/home-services/opengraph-image` | `/lee-systems/opengraph-image` |
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

- One page for Lee Systems Co. (2026-09-29), with no industry pages.
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
- The `/lee-systems/law-firms` and `/lee-systems/home-services` pages
  (2026-09-29, at the owner's request), with their share images, the
  "See the page" links on their cards, `IndustryPage`, and the two sections
  only they used: the "No surprises on price." band
  (`PricingPromiseSection`) and `LeeSystemsFinalCTA`. The pricing promise
  itself stays, as the fine print in "The choice is yours".
- The seven "What we automate" cards (AI call answering, leads, sales
  follow-up, client communication, reviews and referrals, billing, internal
  operations) and the six "Included in every site" cards with the add-ons
  note under them (2026-09-29, at the owner's request). Both sections keep
  their headings and their animations. The automation heading is now the old
  automation page's headline, "Every lead answered. Every follow-up sent.
  Nothing missed.", and the websites label reads "Website builds". The
  offerings in "What we do" and the FAQ still cover what the cards said, and
  the "See everything we automate" links became "See what we automate".
