# Lee Systems Co.

Lee Systems Co. ("A Lee Enterprises Unlimited company") replaced Lee Marketing
Mastery on 2026-09-25. It sells two things: **business automation** (the lead
offer) and **website builds** (fully built before the client pays).

## Pages

| URL | What it is | Built from |
| --- | --- | --- |
| `/lee-systems` | Main page: hero, offerings (large Automation card, smaller Websites card), 6 things we automate, industries, proof, Audit → Build → Run, About, final CTA | `app/lee-systems/page.tsx`, `components/lee-systems/` |
| `/lee-systems/automation` | Hero, problem, 6 automation areas, industries (law firms, home services), how the audit works, FAQ, audit form | `app/lee-systems/automation/page.tsx`, `components/automation/` |
| `/lee-systems/websites` | Hero, "built before you pay" guarantee, what every site includes, portfolio, process, FAQ, bridge to automation, quote form | `app/lee-systems/websites/page.tsx`, `components/websites/` |

Shared copy (brand details, audit terms, FAQs, industries, form dropdowns) is
in `data/lee-systems.ts`. Change it there and every page that uses it follows.

## Forms

| Form | Endpoint | Email subject |
| --- | --- | --- |
| Automation Audit (name, business, industry, team size, biggest time-waster, email, phone) | `/api/automation-audit` | `Lee Systems Co. — New Automation Audit Request — {business} — {name}` |
| Website quote | `/api/website-inquiry` | `Lee Systems Co. — New Website Request — {business} — {name}` |

Both send through Resend to `LEE_SYSTEMS_TO_EMAIL`, then `LMM_TO_EMAIL`, then
`CONTACT_TO_EMAIL` (website requests check `WEBSITE_TO_EMAIL` first). With none
set, they go to ceo@leeenterprisesunlimited.com, as before.

## Redirects (301, `next.config.mjs`)

| Old | New |
| --- | --- |
| `/lee-marketing-mastery` | `/lee-systems` |
| `/lee-marketing-mastery/automation` | `/lee-systems/automation` |
| `/lee-marketing-mastery/websites` | `/lee-systems/websites` |
| `/lee-marketing-mastery/marketing` (retired) | `/lee-systems` |
| any other `/lee-marketing-mastery/*` | `/lee-systems` |
| `/og/lee-marketing-mastery.png` | `/lee-systems/opengraph-image` |

## Placeholders to fill in

Each one shows on the page as a dashed box marked **PLACEHOLDER**, or is
noted in code as `PLACEHOLDER`. Search the repo for `PlaceholderBox` to find
the boxes.

| # | What | Where | What to supply |
| --- | --- | --- | --- |
| 1 | **Logo** | `components/lee-systems/LeeSystemsMark.tsx`, `lib/lee-systems-og.tsx`, `data/ventures.ts` (`logo`) | A logo file. Until then, an "LS" monogram in type stands in on every page and in the social-sharing images. |
| 2 | **Proof: case study** | Main page, "What it looks like in practice" (`components/lee-systems/LeeSystemsProofSection.tsx`) | One real client system: problem, what was built, a result you can verify. |
| 3 | **Proof: screenshot or workflow** | Same section | A screenshot of a live automation or report, or a client quote used with permission. |
| 4–7 | **Portfolio sites 1–4** | Websites page, "Sites we have built" (`components/websites/WebsitesWorkSection.tsx`) | Screenshot, business name, one line on what it does, link to the live site. |
| 8 | **Typical build time** | Websites page, under the process (`components/websites/WebsitesProcessSection.tsx`) | A typical range, e.g. "2–4 weeks", once a few builds are done. |
| 9 | **Phone number** | `data/lee-systems.ts` → `leeSystems.phone` | Leave `null` to keep it hidden; set it to show in the business listing for search engines. |

### Choices made with defaults (change in `data/lee-systems.ts` if wrong)

- Headline: "Systems that run your business while you run the work."
- Contact email: ceo@leeenterprisesunlimited.com
- Service area: Frederick, Maryland, and remote nationwide
- Automation Audit: **free**, written plan within **5 business days**, reply within **12 hours**
- Website pricing: quoted per project (no price shown)
- Accent color: brass `#D4A857` (`--color-brass-*` in `app/globals.css`)

### Carried over from Lee Marketing Mastery (check these)

- The homepage teaser headline on leeenterprisesunlimited.com still reads
  "50+ businesses built. 1,000+ worked with. $150,000+ generated for our
  clients." These are the owner's figures from 2026-09-13, shared with
  Business Mastery (`bmProofStatement`). Confirm they apply to Lee Systems Co.
  or change `leeSystemsHomeTeaser.manifesto` in `data/lee-systems.ts`.
- The venture's internal id stays `lmm` so existing Stripe invoice tags still
  match. Only visible names changed.

## What was retired

- The Traditional & Digital Marketing page, its form and `/api/marketing-inquiry`.
- The Lee Marketing Mastery hub components, logo PNG and social-sharing image.
- `MARKETING_TO_EMAIL` in `.env.example` (nothing reads it now; it can be
  removed from Vercel too).
