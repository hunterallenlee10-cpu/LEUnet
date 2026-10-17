import {
  AddEquation,
  AdditiveBlending,
  AmbientLight,
  BackSide,
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  CatmullRomCurve3,
  CircleGeometry,
  Color,
  CustomBlending,
  CylinderGeometry,
  DirectionalLight,
  DoubleSide,
  DynamicDrawUsage,
  Euler,
  ExtrudeGeometry,
  FogExp2,
  Group,
  HalfFloatType,
  InstancedMesh,
  LatheGeometry,
  Matrix4,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  OneFactor,
  PerspectiveCamera,
  PlaneGeometry,
  PMREMGenerator,
  PointLight,
  Points,
  PointsMaterial,
  Quaternion,
  RepeatWrapping,
  RingGeometry,
  Scene,
  ShaderMaterial,
  Shape,
  SphereGeometry,
  Sprite,
  SpriteMaterial,
  SrcAlphaFactor,
  sRGBEncoding,
  TorusGeometry,
  TubeGeometry,
  UnsignedByteType,
  Vector2,
  Vector3,
  WebGLRenderer,
  WebGLRenderTarget,
  ZeroFactor,
  type Material,
  type Object3D,
  type Texture,
} from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import {
  heroVsl,
  heroVslNicheAliases,
  heroVslNiches,
  type HeroVslNicheKey,
} from "@/data/hero-vsl";

/**
 * The engine behind the homepage hero's animation, "The Vault" (HeroVsl.tsx
 * holds its words, heroVslPlayer.ts decides when it plays). A real-time
 * three.js scene: studio-lit gold coins drop from a call, a form and a text
 * into a glass pipe, spill out of three cracks, get clamped shut by gold
 * collars, and stack up inside a glass vault. Over it, the words the server
 * sent, moved frame by frame.
 *
 * One clock. Every frame is worked out from the time alone (`renderAt`), so
 * a skip, a pause, a resize or a fresh start always shows the right frame.
 * It only plays while at least 40% of it is on screen and the tab is open,
 * and picks up where it stopped.
 *
 * It was built and approved as a standalone preview (Take 1 of the hero
 * film takes, 2026-10-07 to 08) and is ported from it nearly line for line:
 * the same scene, timing, camera, light and grade (three r147's colour
 * handling, an HDR buffer with 4x MSAA, bloom, then our own grade: ACES,
 * gamma, vignette, grain and a touch of chromatic aberration). What the site
 * adds: it fits any shape of screen, not only 16:9 and 4:5; small words get
 * a floor on their size on phones; the pixel ratio is capped at 1.5 and
 * drops to 1 (with lighter bloom) on a device that can't keep up, and the
 * film gives up (`onFail`) on one that still can't, as on WebGL drawn in
 * software or a lost WebGL context that never comes back; it gives its
 * full-screen buffers back between plays; and everything it made is given
 * back on `destroy`.
 *
 * three.js is only ever loaded through this file, which only
 * heroVslPlayer.ts imports, which HeroStage.tsx loads once the page is
 * interactive: none of it is in the server HTML or the page's first script.
 */

/* ---------- timing, in seconds ---------- */
const DUR = 28;
const T = {
  // The coin stream starts before 0, so coins are already falling at the
  // first frame.
  firstCoin: -2.6,
  coinEvery: 0.36,
  lastCoin: 20.1,
  // The website's own stream.
  webFrom: 16.9,
  webEvery: 0.21,
  // The automations switch on: a ring of light runs down the pipe and no
  // coin leaks after it.
  power: 8.15,
  // Each crack's collar snaps shut.
  sealAt: [9.4, 11.45, 13.4],
  // The money-lost count holds from the power-on, then turns over to money
  // recovered.
  flip: 10.15,
  // The headlines: in, out.
  caps: [
    [0.2, 8.85],
    [9.6, 15.0],
    [15.55, 21.05],
  ],
  cap3b: 16.6,
  // Each fix's card: in, out.
  cards: [
    [9.55, 10.85],
    [11.6, 12.8],
    [13.55, 14.85],
  ],
  web: 15.5,
  // The end card: the camera settles on the vault, a column of light rises
  // out of it, then the figures, the headline and the buttons.
  end: 21.2,
  burst: 22.05,
  stats: 22.3,
  statsSmall: 22.9,
  head: 24.4,
  ctas: 25.0,
};
// The end card's buttons can be reached once they are there.
const CTAS_ON = T.ctas + 0.4;
// Past the end the scene keeps breathing (dust, light, grain) while the end
// card holds, for up to this long (not under reduced motion, and not on a
// device that had to drop to the lighter film).
const IDLE_AFTER = 40;
// How long a lost WebGL context may stay lost, with the tab open, before
// the film gives up.
const LOST_WAIT = 4;

/* ---------- the world, in metres-ish ---------- */
const G = {
  tubeR: 0.25,
  tubeTop: 4.12,
  tubeOut: 0.5,
  gapY: [3.38, 2.62, 1.86],
  gapH: 0.34,
  gapDir: [-1, 1, -1],
  funnelTop: 4.66,
  funnelR: 0.98,
  tileY: 5.1,
  drop: [
    [-0.64, 0.24],
    [0.04, 0.62],
    [0.64, 0.24],
  ],
  coinR: 0.15,
  coinH: 0.034,
  speed: 2.3,
  vaultR: 0.92,
  vaultY0: -0.42,
  vaultY1: 0.42,
  stacks: 6,
  stackR: 0.47,
};
// Where the website's coins land in the funnel, as `G.drop` for the tiles'.
const WEB_LAND = [0.62, 0.42];
// The website panel's corners, on its own plane (1 wide, 0.645 high).
const PANEL_CORNERS = [
  [-0.5, -0.3225],
  [0.5, -0.3225],
  [-0.5, 0.3225],
  [0.5, 0.3225],
] as const;

/** The website panel's colours: a dark glass screen, or in the light theme
 *  a pale one in the site's navy. */
const WEB_DARK = {
  body: ["rgba(28,24,18,0.92)", "rgba(12,10,8,0.92)"],
  frame: "rgba(240,205,130,0.95)",
  bar: "rgba(255,255,255,0.06)",
  dots: ["#c9a256", "#8a7a5c", "#5d5444"],
  url: "rgba(255,255,255,0.08)",
  title: "#f4eee2",
  accent: "#d4a857",
  lede: "rgba(244,238,226,0.35)",
  button: ["#f3d995", "#c4913f"],
  image: ["rgba(212,168,87,0.38)", "rgba(212,168,87,0.06)"],
  imageEdge: "rgba(240,205,130,0.5)",
  card: "rgba(255,255,255,0.05)",
  cardEdge: "rgba(240,205,130,0.55)",
  cardTitle: "rgba(244,238,226,0.5)",
  cardText: "rgba(244,238,226,0.22)",
};
const WEB_LIGHT: typeof WEB_DARK = {
  body: ["rgba(255,255,255,0.97)", "rgba(238,241,246,0.97)"],
  frame: "rgba(30,64,175,0.9)",
  bar: "rgba(15,26,46,0.05)",
  dots: ["#c8962e", "#c3cad6", "#e1e6ee"],
  url: "rgba(15,26,46,0.07)",
  title: "#0f1a2e",
  accent: "#1e40af",
  lede: "rgba(15,26,46,0.25)",
  button: ["#2f56c9", "#1a3794"],
  image: ["rgba(30,64,175,0.22)", "rgba(30,64,175,0.04)"],
  imageEdge: "rgba(30,64,175,0.35)",
  card: "rgba(15,26,46,0.03)",
  cardEdge: "rgba(30,64,175,0.3)",
  cardTitle: "rgba(15,26,46,0.55)",
  cardText: "rgba(15,26,46,0.2)",
};

/* ---------- the frame ----------
   The film was composed in two frames: 1600 x 900 for wide screens and
   900 x 1125 for tall ones (narrower than 1.2:1). On any other shape the
   whole frame stays in view, centred across and in the space under the site
   header, and the film carries on past its edges. `head` is the band the
   preview kept clear for the header. */
const WIDE = { w: 1600, h: 900, head: 84 };
const TALL = { w: 900, h: 1125, head: 104 };
type Frame = typeof WIDE;
// The fixed site header's height (components/layout/MainHeader.tsx: a 44px
// button and 16px above and below), with a little room.
const HEADER_PX = 80;

// The counter's two amounts; the recovered one never ends below the loss.
const LOSS_END = Math.max(0, heroVsl.lossEnd);
const RECOVERED_END = Math.max(LOSS_END, heroVsl.recoveredEnd);

/** `?niche=roofing` plays that business type's version. */
function nicheFromUrl(): HeroVslNicheKey {
  let value = "";
  try {
    value = new URLSearchParams(window.location.search).get("niche") ?? "";
  } catch {
    value = "";
  }
  return heroVslNicheAliases[value.toLowerCase()] ?? "general";
}

/* ---------- small helpers ---------- */
type Ease = (u: number) => number;
const E = {
  linear: (u: number) => u,
  inQuad: (u: number) => u * u,
  outQuad: (u: number) => 1 - (1 - u) * (1 - u),
  inOutQuad: (u: number) => (u < 0.5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2),
  inCubic: (u: number) => u * u * u,
  outCubic: (u: number) => 1 - Math.pow(1 - u, 3),
  inOutCubic: (u: number) => (u < 0.5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2),
  outQuart: (u: number) => 1 - Math.pow(1 - u, 4),
  inOutSine: (u: number) => -(Math.cos(Math.PI * u) - 1) / 2,
  outBack: (u: number) => {
    const s = 1.70158;
    return 1 + (s + 1) * Math.pow(u - 1, 3) + s * Math.pow(u - 1, 2);
  },
};
const clamp = (v: number, a = 0, b = 1) => (v < a ? a : v > b ? b : v);
const lerp = (a: number, b: number, u: number) => a + (b - a) * u;
const seg = (t: number, a: number, b: number) => clamp((t - a) / (b - a));
const segE = (t: number, a: number, b: number, ease: Ease = E.inOutCubic) => ease(seg(t, a, b));

/** Seeded random, so every playthrough is identical. */
function rng(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
/** Smooth 1D value noise, deterministic. */
function noise1(x: number, seed = 1) {
  const i = Math.floor(x);
  const f = x - i;
  const u = f * f * (3 - 2 * f);
  return hash1(i, seed) * (1 - u) + hash1(i + 1, seed) * u;
}
function hash1(n: number, seed: number) {
  const s = Math.sin(n * 127.1 + seed * 311.7) * 43758.5453;
  return s - Math.floor(s);
}

const fmt = (n: number) => Math.round(n).toLocaleString("en-US");

/** Lucide's paths in a 24 x 24 box, for the icons drawn into the scene. */
const ICONS = {
  phone:
    "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
  form: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z M14 2v5a1 1 0 0 0 1 1h5 M10 9H8 M16 13H8 M16 17H8",
  message:
    "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",
};

/** Strokes an icon on a 2D canvas, centred at (x, y), `size` wide. */
function drawIcon(
  ctx: CanvasRenderingContext2D,
  path: string,
  x: number,
  y: number,
  size: number,
  stroke: string,
  lineWidth: number
) {
  const s = size / 24;
  ctx.save();
  ctx.translate(x - size / 2, y - size / 2);
  ctx.scale(s, s);
  ctx.lineWidth = lineWidth;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.strokeStyle = stroke;
  ctx.stroke(new Path2D(path));
  ctx.restore();
}

function roundRect(x: CanvasRenderingContext2D, X: number, Y: number, W: number, H: number, R: number) {
  x.beginPath();
  if (W <= 0 || H <= 0) return;
  const r = Math.min(R, W / 2, H / 2);
  x.moveTo(X + r, Y);
  x.arcTo(X + W, Y, X + W, Y + H, r);
  x.arcTo(X + W, Y + H, X, Y + H, r);
  x.arcTo(X, Y + H, X, Y, r);
  x.arcTo(X, Y, X + W, Y, r);
  x.closePath();
}

/** The site's light theme is on (lib/theme.ts sets it on <html>). */
const lightTheme = () => document.documentElement.dataset.theme === "light";

/* ---------- three helpers ---------- */

/** A brand hex colour, in the linear space the scene is lit in. */
const lin = (hex: string) => new Color(hex).convertSRGBToLinear();

function canvasTex(
  w: number,
  h: number,
  draw: (ctx: CanvasRenderingContext2D, w: number, h: number) => void,
  srgb = true
) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d");
  if (ctx) draw(ctx, w, h);
  const tx = new CanvasTexture(c);
  if (srgb) tx.encoding = sRGBEncoding;
  tx.anisotropy = 8;
  return tx;
}

function glowTex(stops: [number, string][]) {
  return canvasTex(
    256,
    256,
    (x, w) => {
      const g = x.createRadialGradient(w / 2, w / 2, 0, w / 2, w / 2, w / 2);
      stops.forEach(([o, c]) => g.addColorStop(o, c));
      x.fillStyle = g;
      x.fillRect(0, 0, w, w);
    },
    false
  );
}

/** A coin's face: its colour, or (`bump`) the relief that catches the light. */
function drawCoinFace(c: HTMLCanvasElement, bump: boolean, font: string) {
  const s = c.width;
  const x = c.getContext("2d");
  if (!x) return;
  const m = s / 2;
  x.clearRect(0, 0, s, s);
  if (bump) {
    x.fillStyle = "#7a7a7a";
    x.fillRect(0, 0, s, s);
    // raised rim
    x.lineWidth = 34;
    x.strokeStyle = "#ffffff";
    x.beginPath();
    x.arc(m, m, m - 22, 0, Math.PI * 2);
    x.stroke();
    // beaded ring
    x.fillStyle = "#d8d8d8";
    for (let i = 0; i < 72; i++) {
      const a = (i / 72) * Math.PI * 2;
      x.beginPath();
      x.arc(m + Math.cos(a) * (m - 60), m + Math.sin(a) * (m - 60), 5, 0, Math.PI * 2);
      x.fill();
    }
    // the field, slightly sunk
    const g = x.createRadialGradient(m, m, 0, m, m, m - 70);
    g.addColorStop(0, "#606060");
    g.addColorStop(1, "#6c6c6c");
    x.fillStyle = g;
    x.beginPath();
    x.arc(m, m, m - 74, 0, Math.PI * 2);
    x.fill();
    x.fillStyle = "#ffffff";
  } else {
    const g = x.createRadialGradient(m * 0.8, m * 0.7, 10, m, m, m);
    g.addColorStop(0, "#fff1cf");
    g.addColorStop(0.55, "#f2d38f");
    g.addColorStop(1, "#c9993f");
    x.fillStyle = g;
    x.fillRect(0, 0, s, s);
    x.fillStyle = "rgba(255,248,230,0.9)";
  }
  x.font = `700 300px ${font}`;
  x.textAlign = "center";
  x.textBaseline = "middle";
  x.fillText("$", m, m + 14);
}

