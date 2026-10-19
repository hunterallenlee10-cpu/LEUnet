/**
 * The "Two paths" video on /how-it-works: one example lead, played by hand and
 * then with AI, as one narrated video. Every line below is both read aloud
 * and shown as the caption, so the voice and the captions always say the
 * same thing. The owner asked for the two runs to become one video with
 * sound and read-aloud captions on 2026-09-29.
 *
 * The narration and its sound effects are one file,
 * public/lee-systems/two-paths/two-paths.mp3, built from these lines by
 * scripts/build-video-audio.mjs, which also writes where each line starts
 * (data/two-paths-video.timing.json). Change a line here and the audio has to
 * be rebuilt, or the voice will say the old line: docs/LEE-SYSTEMS.md has the
 * steps.
 *
 * Every step is something the owner has confirmed the systems do
 * (`site.callAnswering`, and the automation offering and FAQ on
 * /how-it-works); the time and the day only make it an example, which is why
 * the frame is labelled "Example". No result or client is implied.
 *
 * The "before" run is by hand and the "after" run is with AI; the shape of
 * a line is in data/narrated-video.ts.
 */

import type { VideoLine } from "./narrated-video";

const idle: VideoLine["status"] = ["idle", "idle", "idle"];

export const twoPathsLines: VideoLine[] = [
  {
    id: "prompt",
    chapter: "intro",
    kind: "prompt",
    caption: "What happens to your next lead?",
    status: idle,
    hold: 0.5,
  },
  {
    id: "manual-title",
    chapter: "before",
    kind: "title",
    caption: "First, by hand.",
    status: idle,
    hold: 0.35,
  },
  {
    id: "manual-call",
    chapter: "before",
    kind: "step",
    caption: "11:48 PM. A new customer calls.",
    spoken: "Eleven forty-eight PM. A new customer calls.",
    status: ["ringing", "idle", "idle"],
    focus: 0,
    hold: 1.3,
  },
  {
    id: "manual-voicemail",
    chapter: "before",
    kind: "step",
    caption: "Nobody picks up. It goes to voicemail.",
    status: ["bad", "idle", "idle"],
    focus: 0,
    hold: 1,
  },
  {
    id: "manual-callback",
    chapter: "before",
    kind: "step",
    caption: "You call back the next morning. No answer.",
    status: ["bad", "bad", "idle"],
    focus: 1,
    hold: 0.7,
  },
  {
    id: "manual-crm",
    chapter: "before",
    kind: "step",
    caption: "And the lead never makes it into your CRM.",
    status: ["bad", "bad", "bad"],
    focus: 2,
    hold: 0.8,
  },
  {
    id: "manual-ending",
    chapter: "before",
    kind: "ending",
    caption: "They'd already booked with someone who answered.",
    status: ["bad", "bad", "bad"],
    hold: 1.4,
  },
  {
    id: "ai-title",
    chapter: "after",
    kind: "title",
    caption: "Now the same call, with AI.",
    status: idle,
    hold: 0.35,
  },
  {
    id: "ai-call",
    chapter: "after",
    kind: "step",
    caption: "11:48 PM. A new customer calls.",
    spoken: "Eleven forty-eight PM. A new customer calls.",
    status: ["ringing", "idle", "idle"],
    focus: 0,
    hold: 0.9,
  },
  {
    id: "ai-answer",
    chapter: "after",
    kind: "step",
    caption: "AI picks up, answers their questions and books them for Tuesday.",
    status: ["good", "idle", "idle"],
    focus: 0,
    hold: 0.6,
  },
  {
    id: "ai-text",
    chapter: "after",
    kind: "step",
    caption: "A text confirms the booking, and a reminder is set for the day before.",
    status: ["good", "good", "idle"],
    focus: 1,
    hold: 0.6,
  },
  {
    id: "ai-crm",
    chapter: "after",
    kind: "step",
    caption: "The lead lands in your CRM, and you get a text with the details.",
    status: ["good", "good", "good"],
    focus: 2,
    hold: 0.8,
  },
  {
    id: "ai-ending",
    chapter: "after",
    kind: "ending",
    caption: "Booked before you woke up.",
    status: ["good", "good", "good"],
    hold: 1.3,
  },
  {
    id: "outro",
    chapter: "outro",
    kind: "prompt",
    caption: "Two paths. Only one gets the customer.",
    status: ["good", "good", "good"],
    hold: 0.9,
  },
];
