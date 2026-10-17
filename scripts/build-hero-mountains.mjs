#!/usr/bin/env node
/**
 * Draws the two mountain ranges behind the homepage hero's headline and
 * writes them to public/hero/:
 *
 *   mountains-night.svg  snowy peaks under the moon (dark mode, the default)
 *   mountains-day.svg    the same peaks in the sun (light mode)
 *
 *   node scripts/build-hero-mountains.mjs
 *
 * Only the mountains are drawn here; the sky, the stars and the moon or sun
 * are CSS (`.hero-scene` in app/globals.css), so they fit any screen shape.
 * Both files share one set of ridges (same seed), so the scene only changes
 * light, never shape, between the two. Each range is a ridge line built from
 * a few hand-placed peaks plus noise, with snow above a snowline, a shadowed
 * flank on the side away from the light, and mist pooling in front of it.
 * The peaks stay low in the middle, where the headline sits, and rise at the
 * sides. Change the tables below and re-run to reshape it.
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const W = 2400;
const H = 700;
const STEP = 10;

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public", "hero");

/** A small seeded random, so every run draws the same mountains. */
function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Smooth 1D noise in [-1, 1], several octaves. */
function noise(seed, octaves = 4) {
  const rand = rng(seed);
  const tables = Array.from({ length: octaves }, () =>
    Array.from({ length: 512 }, () => rand() * 2 - 1)
  );
  return (x, base = 220) => {
    let sum = 0;
    let amp = 1;
    let norm = 0;
    let freq = 1 / base;
    for (const table of tables) {
      const p = x * freq;
      const i = Math.floor(p);
      const f = p - i;
      const s = f * f * (3 - 2 * f);
      const a = table[((i % 512) + 512) % 512];
      const b = table[(((i + 1) % 512) + 512) % 512];
      sum += (a + (b - a) * s) * amp;
      norm += amp;
      amp *= 0.5;
      freq *= 2.1;
    }
    return sum / norm;
  };
}

const r = (n) => Math.round(n);

/**
 * The ranges, back to front. `base` and the peaks' `h` are heights above the
 * bottom edge in viewBox units; `w` is a peak's half-width. `snow` is the
 * snowline's height (null for none), `rough` how jagged the ridge is.
 */
const ranges = [
  {
    seed: 11,
    base: 250,
    rough: 34,
    snow: 400,
    peaks: [
      { x: 120, h: 360, w: 360 },
      { x: 470, h: 300, w: 330 },
      { x: 820, h: 210, w: 280 },
      { x: 1080, h: 150, w: 240 },
      { x: 1330, h: 175, w: 260 },
      { x: 1620, h: 255, w: 300 },
      { x: 1960, h: 370, w: 380 },
      { x: 2290, h: 300, w: 320 },
    ],
  },
  {
    seed: 23,
    base: 170,
    rough: 28,
    snow: 300,
    peaks: [
      { x: 300, h: 300, w: 330 },
      { x: 640, h: 230, w: 260 },
      { x: 960, h: 110, w: 230 },
      { x: 1250, h: 95, w: 220 },
      { x: 1520, h: 185, w: 250 },
      { x: 1800, h: 280, w: 300 },
      { x: 2150, h: 230, w: 300 },
    ],
  },
  {
    seed: 37,
    base: 95,
    rough: 20,
    snow: 210,
    peaks: [
      { x: 60, h: 220, w: 300 },
      { x: 520, h: 120, w: 300 },
      { x: 1020, h: 55, w: 260 },
      { x: 1460, h: 75, w: 260 },
      { x: 1980, h: 180, w: 320 },
      { x: 2380, h: 200, w: 280 },
    ],
  },
];

/** The ridge of a range: one height per STEP across the width. */
function ridge(range) {
  const n = noise(range.seed);
  const fine = noise(range.seed + 101, 3);
  const pts = [];
  for (let x = -STEP; x <= W + STEP; x += STEP) {
    let lift = 0;
    for (const p of range.peaks) {
      const d = Math.abs(x - p.x) / p.w;
      if (d < 1) lift = Math.max(lift, p.h * Math.pow(1 - d, 1.35));
    }
    const jag = n(x) * range.rough + fine(x, 40) * range.rough * 0.35;
    pts.push([x, H - (range.base + lift + jag)]);
  }
  return pts;
}