/** An additive glow cone, for beams of light. */
function beamMaterial(color: string, intensity: number) {
  return new ShaderMaterial({
    uniforms: { uColor: { value: lin(color) }, uInt: { value: intensity } },
    vertexShader: `varying float vH; varying vec3 vN; varying vec3 vV;
      void main(){ vH = uv.y; vec4 mv = modelViewMatrix*vec4(position,1.0);
      vN = normalize(normalMatrix*normal); vV = normalize(-mv.xyz); gl_Position = projectionMatrix*mv; }`,
    fragmentShader: `uniform vec3 uColor; uniform float uInt; varying float vH; varying vec3 vN; varying vec3 vV;
      void main(){ float f = abs(dot(normalize(vN), normalize(vV)));
      float a = pow(f, 2.2) * smoothstep(0.0, 0.45, vH) * smoothstep(1.0, 0.55, vH);
      gl_FragColor = vec4(uColor * uInt * a, 1.0); }`,
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
    side: DoubleSide,
  });
}

/** A rim of light on glass: bright at grazing angles. */
function fresnelMaterial(color: string, intensity: number, power = 3) {
  return new ShaderMaterial({
    uniforms: { uColor: { value: lin(color) }, uInt: { value: intensity }, uPow: { value: power } },
    vertexShader: `varying vec3 vN; varying vec3 vV;
      void main(){ vec4 mv = modelViewMatrix*vec4(position,1.0); vN = normalize(normalMatrix*normal); vV = normalize(-mv.xyz); gl_Position = projectionMatrix*mv; }`,
    fragmentShader: `uniform vec3 uColor; uniform float uInt; uniform float uPow; varying vec3 vN; varying vec3 vV;
      void main(){ float f = 1.0 - abs(dot(normalize(vN), normalize(vV))); gl_FragColor = vec4(uColor * uInt * pow(f, uPow), 1.0); }`,
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
    side: DoubleSide,
  });
}

/** Gives back an object's geometry, materials and their textures. */
function disposeObject(o: Object3D) {
  const mesh = o as Partial<Mesh>;
  mesh.geometry?.dispose();
  const mat = mesh.material;
  if (!mat) return;
  for (const m of Array.isArray(mat) ? mat : [mat]) {
    for (const v of Object.values(m)) {
      if ((v as Texture | null)?.isTexture) (v as Texture).dispose();
    }
    m.dispose();
  }
}

/** The light the metal and glass reflect: a dark room with soft panels. */
function studioEnvironment(renderer: WebGLRenderer) {
  const scene = new Scene();
  scene.add(
    new Mesh(
      new SphereGeometry(30, 32, 16),
      new MeshBasicMaterial({ color: lin("#0b0907"), side: BackSide })
    )
  );
  const panel = (w: number, h: number, pos: [number, number, number], color: string, k: number) => {
    const m = new Mesh(
      new PlaneGeometry(w, h),
      new MeshBasicMaterial({ color: lin(color).multiplyScalar(k), side: DoubleSide })
    );
    m.position.set(pos[0], pos[1], pos[2]);
    m.lookAt(0, 0, 0);
    scene.add(m);
  };
  panel(16, 3.2, [0, 11, 1], "#fff2da", 5); // overhead strip
  panel(3.5, 12, [-10, 3, 4], "#ffd59a", 3.2); // warm key, left
  panel(2.2, 9, [10, 2, -3], "#d8e4ff", 1.1); // cool kicker, right
  panel(12, 1.4, [0, 1.5, 10], "#ffe7bd", 1.8); // front strip
  panel(14, 3, [0, -8, -6], "#8a5c22", 0.7); // warm bounce from below
  panel(4, 4, [6, 7, 7], "#fff5e6", 2.2); // top right fill
  const pm = new PMREMGenerator(renderer);
  const rt = pm.fromScene(scene, 0.035);
  pm.dispose();
  scene.traverse(disposeObject);
  return rt;
}

/**
 * The last pass: tone, gamma, vignette, grain and a little colour fringe.
 * In the light theme (`uLight`) the scene is drawn on nothing, and this pass
 * hands the page a see-through picture instead: the objects at their own
 * cover, and the light around them (glows, beams, sparks) at its own
 * strength, so gold light tints the page as it would a pale wall. No
 * vignette and no warm lift there; they would only grey the page.
 */
const FINAL = {
  uniforms: {
    tDiffuse: { value: null },
    uTime: { value: 0 },
    uExposure: { value: 1.05 },
    uRes: { value: new Vector2(1, 1) },
    uCA: { value: 0.006 },
    uLift: { value: 0 },
    uLight: { value: 0 },
  },
  vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
  fragmentShader: `uniform sampler2D tDiffuse; uniform float uTime; uniform float uExposure; uniform vec2 uRes; uniform float uCA; uniform float uLift; uniform float uLight;
    varying vec2 vUv;
    vec3 aces(vec3 x){ return clamp((x*(2.51*x+0.03))/(x*(2.43*x+0.59)+0.14),0.0,1.0); }
    float hash(vec2 p){ p = fract(p*vec2(123.34,456.21)); p += dot(p,p+45.32); return fract(p.x*p.y); }
    void main(){
      vec2 d = vUv - 0.5;
      float r2 = dot(d,d);
      vec2 off = d * uCA * (0.3 + 3.0*r2);
      vec3 c;
      vec4 mid = texture2D(tDiffuse, vUv);
      c.r = texture2D(tDiffuse, vUv - off).r;
      c.g = mid.g;
      c.b = texture2D(tDiffuse, vUv + off).b;
      c = aces(c * uExposure);
      c = pow(c, vec3(1.0/2.2));
      if (uLight > 0.5) {
        float a = clamp(max(mid.a, max(c.r, max(c.g, c.b))), 0.0, 1.0);
        float n = hash(vUv*uRes + floor(uTime*24.0)*13.17) - 0.5;
        c = clamp(c + n * 0.03 * a, 0.0, a);
        gl_FragColor = vec4(c, a);
        return;
      }
      float v = smoothstep(0.95, 0.25, length(d*vec2(1.0, 1.15)));
      c *= mix(0.5, 1.0, v);
      c += vec3(0.010, 0.007, 0.004) * (1.0 + uLift);
      float g = hash(vUv*uRes + floor(uTime*24.0)*13.17) - 0.5;
      c += g * 0.03;
      gl_FragColor = vec4(c, 1.0);
    }`,
};

/* ---------- the coin stream: every coin planned up front ---------- */

interface Coin {
  t0: number;
  /** 0 call, 1 form, 2 text, 3 the website. */
  src: number;
  inDur: number;
  tMouth: number;
  phase: number;
  spin: number;
  wob: number;
  /** The crack it falls out of, or -1 when it reaches the vault. */
  leak: number;
  tGap: number;
  vx: number;
  vy: number;
  vz: number;
  ax: Vector3;
  rs: number;
  tOut: number;
  sx: number;
  sy: number;
  sz: number;
  sRot: number;
}

/**
 * Seeded, so every playthrough is the same. Until the automations switch on,
 * some coins fall out of the cracks (the first three, one per crack, for
 * sure); after that, every coin reaches the vault and lands on a stack.
 */
function plan() {
  const rnd = rng(20261007);
  const coin = (t0: number, src: number): Coin => ({
    t0,
    src,
    inDur: 0,
    tMouth: 0,
    phase: 0,
    spin: 0,
    wob: 0,
    leak: -1,
    tGap: 0,
    vx: 0,
    vy: 0,
    vz: 0,
    ax: new Vector3(),
    rs: 0,
    tOut: 0,
    sx: 0,
    sy: 0,
    sz: 0,
    sRot: 0,
  });
  const coins: Coin[] = [];
  let t = T.firstCoin;
  while (t <= T.lastCoin) {
    const r = rnd();
    coins.push(coin(t, r < 0.42 ? 0 : r < 0.71 ? 1 : 2));
    t += (t >= T.webFrom ? 0.3 : T.coinEvery) + (rnd() - 0.5) * 0.07;
  }
  for (let w = T.webFrom; w <= T.lastCoin; w += T.webEvery + (rnd() - 0.5) * 0.05) {
    coins.push(coin(w, 3));
  }
  coins.sort((a, b) => a.t0 - b.t0);
  let deposits = 0;
  const stackH: number[] = [];
  coins.forEach((c, i) => {
    c.inDur = c.src === 3 ? 1.05 : 0.92;
    c.tMouth = c.t0 + c.inDur;
    c.phase = rnd() * Math.PI * 2;
    c.spin = 5 + rnd() * 4;
    c.wob = rnd() * 6.28;
    const forced = i < 4 ? [0, 1, 2, -1][i] : null;
    for (let g = 0; g < 3; g++) {
      const tg = c.tMouth + (G.tubeTop - G.gapY[g]) / G.speed;
      if (tg >= T.power - 0.05) continue;
      const roll = rnd();
      if (forced !== null ? forced === g : roll < 0.4) {
        c.leak = g;
        c.tGap = tg;
        c.vx = 1.35 + rnd() * 0.5;
        c.vz = (rnd() - 0.2) * 0.9;
        c.vy = 0.35 + rnd() * 0.5;
        const ax = rnd() - 0.5;
        const ay = rnd() - 0.5;
        const az = rnd() - 0.5;
        c.ax.set(ax, ay, az).normalize();
        c.rs = 7 + rnd() * 6;
        break;
      }
    }
    if (c.leak < 0) {
      c.tOut = c.tMouth + (G.tubeTop - G.tubeOut) / G.speed;
      const k = deposits++;
      const order = [0, 1, 2, 3, 4, 5, 0, 2, 4, 1, 0, 3];
      const s = order[k % order.length];
      stackH[s] = (stackH[s] || 0) + 1;
      const lvl = stackH[s] - 1;
      const a = (s / G.stacks) * Math.PI * 2 + 0.35;
      c.sx = Math.cos(a) * G.stackR + (rnd() - 0.5) * 0.02;
      c.sz = Math.sin(a) * G.stackR + (rnd() - 0.5) * 0.02;
      c.sy = G.vaultY0 + G.coinH * 0.5 + lvl * G.coinH;
      c.sRot = rnd() * Math.PI * 2;
    }
  });
  const leaks = coins
    .filter((c) => c.leak >= 0)
    .map((c) => c.tGap)
    .sort((a, b) => a - b);
  const banked = coins
    .filter((c) => c.leak < 0)
    .map((c) => c.tOut + 0.5)
    .sort((a, b) => a - b);
  const gains = banked.filter((d) => d >= T.flip);
  return { coins, leaks, gains, banked };
}

/* ---------- the camera's path ---------- */

interface Key {
  t: number;
  p: [number, number, number];
  g: [number, number, number];
  f: number;
  e?: Ease;
}

const KEYS_WIDE: Key[] = [
  { t: 0, p: [2.05, 5.3, 5.4], g: [0, 4.3, 0], f: 32 },
  { t: 7.7, p: [3.1, 3.3, 8.4], g: [0, 2.62, 0], f: 34, e: E.inOutSine },
  { t: 8.75, p: [1.95, 3.78, 3.75], g: [0, 3.3, 0], f: 30 },
  { t: 10.35, p: [1.75, 3.7, 3.5], g: [0, 3.3, 0], f: 30, e: E.inOutSine },
  { t: 11.0, p: [2.75, 2.95, 3.05], g: [0, 2.56, 0], f: 30 },
  { t: 12.35, p: [2.55, 2.88, 2.85], g: [0, 2.56, 0], f: 30, e: E.inOutSine },
  { t: 12.95, p: [1.6, 2.22, 3.75], g: [0, 1.8, 0], f: 30 },
  { t: 14.55, p: [1.45, 2.15, 3.52], g: [0, 1.8, 0], f: 30, e: E.inOutSine },
  { t: 16.1, p: [3.6, 3.45, 10.1], g: [0.8, 2.66, 0], f: 36 },
  { t: 21.0, p: [1.0, 3.35, 10.4], g: [0.65, 2.6, 0], f: 36, e: E.inOutSine },
  { t: 23.1, p: [2.35, 1.42, 5.25], g: [0, 0.08, 0], f: 31 },
  { t: 28.0, p: [1.95, 1.15, 4.55], g: [0, 0.08, 0], f: 30, e: E.inOutSine },
];

/** Tall screens: a wider lens, and a few positions moved to suit. */
const KEYS_TALL: Key[] = KEYS_WIDE.map((k, i) => {
  const tall: Partial<Key>[] = [];
  tall[0] = { p: [2.2, 5.3, 6.4] };
  tall[1] = { p: [3.2, 2.8, 9.6] };
  tall[8] = { p: [2.7, 3.6, 10.4], g: [0.4, 2.5, 0] };
  tall[9] = { p: [0.6, 3.45, 10.6], g: [0.35, 2.45, 0] };
  tall[10] = { p: [3.1, 2.5, 8.3], g: [0, 0.05, 0] };
  tall[11] = { p: [2.7, 2.2, 7.4], g: [0, 0.05, 0] };
  return { ...k, f: k.f + 6, ...tall[i] };
});

/* ---------- the controller ---------- */

type FilmState = "idle" | "playing" | "waiting" | "paused" | "done";

// At the end the button goes (CSS) and does nothing: replaying is the
// player's "Replay animation" button.
const LABELS: Record<FilmState, string> = {
  idle: "Play",
  playing: "Pause",
  waiting: "Pause",
  paused: "Play",
  done: "Play",
};

export interface HeroFilm {
  /** Play from the top. */
  start(): void;
  /** Hold still where it is, as the pause button does. */
  pause(): void;
  /** Back to the first frame, waiting for `start`. */
  stop(): void;
  /** Stop everything and give back all it made. */
  destroy(): void;
}

