import {
  BookOpen,
  Hammer,
  MessagesSquare,
  Phone,
  Presentation,
  UserRound,
  type LucideIcon,
} from "lucide-react";

/**
 * The pillars' icons, keyed by pillar id so an icon travels with its content
 * if the order changes in data/business-mastery.ts. Its own module, not the
 * client showcase's, so the server-rendered phone list can read it too.
 */
export const pillarIcons: Record<string, LucideIcon> = {
  classes: BookOpen,
  webinars: Presentation,
  calls: Phone,
  coaching: UserRound,
  "hands-on": Hammer,
  community: MessagesSquare,
};
