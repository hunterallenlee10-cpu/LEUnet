/**
 * The Lee Systems Co. background — "Signal Routes".
 *
 * Rendered by the Lee Systems main page hero and by the homepage block that
 * links to it (components/sections/LeeSystemsSection.tsx), so the doorway and
 * the destination share a background rather than two takes on one palette.
 * (It was built for Lee Marketing Mastery and carried over at the rename; the
 * notes below still say "hub" for the main page, which is what it was called.) It is
 * the sibling of "Constellation" on Business Mastery, and deliberately not the
 * same trick in another colour: that page's subject is a network, so its
 * background computes one; this venture's subject is what travels *through* a
 * network — a lead routed to the next step — so this one draws the
 * routes and sends signals down them.
 *
 * The vocabulary is the venture's own, promoted from the foreground diagrams
 * where it already exists: the drifting dashes of `.ls-dash`, the packet that
 * runs AutomationFlowDemo's connectors, and the ring the junction throws.
 *
 * WHY SVG AND CSS, WHERE THE SIBLING NEEDS A CANVAS. Constellation cannot be
 * authored: which pairs of nodes are linked changes every frame, which is a
 * per-frame computation over ~1000 pairs. Routes are the opposite — fixed
 * paths with things moving along them — which is what a stylesheet does well.
 * So the homepage carries one animation loop rather than two, this composes on
 * the server with no client bundle at all, and the two sections end up with
 * genuinely different textures instead of one effect in two palettes.
 *
 * The travelling signal is a short bright dash sliding along each route, not a
 * dot flying over it. A dot means either SMIL, which no media query can still
 * for `prefers-reduced-motion`, or a CSS `offset-path` holding a second copy
 * of every curve. One dash on the path itself needs neither, and it is the
 * same technique that draws the ring on the hub's reach diagram.
 *
 * Every path declares `pathLength="100"`, so each dash figure below is a
 * percentage of that route rather than a length in user units. Without it the
 * dash density would vary with each curve's true length — the long sweeps
 * would read as dotted and the short climb as dashed — and each travelling
 * signal would need its own offset tuned to its own path.
 *
 * DEPTH, AND WHY THERE ARE THIRTEEN ROUTES RATHER THAN FOUR. This field
 * started as four curves at one weight, and four curves at one weight do not
 * read as a field: at desktop widths they read as stray hairlines on the
 * glass, which is worse than an empty ground because the eye tries to resolve
 * them and finds nothing. Beside Constellation — which earns its texture from
 * fifty-four nodes at desktop widths and the web between them — the section
 * simply looked unfinished. The fix is not brighter lines, which would compete
 * with the copy; it is more of them at *less* weight each, in three tiers:
 *
 *   near  three routes, the brightest, and the only ones that carry signals.
 *         This is the layer a visitor actually reads: two crossing at the
 *         junction and one feeding it from below.
 *   mid   five quiet routes, roughly echoing the near tier's directions, so
 *         the field reads as a bundle of traffic rather than as unrelated
 *         curves that happen to share a frame.
 *   far   five routes at barely-there weight. These exist to be *not quite*
 *         seen. They are what turns black into distance.
 *
 * Total ink is close to what it was; the distribution is what changed. The
 * tiers are painted back to front, and only near and mid carry the drift pass
 * — a dashed overlay on a route you can hardly see is paint spent on nothing.
 *
 * HOW THE FIELD YIELDS TO COPY. Both consumers run words over this layer, and
 * before the mask a near route ran straight through the homepage H2. Both
 * centre that copy in the frame they hand this layer, and `.lsr-svg` masks
 * itself down to roughly a fifth of its opacity there (app/globals.css), so
 * the routes pass *behind* the words instead of through them. A consumer whose
 * copy sits anywhere else needs a mask of its own. A mask rather than a scrim
 * painted in the ground colour, because the two consumers have different
 * grounds — black on the homepage, a neutral-950 gradient on the hub — and a
 * scrim tuned to one would sit on the other as a visible blotch. The same
 * declaration fades the top and bottom edges out, which is what stops the
 * routes being guillotined along a dead-straight line at the section boundary.
 *
 * The orbs stay with the sections. Both consumers light themselves with the
 * venture's warm-right/cool-left pair, and they are now tuned identically on
 * purpose — a visitor arriving at the hub should land on the light they just
 * clicked. This layer draws over whichever ground it is given.
 */

