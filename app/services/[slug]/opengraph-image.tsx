import { ogContentType, ogSize, renderLeeSystemsOg } from "@/lib/lee-systems-og";
import { getService, isServiceSlug, serviceSlugs } from "@/data/services";

export const alt = "A Lee Enterprises Unlimited service";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

/** The service's name and its outcome line, on the LEU card. */
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const group = isServiceSlug(slug) ? getService(slug) : null;
  return renderLeeSystemsOg(group ? `${group.name}: ${group.outcome}` : "Lee Enterprises Unlimited");
}
