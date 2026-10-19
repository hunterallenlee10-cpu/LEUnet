/**
 * The website video on /how-it-works, straight under "Two paths": the same
 * visit to an outdated site and then to a site built right, as one narrated
 * video in the same frame and style (the owner's ask, 2026-09-29). Every line
 * is read aloud and shown as its caption.
 *
 * The owner's brief: no particular AI features, just that the site is built
 * properly, catches attention, looks beautiful and brings in business. So
 * the claims are the ones the site already makes of a build: fast on a phone,
 * clear about why to choose you, a form that's easy to find, built to turn
 * visitors into customers. The outdated site is a general example, not a
 * real one.
 *
 * The narration and its sound effects are one file,
 * public/lee-systems/website-video/website-video.mp3, built from these lines
 * by scripts/build-video-audio.mjs, which also writes where each line starts
 * (data/website-video.timing.json). Change a line here and the audio has to
 * be rebuilt: docs/LEE-SYSTEMS.md has the steps. The shape of a line is in
 * data/narrated-video.ts.
 */

import type { VideoLine } from "./narrated-video";

const idle: VideoLine["status"] = ["idle", "idle", "idle"];

export const websiteVideoLines: VideoLine[] = [
  {
    id: "prompt",
    chapter: "intro",
    kind: "prompt",
    caption: "Someone finds your business online. Do they stay?",
    status: idle,
    hold: 0.5,
  },
  {
    id: "before-title",
    chapter: "before",
    kind: "title",
    caption: "First, an outdated site.",
    status: idle,
    hold: 0.35,
  },
  {
    id: "before-tap",
    chapter: "before",
    kind: "step",
    caption: "They tap your site from their phone.",
    status: ["ringing", "idle", "idle"],
    focus: 0,
    hold: 0.9,
  },
  {
    id: "before-slow",
    chapter: "before",
    kind: "step",
    caption: "It's slow to load. They almost give up.",
    status: ["bad", "idle", "idle"],
    focus: 0,
    hold: 0.8,
  },
  {
    id: "before-look",
    chapter: "before",
    kind: "step",
    caption: "When it opens, it looks dated and it's hard to trust.",
    status: ["bad", "bad", "idle"],
    focus: 1,
    hold: 0.7,
  },
  {
    id: "before-leave",
    chapter: "before",
    kind: "step",
    caption: "They can't see how to reach you or what to do next, so they close the tab.",
    status: ["bad", "bad", "bad"],
    focus: 2,
    hold: 0.8,
  },
  {
    id: "before-ending",
    chapter: "before",
    kind: "ending",
    caption: "So they book with the next business on the list.",
    status: ["bad", "bad", "bad"],
    hold: 1.4,
  },
  {
    id: "after-title",
    chapter: "after",
    kind: "title",
    caption: "Now the same visit, on a site built right.",
    status: idle,
    hold: 0.35,
  },
  {
    id: "after-tap",
    chapter: "after",
    kind: "step",
    caption: "They tap your site from their phone.",
    status: ["ringing", "idle", "idle"],
    focus: 0,
    hold: 0.7,
  },
  {
    id: "after-fast",
    chapter: "after",
    kind: "step",
    caption: "It opens fast. No waiting.",
    status: ["good", "idle", "idle"],
    focus: 0,
    hold: 0.6,
  },
  {
    id: "after-look",
    chapter: "after",
    kind: "step",
    caption: "It looks sharp, and it's clear why they should choose you.",
    status: ["good", "good", "idle"],
    focus: 1,
    hold: 0.6,
  },
  {
    id: "after-form",
    chapter: "after",
    kind: "step",
    caption: "The form is right there, and they send their request.",
    status: ["good", "good", "good"],
    focus: 2,
    hold: 0.8,
  },
  {
    id: "after-ending",
    chapter: "after",
    kind: "ending",
    caption: "A visitor, turned into a customer.",
    status: ["good", "good", "good"],
    hold: 1.3,
  },
  {
    id: "outro",
    chapter: "outro",
    kind: "prompt",
    caption: "Beautiful gets them to stay. Built right gets them to book.",
    status: ["good", "good", "good"],
    hold: 0.9,
  },
];
