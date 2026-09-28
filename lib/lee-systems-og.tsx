import { ImageResponse } from "next/og";
import { leeSystems } from "@/data/lee-systems";

/**
 * The social-sharing card for the Lee Systems Co. pages, drawn at build time
 * with `next/og` rather than shipped as a PNG so the wording stays in code
 * next to the pages it describes. Each route segment's `opengraph-image.tsx`
 * calls this with its own line.
 *
 * PLACEHOLDER: the "LS" square stands in for a logo until one exists
 * (components/lee-systems/LeeSystemsMark.tsx, docs/LEE-SYSTEMS.md).
 */
export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

export function renderLeeSystemsOg(line: string) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#0F0F0F",
          color: "#F5F3EE",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div
            style={{
              width: 72,
              height: 72,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "2px solid rgba(212,168,87,0.7)",
              borderRadius: 12,
              color: "#E0BE78",
              fontSize: 30,
              fontWeight: 700,
              letterSpacing: 2,
            }}
          >
            LS
          </div>
          <div
            style={{
              fontSize: 34,
              fontWeight: 700,
              letterSpacing: 6,
              color: "#F5F3EE",
            }}
          >
            LEE SYSTEMS CO.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 64,
            fontWeight: 700,
            lineHeight: 1.15,
            maxWidth: 980,
          }}
        >
          {line}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 26,
            color: "#A3A3A3",
          }}
        >
          <span>{leeSystems.tagline}</span>
          {/* One template string, not two expressions: Satori wants a single
              text child in an element that is not display: flex. */}
          <span style={{ color: "#D4A857" }}>
            {`${leeSystems.city}, ${leeSystems.region}`}
          </span>
        </div>
      </div>
    ),
    ogSize
  );
}
