#!/usr/bin/env node
/**
 * Builds the soundtrack of one of the narrated videos on /lee-systems from an
 * Everygen voiceover of each of its lines, and writes when each line starts.
 *
 *   node scripts/build-video-audio.mjs <video> <folder>
 *
 * <video> is "two-paths" (data/two-paths-video.ts) or "website"
 * (data/website-video.ts). <folder> holds one voiceover per line of it,
 * named by the line's id (prompt.wav and so on), each reading the line's
 * `spoken` text where it has one and its caption otherwise. One clip per line
 * rather than one read of them all: a brisk voice runs its lines together
 * with no pause to cut at. FFMPEG names the ffmpeg binary if it isn't on the
 * PATH.
 *
 * What it does: trims each clip to its speech, evens out their loudness,
 * lays them out with each line's `hold` of quiet after it, adds the video's
 * sound effects (the `videos` table below), levels the whole thing to -16
 * LUFS and writes the video's MP3 and timing file, which its player reads.
 *
 * The sound effects are drawn here from sine waves and noise rather than
 * taken from a library, so there is nothing to license, and they sit 10 to
 * 14 dB under the voice.
 *
 * Needs a Node that runs TypeScript files (22.18 or later), since it reads the
 * lines straight from the video's data file.
 */

import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const ffmpeg = process.env.FFMPEG || "ffmpeg";

const SR = 48000;
const TAU = Math.PI * 2;

const [videoName, clipsDir] = process.argv.slice(2);

// ---------------------------------------------------------------------------
// The clips, as mono float samples at SR, each trimmed to its speech.

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

/** 10 ms frames' loudness. */
function frames(samples) {
  const size = Math.round(SR * 0.01);
  const out = [];
  for (let i = 0; i + size <= samples.length; i += size) {
    let sum = 0;
    for (let j = i; j < i + size; j++) sum += samples[j] * samples[j];
    out.push(Math.sqrt(sum / size));
  }
  return out;
}

/**
 * A clip from its first word to its last, with a breath of lead and the last
 * word's decay kept, and scaled so its speech sits at the same loudness as
 * every other line's.
 */