const poly = (pts) =>
  "M" + pts.map(([x, y]) => `${r(x)} ${r(y)}`).join("L") + "Z";

/** The range's body: everything under the ridge. */
function body(pts) {
  return poly([...pts, [W + STEP, H], [-STEP, H]]);
}

/**
 * Snow: the parts of the ridge above a ragged snowline, which reaches further
 * down under the taller peaks and in streaks, as gullies hold it.
 */
function snow(range, pts) {
  if (range.snow == null) return "";
  const n = noise(range.seed + 7, 3);
  const streak = noise(range.seed + 13, 2);
  const line = (x, y) => {
    const ridgeH = H - y;
    const above = Math.max(0, ridgeH - range.snow);
    const reach = 18 + above * 0.55 + Math.max(0, streak(x, 26)) * 46;
    return Math.min(H - range.snow + n(x, 60) * 14, y + reach);
  };
  const shapes = [];
  let run = [];
  for (const [x, y] of pts) {
    const edge = line(x, y);
    if (edge > y + 2) run.push([x, y, edge]);
    else if (run.length) {
      shapes.push(run);
      run = [];
    }
  }
  if (run.length) shapes.push(run);
  return shapes
    .filter((s) => s.length > 1)
    .map((s) => {
      const top = s.map(([x, y]) => [x, y]);
      const bottom = s.map(([x, , e]) => [x, e]).reverse();
      return poly([...top, ...bottom]);
    })
    .join("");
}

/**
 * The shadowed flank of each peak: from its summit along the ridge to the
 * next valley on the side away from the light, down to the bottom, and back
 * up a ragged crease to the summit. `side` is -1 for shadow on the left
 * (light from the right) or 1 for the right.
 */
function shadows(range, pts, side) {
  const n = noise(range.seed + 29, 3);
  const at = (x) => pts[Math.round((x + STEP) / STEP)];
  const out = [];
  for (const p of range.peaks) {
    // the summit: the highest ridge point near the peak's centre
    let top = null;
    for (let x = p.x - p.w * 0.3; x <= p.x + p.w * 0.3; x += STEP) {
      const pt = at(Math.round(x / STEP) * STEP);
      if (pt && (!top || pt[1] < top[1])) top = pt;
    }
    if (!top) continue;
    // along the ridge, away from the light, until it starts climbing again
    const flank = [top];
    let lowest = top[1];
    for (let x = top[0] + side * STEP; Math.abs(x - top[0]) < p.w; x += side * STEP) {
      const pt = at(x);
      if (!pt) break;
      if (pt[1] < lowest - 30) break;
      lowest = Math.max(lowest, pt[1]);
      flank.push(pt);
    }
    const end = flank[flank.length - 1];
    // Two creases meet below the peak: one from the summit, drifting a
    // little away from the light, and one from the valley, so the face
    // narrows to a point instead of running down the range in a stripe.
    const foot = [
      top[0] + side * Math.abs(end[0] - top[0]) * 0.35,
      Math.min(H, top[1] + (H - top[1]) * 0.85),
    ];
    const crease = (from, to) => {
      const pts = [];
      const steps = Math.max(2, Math.round(Math.abs(to[1] - from[1]) / 14));
      for (let k = 0; k <= steps; k++) {
        const t = k / steps;
        const y = from[1] + (to[1] - from[1]) * t;
        const wobble = n(y + from[0], 30) * 10 * Math.sin(Math.PI * t);
        pts.push([from[0] + (to[0] - from[0]) * t + wobble, y]);
      }
      return pts;
    };
    out.push(poly([...flank, ...crease(end, foot).slice(1), ...crease(top, foot).reverse().slice(1, -1)]));
  }
  return out.join("");
}

