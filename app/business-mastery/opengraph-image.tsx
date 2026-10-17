import { ogContentType, ogSize, renderLeuOg } from "@/lib/og";
import {
  BUSINESS_MASTERY_HOST,
  BUSINESS_MASTERY_SITE_LIVE,
} from "@/config/business-mastery-site.mjs";

export const alt = "Business Mastery: learn to start a business and actually use AI";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderLeuOg({
    label: "Business Mastery",
    line: "Learn to start a business and actually use AI.",
    ...(BUSINESS_MASTERY_SITE_LIVE && { domain: BUSINESS_MASTERY_HOST }),
  });
}
