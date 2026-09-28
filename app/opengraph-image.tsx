import { ogContentType, ogSize, renderLeuOg } from "@/lib/og";

// The homepage's share card. A page that sets its own `openGraph` metadata
// replaces the root's, image included, so every other page carries an
// opengraph-image of its own (/contact and /legal included).
export const alt = "Lee Enterprises Unlimited: hire Lee Systems Co. or learn with Business Mastery";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderLeuOg({
    line: "Hire us to automate your business, or learn to build your own.",
  });
}
