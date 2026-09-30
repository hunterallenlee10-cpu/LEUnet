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
| `/lee-systems` | The page, in order: hero, two paths, the website video, what we do (the two offerings side by side), the two animations side by side under it (automation `#automation` on the left, the website build `#websites` on the right), opening off What we do's spine as they scroll in (the seam, below), who we help (`#industries`), our projects, onboarding process (Audit, Build, Take off), FAQ (`#faq`), the choice is yours, and the form (`#contact-form`) | `app/lee-systems/page.tsx`, `components/lee-systems/` |

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
`className` sizes or positions it. Since 2026-09-30 the two sit side by side
straight under What we do, each under the half it shows, with no text of
their own (`LeeSystemsExamplesSection`); swapping them or moving one out is
moving its column there:

| Component | What it shows | Where it is now |
| --- | --- | --- |
| `AutomationFlowDemo` (`components/lee-systems/AutomationFlowDemo.tsx`) | "Example: a new lead" in a "New lead workflow" window with an "Active" switch: one lead (Alex, from the website demo's form) runs top to bottom through a new lead, instant reply and intake form, your CRM, then follow-up, a booked appointment and the daily report. Each step spins, ticks and says what it did, the wires fill with gold as the lead passes, and the badge goes from "Running" to "Completed" before the run clears and starts again (made more realistic at the owner's ask, 2026-09-30, top to bottom at his choice) | Under What we do, on the left (first on a phone): `<AutomationFlowDemo />` in `components/lee-systems/LeeSystemsExamplesSection.tsx`, in the column with the `#automation` id |
| `WebsiteBuildDemo` (`components/lee-systems/WebsiteBuildDemo.tsx`) | "Your site" with a "Live" badge and a desktop/phone toggle: a browser at yourbusiness.com whose generic page ("Your Business", "What you do, and where you do it.") builds itself from grey skeleton bars, then a dot walking the three stops a page needs while each acts on the page (the headline underlined, the proof cards lifting, the form filling in), a cursor clicking "Send request" as the dot lands, a "New enquiry" alert, and the window narrowing to the same page on a phone and back (made more realistic at the owner's ask, 2026-09-30) | Under What we do, on the right (second on a phone): `<WebsiteBuildDemo />` in `components/lee-systems/LeeSystemsExamplesSection.tsx`, in the column with the `#websites` id |

Each keeps its keyframes, timing and geometry in its own file (a `<style>`
React hoists into the page head once), respects `prefers-reduced-motion`
(each rests on its finished state: the built page, the completed run), and
takes nothing from `app/globals.css` beyond the Tailwind theme's brass
colours. Both start from their first frame when they scroll into view and
pause while off screen, through the shared `usePlayWhenVisible` hook
(`components/lee-systems/usePlayWhenVisible.ts`); on `/lee-systems`, where
they sit in the seam (below), each also waits until the section they share
has opened.
Without scripting they just play. `AutomationFlowDemo` also measures its wires from where its cards
are laid out, so they land on the cards' ports at any width. When they were extracted, 72 screenshots of them (phone, tablet and
desktop, eleven frozen moments each, plus reduced motion) matched the
originals byte for byte.

## The seam: from What we do into the examples

Under "What we do" the brass spine between the two halves carries on down
the page, and the two animations, side by side, arrive closed on it: only
the lit line down the middle. As they scroll up the screen, the line splits
into two brass edges that glide out to the sides and the pair opens between
them from the gap in the middle, with a warm light spilling out of the gap
that fades as it finishes (the owner's ask, 2026-09-30, for a smooth, unique
way into the two animated examples). It is fully open before the
animations' tops reach the middle of the screen, and it runs backwards when
scrolling up. It
takes its shape from the page's own spread, two halves mirrored about a
spine, and from the split, lit layouts of the owner's references (The Real
World's "Two paths" and "Their way vs our way"). It replaced a button under
each half ("Explore automation", "See website builds") and the two dashed
routes that curved from them into a node.

- **Where**: `ExamplesSeam` (`components/lee-systems/ExamplesSeam.tsx`) in
  `app/lee-systems/page.tsx`, wrapped around `<LeeSystemsExamplesSection />`,
  which holds both animations. Any section put between its tags opens the
  same way, and taking one out is deleting its line. (Until the text came off
  on 2026-09-30 it wrapped What we automate and Website builds, one after the
  other, each opening on its own.) The run of spine
  from What we do down to the first section is the `ls-seam-lead` line at the
  foot of `LeeSystemsOfferingsSection`.
- **It never reaches inside a section.** It wraps each one and draws a clip,
  an opacity and the two edges over it, so the sections and their animations
  can change without touching it, and nothing about layout changes: each
  section keeps its size and its ids, so `#automation`, `#websites` and the
  old URLs that redirect to them land on their animations. Side by side the
  two land at the same spot; each column carries `scroll-mt-8` so the
  animation sits a little below the header rather than touching it.
- **How it's drawn**: the script writes one number per section, `--open`
  (0 closed, 1 open), from where the section's top is on screen, once per
  frame and only while the seam is near the viewport. The CSS is the "the
  seam" block in `app/globals.css`.