// WebGL drawn in software (no GPU, or none the browser trusts: a virtual
// machine, a remote desktop, a missing driver) counts as none. It would
// draw the film at a frame or two a second, each frame holding up the whole
// page, so that browser keeps the regular hero instead.
const GL_OPTIONS: WebGLContextAttributes = { failIfMajorPerformanceCaveat: true };

/** Whether this browser can draw the film at all, without building it. */
export function canPlayHeroFilm(): boolean {
  try {
    const c = document.createElement("canvas");
    const gl = c.getContext("webgl2", GL_OPTIONS) ?? c.getContext("webgl", GL_OPTIONS);
    if (!gl) return false;
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return true;
  } catch {
    return false;
  }
}

export interface HeroFilmOptions {
  /** It reached the end of its end card. */
  onDone?: () => void;
  /** It can't carry on here, and has stopped for good: this device draws
   *  it far too slowly even at the lighter quality, or the browser took its
   *  WebGL context away and never gave it back. */
  onFail?: () => void;
}

/**
 * Builds the film inside `root` (the `.vt` element), draws its first frame
 * and waits for `start()`. Returns null, having touched nothing, when WebGL
 * is unavailable (or only drawn in software); if the build fails part way,
 * it gives its WebGL context back and throws.
 */
export function createHeroFilm(root: HTMLElement, opts: HeroFilmOptions = {}): HeroFilm | null {
  // Asked quietly first: three logs errors when it finds no WebGL.
  if (!canPlayHeroFilm()) return null;
  const canvas = document.createElement("canvas");
  let renderer: WebGLRenderer;
  try {
    // No antialiasing on the canvas itself: the scene is drawn into the
    // composer's multisampled buffer, and the canvas only ever gets the
    // final full-screen pass. A canvas that can be see-through, for the
    // light theme; the dark film is drawn fully opaque on it.
    renderer = new WebGLRenderer({ canvas, powerPreference: "high-performance", alpha: true, ...GL_OPTIONS });
  } catch {
    return null;
  }
  try {
    return buildFilm(root, canvas, renderer, opts);
  } catch (err) {
    // Half built: give the context back before the player drops the film.
    renderer.dispose();
    renderer.forceContextLoss();
    canvas.remove();
    throw err;
  }
}