function speechOf(samples, id) {
  const rms = frames(samples);
  const loud = [...rms].sort((a, b) => a - b)[Math.floor(rms.length * 0.95)] ?? 0;
  const threshold = Math.max(loud * 0.05, 0.002);
  const first = rms.findIndex((v) => v >= threshold);
  const last = rms.length - 1 - [...rms].reverse().findIndex((v) => v >= threshold);
  if (first < 0) throw new Error(`No speech in ${id}.wav`);
  const from = Math.max(0, first * 0.01 - 0.04);
  const to = Math.min(samples.length / SR, (last + 1) * 0.01 + 0.09);
  const voiced = rms.slice(first, last + 1).filter((v) => v >= threshold);
  const level = Math.sqrt(voiced.reduce((sum, v) => sum + v * v, 0) / voiced.length);
  const piece = samples.slice(Math.round(from * SR), Math.round(to * SR));
  const gain = 0.1 / level;
  for (let i = 0; i < piece.length; i++) piece[i] *= gain;
  return fade(piece, 0.006);
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

/** An outgoing call ringing out, twice, done before the next line starts. */
function ringback() {
  const out = buf(2.5);
  for (const [a, b] of [[0, 1], [1.5, 2.5]]) {
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

/** A tap on a phone's screen: a short click with a bright edge. */
function tap() {
  const out = buf(0.12);
  for (let i = 0; i < out.length; i++) {
    const t = i / SR;
    out[i] = Math.sin(TAU * 1800 * t) * Math.exp(-70 * t) + 0.5 * Math.sin(TAU * 3600 * t) * Math.exp(-120 * t);
  }
  return fade(out, 0.001, 0.01);
}

/** A page still loading: a soft note, repeating, for `seconds`. */
function loading(seconds) {
  const out = buf(seconds);
  for (let at = 0; at < seconds - 0.2; at += 0.45) mixInto(out, bell(659.25, 0.3, { decay: 14 }), at);
  return fade(out, 0.005, 0.1);
}

// ---------------------------------------------------------------------------
// The videos: where each one's lines and files are, and its sound design,
// placed by line: s(id) is when a line starts, e(id) when its speech ends.

const videos = {
  "two-paths": {
    lines: "../data/two-paths-video.ts",
    exportName: "twoPathsLines",
    audio: "public/lee-systems/two-paths/two-paths.mp3",
    timing: "data/two-paths-video.timing.json",
    effects(mix, s, e) {
      mixInto(mix, ring(s("manual-voicemail") - s("manual-call") + 0.1), s("manual-call") - 0.15, 0.12);
      mixInto(mix, ticking(s("manual-ending") - s("manual-call")), s("manual-call"), 0.05);
      mixInto(mix, voicemailBeep(), e("manual-voicemail") + 0.12, 0.05);
      mixInto(mix, ringback(), s("manual-callback"), 0.07);
      mixInto(mix, lost(), e("manual-crm") + 0.05, 0.22);
      mixInto(mix, whoosh(), s("ai-title") - 0.3, 0.1);
      mixInto(mix, ring(s("ai-answer") - s("ai-call") + 0.1), s("ai-call") - 0.15, 0.12);
      mixInto(mix, pickup(), s("ai-answer") - 0.08, 0.16);
      mixInto(mix, ding(), s("ai-text") + 0.1, 0.16);
      mixInto(mix, saved(), s("ai-crm") + 0.1, 0.14);
      mixInto(mix, booked(), s("ai-ending") - 0.1, 0.1);
    },
  },
  website: {
    lines: "../data/website-video.ts",
    exportName: "websiteVideoLines",
    audio: "public/lee-systems/website-video/website-video.mp3",
    timing: "data/website-video.timing.json",
    effects(mix, s, e) {
      // The outdated site: a tap, a page that keeps loading, the clock
      // ticking as they wait, and the low note as they leave.
      mixInto(mix, tap(), s("before-tap") + 0.05, 0.14);
      mixInto(mix, loading(s("before-look") - s("before-slow")), s("before-slow") - 0.1, 0.12);
      mixInto(mix, ticking(s("before-ending") - s("before-tap")), s("before-tap"), 0.05);
      mixInto(mix, lost(), e("before-leave") + 0.05, 0.22);
      // The site built right: the whoosh in, the same tap, a snap as it
      // opens, a shimmer on the look, a message sent and the warm chord.
      mixInto(mix, whoosh(), s("after-title") - 0.3, 0.1);
      mixInto(mix, tap(), s("after-tap") + 0.05, 0.14);
      mixInto(mix, pickup(), s("after-fast") - 0.08, 0.16);
      mixInto(mix, saved(), s("after-look") + 0.1, 0.14);
      mixInto(mix, ding(), e("after-form") + 0.05, 0.16);
      mixInto(mix, booked(), s("after-ending") - 0.1, 0.1);
    },
  },
};

const video = videos[videoName];
if (!video || !clipsDir) {
  console.error(`Usage: node scripts/build-video-audio.mjs <${Object.keys(videos).join("|")}> <folder of <line id>.wav clips>`);
  process.exit(1);
}
const lines = (await import(video.lines))[video.exportName];
const outAudio = join(root, video.audio);
const outTiming = join(root, video.timing);
const publicSrc = `/${video.audio.replace(/^public\//, "")}`;

// ---------------------------------------------------------------------------
// The layout: each line's piece, then its hold.

const pieces = lines.map((line) => speechOf(decode(join(clipsDir, `${line.id}.wav`)), line.id));

const lead = 0.25;
const placed = [];
let t = lead;
for (let i = 0; i < lines.length; i++) {
  const seconds = pieces[i].length / SR;
  placed.push({ id: lines[i].id, at: t, speechEnd: t + seconds });
  t += seconds + lines[i].hold;
}
const total = t + 0.2;
const at = Object.fromEntries(placed.map((p) => [p.id, p]));

const mix = buf(total);

// The voice, peaked to -1 dBFS before the effects go under it.
let peak = 0;
for (const piece of pieces) for (const v of piece) peak = Math.max(peak, Math.abs(v));
const voiceGain = 0.89 / (peak || 1);
pieces.forEach((piece, i) => mixInto(mix, piece, placed[i].at, voiceGain));

// The effects, each at a level that sits under the voice.
video.effects(
  mix,
  (id) => at[id].at,
  (id) => at[id].speechEnd
);

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
