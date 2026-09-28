import { ogContentType, ogSize, renderLeuOg } from "@/lib/og";

export const alt = "Contact Lee Enterprises Unlimited: tell me what you need";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderLeuOg({ line: "Tell me what you need." });
}