function buildFilm(
  root: HTMLElement,
  canvas: HTMLCanvasElement,
  renderer: WebGLRenderer,
  opts: HeroFilmOptions
): HeroFilm {
  function need<T extends Element = HTMLElement>(sel: string, parent: ParentNode = root) {
    const node = parent.querySelector<T>(sel);
    if (!node) throw new Error(`Hero animation: ${sel} is missing`);
    return node;
  }
  function qa<T extends Element = HTMLElement>(sel: string, parent: ParentNode = root) {
    return Array.from(parent.querySelectorAll<T>(sel));
  }

  need(".vt-gl").appendChild(canvas);

  const P = plan();
  const reducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  // The lighter film (`measure`) draws one pixel per CSS pixel; otherwise up
  // to 1.5 per CSS pixel. Read again at each layout: a zoom, or a move to
  // another screen, changes it.
  let lowQuality = false;
  const pixelRatio = () => (lowQuality ? 1 : Math.min(window.devicePixelRatio || 1, 1.5));
  let pr = pixelRatio();
  renderer.setPixelRatio(pr);
  renderer.setClearColor(0x050403, 1);
  const scene = new Scene();
  const fog = new FogExp2(lin("#060504").getHex(), 0.052);
  scene.fog = fog;
  // In the light theme the far side of the scene fades towards the page
  // instead (`applyTheme`).
  const darkFog = fog.color.clone();
  const lightFog = lin("#f6f7f9");
  let light = lightTheme();
  // `let`: a lost and restored WebGL context empties it, and it is drawn
  // again (`onContextRestored`).
  let envRT = studioEnvironment(renderer);
  scene.environment = envRT.texture;

  const camera = new PerspectiveCamera(32, WIDE.w / WIDE.h, 0.05, 80);

  /* post: HDR buffer, bloom, then our own grade */
  const canFloat = renderer.capabilities.isWebGL2 || renderer.extensions.has("OES_texture_half_float");
  const rt = new WebGLRenderTarget(1, 1, {
    type: canFloat ? HalfFloatType : UnsignedByteType,
    samples: renderer.capabilities.isWebGL2 ? 4 : 0,
  });
  const composer = new EffectComposer(renderer, rt);
  const renderPass = new RenderPass(scene, camera);
  composer.addPass(renderPass);
  const bloom = new UnrealBloomPass(new Vector2(1, 1), 0.7, 0.5, 0.9);
  composer.addPass(bloom);
  const finalPass = new ShaderPass(FINAL);
  composer.addPass(finalPass);

  /* lights (the environment does most of the work) */
  scene.add(new AmbientLight(lin("#2a2015"), 0.35));
  const key = new DirectionalLight(lin("#ffe2b0"), 1.6);
  key.position.set(-4, 7, 5);
  scene.add(key);
  const rim = new DirectionalLight(lin("#ffd08a"), 1.2);
  rim.position.set(5, 3, -6);
  scene.add(rim);
  const vaultLight = new PointLight(lin("#ffc46b"), 0, 4.2, 1.6);
  vaultLight.position.set(0, 0.05, 0);
  scene.add(vaultLight);

  /* materials */
  const gold = new MeshStandardMaterial({ color: lin("#e7b965"), metalness: 1, roughness: 0.24, envMapIntensity: 1.35 });
  const darkMetal = new MeshStandardMaterial({ color: lin("#17140f"), metalness: 0.85, roughness: 0.32, envMapIntensity: 0.9 });
  const bronze = new MeshStandardMaterial({ color: lin("#4a3618"), metalness: 0.9, roughness: 0.55, envMapIntensity: 0.6 });
  // Clear glass: no body colour at all, only its reflections, added on top.
  const glass = new MeshStandardMaterial({
    color: lin("#000000"),
    metalness: 0.0,
    roughness: 0.03,
    transparent: true,
    opacity: 1,
    blending: AdditiveBlending,
    envMapIntensity: 2.2,
    side: DoubleSide,
    depthWrite: false,
  });

  // The "$" on each coin is set in the site's own font, the one on the page.
  const font = getComputedStyle(root).fontFamily || "sans-serif";
  const faceCanvas = document.createElement("canvas");
  const bumpCanvas = document.createElement("canvas");
  faceCanvas.width = faceCanvas.height = bumpCanvas.width = bumpCanvas.height = 512;
  drawCoinFace(faceCanvas, false, font);
  drawCoinFace(bumpCanvas, true, font);
  const faceMap = new CanvasTexture(faceCanvas);
  faceMap.encoding = sRGBEncoding;
  faceMap.anisotropy = 8;
  const faceBump = new CanvasTexture(bumpCanvas);
  const edgeBump = canvasTex(
    256,
    8,
    (x, w, h) => {
      for (let i = 0; i < w; i += 4) {
        x.fillStyle = i % 8 ? "#222" : "#fff";
        x.fillRect(i, 0, 4, h);
      }
    },
    false
  );
  edgeBump.wrapS = RepeatWrapping;
  edgeBump.repeat.set(3, 1);
  const coinFace = new MeshStandardMaterial({
    color: lin("#ffffff"),
    map: faceMap,
    bumpMap: faceBump,
    bumpScale: 0.25,
    metalness: 1,
    roughness: 0.27,
    envMapIntensity: 1.45,
  });
  const coinEdge = new MeshStandardMaterial({
    color: lin("#dcae5e"),
    bumpMap: edgeBump,
    bumpScale: 0.2,
    metalness: 1,
    roughness: 0.3,
    envMapIntensity: 1.3,
  });
  const coinGeo = new CylinderGeometry(G.coinR, G.coinR, G.coinH, 56, 1, false);
  coinGeo.rotateX(Math.PI / 2); // face the camera by default
  const coins = new InstancedMesh(coinGeo, [coinEdge, coinFace, coinFace], P.coins.length);
  coins.instanceMatrix.setUsage(DynamicDrawUsage);
  coins.frustumCulled = false;
  const white = new Color(1, 1, 1);
  P.coins.forEach((_, i) => coins.setColorAt(i, white));
  scene.add(coins);

  /* sources: three dark glass tiles with lit icons */
  const glowGold = glowTex([
    [0, "rgba(255,214,140,1)"],
    [0.25, "rgba(255,190,90,0.45)"],
    [1, "rgba(255,170,60,0)"],
  ]);
  const glowRed = glowTex([
    [0, "rgba(255,120,100,1)"],
    [0.3, "rgba(255,70,50,0.4)"],
    [1, "rgba(255,40,30,0)"],
  ]);
  const dot = glowTex([
    [0, "rgba(255,255,255,1)"],
    [0.35, "rgba(255,255,255,0.6)"],
    [1, "rgba(255,255,255,0)"],
  ]);
  const glowSprite = (map: Texture, color = new Color(0, 0, 0)) =>
    new Sprite(
      new SpriteMaterial({ map, color, blending: AdditiveBlending, depthWrite: false, transparent: true })
    );
  const tileShape = new Shape();
  {
    const w = 0.56;
    const r = 0.12;
    tileShape.moveTo(-w / 2 + r, -w / 2);
    tileShape.lineTo(w / 2 - r, -w / 2);
    tileShape.quadraticCurveTo(w / 2, -w / 2, w / 2, -w / 2 + r);
    tileShape.lineTo(w / 2, w / 2 - r);
    tileShape.quadraticCurveTo(w / 2, w / 2, w / 2 - r, w / 2);
    tileShape.lineTo(-w / 2 + r, w / 2);
    tileShape.quadraticCurveTo(-w / 2, w / 2, -w / 2, w / 2 - r);
    tileShape.lineTo(-w / 2, -w / 2 + r);
    tileShape.quadraticCurveTo(-w / 2, -w / 2, -w / 2 + r, -w / 2);
  }
  const tileGeo = new ExtrudeGeometry(tileShape, {
    depth: 0.07,
    bevelEnabled: true,
    bevelThickness: 0.018,
    bevelSize: 0.018,
    bevelSegments: 4,
  });
  tileGeo.translate(0, 0, -0.035);
  const tiles = [ICONS.phone, ICONS.form, ICONS.message].map((path, i) => {
    const g = new Group();
    g.add(new Mesh(tileGeo, darkMetal));
    const iconTex = canvasTex(256, 256, (x) => {
      x.shadowColor = "rgba(255,200,110,0.9)";
      x.shadowBlur = 18;
      drawIcon(x, path, 128, 128, 150, "#f3d995", 1.7);
      drawIcon(x, path, 128, 128, 150, "#fff3d6", 1.1);
    });
    const iconMat = new MeshBasicMaterial({
      map: iconTex,
      transparent: true,
      depthWrite: false,
      toneMapped: false,
      color: new Color(1.6, 1.4, 1.1),
    });
    const icon = new Mesh(new PlaneGeometry(0.42, 0.42), iconMat);
    icon.position.z = 0.06;
    g.add(icon);
    const halo = glowSprite(glowGold);
    halo.scale.set(1.4, 1.4, 1);
    halo.position.z = 0.08;
    g.add(halo);
    const d = G.drop[i];
    g.position.set(d[0], G.tileY, d[1]);
    g.rotation.x = -0.32;
    g.rotation.y = d[0] * 0.35;
    scene.add(g);
    return { iconMat, halo };
  });

  /* the funnel */
  const funnelPts: Vector2[] = [];
  for (let i = 0; i <= 24; i++) {
    const u = i / 24;
    const r = lerp(G.tubeR, G.funnelR, Math.pow(u, 1.35));
    funnelPts.push(new Vector2(r, lerp(G.tubeTop, G.funnelTop, u)));
  }
  scene.add(
    new Mesh(
      new LatheGeometry(funnelPts, 96),
      new MeshStandardMaterial({
        color: lin("#e2b462"),
        metalness: 1,
        roughness: 0.3,
        envMapIntensity: 1.2,
        side: DoubleSide,
        transparent: true,
        opacity: 0.9,
      })
    )
  );
  const funnelLip = new Mesh(new TorusGeometry(G.funnelR, 0.028, 16, 128), gold);
  funnelLip.rotation.x = Math.PI / 2;
  funnelLip.position.y = G.funnelTop;
  scene.add(funnelLip);

  /* the pipe: glass segments between the gaps, gold rings, broken edges */
  const segs = [
    [G.gapY[0] + G.gapH / 2, G.tubeTop],
    [G.gapY[1] + G.gapH / 2, G.gapY[0] - G.gapH / 2],
    [G.gapY[2] + G.gapH / 2, G.gapY[1] - G.gapH / 2],
    [G.vaultY1, G.gapY[2] - G.gapH / 2],
  ];
  const glassRim = fresnelMaterial("#ffe2a8", 0.4, 4.5);
  const tubeGroup = new Group();
  scene.add(tubeGroup);
  segs.forEach(([y0, y1]) => {
    const geo = new CylinderGeometry(G.tubeR, G.tubeR, y1 - y0, 64, 1, true);
    const m = new Mesh(geo, glass);
    m.position.y = (y0 + y1) / 2;
    tubeGroup.add(m);
    const r = new Mesh(geo, glassRim);
    r.position.y = m.position.y;
    r.scale.set(1.002, 1, 1.002);
    tubeGroup.add(r);
  });
  const ringGeo = new TorusGeometry(G.tubeR + 0.012, 0.016, 12, 96);
  [G.tubeTop, G.vaultY1 + 0.08].forEach((y) => {
    const r = new Mesh(ringGeo, gold);
    r.rotation.x = Math.PI / 2;
    r.position.y = y;
    tubeGroup.add(r);
  });
  // broken edges: jagged bronze lips at each gap
  const jag = (y: number, up: boolean) => {
    const pts: Vector3[] = [];
    const n = 40;
    for (let i = 0; i <= n; i++) {
      const a = (i / n) * Math.PI * 2;
      const k = noise1(i * 1.7 + y * 10, 3) * 0.06 + (i % 2) * 0.02;
      pts.push(new Vector3(Math.cos(a) * G.tubeR, y + (up ? k : -k), Math.sin(a) * G.tubeR));
    }
    return new Mesh(new TubeGeometry(new CatmullRomCurve3(pts, true), 120, 0.009, 6, true), bronze);
  };
  G.gapY.forEach((gy) => {
    tubeGroup.add(jag(gy + G.gapH / 2, false));
    tubeGroup.add(jag(gy - G.gapH / 2, true));
  });

  /* each gap: a red leak glow, a gold energy film after power-on, a clamp */
  const gapFx = G.gapY.map((gy, g) => {
    const red = glowSprite(glowRed);
    red.position.set(G.gapDir[g] * 0.12, gy, 0.05);
    red.scale.set(0.72, 0.42, 1);
    scene.add(red);
    const film = new Mesh(
      new CylinderGeometry(G.tubeR, G.tubeR, G.gapH, 64, 1, true),
      fresnelMaterial("#ffc66e", 0, 1.4)
    );
    film.position.y = gy;
    scene.add(film);
    const clampMat = new MeshStandardMaterial({
      color: lin("#e5b864"),
      metalness: 1,
      roughness: 0.22,
      envMapIntensity: 1.5,
      emissive: lin("#ffb347"),
      emissiveIntensity: 0,
    });
    const clampG = new Group();
    clampG.add(
      new Mesh(new CylinderGeometry(G.tubeR + 0.03, G.tubeR + 0.03, G.gapH + 0.16, 96, 1, true), clampMat)
    );
    [-1, 1].forEach((s) => {
      const lip = new Mesh(new TorusGeometry(G.tubeR + 0.035, 0.02, 14, 96), clampMat);
      lip.rotation.x = Math.PI / 2;
      lip.position.y = s * (G.gapH / 2 + 0.08);
      clampG.add(lip);
    });
    // engraved groove
    const groove = new Mesh(new TorusGeometry(G.tubeR + 0.031, 0.006, 8, 96), darkMetal);
    groove.rotation.x = Math.PI / 2;
    clampG.add(groove);
    clampG.position.y = gy;
    clampG.visible = false;
    scene.add(clampG);
    const flash = glowSprite(glowGold);
    flash.position.set(0, gy, 0.1);
    scene.add(flash);
    const ringMat = new MeshBasicMaterial({
      color: new Color(0, 0, 0),
      blending: AdditiveBlending,
      transparent: true,
      depthWrite: false,
      side: DoubleSide,
    });
    const ring = new Mesh(new RingGeometry(0.96, 1, 96), ringMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = gy;
    scene.add(ring);
    return { red, film, clampG, clampMat, flash, ring, ringMat };
  });

  /* the power-on pulse that runs down the pipe */
  const pulseMat = new MeshBasicMaterial({ color: new Color(0, 0, 0), toneMapped: false });
  const pulse = new Mesh(new TorusGeometry(G.tubeR + 0.02, 0.022, 12, 96), pulseMat);
  pulse.rotation.x = Math.PI / 2;
  scene.add(pulse);
  const pulseGlow = glowSprite(glowGold);
  pulseGlow.scale.set(1.6, 0.9, 1);
  scene.add(pulseGlow);

  /* the vault */
  const vault = new Group();
  scene.add(vault);
  const plinth = new Mesh(new CylinderGeometry(1.12, 1.18, 0.24, 128), darkMetal);
  plinth.position.y = G.vaultY0 - 0.12;
  vault.add(plinth);
  const plinth2 = new Mesh(new CylinderGeometry(1.3, 1.36, 0.16, 128), darkMetal);
  plinth2.position.y = G.vaultY0 - 0.32;
  vault.add(plinth2);
  [
    [1.12, G.vaultY0 - 0.005, 0.02],
    [1.3, G.vaultY0 - 0.245, 0.018],
    [G.vaultR + 0.01, G.vaultY0 + 0.01, 0.024],
    [G.vaultR + 0.01, G.vaultY1 - 0.01, 0.024],
  ].forEach(([r, y, tk]) => {
    const m = new Mesh(new TorusGeometry(r, tk, 16, 160), gold);
    m.rotation.x = Math.PI / 2;
    m.position.y = y;
    vault.add(m);
  });
  const vBody = new Mesh(
    new CylinderGeometry(G.vaultR, G.vaultR, G.vaultY1 - G.vaultY0, 128, 1, true),
    glass
  );
  vBody.position.y = (G.vaultY0 + G.vaultY1) / 2;
  vault.add(vBody);
  const vRim = new Mesh(vBody.geometry, fresnelMaterial("#ffd9a0", 0.42, 2.6));
  vRim.position.copy(vBody.position);
  vault.add(vRim);
  const lid = new Mesh(new CylinderGeometry(G.vaultR + 0.04, G.vaultR + 0.04, 0.06, 128), darkMetal);
  lid.position.y = G.vaultY1 + 0.03;
  vault.add(lid);
  const lidRing = new Mesh(new TorusGeometry(G.vaultR + 0.04, 0.02, 14, 160), gold);
  lidRing.rotation.x = Math.PI / 2;
  lidRing.position.y = G.vaultY1 + 0.06;
  vault.add(lidRing);
  const floorDisc = new Mesh(
    new CircleGeometry(G.vaultR, 96),
    new MeshStandardMaterial({ color: lin("#0f0c08"), metalness: 0.6, roughness: 0.4 })
  );
  floorDisc.rotation.x = -Math.PI / 2;
  floorDisc.position.y = G.vaultY0 + 0.001;
  vault.add(floorDisc);
  const vaultGlow = glowSprite(glowGold);
  vaultGlow.position.set(0, -0.1, 0);
  vaultGlow.scale.set(3.2, 1.6, 1);
  scene.add(vaultGlow);
  const floorPoolMat = new MeshBasicMaterial({
    map: glowGold,
    blending: AdditiveBlending,
    depthWrite: false,
    transparent: true,
    color: new Color(0, 0, 0),
  });
  const floorPool = new Mesh(new PlaneGeometry(9, 9), floorPoolMat);
  floorPool.rotation.x = -Math.PI / 2;
  floorPool.position.y = G.vaultY0 - 0.401;
  scene.add(floorPool);

  /* beams of light: one over the funnel, one that rises from the vault at the end */
  const topBeamMat = beamMaterial("#ffd9a0", 0.12);
  const topBeam = new Mesh(new CylinderGeometry(0.35, 2.1, 7, 64, 1, true), topBeamMat);
  topBeam.position.set(0, G.funnelTop + 2.6, -0.2);
  scene.add(topBeam);
  const liftMat = beamMaterial("#ffcf7a", 0);
  const lift = new Mesh(new CylinderGeometry(0.75, 0.95, 9, 64, 1, true), liftMat);
  lift.position.set(0, G.vaultY1 + 4.4, 0);
  scene.add(lift);

  /* the haze behind everything */
  const haze = new Sprite(
    new SpriteMaterial({
      map: glowGold,
      blending: AdditiveBlending,
      depthWrite: false,
      transparent: true,
      color: lin("#4a3214").multiplyScalar(0.55),
      fog: false,
    })
  );
  haze.position.set(0.4, 2.4, -6);
  haze.scale.set(16, 13, 1);
  scene.add(haze);

  /* the website panel: a glass screen that draws itself. Its size and place
     depend on the frame (`applyFrame`). */
  const webCanvas = document.createElement("canvas");
  webCanvas.width = 1024;
  webCanvas.height = 660;
  const webCtx = webCanvas.getContext("2d");
  const webTex = new CanvasTexture(webCanvas);
  webTex.encoding = sRGBEncoding;
  webTex.anisotropy = 8;
  const webMat = new MeshBasicMaterial({
    map: webTex,
    transparent: true,
    depthWrite: false,
    color: new Color(1.25, 1.2, 1.1),
    side: DoubleSide,
  });
  const web = new Mesh(new PlaneGeometry(1, 0.645), webMat);
  scene.add(web);
  const webFrameMat = new MeshStandardMaterial({
    color: lin("#1a1611"),
    metalness: 0.8,
    roughness: 0.3,
    transparent: true,
    opacity: 0,
  });
  const webBack = new Mesh(new PlaneGeometry(1.02, 0.665), webFrameMat);
  scene.add(webBack);
  const webFrameDark = webFrameMat.color.clone();
  const webFrameLight = lin("#c3cad6");
  const WEBPOS = new Vector3();
  // where its coins leave from: the panel's button, in world space
  const WEB_SRC = new Vector3();
  let webDrawn = -1;
  function drawWeb(p: number) {
    const q = Math.round(p * 90) / 90;
    if (q === webDrawn || !webCtx) return;
    webDrawn = q;
    const x = webCtx;
    const W = 1024;
    const H = 660;
    const k = light ? WEB_LIGHT : WEB_DARK;
    x.clearRect(0, 0, W, H);
    const a = (from: number, to: number) => E.outCubic(clamp((q - from) / (to - from)));
    // glass body
    x.globalAlpha = a(0, 0.25);
    const bg = x.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, k.body[0]);
    bg.addColorStop(1, k.body[1]);
    x.fillStyle = bg;
    roundRect(x, 8, 8, W - 16, H - 16, 28);
    x.fill();
    x.globalAlpha = 1;
    // frame draws on
    const fr = a(0, 0.3);
    x.strokeStyle = k.frame;
    x.lineWidth = 4;
    x.setLineDash([3200 * fr, 4000]);
    roundRect(x, 8, 8, W - 16, H - 16, 28);
    x.stroke();
    x.setLineDash([]);
    // top bar
    x.globalAlpha = a(0.12, 0.35);
    x.fillStyle = k.bar;
    x.fillRect(10, 10, W - 20, 64);
    k.dots.forEach((c, i) => {
      x.fillStyle = c;
      x.beginPath();
      x.arc(48 + i * 30, 42, 9, 0, Math.PI * 2);
      x.fill();
    });
    x.fillStyle = k.url;
    roundRect(x, 180, 26, 520, 32, 16);
    x.fill();
    x.globalAlpha = 1;
    // hero
    x.fillStyle = k.title;
    roundRect(x, 70, 140, 520 * a(0.25, 0.5), 46, 10);
    x.fill();
    x.fillStyle = k.accent;
    roundRect(x, 70, 204, 380 * a(0.32, 0.56), 46, 10);
    x.fill();
    x.fillStyle = k.lede;
    roundRect(x, 70, 276, 460 * a(0.38, 0.6), 16, 8);
    x.fill();
    // button
    const btn = a(0.48, 0.68);
    x.globalAlpha = btn;
    const bgr = x.createLinearGradient(0, 322, 0, 376);
    bgr.addColorStop(0, k.button[0]);
    bgr.addColorStop(1, k.button[1]);
    x.fillStyle = bgr;
    roundRect(x, 70, 322 + (1 - btn) * 14, 200, 54, 14);
    x.fill();
    x.globalAlpha = 1;
    // image block
    x.globalAlpha = a(0.4, 0.66);
    const ig = x.createLinearGradient(640, 120, 960, 400);
    ig.addColorStop(0, k.image[0]);
    ig.addColorStop(1, k.image[1]);
    x.fillStyle = ig;
    roundRect(x, 650, 128, 300, 250, 18);
    x.fill();
    x.strokeStyle = k.imageEdge;
    x.lineWidth = 2;
    roundRect(x, 650, 128, 300, 250, 18);
    x.stroke();
    x.globalAlpha = 1;
    // cards
    for (let i = 0; i < 3; i++) {
      const c = a(0.6 + i * 0.08, 0.82 + i * 0.06);
      const dy = (1 - c) * 24;
      x.globalAlpha = c;
      x.fillStyle = k.card;
      roundRect(x, 70 + i * 300, 440 + dy, 270, 150, 16);
      x.fill();
      x.strokeStyle = k.cardEdge;
      x.lineWidth = 2;
      roundRect(x, 70 + i * 300, 440 + dy, 270, 150, 16);
      x.stroke();
      x.fillStyle = k.cardTitle;
      roundRect(x, 96 + i * 300, 474 + dy, 140, 14, 7);
      x.fill();
      x.fillStyle = k.cardText;
      roundRect(x, 96 + i * 300, 504 + dy, 200, 10, 5);
      x.fill();
      roundRect(x, 96 + i * 300, 526 + dy, 170, 10, 5);
      x.fill();
    }
    x.globalAlpha = 1;
    webTex.needsUpdate = true;
  }

  /* sparks: every seal, and the vault at the end */
  const sparkEvents: { t: number; y: number; n: number; r: number; up: number; wide?: boolean }[] =
    T.sealAt.map((ts, g) => ({ t: ts, y: G.gapY[g], n: 70, r: G.tubeR + 0.04, up: 1.2 }));
  sparkEvents.push({ t: T.burst, y: G.vaultY1 + 0.08, n: 110, r: 0.9, up: 2.2, wide: true });
  sparkEvents.push({ t: T.power + 0.05, y: G.tubeTop, n: 30, r: G.tubeR + 0.03, up: 1.4 });
  const sparks: { t0: number; p: number[]; v: number[]; life: number }[] = [];
  const srnd = rng(77);
  sparkEvents.forEach((ev) => {
    for (let i = 0; i < ev.n; i++) {
      const a = srnd() * Math.PI * 2;
      const sp = (ev.wide ? 1.6 : 1.1) + srnd() * (ev.wide ? 2.4 : 2.2);
      const t0 = ev.t + srnd() * 0.06;
      const p = [Math.cos(a) * ev.r, ev.y + (srnd() - 0.5) * 0.12, Math.sin(a) * ev.r];
      const v = [Math.cos(a) * sp, ev.up * (0.4 + srnd() * 1.4), Math.sin(a) * sp];
      sparks.push({ t0, p, v, life: 0.45 + srnd() * 0.8 });
    }
  });
  const spGeo = new BufferGeometry();
  const spPos = new Float32Array(sparks.length * 3);
  const spCol = new Float32Array(sparks.length * 3);
  spGeo.setAttribute("position", new BufferAttribute(spPos, 3));
  spGeo.setAttribute("color", new BufferAttribute(spCol, 3));
  const SPARK_SIZE = 0.045;
  const spMat = new PointsMaterial({
    size: SPARK_SIZE,
    map: dot,
    vertexColors: true,
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
    sizeAttenuation: true,
  });
  const sparkPts = new Points(spGeo, spMat);
  sparkPts.frustumCulled = false;
  scene.add(sparkPts);

  /* out-of-focus dust: soft bokeh near the lens, specks far away */
  const drnd = rng(11);
  const dustN = 150;
  const dust: { x: number; y: number; z: number; s: number; ph: number; b: number }[] = [];
  for (let i = 0; i < dustN; i++) {
    const x = (drnd() - 0.5) * 12;
    const y = -2 + drnd() * 10;
    const z = -7 + drnd() * 11;
    const s = 0.1 + drnd() * 0.25;
    const ph = drnd() * 6.28;
    dust.push({ x, y, z, s, ph, b: 0.25 + drnd() * 0.75 });
  }
  const dGeo = new BufferGeometry();
  const dPos = new Float32Array(dustN * 3);
  const dCol = new Float32Array(dustN * 3);
  dGeo.setAttribute("position", new BufferAttribute(dPos, 3));
  dGeo.setAttribute("color", new BufferAttribute(dCol, 3));
  const DUST_SIZE = 0.07;
  const dustMat = new PointsMaterial({
    size: DUST_SIZE,
    map: dot,
    vertexColors: true,
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
    sizeAttenuation: true,
  });
  const dustPts = new Points(dGeo, dustMat);
  dustPts.frustumCulled = false;
  scene.add(dustPts);

  /* ---------- the theme ---------- */
  // Additive light only adds colour: it leaves the buffer's alpha alone, so
  // the alpha holds just the objects' cover, which the light theme's last
  // pass needs (the dark film never reads it). The same goes for the bloom
  // added on top.
  const lightOnly = (m: Material) => {
    if (m.blending !== AdditiveBlending) return;
    m.blending = CustomBlending;
    m.blendEquation = AddEquation;
    m.blendSrc = SrcAlphaFactor;
    m.blendDst = OneFactor;
    m.blendSrcAlpha = ZeroFactor;
    m.blendDstAlpha = OneFactor;
  };
  scene.traverse((o) => {
    const mat = (o as Partial<Mesh>).material;
    if (mat) for (const m of Array.isArray(mat) ? mat : [mat]) lightOnly(m);
  });
  lightOnly(bloom.materialCopy);

  // The light theme draws the scene on nothing and the page shows through
  // (see FINAL): no dark ground, no warm haze behind it, and the website
  // panel as a pale screen.
  function applyTheme() {
    renderer.setClearColor(light ? 0x000000 : 0x050403, light ? 0 : 1);
    fog.color.copy(light ? lightFog : darkFog);
    haze.visible = !light;
    webFrameMat.color.copy(light ? webFrameLight : webFrameDark);
    finalPass.uniforms.uLight.value = light ? 1 : 0;
    webDrawn = -1;
  }
  applyTheme();

  /* ---------- the words, from the server's markup ---------- */
  const layer = need(".vt-ref");
  const shade = need(".vt-shade");
  const capEls = qa(".vt-cap").map((p) => ({
    p,
    wide: qa(".vt-lines--wide .vt-l", p),
    tall: qa(".vt-lines--tall .vt-l", p),
    sub: p.querySelector<HTMLElement>(".vt-sub"),
  }));
  const count = need(".vt-count");
  const countDot = need("i", count);
  const countNum = need("b", count);
  const countWord = need("span", count);
  const labs = qa(".vt-lab").map((lab) => ({
    lab,
    p: need(".vt-lab-p", lab),
    f: need(".vt-lab-f", lab),
  }));
  const webTag = need(".vt-tag--web");
  const bankTag = need(".vt-tag--bank");
  const niche = heroVslNiches[nicheFromUrl()];
  const callCard = need(".vt-card--call");
  const textCard = need(".vt-card--text");
  const crmCard = need(".vt-card--crm");
  const cards = [callCard, textCard, crmCard];
  const callText = need("p", callCard);
  const callBars = qa("i", need(".vt-wave", callCard));
  const textBubble = need(".vt-bubble", textCard);
  const crmRows = qa(".vt-row", crmCard);
  const end = need(".vt-end");
  const stats = qa(".vt-stat").map((li, i) => {
    const num = li.querySelector<HTMLElement>(".vt-num");
    return {
      li,
      num,
      plus: li.querySelector<HTMLElement>(".vt-plus"),
      to: Number(num?.dataset.count) || 0,
      prefix: num?.dataset.prefix ?? "",
      at: i === 0 ? T.stats : T.statsSmall + (i - 1) * 0.18,
      dur: i === 0 ? 2.4 : 2.0,
    };
  });
  const headline = need(".vt-headline");
  const terms = need(".vt-terms");
  const ctas = need(".vt-ctas");
  const ctaLinks = qa(":scope > a", ctas);
  const controls = need(".vt-controls");
  const toggle = need<HTMLButtonElement>(".vt-toggle", controls);
  const skip = need<HTMLButtonElement>(".vt-skip", controls);
  const toggleLabel = need(".vt-toggle-label");

  // The business type's words, for a `?niche=` link.
  labs.forEach((l, g) => {
    l.p.textContent = niche.gaps[g];
  });
  textBubble.textContent = niche.text;
  need(".vt-lead", crmCard).textContent = niche.lead;
  const callFull = niche.call;
  const textFull = Array.from(niche.text);

  /* ---------- fitting the film to the screen ---------- */
  const L = {
    portrait: false,
    frame: WIDE as Frame,
    /** The screen in the frame's units, and how much of its height is on
     *  the first screen (less than `h` only where the hero runs taller than
     *  the screen, as on a phone on its side). */
    w: WIDE.w,
    h: WIDE.h,
    hv: WIDE.h,
    /** Frame units per CSS pixel's inverse: screen px = units * k. */
    k: 1,
    /** The header band, and where the frame sits on the screen. */
    head: WIDE.head,
    fx: 0,
    ft: 0,
    /** The frame inside the canvas, as a change to the camera's clip space. */
    sx: 1,
    ox: 0,
    sy: 1,
    oy: 0,
    /** Floors for small words on small screens (1 = as designed). */
    labScale: 1,
    cardScale: 1,
    /** Measured once per layout: each card's full height, each label's
     *  width, the vault's tag's size, and on tall screens where each
     *  headline ends. */
    cardH: [0, 0, 0],
    labW: [
      [0, 0],
      [0, 0],
      [0, 0],
    ],
    bank: [0, 0],
    capEnd: [0, 0, 0],
    /** Where the running count starts (x, y), and the play controls' top
     *  left corner: on tall screens the count sits at the bottom, over the
     *  controls in the corner, and the labels, the tags and the cards stay
     *  clear of both where they would meet. (The count's width changes with
     *  its words: `countRight`.) */
    count: [0, 0],
    ctrl: [0, 0],
    /** The screen pixels it was laid out for: width, height, and the
     *  height on the first screen. */
    width: 0,
    height: 0,
    heightOn: 0,
  };
  let lines: HTMLElement[][] = capEls.map((c) => c.wide);

  // Tall and wide frames place the website panel differently.
  function applyFrame(portrait: boolean) {
    const webW = portrait ? 1.55 : 1.9;
    if (portrait) WEBPOS.set(0.95, 3.25, -0.9);
    else WEBPOS.set(2.65, 3.95, -0.95);
    web.position.copy(WEBPOS);
    web.rotation.y = portrait ? -0.18 : -0.42;
    web.scale.set(webW, webW, 1);
    webBack.position.copy(WEBPOS).add(new Vector3(0.012, 0, -0.02));
    webBack.rotation.y = web.rotation.y;
    webBack.scale.set(webW, webW, 1);
    web.updateMatrixWorld();
    WEB_SRC.set(-0.5 + 130 / 1024, 0.645 * 0.5 - 0.645 * (348 / 660), 0.02).applyMatrix4(web.matrixWorld);
    root.dataset.orient = portrait ? "tall" : "wide";
    lines = capEls.map((c) => (portrait ? c.tall : c.wide));
    // the other set's lines go back to rest
    for (const c of capEls) {
      for (const l of portrait ? c.wide : c.tall) {
        l.style.transform = "";
        l.style.opacity = "";
        l.style.filter = "";
      }
    }
  }

  /** How much of the film's height `H` is on the first screen: all of it,
   *  unless the hero runs taller than the screen. */
  function firstScreen(H: number) {
    const top = root.getBoundingClientRect().top + window.scrollY;
    return Math.min(H, Math.max(window.innerHeight - top, H / 2));
  }

  function layout() {
    const W = root.clientWidth;
    const H = root.clientHeight;
    if (!W || !H) return false;
    // Where the hero runs taller than the screen, the frame fits the part on
    // the first screen and the scene carries on below it.
    const Hv = firstScreen(H);
    const portrait = W / Hv < 1.2;
    const frame = portrait ? TALL : WIDE;
    if (portrait !== L.portrait || L.width === 0) applyFrame(portrait);
    const k = Math.min(W / frame.w, Hv / frame.h);
    Object.assign(L, {
      portrait,
      frame,
      k,
      w: W / k,
      h: H / k,
      hv: Hv / k,
      head: HEADER_PX / k,
      width: W,
      height: H,
      heightOn: Hv,
    });
    L.fx = (L.w - frame.w) / 2;
    L.ft = (L.head + L.hv) / 2 - (frame.head + frame.h) / 2;
    L.sx = frame.w / L.w;
    L.ox = (frame.w + 2 * L.fx) / L.w - 1;
    L.sy = frame.h / L.h;
    L.oy = 1 - (frame.h + 2 * L.ft) / L.h;
    // Labels and the cards' words no smaller than 10px on screen.
    L.labScale = Math.max(1, 10 / (15 * k));
    L.cardScale = Math.max(1, 10 / (19 * k));

    layer.style.width = `${L.w.toFixed(2)}px`;
    layer.style.height = `${L.h.toFixed(2)}px`;
    layer.style.transform = `scale(${k.toFixed(5)})`;
    const vars: Record<string, number> = { k, fx: L.fx, ft: L.ft, fb: L.h - L.ft - frame.h, head: L.head };
    for (const [name, v] of Object.entries(vars)) {
      layer.style.setProperty(`--${name}`, name === "k" ? v.toFixed(5) : `${v.toFixed(2)}px`);
    }
    // The height below the first screen, in screen pixels, for what CSS
    // places from the bottom (the controls, and on tall screens the count
    // and the end card).
    root.style.setProperty("--below", `${(H - Hv).toFixed(1)}px`);

    // Each card's height with its words in full, to keep it on screen.
    callText.textContent = callFull;
    textBubble.textContent = niche.text;
    L.cardH = cards.map((c) => c.offsetHeight);
    L.labW = labs.map((l) => [l.p.offsetWidth, l.f.offsetWidth]);
    L.bank = [bankTag.offsetWidth, bankTag.offsetHeight];
    // On tall screens the headlines hang from just under the header (CSS).
    L.capEnd = capEls.map((c) => L.head + 46 + c.p.offsetHeight);
    // (Offsets are in the layer's own units, the frame's; the controls are
    // at screen size, outside the layer.)
    L.count = [count.offsetLeft, count.offsetTop];
    L.ctrl = [controls.offsetLeft / k, controls.offsetTop / k];
    countWidths.clear();
    lastText.clear();

    // Points are sized in the canvas's pixels; keep them in step with the
    // scene where the canvas shows more than the frame.
    spMat.size = SPARK_SIZE * L.sy;
    dustMat.size = DUST_SIZE * L.sy;

    // (setPixelRatio resizes the canvas too: only when it changes.)
    pr = pixelRatio();
    if (renderer.getPixelRatio() !== pr) renderer.setPixelRatio(pr);
    renderer.setSize(W, H, false);
    composer.setSize(W * pr, H * pr);
    if (lowQuality) bloom.setSize(Math.round((W * pr) / 2), Math.round((H * pr) / 2));
    (finalPass.uniforms.uRes.value as Vector2).set(W * pr, H * pr);
    return true;
  }

  /* ---------- camera ---------- */
  const tgt = new Vector3();
  function cameraAt(t: number) {
    const keys = L.portrait ? KEYS_TALL : KEYS_WIDE;
    let i = 0;
    while (i < keys.length - 1 && t > keys[i + 1].t) i++;
    const a = keys[i];
    const b = keys[Math.min(i + 1, keys.length - 1)];
    const u = a === b ? 0 : (b.e || E.inOutCubic)(clamp((t - a.t) / (b.t - a.t)));
    const n = (s: number) => (noise1(t * 0.45, s) - 0.5) * 0.05;
    camera.position.set(
      lerp(a.p[0], b.p[0], u) + n(1),
      lerp(a.p[1], b.p[1], u) + n(2),
      lerp(a.p[2], b.p[2], u) + n(3)
    );
    tgt.set(lerp(a.g[0], b.g[0], u), lerp(a.g[1], b.g[1], u), lerp(a.g[2], b.g[2], u));
    camera.fov = lerp(a.f, b.f, u);
    camera.aspect = L.frame.w / L.frame.h;
    camera.lookAt(tgt);
    camera.updateProjectionMatrix();
    const m = camera.projectionMatrix.elements;
    // lens shift: the machine sits right of the words (or under them)
    const endU = segE(t, T.end, T.end + 1.6);
    if (L.portrait) {
      m[9] += lerp(0.3, -0.07, endU);
      // during the fixes, the pipe moves left so the cards fit beside it
      const side = segE(t, 8.3, 9.0) * (1 - segE(t, 14.6, 15.6));
      m[8] += 0.32 * side;
    } else {
      m[8] -= lerp(0.3, 0.42, endU);
    }
    // then the frame takes its place inside the canvas
    for (let j = 0; j <= 12; j += 4) {
      m[j] = L.sx * m[j] + L.ox * m[j + 3];
      m[j + 1] = L.sy * m[j + 1] + L.oy * m[j + 3];
    }
    camera.projectionMatrixInverse.copy(camera.projectionMatrix).invert();
    camera.updateMatrixWorld();
  }

  /* ---------- coins ---------- */
  const m4 = new Matrix4();
  const q = new Quaternion();
  const q2 = new Quaternion();
  const qFlat = new Quaternion().setFromEuler(new Euler(Math.PI / 2, 0, 0));
  const eul = new Euler();
  const pos = new Vector3();
  const scl = new Vector3();
  const col = new Color();
  const v3 = new Vector3();
  const red = new Color(0.85, 0.18, 0.1);
  const dark = new Color(0.18, 0.05, 0.03);

  function sourceStart(c: Coin) {
    if (c.src === 3) return WEB_SRC;
    const d = G.drop[c.src];
    return v3.set(d[0], G.tileY - 0.2, d[1] + 0.05);
  }
  function coneY(r: number) {
    return (
      G.tubeTop +
      Math.pow(clamp((r - G.tubeR) / (G.funnelR - G.tubeR)), 1 / 1.35) * (G.funnelTop - G.tubeTop)
    );
  }
  function coinAt(c: Coin, t: number) {
    let s = 1;
    if (t < c.t0) return false;
    const u = (t - c.t0) / c.inDur;
    if (t < c.tMouth) {
      // from the source into the funnel, then a swirl down to the pipe
      const start = sourceStart(c);
      const isWeb = c.src === 3;
      const split = isWeb ? 0.55 : 0.3;
      const land = isWeb ? WEB_LAND : G.drop[c.src];
      const r0 = Math.hypot(land[0], land[1]) * 0.92;
      const a0 = Math.atan2(land[1], land[0]);
      if (u < split) {
        const v = u / split;
        const ly = coneY(r0) + 0.04;
        const lx = Math.cos(a0) * r0;
        const lz = Math.sin(a0) * r0;
        if (isWeb) {
          const e = E.inOutQuad(v);
          const cx = (start.x + lx) / 2 + 0.2;
          const cy = Math.max(start.y, ly) + 0.9;
          const cz = (start.z + lz) / 2 + 0.2;
          const ia = 1 - e;
          pos.set(
            ia * ia * start.x + 2 * ia * e * cx + e * e * lx,
            ia * ia * start.y + 2 * ia * e * cy + e * e * ly,
            ia * ia * start.z + 2 * ia * e * cz + e * e * lz
          );
          s = 0.3 + 0.7 * E.outCubic(clamp(v / 0.3));
        } else {
          const e = E.inQuad(v);
          pos.set(lerp(start.x, lx, E.outQuad(v)), lerp(start.y, ly, e), lerp(start.z, lz, E.outQuad(v)));
          s = E.outBack(clamp(v / 0.35));
        }
        eul.set(0.3 + Math.sin(c.wob + t * 3) * 0.3, c.phase + t * c.spin, 0);
      } else {
        const v = (u - split) / (1 - split);
        const r = r0 * Math.pow(1 - v, 1.25);
        const a = a0 + v * Math.PI * 1.7;
        pos.set(
          Math.cos(a) * Math.max(r, 0.001),
          coneY(Math.max(r, G.tubeR)) - (r < G.tubeR ? (G.tubeR - r) * 0.6 : 0),
          Math.sin(a) * r
        );
        eul.set(0.25, -a + Math.PI / 2, 0.55 * (1 - v));
      }
      q.setFromEuler(eul);
    } else if (c.leak >= 0 && t >= c.tGap) {
      // out through the crack, tumbling, into the dark
      const dt = t - c.tGap;
      if (dt > 2.2) return false;
      const d = G.gapDir[c.leak];
      pos.set(
        d * (G.tubeR * 0.6 + c.vx * dt - 0.12 * dt * dt),
        G.gapY[c.leak] + c.vy * dt - 0.5 * 6.2 * dt * dt,
        c.vz * dt
      );
      q.setFromAxisAngle(c.ax, c.rs * dt);
      q2.setFromEuler(eul.set(0, c.phase, 0));
      q.multiply(q2);
      s = dt > 1.6 ? 1 - E.inQuad((dt - 1.6) / 0.6) : 1;
      col.copy(white).lerp(red, clamp(dt / 0.55));
      if (dt > 0.55) col.lerp(dark, clamp((dt - 0.55) / 1.0));
    } else if (c.leak >= 0 || t < c.tOut) {
      // down the pipe, spinning
      const y = G.tubeTop - (t - c.tMouth) * G.speed;
      pos.set(Math.sin(c.phase + t * 2) * 0.035, y, Math.cos(c.phase + t * 2) * 0.03);
      eul.set(Math.sin(c.wob + t * 4) * 0.25, c.phase + t * c.spin, 0);
      q.setFromEuler(eul);
    } else {
      // into the vault and onto a stack
      const dt = t - c.tOut;
      const v = clamp(dt / 0.5);
      const e = E.inOutCubic(v);
      const arc = Math.sin(v * Math.PI) * 0.18;
      pos.set(lerp(0, c.sx, e), lerp(G.tubeOut, c.sy, E.inQuad(v)) + arc, lerp(0, c.sz, e));
      if (v >= 1) {
        const settle = dt < 0.75 ? Math.sin((dt - 0.5) * 40) * 0.006 * (1 - (dt - 0.5) / 0.25) : 0;
        pos.y = c.sy + Math.max(0, settle);
      }
      q.setFromEuler(eul.set(0, c.phase + c.tOut * c.spin, 0));
      q2.setFromEuler(eul.set(0, c.sRot, 0)).multiply(qFlat);
      q.slerp(q2, e);
    }
    if (!(c.leak >= 0 && t >= c.tGap)) col.copy(white);
    scl.set(s, s, s);
    return true;
  }

  function renderCoins(t: number) {
    for (let i = 0; i < P.coins.length; i++) {
      if (coinAt(P.coins[i], t)) {
        m4.compose(pos, q, scl);
      } else {
        m4.makeScale(0, 0, 0);
        col.copy(white);
      }
      coins.setMatrixAt(i, m4);
      coins.setColorAt(i, col);
    }
    coins.instanceMatrix.needsUpdate = true;
    if (coins.instanceColor) coins.instanceColor.needsUpdate = true;
  }

  /* ---------- per-frame effects ---------- */
  function sumPulses(times: number[], t: number, tau: number, win = 1.2) {
    let p = 0;
    for (let j = times.length - 1; j >= 0; j--) {
      const d = t - times[j];
      if (d < 0) continue;
      if (d > win) break;
      p += Math.exp(-d / tau);
    }
    return p;
  }
  const spawnBySrc = [0, 1, 2].map((s) => P.coins.filter((c) => c.src === s).map((c) => c.t0));
  const leakBy = [0, 1, 2].map((g) =>
    P.coins
      .filter((c) => c.leak === g)
      .map((c) => c.tGap)
      .sort((a, b) => a - b)
  );

  function levelAt(t: number) {
    let n = 0;
    for (const d of P.banked) if (d <= t) n++;
    return n / Math.max(1, P.banked.length);
  }

  function renderFx(t: number) {
    // source tiles flare as each lead arrives
    tiles.forEach((tl, i) => {
      const p = Math.min(1.5, sumPulses(spawnBySrc[i], t, 0.16));
      const on = segE(t, -1, 0.6);
      tl.iconMat.color.setRGB(1.3 + p * 2.2, 1.12 + p * 1.7, 0.85 + p * 1.0).multiplyScalar(on);
      tl.halo.material.color.setRGB(0.2 + p * 0.9, 0.14 + p * 0.6, 0.05 + p * 0.25);
    });
    // the leaks: red light at each crack, until the power comes on
    gapFx.forEach((fx, g) => {
      const leaking = 1 - segE(t, T.power, T.power + 0.5);
      const hit = Math.min(1.4, sumPulses(leakBy[g], t, 0.14));
      const flick = 0.55 + 0.45 * noise1(t * 9 + g * 3, 5);
      const k = leaking * (0.18 * flick + hit * 0.9);
      fx.red.material.color.setRGB(k * 1.5, k * 0.3, k * 0.2);
      // the gold film that catches everything once the automations are on
      const filmOn =
        segE(t, T.power + 0.35 + g * 0.12, T.power + 0.8 + g * 0.12) *
        (1 - segE(t, T.sealAt[g] - 0.15, T.sealAt[g] + 0.05));
      fx.film.material.uniforms.uInt.value = filmOn * (0.9 + 0.3 * Math.sin(t * 14 + g));
      // the clamp: in from wide, snaps shut, glows, settles
      const c0 = T.sealAt[g] - 0.42;
      if (t < c0) {
        fx.clampG.visible = false;
      } else {
        fx.clampG.visible = true;
        const u = clamp((t - c0) / 0.42);
        const r =
          lerp(2.2, 1, E.outCubic(u)) +
          (u >= 1 ? Math.exp(-(t - T.sealAt[g]) * 9) * Math.sin((t - T.sealAt[g]) * 50) * 0.03 : 0);
        fx.clampG.scale.set(r, lerp(0.3, 1, E.outCubic(u)), r);
        fx.clampG.rotation.y = (1 - E.outCubic(u)) * 2.4 + g;
        fx.clampMat.emissiveIntensity =
          t >= T.sealAt[g] ? 1.1 * Math.exp(-(t - T.sealAt[g]) / 0.3) + 0.06 : 0.25 * u;
      }
      // flash and shockwave as it seals
      const ds = t - T.sealAt[g];
      if (ds >= 0 && ds < 1) {
        const f = Math.exp(-ds / 0.1) * 1.5;
        fx.flash.material.color.setRGB(f, f * 0.8, f * 0.45);
        const sc = 0.5 + 1.3 * E.outCubic(clamp(ds / 0.5));
        fx.flash.scale.set(sc, sc * 0.75, 1);
        const ru = E.outCubic(clamp(ds / 0.7));
        fx.ring.scale.setScalar(0.3 + ru * 0.85);
        const rk = Math.pow(1 - ru, 1.5) * 1.1;
        fx.ringMat.color.setRGB(rk, rk * 0.75, rk * 0.4);
      } else {
        fx.flash.material.color.setRGB(0, 0, 0);
        fx.ringMat.color.setRGB(0, 0, 0);
      }
    });
    // power-on: a ring of light runs down the pipe
    const pu = seg(t, T.power, T.power + 0.95);
    pulse.visible = pulseGlow.visible = pu > 0 && pu < 1;
    if (pu > 0 && pu < 1) {
      const y = lerp(G.tubeTop + 0.1, G.vaultY1, E.inQuad(pu));
      pulse.position.y = y;
      pulseGlow.position.set(0, y, 0.05);
      const k = Math.sin(pu * Math.PI) * 3;
      pulseMat.color.setRGB(k, k * 0.8, k * 0.45);
      pulseGlow.material.color.setRGB(k * 0.12, k * 0.09, k * 0.045);
    } else {
      pulseMat.color.setRGB(0, 0, 0);
      pulseGlow.material.color.setRGB(0, 0, 0);
    }
    glassRim.uniforms.uInt.value = 0.32 + 0.16 * segE(t, T.power, T.power + 1.2);
    topBeamMat.uniforms.uInt.value =
      0.09 + 0.06 * segE(t, T.power, T.power + 1) - 0.09 * segE(t, T.end, T.end + 1.5);

    // the vault fills
    const lvl = levelAt(t);
    const dep = Math.min(1.2, sumPulses(P.banked, t, 0.2));
    vaultLight.intensity =
      0.4 + lvl * 3.2 + dep * 0.8 + 3 * Math.exp(-Math.max(0, t - T.burst) / 0.5) * (t >= T.burst ? 1 : 0);
    const vg = 0.12 + lvl * 0.55 + dep * 0.15;
    vaultGlow.material.color.setRGB(vg, vg * 0.72, vg * 0.35);
    const fp = 0.05 + lvl * 0.25;
    floorPoolMat.color.setRGB(fp, fp * 0.7, fp * 0.32);
    // the column of light at the end
    const lu = t - T.burst;
    liftMat.uniforms.uInt.value = lu < 0 ? 0 : Math.min(1, lu / 0.25) * (0.3 + 0.7 * Math.exp(-lu / 0.9)) * 0.5;
    lift.scale.set(1, 0.4 + 0.6 * E.outCubic(clamp(lu / 0.6)), 1);
    lift.position.y = G.vaultY1 + 4.5 * lift.scale.y;

    // the website panel
    const wu = seg(t, T.web, T.web + 1.6);
    web.visible = webBack.visible = wu > 0;
    if (wu > 0) {
      drawWeb(wu);
      const fade = 1 - segE(t, T.end, T.end + 0.9);
      webMat.opacity = E.outCubic(clamp(wu / 0.2)) * fade;
      webFrameMat.opacity = 0.75 * E.outCubic(clamp(wu / 0.3)) * fade;
      const lift2 = (1 - E.outCubic(clamp(wu / 0.4))) * 0.25;
      web.position.y = WEBPOS.y - lift2;
      webBack.position.y = WEBPOS.y - lift2;
    }

    // sparks
    for (let i = 0; i < sparks.length; i++) {
      const s = sparks[i];
      const d = t - s.t0;
      const o = i * 3;
      if (d < 0 || d > s.life) {
        spPos[o] = 0;
        spPos[o + 1] = -999;
        spPos[o + 2] = 0;
        continue;
      }
      spPos[o] = s.p[0] + s.v[0] * d;
      spPos[o + 1] = s.p[1] + s.v[1] * d - 0.5 * 7.5 * d * d;
      spPos[o + 2] = s.p[2] + s.v[2] * d;
      const k = Math.pow(1 - d / s.life, 1.6) * 7;
      spCol[o] = k;
      spCol[o + 1] = k * (0.55 + 0.35 * (1 - d / s.life));
      spCol[o + 2] = k * 0.25 * (1 - d / s.life);
    }
    spGeo.attributes.position.needsUpdate = true;
    spGeo.attributes.color.needsUpdate = true;

    // dust drifting up through the light
    for (let i = 0; i < dustN; i++) {
      const p = dust[i];
      const o = i * 3;
      const yy = -2 + ((p.y + 2 + t * 0.09 * (0.5 + p.s)) % 10);
      dPos[o] = p.x + Math.sin(p.ph + t * 0.3) * 0.15;
      dPos[o + 1] = yy;
      dPos[o + 2] = p.z;
      const tw = p.b * (0.55 + 0.45 * Math.sin(p.ph + t * 1.3));
      dCol[o] = 0.55 * tw;
      dCol[o + 1] = 0.4 * tw;
      dCol[o + 2] = 0.18 * tw;
    }
    dGeo.attributes.position.needsUpdate = true;
    dGeo.attributes.color.needsUpdate = true;

    // grade
    finalPass.uniforms.uTime.value = t;
    let sealKick = 0;
    for (const s of T.sealAt) if (t >= s) sealKick = Math.max(sealKick, Math.exp(-(t - s) / 0.12));
    finalPass.uniforms.uCA.value =
      0.0015 + 0.01 * sealKick + 0.012 * (t >= T.power ? Math.exp(-(t - T.power) / 0.15) : 0);
    finalPass.uniforms.uExposure.value =
      1.0 + 0.12 * segE(t, T.burst - 0.3, T.burst + 0.4) - 0.06 * segE(t, T.burst + 0.4, T.burst + 2.5);
  }

  /* ---------- the words ---------- */
  const proj = new Vector3();
  const at: [number, number] = [0, 0];
  /** Where a point in the scene is on screen, in the frame's units. (The
   *  same pair each time, to be read at once: nothing new each frame.) */
  function toLayer(x: number, y: number, z: number) {
    proj.set(x, y, z).project(camera);
    at[0] = (proj.x * 0.5 + 0.5) * L.w;
    at[1] = (-proj.y * 0.5 + 0.5) * L.h;
    return at;
  }
  const lastText = new Map<HTMLElement, string>();
  const setText = (el: HTMLElement, s: string) => {
    if (lastText.get(el) !== s) {
      el.textContent = s;
      lastText.set(el, s);
    }
  };
  const style = (el: HTMLElement, o: number, tf: string, blur: number) => {
    el.style.opacity = o >= 0.999 ? "" : o.toFixed(3);
    el.style.transform = tf;
    el.style.filter = blur > 0.05 ? `blur(${blur.toFixed(2)}px)` : "";
    el.style.visibility = o <= 0.001 ? "hidden" : "";
  };

  // Money lost, in red, a step for each coin out of a crack, up to
  // LOSS_END; it holds once the automations are on. Then money recovered,
  // in gold, from LOSS_END towards RECOVERED_END, a step for each coin that
  // lands in the vault. It never goes down. (Into the same object each
  // frame.)
  const countNow = { gain: false, amount: 0, kick: 0 };
  function counterValue(t: number) {
    const gain = t >= T.flip;
    const list = gain ? P.gains : P.leaks;
    let n = 0;
    let last = -99;
    for (let i = 0; i < list.length && list[i] <= t; i++) {
      n++;
      last = list[i];
    }
    const share = list.length ? n / list.length : 1;
    let amount = gain ? LOSS_END + (RECOVERED_END - LOSS_END) * share : LOSS_END * share;
    // Round the steps to $10; the last one lands on the exact amount.
    if (share < 1) amount = Math.round(amount / 10) * 10;
    countNow.gain = gain;
    countNow.amount = amount;
    countNow.kick = Math.exp(-Math.max(0, t - last) / 0.09);
    return countNow;
  }

  let ctasOn: boolean | null = null;
  // Each fix card's place this frame, in the frame's units, how far in and
  // out it is, and the room under it (it rises into place from up to 24
  // below, never through what is under it).
  const cardAt = cards.map(() => ({ o: 0, iu: 0, ou: 0, x: 0, y: 0, room: 0 }));

  // The website panel's box on screen, in the frame's units: x0, y0, x1, y1.
  const corner = new Vector3();
  const box = [0, 0, 0, 0];
  function panelBox() {
    box[0] = box[1] = Infinity;
    box[2] = box[3] = -Infinity;
    for (const [cx, cy] of PANEL_CORNERS) {
      corner.set(cx, cy, 0).applyMatrix4(web.matrixWorld);
      const [x, y] = toLayer(corner.x, corner.y, corner.z);
      box[0] = Math.min(box[0], x);
      box[1] = Math.min(box[1], y);
      box[2] = Math.max(box[2], x);
      box[3] = Math.max(box[3], y);
    }
    return box;
  }

  // The count's width for each shape its words take, measured the first
  // time it shows at this size (its digits are all one width, so that is
  // only a few), and where its right edge is this frame, with a gap that
  // also covers the few per cent it grows by as each coin lands.
  const countWidths = new Map<string, number>();
  let countRight = 0;
  function measureCount(num: string, word: string) {
    const key = `${num.length} ${word}`;
    let w = countWidths.get(key);
    if (w === undefined) {
      w = count.offsetWidth;
      countWidths.set(key, w);
    }
    countRight = L.count[0] + w + 16;
  }

  // How low a word's box from x0 to x1 across (in the frame's units) may
  // reach: `base`, or less where it would meet the play controls in the
  // bottom corner or, on tall screens, the running count above them, with a
  // small gap.
  function floorAt(x0: number, x1: number, base: number) {
    let f = base;
    if (x1 > L.ctrl[0] - 8 / L.k) f = Math.min(f, L.ctrl[1] - 8 / L.k);
    if (L.portrait && x1 > L.count[0] && x0 < countRight) f = Math.min(f, L.count[1] - 8);
    return f;
  }

  function renderDom(t: number) {
    // headlines: masked lines rise in, then lift and blur out
    capEls.forEach((cap, i) => {
      const [a, b] = T.caps[i];
      const vis = t >= a - 0.01 && t <= b + 0.6;
      cap.p.style.visibility = vis ? "" : "hidden";
      if (!vis) return;
      lines[i].forEach((l, j) => {
        const inn = E.outQuart(seg(t, a + j * 0.11, a + j * 0.11 + 0.75));
        const out = E.inCubic(seg(t, b - 0.1 + j * 0.05, b + 0.4 + j * 0.05));
        l.style.transform = `translate3d(0,${((1 - inn) * 108 - out * 30).toFixed(2)}%,0)`;
        l.style.opacity = (1 - out).toFixed(3);
        l.style.filter = out > 0.01 ? `blur(${(out * 8).toFixed(2)}px)` : "";
      });
      if (cap.sub) {
        const si = E.outCubic(seg(t, T.cap3b, T.cap3b + 0.7));
        const so = E.inCubic(seg(t, b, b + 0.45));
        style(cap.sub, si * (1 - so), `translate3d(0,${((1 - si) * 14).toFixed(2)}px,0)`, (1 - si) * 6 + so * 6);
      }
    });

    // the count
    const cv = counterValue(t);
    const cIn = E.outCubic(seg(t, 0.6, 1.3));
    const cOut = E.inCubic(seg(t, T.end - 0.2, T.end + 0.4));
    const frozen = t >= T.power && t < T.flip;
    const flipU = seg(t, T.flip - 0.16, T.flip + 0.26);
    const flipAng = flipU < 0.38 ? (flipU / 0.38) * 90 : (1 - (flipU - 0.38) / 0.62) * -90;
    const mode = cv.gain ? "gain" : "lost";
    if (count.dataset.mode !== mode) count.dataset.mode = mode;
    const num = (cv.gain ? "+$" : "−$") + fmt(cv.amount);
    const word = cv.gain ? "recovered" : "lost";
    setText(countNum, num);
    setText(countWord, word);
    if (L.portrait) measureCount(num, word);
    style(
      count,
      cIn * (1 - cOut) * (frozen ? 0.6 : 1),
      `perspective(600px) rotateX(${flipU > 0 && flipU < 1 ? flipAng.toFixed(1) : 0}deg) scale(${(1 + 0.04 * cv.kick).toFixed(3)})`,
      0
    );
    countNum.style.filter = cv.kick > 0.02 ? `brightness(${(1 + 0.6 * cv.kick).toFixed(2)})` : "";
    countDot.style.opacity = t < T.power ? (0.5 + 0.5 * Math.sin(t * 7)).toFixed(2) : "1";

    // Labels, tags and cards stay below the header, and on tall screens
    // below the headline that is up. At the bottom they stay clear of the
    // play controls, and on tall screens of the running count over them,
    // only where they would meet (`floorAt`): beside those they go lower.
    let top = L.head + 20;
    if (L.portrait) {
      let i = 0;
      while (i < T.caps.length - 1 && t >= T.caps[i + 1][0] - 0.01) i++;
      top = L.capEnd[i] + 16;
    }
    // Each label reads from the pipe's right. It moves to the left where the
    // right has no room for it, or on tall screens where the website panel
    // would cover it, and never runs off the screen (12px clear of its edge
    // on a phone).
    const panel = L.portrait && web.visible ? panelBox() : null;
    // The fix cards' places come first: a label that a card lands on (on a
    // short phone, where the card can't sit below its crack) gives way to
    // it, and the card's heading says the same.
    const cs = L.cardScale;
    const cw = 360 * cs;
    cardAt.forEach((c, g) => {
      const [a, b] = T.cards[g];
      c.iu = E.outQuart(seg(t, a, a + 0.5));
      c.ou = E.inCubic(seg(t, b - 0.3, b));
      c.o = c.iu * (1 - c.ou);
      if (c.o <= 0.001) return;
      const [x, y] = toLayer(G.tubeR + 0.12, G.gapY[g], 0);
      c.x = L.portrait
        ? Math.min(Math.max(x + 70, L.fx + 420), L.w - cw - 12)
        : Math.max(L.fx + 760, Math.min(L.w - cw - 40, x + 26));
      const floor = floorAt(c.x, c.x + cw, L.hv - 24);
      c.y = clamp(y + 34, top, floor - L.cardH[g] * cs);
      c.room = Math.max(0, floor - c.y - L.cardH[g] * cs);
    });
    const ls = L.labScale;
    const margin = Math.max(12, 12 / L.k);
    const labOut = 1 - E.inCubic(seg(t, T.end - 0.3, T.end + 0.3));
    labs.forEach((lb, g) => {
      const flip = seg(t, T.sealAt[g] - 0.05, T.sealAt[g] + 0.35);
      // the width of the half that shows: the problem, then the fix
      const w = L.labW[g][flip < 0.5 ? 0 : 1] * ls;
      const [xr, y] = toLayer(G.tubeR + 0.12, G.gapY[g], 0);
      const covered =
        !!panel && xr + 26 + w > panel[0] && xr + 26 < panel[2] && y + 10 * ls > panel[1] && y - 10 * ls < panel[3];
      let left = covered || xr + 26 + w > L.w - margin;
      let lx = xr + 26;
      if (left) {
        const [xl] = toLayer(-(G.tubeR + 0.12), G.gapY[g], 0);
        if (xl - 26 - w >= margin || covered) lx = Math.max(xl - 26, margin + w);
        else left = false;
      }
      if (!left) lx = Math.min(lx, L.w - margin - w);
      if (lb.lab.classList.contains("is-left") !== left) lb.lab.classList.toggle("is-left", left);
      const inU = E.outCubic(seg(t, 1.2 + g * 0.35, 1.9 + g * 0.35));
      const x0 = left ? lx - w : lx;
      const low = y < L.hv - 40 && y + 8 * ls < floorAt(x0, x0 + w, Infinity);
      const edge = xr > 40 && xr < L.w - 40 && y > top && low ? 1 : 0;
      let under = 0;
      cardAt.forEach((c, j) => {
        if (c.o <= 0.001 || x0 + w <= c.x || x0 >= c.x + cw) return;
        if (y + 8 * ls > c.y && y - 8 * ls < c.y + L.cardH[j] * cs) under = Math.max(under, c.o);
      });
      const o = inU * edge * labOut * (1 - under);
      lb.lab.style.transform = `translate3d(${lx.toFixed(1)}px,${(y - 8 * ls).toFixed(1)}px,0) scale(${ls.toFixed(3)})`;
      lb.lab.style.opacity = o.toFixed(3);
      lb.lab.style.visibility = o > 0.001 ? "" : "hidden";
      style(lb.p, 1 - E.inCubic(clamp(flip * 2)), "", flip * 5);
      style(lb.f, E.outCubic(clamp(flip * 1.6 - 0.4)), "", (1 - clamp(flip * 1.6 - 0.4)) * 4);
    });
    {
      const [x, y] = toLayer(WEBPOS.x, WEBPOS.y + (L.portrait ? 0.62 : 0.72), WEBPOS.z);
      const inView = y - 20 > top && x - 40 > 0 ? 1 : 0;
      const o = E.outCubic(seg(t, T.web + 0.9, T.web + 1.5)) * labOut * inView;
      webTag.style.transform = `translate3d(${(x - 40).toFixed(1)}px,${(y - 20 * L.labScale).toFixed(1)}px,0) scale(${L.labScale.toFixed(3)})`;
      webTag.style.opacity = o.toFixed(3);
      webTag.style.visibility = o > 0.001 ? "" : "hidden";
    }
    {
      // Its two lines hang from just above the vault's right edge.
      const [x, y] = toLayer(G.vaultR + 0.2, 0.0, 0.3);
      const x1 = x + 10 + L.bank[0] * ls;
      const y1 = y - 18 * ls + L.bank[1] * ls;
      const fits = x1 < L.w - margin && y < L.hv - 40 && y1 < floorAt(x + 10, x1, Infinity);
      const inView = fits && y > top ? 1 : 0;
      const o = E.outCubic(seg(t, 2, 2.8)) * labOut * inView;
      bankTag.style.transform = `translate3d(${(x + 10).toFixed(1)}px,${(y - 18 * L.labScale).toFixed(1)}px,0) scale(${L.labScale.toFixed(3)})`;
      bankTag.style.opacity = o.toFixed(3);
      bankTag.style.visibility = o > 0.001 ? "" : "hidden";
    }

    // the fix cards, beside each crack while the camera is close
    cards.forEach((el, g) => {
      const a = T.cards[g][0];
      const { iu, ou, o, x: cx, y: cy, room } = cardAt[g];
      el.style.visibility = o > 0.001 ? "" : "hidden";
      if (o <= 0.001) return;
      const rise = (1 - iu) * Math.min(24, room) - ou * 10;
      el.style.transform = `translate3d(${cx.toFixed(1)}px,${(cy + rise).toFixed(1)}px,0) scale(${(cs * (0.96 + 0.04 * iu)).toFixed(3)})`;
      el.style.opacity = o.toFixed(3);
      const blur = (1 - iu) * 6 + ou * 6;
      el.style.filter = blur > 0.05 ? `blur(${blur.toFixed(2)}px)` : "";
      if (g === 0) {
        const typed = Math.floor(callFull.length * E.linear(seg(t, a + 0.35, a + 1.0)));
        setText(callText, callFull.slice(0, typed));
        callBars.forEach((bar, j) => {
          const amp = 0.18 + 0.82 * Math.abs(Math.sin(t * 9 + j * 0.7)) * noise1(t * 6 + j * 0.9, 4);
          bar.style.transform = `scaleY(${(amp * (t < a + 1.0 ? 1 : 0.5)).toFixed(3)})`;
        });
      } else if (g === 1) {
        const typed = Math.floor(textFull.length * seg(t, a + 0.3, a + 0.85));
        setText(textBubble, textFull.slice(0, typed).join(""));
        textBubble.style.visibility = typed > 0 ? "" : "hidden";
      } else {
        crmRows.forEach((r, j) => {
          const ru = E.outCubic(seg(t, a + 0.3 + j * 0.16, a + 0.65 + j * 0.16));
          r.style.opacity = ru.toFixed(3);
          r.style.transform = `translate3d(${((1 - ru) * 16).toFixed(1)}px,0,0)`;
        });
      }
    });

    // the end card
    const endOn = t >= T.stats - 0.2;
    end.style.visibility = endOn ? "" : "hidden";
    shade.style.opacity = (0.75 + 0.25 * segE(t, T.end, T.end + 1.2)).toFixed(3);
    if (endOn) {
      stats.forEach((s, i) => {
        const si = E.outQuart(seg(t, s.at, s.at + (i === 0 ? 0.9 : 0.8)));
        const rise = i === 0 ? 30 : 22;
        const zoom = i === 0 ? ` scale(${(0.96 + 0.04 * si).toFixed(3)})` : "";
        style(s.li, si, `translate3d(0,${((1 - si) * rise).toFixed(1)}px,0)${zoom}`, (1 - si) * (i === 0 ? 10 : 8));
        if (!s.num) return;
        const cu = E.outCubic(seg(t, s.at, s.at + s.dur));
        setText(s.num, s.prefix + fmt(s.to * cu));
        if (s.plus) s.plus.style.visibility = cu >= 1 ? "" : "hidden";
      });
      const hi = E.outQuart(seg(t, T.head, T.head + 0.8));
      style(headline, hi, `translate3d(0,${((1 - hi) * 18).toFixed(1)}px,0)`, (1 - hi) * 8);
      const ti = E.outQuart(seg(t, T.head + 0.3, T.head + 1.0));
      style(terms, ti, `translate3d(0,${((1 - ti) * 12).toFixed(1)}px,0)`, 0);
      ctaLinks.forEach((b, j) => {
        const bi = E.outQuart(seg(t, T.ctas + j * 0.15, T.ctas + 0.7 + j * 0.15));
        style(b, bi, `translate3d(0,${((1 - bi) * 14).toFixed(1)}px,0)`, 0);
      });
    }
    const on = t >= CTAS_ON;
    if (on !== ctasOn) {
      ctasOn = on;
      ctas.inert = !on;
    }
  }

  /* ---------- a frame ---------- */
  function renderAt(t: number) {
    cameraAt(t);
    renderCoins(t);
    renderFx(t);
    composer.render();
    renderDom(t);
  }

  /* ---------- the clock: play, pause, finish ---------- */
  let t = 0;
  let inView = false;
  let pageVisible = document.visibilityState === "visible";
  // Nothing plays until the page asks (`start`), and not after `stop`.
  let armed = false;
  let userPaused = false;
  let started = false;
  let done = false;
  let destroyed = false;
  let state: FilmState | "" = "";
  let raf = 0;
  let last = 0;
  // A second of playback at a time, to see whether this device keeps up.
  let probe: { from: number; frames: number } | null = null;
  let probed = false;
  // The browser took the WebGL context away (a phone short of memory, with
  // the tab in the background): nothing draws until it gives it back.
  let lost = false;
  let lostTimer = 0;
  // It can't carry on here (`fail`), for good.
  let failed = false;
  // The canvas and the buffers behind it are put away between plays (`stop`)
  // and a resize then waits for the next `start`.
  let stale = false;

  function setState(s: FilmState) {
    if (s === state) return;
    state = s;
    root.dataset.state = s;
    toggleLabel.textContent = LABELS[s];
  }

  function running() {
    if (!armed || !inView || !pageVisible || userPaused || destroyed || lost || failed) return false;
    // After the end, the scene keeps breathing while the end card holds,
    // on a device with frames to spare.
    return !done || (!reducedQuery.matches && !lowQuality && t < DUR + IDLE_AFTER);
  }

  function frame(now: number) {
    raf = 0;
    if (!running()) {
      last = 0;
      return;
    }
    const dt = last ? Math.min(0.25, (now - last) / 1000) : 0;
    last = now;
    t += dt;
    // Before the draw: a switch to the lighter film resizes the canvas,
    // which empties it. (Given up on, the last frame drawn stays.)
    measure(now);
    if (failed) return;
    const ended = !done && t >= DUR;
    if (ended) done = true;
    renderAt(t);
    if (ended) finish();
    if (running()) raf = requestAnimationFrame(frame);
    else last = 0;
  }

  // A device that draws fewer than about 40 frames a second here gets a
  // lighter film: one pixel per CSS pixel, and bloom at half size. One that
  // still draws fewer than about 20 after that can't play it: the film
  // stops there and the player puts the hero back, rather than keep the
  // page that busy for the whole film. Each is timed over a second of
  // playback, the first once the hero's words have gone (their blur costs
  // frames too).
  function measure(now: number) {
    if (probed || t < 0.6) return;
    if (!probe) {
      probe = { from: now, frames: 0 };
      return;
    }
    probe.frames++;
    const span = now - probe.from;
    if (span < 1000) return;
    const fps = (probe.frames * 1000) / span;
    probe = null;
    if (lowQuality) {
      probed = true;
      if (fps < 20) fail();
    } else if (fps < 40) {
      lowQuality = true;
      layout();
    } else {
      probed = true;
    }
  }

  // Stops for good, and tells the player.
  function fail() {
    if (failed || destroyed) return;
    failed = true;
    window.clearTimeout(lostTimer);
    sync();
    opts.onFail?.();
  }

  function sync() {
    if (destroyed) return;
    const go = running();
    if (go && !raf) {
      started = true;
      raf = requestAnimationFrame(frame);
    } else if (!go && raf) {
      cancelAnimationFrame(raf);
      raf = 0;
      last = 0;
    }
    if (!go) probe = null;
    if (done) setState("done");
    else if (go) setState("playing");
    else setState(userPaused ? "paused" : started ? "waiting" : "idle");
  }

  function finish() {
    setState("done");
    opts.onDone?.();
  }

  function restartAt(time: number) {
    done = false;
    userPaused = false;
    t = time;
    renderAt(t);
  }

  /* ---- listeners ---- */

  function onToggle() {
    // At the end there is nothing to pause; replaying is the player's.
    if (done) return;
    userPaused = state === "playing" || state === "waiting";
    sync();
  }

  // Straight to the end of the end card, as the skip button does.
  function skipToEnd() {
    if (done || !armed || failed) return;
    t = DUR;
    done = true;
    renderAt(t);
    sync();
    finish();
  }

  function onVisibility() {
    pageVisible = document.visibilityState === "visible";
    watchLost();
    sync();
  }

  // A resize redraws the current frame at the new size, once per frame.
  // Always: the new size empties the canvas, including a frame just drawn
  // in this same refresh. While the film is put away it only waits.
  let resizeRaf = 0;
  function onResize() {
    if (destroyed || failed) return;
    if (!armed) {
      stale = true;
      return;
    }
    if (resizeRaf) return;
    resizeRaf = requestAnimationFrame(() => {
      resizeRaf = 0;
      if (destroyed || failed) return;
      if (!armed) {
        stale = true;
        return;
      }
      // (A phone's address bar sliding away resizes the window and nothing
      // here: nothing to do then.)
      const H = root.clientHeight;
      const same = root.clientWidth === L.width && H === L.height && firstScreen(H) === L.heightOn;
      if (same && pixelRatio() === pr) return;
      if (layout()) renderAt(t);
    });
  }

  // On a lost context the canvas goes blank, so it hides (the film's dark
  // ground shows) and the film holds still. Given back, the reflections are
  // drawn again, since they lived in a buffer the loss emptied (and freed:
  // the old one is only dropped, as disposing it would delete GL objects of
  // the lost context), and the film carries on from the same frame. Not
  // given back within LOST_WAIT seconds with the tab open (the browser
  // gives up on WebGL for a page whose GPU keeps failing), it fails.
  function onContextLost() {
    lost = true;
    canvas.style.visibility = "hidden";
    watchLost();
    sync();
  }
  function onContextRestored() {
    if (destroyed || failed) return;
    lost = false;
    watchLost();
    envRT = studioEnvironment(renderer);
    scene.environment = envRT.texture;
    canvas.style.visibility = "";
    renderAt(t);
    sync();
  }

  // (A tab in the background may only get its context back once it is
  // open again, so the wait only counts while it is.)
  function watchLost() {
    window.clearTimeout(lostTimer);
    lostTimer = 0;
    if (lost && pageVisible && !failed && !destroyed) lostTimer = window.setTimeout(fail, LOST_WAIT * 1000);
  }

  /* ---------- set up ---------- */

  layout();
  drawWeb(0);
  // Compile every material now, hidden ones included, so nothing stalls the
  // first time it appears.
  {
    const hidden: Object3D[] = [];
    scene.traverse((o) => {
      if (!o.visible) {
        hidden.push(o);
        o.visible = true;
      }
    });
    cameraAt(0);
    renderer.compile(scene, camera);
    for (const o of hidden) o.visible = false;
  }
  renderAt(0);
  setState("idle");

  // The "$" waits for the site's font if it hasn't arrived yet.
  document.fonts?.load(`700 300px ${font}`).then(
    () => {
      if (destroyed) return;
      drawCoinFace(faceCanvas, false, font);
      drawCoinFace(bumpCanvas, true, font);
      faceMap.needsUpdate = true;
      faceBump.needsUpdate = true;
      if (!raf && !failed) renderAt(t);
    },
    () => {}
  );

  toggle.addEventListener("click", onToggle);
  skip.addEventListener("click", skipToEnd);
  document.addEventListener("visibilitychange", onVisibility);
  // The window too: the first screen's height can change with the hero's
  // size staying the same.
  window.addEventListener("resize", onResize);
  // And the screen's pixel density, which a move to another screen changes
  // with nothing resized.
  let densityQuery: MediaQueryList | null = null;
  function watchDensity() {
    densityQuery?.removeEventListener("change", onDensity);
    densityQuery = window.matchMedia(`(resolution: ${window.devicePixelRatio || 1}dppx)`);
    densityQuery.addEventListener("change", onDensity);
  }
  function onDensity() {
    watchDensity();
    onResize();
  }
  watchDensity();
  canvas.addEventListener("webglcontextlost", onContextLost);
  canvas.addEventListener("webglcontextrestored", onContextRestored);

  // At least 40% of it on screen: of its height, or of the screen's where
  // it runs taller than the screen (a phone on its side, very large text),
  // so that it can always get there.
  const viewObserver = new IntersectionObserver(
    (entries) => {
      const e = entries[entries.length - 1];
      const whole = Math.min(e.boundingClientRect.height, e.rootBounds?.height ?? window.innerHeight);
      inView = e.isIntersecting && e.intersectionRect.height >= 0.4 * whole - 0.5;
      sync();
    },
    { threshold: Array.from({ length: 21 }, (_, i) => i / 20) }
  );
  viewObserver.observe(root);

  const sizeObserver = new ResizeObserver(onResize);
  sizeObserver.observe(root);

  // The header's theme switch, mid-film: the next frame draws in the new
  // theme, or this one again while the film holds still.
  const themeObserver = new MutationObserver(() => {
    const next = lightTheme();
    if (next === light || destroyed) return;
    light = next;
    applyTheme();
    if (!raf && !failed && !lost && !stale) renderAt(t);
  });
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

  return {
    start() {
      armed = true;
      started = false;
      // Back from being put away: the canvas at the screen's size again.
      if (stale) stale = !layout();
      restartAt(0);
      sync();
    },
    pause() {
      userPaused = true;
      sync();
    },
    stop() {
      armed = false;
      started = false;
      // Put away until the next `start`: the canvas and the composer's
      // buffers (HDR, multisampled, the bloom chain) shrink to nothing, so
      // their memory goes back to the GPU for the rest of the visit.
      renderer.setSize(1, 1, false);
      composer.setSize(1, 1);
      stale = true;
      restartAt(0);
      sync();
    },
    destroy() {
      if (destroyed) return;
      destroyed = true;
      cancelAnimationFrame(raf);
      cancelAnimationFrame(resizeRaf);
      window.clearTimeout(lostTimer);
      raf = 0;
      toggle.removeEventListener("click", onToggle);
      skip.removeEventListener("click", skipToEnd);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", onResize);
      densityQuery?.removeEventListener("change", onDensity);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      canvas.removeEventListener("webglcontextrestored", onContextRestored);
      viewObserver.disconnect();
      sizeObserver.disconnect();
      themeObserver.disconnect();

      scene.traverse(disposeObject);
      coins.dispose();
      envRT.dispose();
      bloom.dispose();
      finalPass.dispose();
      renderPass.dispose();
      composer.dispose();
      rt.dispose();
      renderer.dispose();
      // (Already lost, it has nothing to give back.)
      if (!renderer.getContext().isContextLost()) renderer.forceContextLoss();
      canvas.remove();

      // The words go back the way the server sent them.
      for (const el of root.querySelectorAll<HTMLElement>("[style]")) {
        if (el !== root) el.removeAttribute("style");
      }
      const general = heroVslNiches.general;
      labs.forEach((l, g) => {
        l.p.textContent = general.gaps[g];
        l.lab.classList.remove("is-left");
      });
      callText.textContent = general.call;
      textBubble.textContent = general.text;
      need(".vt-lead", crmCard).textContent = general.lead;
      count.dataset.mode = "lost";
      countNum.textContent = "−$0";
      countWord.textContent = "lost";
      for (const s of stats) {
        if (s.num) s.num.textContent = s.prefix + fmt(s.to);
      }
      ctas.inert = true;
      root.style.removeProperty("--below");
      delete root.dataset.state;
      root.dataset.orient = "wide";
    },
  };
}
