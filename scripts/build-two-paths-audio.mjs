#!/usr/bin/env node
/**
 * Builds the soundtrack of the "Two paths" video on /lee-systems from one
 * Everygen voiceover of its lines, and writes when each line starts.
 *
 *   node scripts/build-two-paths-audio.mjs <voiceover.wav> <timing.json>
 *
 * <voiceover.wav> is one read of every line in data/two-paths-video.ts, in
 * order, each line its own paragraph (the `spoken` text where a line has
 * one). <timing.json> is the `timing` object Everygen returns with it; only
 * its `sentenceEnds` is used, to find where one line stops and the next
 * starts. FFMPEG names the ffmpeg binary if it isn't on the PATH.
 *
 * What it does: cuts the read into one piece per line, lays the pieces out
 * with each line's `hold` of quiet after it, adds the sound effects below,
 * levels the whole thing to -16 LUFS and writes
 * public/lee-systems/two-paths/two-paths.mp3 and
 * data/two-paths-video.timing.json, which the video reads.
 *
 * The sound effects are drawn here from sine waves and noise rather than
 * taken from a library, so there is nothing to license, and they stay quiet
 * under the voice.
 *
 * Needs a Node that runs TypeScript files (22.18 or later), since it reads the
 * lines straight from data/two-paths-video.ts.
 */

import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { twoPathsLines } from "../data/two-paths-video.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outAudio = join(root, "public/lee-systems/two-paths/two-paths.mp3");
const outTiming = join(root, "data/two-paths-video.timing.json");
const publicSrc = "/lee-systems/two-paths/two-paths.mp3";
const ffmpeg = process.env.FFMPEG || "ffmpeg";

const SR = 48000;
const TAU = Math.PI * 2;

const [voiceoverPath, timingPath] = process.argv.slice(2);
if (!voiceoverPath || !timingPath) {
  console.error("Usage: node scripts/build-two-paths-audio.mjs <voiceover.wav> <timing.json>");
  process.exit(1);
}

// ---------------------------------------------------------------------------
// The voiceover, as mono float samples at SR.

function decode(path) {
  const run = spawnSync(
    ffmpeg,
    ["-v", "error", "-i", path, "-f", "f32le", "-ac", "1", "-ar", String(SR), "pipe:1"],
    { maxBuffer: 1 << 30 }
  );
  if (run.status !== 0) throw new Error(`ffmpeg could not read ${path}: ${run.stderr}`);
  const bytes = run.stdout;
  return new Float32Array(bytes.buffer, bytes.byteOffset, bytes.byteLength / 4).slice();
}

const voice = decode(voiceoverPath);
const timing = JSON.parse(readFileSync(timingPath, "utf8"));
const sentenceEnds = timing.sentenceEnds ?? timing.timing?.sentenceEnds;
if (!Array.isArray(sentenceEnds)) throw new Error("timing.json has no sentenceEnds");

/** The number of sentences in a line, counted the way the voice reads them. */
const sentencesIn = (text) =>
  text.split(/[.!?]+(?:\s+|$)/).filter((s) => s.trim().length > 0).length;

const counts = twoPathsLines.map((line) => sentencesIn(line.spoken ?? line.caption));
const expected = counts.reduce((a, b) => a + b, 0);
if (sentenceEnds.length !== expected) {
  throw new Error(
    `The read has ${sentenceEnds.length} sentences and the lines have ${expected}. ` +
      "Regenerate the voiceover from the lines exactly as they are."
  );
}

// ---------------------------------------------------------------------------
// Where the voice is speaking: 10 ms frames above a threshold set from the
// loud end of the read, with gaps under 150 ms bridged so words stay whole.

const FRAME = Math.round(SR * 0.01);
const rms = [];
for (let i = 0; i + FRAME <= voice.length; i += FRAME) {
  let sum = 0;
  for (let j = i; j < i + FRAME; j++) sum += voice[j] * voice[j];
  rms.push(Math.sqrt(sum / FRAME));
}
const sorted = [...rms].sort((a, b) => a - b);
const threshold = Math.max(sorted[Math.floor(sorted.length * 0.95)] * 0.05, 0.002);