/** A row of pines along the bottom edge, in clumps. */
function pines(seed) {
  const rand = rng(seed);
  const ground = noise(seed + 3, 3);
  const clump = noise(seed + 5, 2);
  let d = "";
  for (let x = -10; x <= W + 10; x += 5 + rand() * 9) {
    const density = clump(x, 180);
    if (rand() > 0.35 + density * 0.6) continue;
    const base = H - 34 - ground(x, 160) * 26;
    const h = 30 + rand() * 46 + Math.max(0, density) * 30;
    const w = h * (0.2 + rand() * 0.06);
    const y1 = base - h * 0.62;
    const y2 = base - h * 0.32;
    const pts = [
      [x, base - h],
      [x + w * 0.55, y1],
      [x + w * 0.3, y1],
      [x + w * 0.8, y2],
      [x + w * 0.5, y2],
      [x + w, base],
      [x - w, base],
      [x - w * 0.5, y2],
      [x - w * 0.8, y2],
      [x - w * 0.3, y1],
      [x - w * 0.55, y1],
    ];
    d += poly(pts);
  }
  // the ground they stand on
  const floor = [];
  for (let x = -STEP; x <= W + STEP; x += STEP * 2) {
    floor.push([x, H - 30 - ground(x, 160) * 26]);
  }
  return d + poly([...floor, [W + STEP, H], [-STEP, H]]);
}

/** The two lightings of the same ridges. */
const palettes = {
  night: {
    // light from the moon, upper right, so shadows fall on the left
    side: -1,
    layers: [
      { body: "#25355a", snow: "#b9c9e4", shade: "#0b1430", shadeOpacity: 0.55, mist: "#1b2a4d", mistOpacity: 0.7 },
      { body: "#16223f", snow: "#a3b6d6", shade: "#060c1f", shadeOpacity: 0.6, mist: "#121c36", mistOpacity: 0.75 },
      { body: "#0c1427", snow: "#7c8fb2", shade: "#03060f", shadeOpacity: 0.6, mist: "#0a1122", mistOpacity: 0.7 },
    ],
    pines: "#04070e",
  },
  day: {
    // light from the sun, upper left, so shadows fall on the right
    side: 1,
    layers: [
      { body: "#9fb9d6", snow: "#f7fbff", shade: "#5f7ea6", shadeOpacity: 0.45, mist: "#cfe3f4", mistOpacity: 0.75 },
      { body: "#6d89ad", snow: "#ffffff", shade: "#2f4a72", shadeOpacity: 0.5, mist: "#a9c6e2", mistOpacity: 0.6 },
      { body: "#3d5878", snow: "#e9f1fa", shade: "#1a2c45", shadeOpacity: 0.55, mist: "#5f7d9c", mistOpacity: 0.45 },
    ],
    pines: "#0f1c18",
  },
};

function build(name) {
  const pal = palettes[name];
  const defs = [];
  const parts = [];
  ranges.forEach((range, i) => {
    const c = pal.layers[i];
    const pts = ridge(range);
    parts.push(`<path fill="${c.body}" d="${body(pts)}"/>`);
    const s = snow(range, pts);
    if (s) parts.push(`<path fill="${c.snow}" d="${s}"/>`);
    parts.push(
      `<path fill="${c.shade}" fill-opacity="${c.shadeOpacity}" d="${shadows(range, pts, pal.side)}"/>`
    );
    // mist in front of the range's foot, thinning upwards
    const top = H - range.base - 40;
    defs.push(
      `<linearGradient id="m${i}" x1="0" y1="${top}" x2="0" y2="${H}" gradientUnits="userSpaceOnUse">` +
        `<stop offset="0" stop-color="${c.mist}" stop-opacity="0"/>` +
        `<stop offset="1" stop-color="${c.mist}" stop-opacity="${c.mistOpacity}"/>` +
        `</linearGradient>`
    );
    parts.push(`<rect y="${top}" width="${W}" height="${H - top}" fill="url(#m${i})"/>`);
  });
  parts.push(`<path fill="${pal.pines}" d="${pines(53)}"/>`);
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMax slice">` +
    `<defs>${defs.join("")}</defs>${parts.join("")}</svg>\n`;
  mkdirSync(outDir, { recursive: true });
  const file = join(outDir, `mountains-${name}.svg`);
  writeFileSync(file, svg);
  console.log(`${file}  ${(svg.length / 1024).toFixed(1)} KB`);
}

build("night");
build("day");