- **The demos wait for it.** Each section's animation holds its first frame
  while the edges part and starts its run once the section is 90% open, so
  the doors open onto it and the run begins as they finish. The seam marks a
  section that far open with `data-seam-open="true"` on its wrapper, and the
  demos' shared `usePlayWhenVisible` hook waits for it; a demo placed outside
  the seam never sees the attribute and plays as soon as it is on screen.
- **Reduced motion, or no scripting**: every section simply sits open, the
  edges and the light aren't drawn, and the spine's run hides but keeps its
  space.

## Who we help

"Who we help" (`LeeSystemsIndustriesSection`, `#industries`) is a grid of
picture cards after The Real World's campus cards, which the owner sent as
the reference on 2026-09-29. Each card is a picture with the industry's name
set over it (Geist bold in brass, the site's headline style; it was a
Cormorant Garamond italic until 2026-09-30), the industry's one-line
summary, and a small uppercase "See examples" that opens the industry's list
on the card. Only one card's list is open at a time, and opening one leaves
the others their size.

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
  out of view, and when the website video under it starts (and the other
  way round), so two voices never overlap. The progress bar has two chapters, grey by hand and gold
  with AI, and the "Example" tag names the run that's playing. The fork
  under the frame lights the path the video is on.
- **Screen readers** hear the voice while the sound is on. With the sound
  off, each caption is read from a polite live region instead, so no line
  is heard twice.

### The website video

Straight under Two paths, a second narrated video in the same frame, style
and voice (the owner's ask, 2026-09-29): the same visit to an outdated
site, then to a site built right (`LeeSystemsWebsiteVideoSection`,
`WebsiteVideo`, lines in `data/website-video.ts`). The owner's brief was to
promote no particular AI features, just that the site is built properly,
catches attention, looks beautiful and brings in business. So its claims
are the ones the site already makes of a build: fast on a phone, clear
about why to choose you, a form that's easy to find, built to turn
visitors into customers. The outdated site is a general example, not a
real one.

- **Order**: "Someone finds your business online. Do they stay?", the
  outdated site ("First, an outdated site." through "So they book with the
  next business on the list."), the site built right ("Now the same visit,
  on a site built right." through "A visitor, turned into a customer.") and
  "Beautiful gets them to stay. Built right gets them to book.", which is
  also the section's heading, as "Two paths. Only one gets the customer."
  is for the video above it.
- **Panels**: Speed, Design and Leads, tinted blue, brass and green. The
  outdated run drains them to Still loading, Looks dated and Tab closed;
  the built-right run lights them Loaded fast, Looks the part and Request
  sent. The "Example" tag reads "Outdated site", then "Built right".
- **Sound**: the same Pham voice and settings, one clip per line, with a
  tap, a page that keeps loading, the clock ticking while they wait and a
  low note as they leave, then the whoosh, a snap as the page opens, a
  shimmer on the look, a message sent and the warm chord. About 39
  seconds, `public/lee-systems/website-video/website-video.mp3`.
- **Under it**: no fork, since Two paths just made the choice. A lit brass
  line runs down to "Book a free call" (it scrolls to the form, like every
  button in the page's body), with "Quoted per project · You own your
  domain and content" under it, both from the FAQ.

### The player, and rebuilding the audio

Both videos play in one player, `components/lee-systems/NarratedVideo.tsx`
(`useNarratedVideo`, which returns the frame, the run it's on and a way to
play one run from outside it), with the shape of a line in
`data/narrated-video.ts`. Each video is two runs of one example: "before"
(the worse way) and "after" (Lee Systems Co.'s), with a line either side.

To change a line or the voice: edit the video's lines, generate an Everygen
voiceover of each line on its own (the `spoken` text where a line has
one), save each as `<line id>.wav` in one folder (lines that repeat, like
"11:48 PM" and "They tap your site from their phone.", can share one clip),
then run

```bash
node scripts/build-video-audio.mjs two-paths path/to/folder
node scripts/build-video-audio.mjs website path/to/folder
```

with ffmpeg on the PATH (or `FFMPEG=/path/to/ffmpeg`). It rewrites that
video's soundtrack and timing file; each video's sound effects are in the
script's `videos` table. One clip per line rather than one read of all of
them: Pham reads briskly and runs one line into the next with no pause to
cut at.

What AI call answering does is the owner's own list, word for word, in
`site.callAnswering` (`data/site.ts`); the FAQ's "What can the AI phone
assistant do?" says the same. It led the page's "What we automate" cards,
full width, until those came off (2026-09-29, below). Its demo line, once
`callAnswering.demoPhone` is set, sits under the automation animation.

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
| Call-answering demo number | `callAnswering.demoPhone` | No demo line under the automation animation |

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
- The "Explore automation" and "See website builds" buttons under the two
  halves of "What we do", and the two dashed routes that curved from them
  into a node under the spine (2026-09-30, at the owner's request). The
  spine now runs straight on into the two sections and opens them (see The
  seam). The dotted-line style only that join used (`.ls-dash`) went with
  it.
- The text of What we automate ("Every lead answered. Every follow-up sent.
  Nothing missed.") and of Website builds ("The basics, done properly, every
  time"), with their labels and lines, and the two sections themselves,
  `LeeSystemsAutomationSection` and `LeeSystemsWebsitesSection` (2026-09-30,
  at the owner's request). Their animations stayed and now sit side by side
  under What we do (`LeeSystemsExamplesSection`), keeping the `#automation`
  and `#websites` ids.