const regions = [];
for (let f = 0; f < rms.length; f++) {
  if (rms[f] < threshold) continue;
  const last = regions[regions.length - 1];
  if (last && f - last.end <= 15) last.end = f + 1;
  else regions.push({ start: f, end: f + 1 });
}
const speech = regions
  .filter((r) => r.end - r.start >= 4)
  .map((r) => ({ start: r.start / 100, end: r.end / 100 }));
if (speech.length === 0) throw new Error("No speech found in the voiceover");

/** The line's piece of the read: from its first word to its last. */
const pieces = [];
let sentence = 0;
let from = 0;
for (let i = 0; i < twoPathsLines.length; i++) {
  sentence += counts[i];
  const endsAt = sentenceEnds[sentence - 1];
  // The speech region that ends nearest to where the line's last sentence ends.
  let best = null;
  for (const r of speech) {
    if (r.end <= from) continue;
    if (!best || Math.abs(r.end - endsAt) < Math.abs(best.end - endsAt)) best = r;
  }
  const first = speech.find((r) => r.end > from);
  if (!best || !first) throw new Error(`Could not find the line "${twoPathsLines[i].id}" in the read`);
  pieces.push({ start: Math.max(0, first.start - 0.04), end: best.end + 0.07 });
  from = best.end;
}

// ---------------------------------------------------------------------------
// Sound effects.

const buf = (seconds) => new Float32Array(Math.max(1, Math.round(seconds * SR)));

function mixInto(target, source, atSeconds, gain = 1) {
  const offset = Math.round(atSeconds * SR);
  for (let i = 0; i < source.length; i++) {
    const j = offset + i;
    if (j >= 0 && j < target.length) target[j] += source[i] * gain;
  }
}

function fade(samples, inSeconds, outSeconds = inSeconds) {
  const a = Math.round(inSeconds * SR);
  const b = Math.round(outSeconds * SR);
  for (let i = 0; i < a && i < samples.length; i++) samples[i] *= i / a;
  for (let i = 0; i < b && i < samples.length; i++) samples[samples.length - 1 - i] *= i / b;
  return samples;
}

/** A struck note: a few harmonics under a fast attack and an exponential fall. */
function bell(freq, seconds, { decay = 6, attack = 0.004, partials = [[1, 1], [2, 0.25], [3, 0.08]] } = {}) {
  const out = buf(seconds);
  for (let i = 0; i < out.length; i++) {
    const t = i / SR;
    const env = Math.min(1, t / attack) * Math.exp(-decay * t);
    let v = 0;
    for (const [ratio, gain] of partials) v += gain * Math.sin(TAU * freq * ratio * t);
    out[i] = v * env;
  }
  return fade(out, 0, 0.01);
}

/** A phone's ring, in bursts of a quick two-note trill, for `seconds`. */
function ring(seconds) {
  const out = buf(seconds);
  const burst = buf(0.95);
  for (let k = 0; k * (1 / 15) < 0.9; k++) {
    const note = bell(k % 2 ? 1567.98 : 1318.51, 0.12, { decay: 28, attack: 0.002, partials: [[1, 1], [2, 0.3]] });
    mixInto(burst, note, k / 15);
  }
  fade(burst, 0.01);
  for (let at = 0; at < seconds - 0.3; at += 1.45) mixInto(out, burst, at);
  return fade(out, 0.005, 0.08);
}

/** The beep before a voicemail. */
function voicemailBeep() {
  const out = buf(0.42);
  for (let i = 0; i < out.length; i++) out[i] = Math.sin((TAU * 950 * i) / SR);
  return fade(out, 0.012);
}

