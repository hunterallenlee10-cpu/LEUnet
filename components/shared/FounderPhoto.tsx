import Image from "next/image";
import clsx from "clsx";
import { Camera } from "lucide-react";
import { site } from "@/data/site";
import { ComingSoonSlot } from "@/components/shared/ComingSoonSlot";

/**
 * Hunter's photo, from `site.founder.photo`. Until one is set it is a "Photo
 * coming soon" frame while `site.showPlaceholders` is true, and nothing at all
 * when it is false.
 *
 * The site serves images as they are (next.config.mjs turns the optimizer
 * off), so the file should be a web-sized copy: a JPG or WebP about 800px
 * wide is plenty for every slot this fills.
 */
export function FounderPhoto({
  className,
  sizes,
}: {
  /** Size and shape of the frame, e.g. "aspect-[4/5] w-64". */
  className?: string;
  sizes: string;
}) {
  if (site.founder.photo) {
    return (
      <div className={clsx("relative overflow-hidden rounded-xl", className)}>
        <Image
          src={site.founder.photo}
          alt={site.founder.name}
          fill
          sizes={sizes}
          className="object-cover"
        />
      </div>
    );
  }

  if (site.showPlaceholders) {
    return <ComingSoonSlot label="Photo coming soon" Icon={Camera} className={className} />;
  }

  return null;
}