/**
 * Routes are authored in a 1000x700 box and painted with `slice`, so the frame
 * crops rather than distorts: a full-width band crops the top and bottom, a
 * phone crops the sides. Every curve therefore starts and ends well outside
 * the box — a route whose end became visible would read as a line that stops
 * rather than as traffic passing through — and everything that is meant to be
 * seen sits near the middle, which is the one region every crop keeps.
 *
 * The two junctions are placed under the orbs each consumer lights: the busy
 * one under the warm orb high and right, the quieter one under the cool orb
 * low and left. That is what ties the layer to a ground it does not own.
 *
 * Both are also kept out of the centred copy column, which is what fixes their
 * exact positions. The hub started at the composition's optical centre, where
 * it landed a lit dot and an opening ring behind the headline — clear of the
 * glyphs at 1440px by luck of where the line broke, and on them at the next
 * width down. Out here it is right of the column's edge from 1024px up, and on
 * a phone, which crops to the middle of the box, it is simply not in frame:
 * the narrow crop keeps the routes and drops the junction, which is a
 * composition rather than a casualty.
 */
const HUB = { x: 872, y: 236 } as const;
const RELAY = { x: 330, y: 430 } as const;

/** Back to front. Painting near last is what keeps the readable layer on top. */
const TIER_ORDER = ["far", "mid", "near"] as const;

type Tier = (typeof TIER_ORDER)[number];

type Route = {
  id: string;
  d: string;
  /** Which depth this route sits at. See the header for what each tier is for. */
  tier: Tier;
  /** Seconds before this route's signal departs. Staggered so the frame shows
   *  one arrival at a time; two at once reads as a loading state. */
  delay?: number;
  /** A route with no signal is depth: it keeps the field from looking like
   *  three lines drawn to meet a point. Every mid and far route is quiet —
   *  only the near tier carries traffic. */
  quiet?: boolean;
};

const ROUTES: Route[] = [
  // ---- near: the three a visitor is meant to actually follow ----------------
  // Low left to high right, through the hub. The long diagonal the eye reads
  // first, so it carries the first signal.
  {
    id: "sweep",
    tier: "near",
    d: `M -80 604 C 240 556, 560 452, ${HUB.x} ${HUB.y} S 1012 126, 1080 88`,
    delay: 0,
  },
  // High left to low right, crossing the first at the hub. The crossing is the
  // point: two directions of traffic through one junction.
  {
    id: "cross",
    tier: "near",
    d: `M -80 92 C 270 146, 600 198, ${HUB.x} ${HUB.y} S 1016 286, 1080 324`,
    delay: 2.6,
  },
  // Up from below through the relay and into the hub — the feeder that makes
  // the lower-left orb a place something comes from.
  {
    id: "feeder",
    tier: "near",
    d: `M 268 780 C 306 650, 300 516, ${RELAY.x} ${RELAY.y} C 428 322, 660 264, ${HUB.x} ${HUB.y}`,
    delay: 5.1,
  },

  // ---- mid: the bundle ------------------------------------------------------
  // A slow low curve well clear of the junctions. The original quiet route,
  // and still the only one that runs the full width without climbing.
  {
    id: "shoal",
    tier: "mid",
    d: "M -80 704 C 220 652, 470 592, 720 636 S 980 716, 1080 692",
    quiet: true,
  },
  // Offset above `sweep` and climbing harder, so the top right corner has
  // somewhere for traffic to leave through rather than one line into the void.
  {
    id: "updraft",
    tier: "mid",
    d: "M -80 528 C 246 482, 560 392, 862 162 C 960 90, 1030 44, 1080 14",
    quiet: true,
  },
  // Offset below `cross`, passing under the hub. Together with `cross` it
  // makes the junction sit between two lanes instead of on one.
  {
    id: "underpass",
    tier: "mid",
    d: "M -80 160 C 290 218, 620 288, 906 344 C 980 358, 1040 376, 1080 390",
    quiet: true,
  },
  // A second climb out of the lower left, passing just wide of the relay —
  // near enough to read as the same origin, far enough not to double `feeder`.
  {
    id: "spur",
    tier: "mid",
    d: "M 126 780 C 176 660, 224 542, 318 452 C 430 362, 650 316, 1080 286",
    quiet: true,
  },
  // The only route that descends left to bottom. Without it every curve in the
  // frame leans the same way and the field reads as a comb.
  {
    id: "bank",
    tier: "mid",
    d: "M -80 286 C 96 356, 248 430, 356 546 C 428 624, 470 700, 496 780",
    quiet: true,
  },

  // ---- far: distance --------------------------------------------------------
  // Deliberately unremarkable. These are spaced to cover the corners the near
  // and mid tiers leave empty, and none of them is meant to be traced.
  {
    id: "far-ceiling",
    tier: "far",
    d: "M -80 24 C 306 108, 656 168, 1080 186",
    quiet: true,
  },
  {
    id: "far-descent",
    tier: "far",
    d: "M -80 250 C 268 316, 604 396, 1080 470",
    quiet: true,
  },
  {
    id: "far-climb",
    tier: "far",
    d: "M -80 446 C 246 420, 528 352, 1080 126",
    quiet: true,
  },
  {
    id: "far-floor",
    tier: "far",
    d: "M -80 668 C 312 608, 566 528, 1080 572",
    quiet: true,
  },
  {
    id: "far-riser",
    tier: "far",
    d: "M 44 780 C 130 616, 236 476, 414 352 C 606 218, 862 116, 1080 52",
    quiet: true,
  },
];