/** An outgoing call ringing out, twice. */
function ringback() {
  const out = buf(3.2);
  for (const [a, b] of [[0, 1.2], [1.9, 3.1]]) {
    const tone = buf(b - a);
    for (let i = 0; i < tone.length; i++) {
      const t = i / SR;
      tone[i] = 0.5 * (Math.sin(TAU * 440 * t) + Math.sin(TAU * 480 * t));
    }
    mixInto(out, fade(tone, 0.03), a);
  }
  return out;
}

/** A low falling note: the lead gone. */
function lost() {
  const out = buf(0.8);
  let phase = 0;
  for (let i = 0; i < out.length; i++) {
    const t = i / SR;
    const f = 196 * Math.exp(-1.1 * t);
    phase += (TAU * f) / SR;
    const env = Math.min(1, t / 0.006) * Math.exp(-4.5 * t);
    out[i] = (Math.sin(phase) + 0.3 * Math.sin(2 * phase)) * env;
  }
  return fade(out, 0, 0.02);
}

/** A clock ticking, tick and tock a second apart, for `seconds`. */
function ticking(seconds) {
  const out = buf(seconds);
  for (let k = 0; k < seconds; k++) {
    const f = k % 2 ? 1900 : 2500;
    const tick = buf(0.05);
    for (let i = 0; i < tick.length; i++) {
      const t = i / SR;
      tick[i] = Math.sin(TAU * f * t) * Math.exp(-150 * t);
    }
    mixInto(out, tick, k);
  }
  return out;
}

/** Filtered noise sweeping upward: the cut to the AI run. */
function whoosh() {
  const seconds = 0.75;
  const out = buf(seconds);
  let low = 0;
  let band = 0;
  let seed = 7;
  const noise = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed / 2147483647) * 2 - 1;
  };
  for (let i = 0; i < out.length; i++) {
    const t = i / SR;
    const fc = 300 * Math.pow(2500 / 300, t / seconds);
    const f = 2 * Math.sin((Math.PI * fc) / SR);
    const high = noise() - low - 0.8 * band;
    band += f * high;
    low += f * band;
    out[i] = band * Math.pow(Math.sin((Math.PI * t) / seconds), 2);
  }
  return out;
}

/** Two quick rising notes: the call picked up. */
function pickup() {
  const out = buf(0.5);
  mixInto(out, bell(1046.5, 0.2, { decay: 18 }), 0);
  mixInto(out, bell(1567.98, 0.4, { decay: 12 }), 0.07);
  return out;
}

/** A message arriving. */
function ding() {
  const out = buf(1.1);
  mixInto(out, bell(1318.51, 0.6, { decay: 8 }), 0);
  mixInto(out, bell(1975.53, 1.0, { decay: 6 }), 0.09, 0.8);
  return out;
}

/** A rising arpeggio: saved. */
function saved() {
  const out = buf(1.2);
  [1046.5, 1318.51, 1567.98, 2093].forEach((f, k) =>
    mixInto(out, bell(f, 0.9, { decay: 6 }), k * 0.07, 1 - k * 0.12)
  );
  return out;
}

/** A warm major chord that swells in and fades: booked. */
function booked() {
  const seconds = 2.9;
  const out = buf(seconds);
  const notes = [261.63, 392, 523.25, 659.25];
  for (let i = 0; i < out.length; i++) {
    const t = i / SR;
    const env = Math.min(1, t / 0.35) * (t > 1.8 ? Math.max(0, 1 - (t - 1.8) / 1.1) : 1);
    let v = 0;
    for (const f of notes) {
      v += Math.sin(TAU * (f - 0.6) * t) + Math.sin(TAU * (f + 0.6) * t);
      v += 0.15 * Math.sin(TAU * 2 * f * t);
    }
    out[i] = (v / notes.length) * env * 0.5;
  }
  return out;
}

// ---------------------------------------------------------------------------
// The layout: each line's piece, then its hold.

const lead = 0.25;
const placed = [];
let t = lead;
for (let i = 0; i < twoPathsLines.length; i++) {
  const { start, end } = pieces[i];
  placed.push({ id: twoPathsLines[i].id, at: t, speechEnd: t + (end - start) });
  t += end - start + twoPathsLines[i].hold;
}
const total = t + 0.2;
const at = Object.fromEntries(placed.map((p) => [p.id, p]));

