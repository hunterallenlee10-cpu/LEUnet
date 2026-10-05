# Recent Builds: how to send a build

"Recent Builds" is the grid of boxes on the homepage and /lee-systems
(`components/shared/RecentWorkSection.tsx`). Each box is one website we built:
a screenshot of its first screen in a browser frame, the kind of business, the
name, one line on the build, tags for what we built, and the whole box links to
the live site. The entries live in `projects` in `data/site.ts`, newest first.

Only work the client has OK'd showing goes in, and nothing in a box is made
up: if a detail isn't sent, it's left out.

## What to send for a website

Copy this, fill it in, one per site:

```
Name: Smith Plumbing
Link: https://smithplumbing.com
Kind of business and town: Plumber, Frederick MD
What we built:
- Website
- AI call assistant
- Booking and follow-up texts
Result (one line, only numbers you can back up, or leave blank):
Client OK'd showing it: yes
```

Screenshots are optional. Claude takes one of the live site's first screen. To
pick the view yourself, send a full-size PNG of the desktop page (and a phone
one if you like), not a photo of a screen.

## What to send for an automation (format still being decided)

Automations don't show in Recent Builds yet. Until the format is settled
(see the to-do list), collect:

```
Name: Missed-call text-back for Smith Plumbing
What starts it: a call nobody picks up
What it does, step by step:
1. Texts the caller within a minute
2. Asks what they need and books a time
3. Adds them to the CRM
Result (only numbers you can back up, or leave blank):
Tools used: e.g. GoHighLevel, Twilio
Client OK'd showing it: yes
```

Plus a 30–90 second screen recording of it running (MP4, 1080p; Loom, OBS or a
phone screen recording all work), with client names, phone numbers and
amounts blurred or fake. Screenshots as full-size PNGs.

## How to send it

- **Best: a Google Drive folder.** Make one folder, "LEU Recent Builds", with
  a subfolder per build holding an `info.txt` (the filled-in form above) and
  its screenshots and videos. Share it with the Google account connected to
  Claude and say "add the new builds": Claude reads the folder through the
  Drive connector.
- **Quick: paste it into a session.** The filled-in form as text, with any
  screenshots dragged into the message. Videos are better through Drive.

## How Claude adds one

1. Add the entry to `projects` in `data/site.ts`.
2. Screenshot the site's first screen at 1440×900 with Playwright, or use the
   one you sent, and save it as a 960×600 webp (quality about 80) at
   `public/projects/<name>.webp`. next.config.mjs serves images unoptimised,
   so each one is sized for its box.
3. One "coming soon" box disappears per real build while `showPlaceholders`
   is on.
