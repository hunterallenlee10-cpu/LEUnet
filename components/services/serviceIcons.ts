import {
  CalendarCheck,
  Clapperboard,
  MonitorSmartphone,
  PhoneCall,
  Search,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import type { ServiceIconName } from "@/data/services";

/**
 * The line icon for each service group (`icon` in data/services.ts), shared
 * by every place a group appears (the Services menu, the homepage showcase,
 * the /lee-systems cards, /services and the service pages) so a group looks
 * the same everywhere. Drawn thin (stroke 1.5) in the accent colour.
 */
export const serviceIcons: Record<ServiceIconName, LucideIcon> = {
  websites: MonitorSmartphone,
  leads: Search,
  calls: PhoneCall,
  followUp: CalendarCheck,
  content: Clapperboard,
  customAi: Wrench,
};
