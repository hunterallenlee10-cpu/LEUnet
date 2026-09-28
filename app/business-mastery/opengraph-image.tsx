import { ogContentType, ogSize, renderLeuOg } from "@/lib/og";

export const alt = "Business Mastery: learn to start a business and actually use AI";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderLeuOg({
    label: "Business Mastery",
    line: "Learn to start a business and actually use AI.",
  });
}
