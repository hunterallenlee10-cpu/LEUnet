import { ogContentType, ogSize, renderLeuOg } from "@/lib/og";

export const alt = "Lee Enterprises Unlimited: privacy policy and terms of service";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderLeuOg({ line: "Privacy policy and terms of service" });
}