const mix = buf(total);

// The voice, peaked to -1 dBFS before the effects go under it.
let peak = 0;
for (const { start, end } of pieces) {
  for (let i = Math.round(start * SR); i < Math.round(end * SR); i++) peak = Math.max(peak, Math.abs(voice[i] ?? 0));
}
const voiceGain = 0.89 / (peak || 1);
pieces.forEach(({ start, end }, i) => {
  const piece = fade(voice.slice(Math.round(start * SR), Math.round(end * SR)), 0.006);
  mixInto(mix, piece, placed[i].at, voiceGain);
});

// The effects, each at a level that sits under the voice.
const s = (id) => at[id].at;
const e = (id) => at[id].speechEnd;
mixInto(mix, ring(s("manual-voicemail") - s("manual-call") + 0.1), s("manual-call") - 0.15, 0.12);
mixInto(mix, ticking(s("manual-ending") - s("manual-call")), s("manual-call"), 0.05);
mixInto(mix, voicemailBeep(), e("manual-voicemail") + 0.12, 0.16);
mixInto(mix, ringback(), s("manual-callback"), 0.07);
mixInto(mix, lost(), e("manual-crm") + 0.05, 0.22);
mixInto(mix, whoosh(), s("ai-title") - 0.3, 0.16);
mixInto(mix, ring(s("ai-answer") - s("ai-call") + 0.1), s("ai-call") - 0.15, 0.12);
mixInto(mix, pickup(), s("ai-answer") - 0.08, 0.16);
mixInto(mix, ding(), s("ai-text") + 0.1, 0.16);
mixInto(mix, saved(), s("ai-crm") + 0.1, 0.14);
mixInto(mix, booked(), s("ai-ending") - 0.1, 0.1);

// ---------------------------------------------------------------------------
// Level to -16 LUFS in two passes (measure, then apply linearly) and encode.

const raw = Buffer.from(mix.buffer);
const input = ["-v", "info", "-f", "f32le", "-ar", String(SR), "-ac", "1", "-i", "pipe:0"];

const measure = spawnSync(
  ffmpeg,
  [...input, "-af", "loudnorm=I=-16:TP=-1.5:LRA=11:print_format=json", "-f", "null", "-"],
  { input: raw, maxBuffer: 1 << 26 }
);
const stats = JSON.parse(String(measure.stderr).match(/\{[\s\S]*?\}/g).pop());
const loudnorm =
  `loudnorm=I=-16:TP=-1.5:LRA=11:linear=true` +
  `:measured_I=${stats.input_i}:measured_TP=${stats.input_tp}` +
  `:measured_LRA=${stats.input_lra}:measured_thresh=${stats.input_thresh}` +
  `:offset=${stats.target_offset}`;

mkdirSync(dirname(outAudio), { recursive: true });
const encode = spawnSync(
  ffmpeg,
  [...input, "-af", loudnorm, "-ar", "44100", "-ac", "1", "-c:a", "libmp3lame", "-b:a", "96k", "-y", outAudio],
  { input: raw, maxBuffer: 1 << 26 }
);
if (encode.status !== 0) throw new Error(`ffmpeg could not encode: ${encode.stderr}`);

const version = createHash("sha1").update(readFileSync(outAudio)).digest("hex").slice(0, 8);
const timingOut = {
  src: `${publicSrc}?v=${version}`,
  durationMs: Math.round(total * 1000),
  // A caption shows a beat before its line is read.
  lines: Object.fromEntries(placed.map((p) => [p.id, Math.max(0, Math.round((p.at - 0.08) * 1000))])),
};
writeFileSync(outTiming, `${JSON.stringify(timingOut, null, 2)}\n`);

console.log(`Wrote ${outAudio} (${total.toFixed(1)} s) and ${outTiming}`);
for (const p of placed) console.log(`  ${p.at.toFixed(2).padStart(6)} s  ${p.id}`);