/**
 * Small waypoints, so a route reads as having stops rather than as a stroke.
 *
 * Read off the rendered curves with `getPointAtLength` rather than placed by
 * eye — at these radii a dot a few units off its route does not read as a
 * near miss, it reads as a fifth object floating in the field. Each is the
 * point at the given fraction of its route's length: sweep at 0.15 and 0.75,
 * cross at 0.45, feeder at 0.3. Re-derive them if a curve above changes.
 *
 * NEAR TIER ONLY, and that is a rule rather than an accident of which routes
 * existed first. A waypoint is brighter than the route under it, so a stop on
 * a mid or far curve would be a dot the eye finds before it finds the curve —
 * which puts the emphasis on the layer that exists to be ignored. Depth is
 * carried by the extra routes; the stops stay on the three that matter.
 */
const WAYPOINTS = [
  { x: 111, y: 568 },
  { x: 456, y: 175 },
  { x: 826, y: 267 },
  { x: 313, y: 502 },
] as const;

export function SignalRoutes() {
  return (
    <svg
      className="lsr-svg"
      viewBox="0 0 1000 700"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      {/* Three passes over one set of curves, painted back to front: the route
          itself, the drift that makes it a channel rather than a line, and the
          signal running it. The geometry is written once, in ROUTES.

          The first pass walks the tiers rather than the array, so ROUTES can
          stay grouped for reading while the paint order stays back-to-front.
          The other two passes do not need it: drift skips the far tier
          entirely, and only the three near routes carry signals. */}
      {TIER_ORDER.map((tier) =>
        ROUTES.filter((route) => route.tier === tier).map((route) => (
          <path
            key={`route-${route.id}`}
            className={`lsr-route lsr-route--${tier}`}
            d={route.d}
            pathLength={100}
          />
        )),
      )}
      {ROUTES.filter((route) => route.tier !== "far").map((route) => (
        <path
          key={`drift-${route.id}`}
          className={`lsr-drift lsr-drift--${route.tier}`}
          d={route.d}
          pathLength={100}
        />
      ))}
      {ROUTES.filter((route) => !route.quiet).map((route) => (
        <path
          key={`signal-${route.id}`}
          className="lsr-signal"
          d={route.d}
          pathLength={100}
          style={{ animationDelay: `${route.delay ?? 0}s` }}
        />
      ))}

      {WAYPOINTS.map((point) => (
        <circle
          key={`waypoint-${point.x}-${point.y}`}
          className="lsr-waypoint"
          cx={point.x}
          cy={point.y}
          r={2}
        />
      ))}

      <circle className="lsr-relay" cx={RELAY.x} cy={RELAY.y} r={3} />

      {/* The junction, and the one thing on the field that resolves: the ring
          opens from it on the same beat the third signal lands, which is the
          reach diagram's argument in miniature — traffic arrives, and then it
          reaches someone. */}
      <circle className="lsr-ring" cx={HUB.x} cy={HUB.y} r={6} />
      <circle className="lsr-hub" cx={HUB.x} cy={HUB.y} r={4.5} />
    </svg>
  );
}
