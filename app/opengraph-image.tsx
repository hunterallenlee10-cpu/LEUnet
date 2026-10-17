import { ogContentType, ogSize, renderLeuOg } from "@/lib/og";

// The homepage's share card. A page that sets its own `openGraph` metadata
// replaces the root's, image included, so every other page carries an
// opengraph-image of its own (/contact and /legal included).
export const alt = "Lee Enterprises Unlimited: websites and AI automations by Lee Systems Co.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderLeuOg({
    line: "Websites and AI automations that never miss a customer.",
  });
}
