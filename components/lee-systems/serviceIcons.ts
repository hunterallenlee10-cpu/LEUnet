import {
  CalendarCheck,
  Clapperboard,
  MonitorSmartphone,
  PhoneCall,
  Search,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import type { ServiceIcon } from "@/data/lee-systems";

/**
 * The line icon for each service group (`serviceGroups` in
 * data/lee-systems.ts), shared by the /lee-systems cards and the homepage
 * row so a group looks the same wherever it appears. Drawn thin (stroke 1.5)
 * in the accent colour.
 */
export const serviceIcons: Record<ServiceIcon, LucideIcon> = {
  websites: MonitorSmartphone,
  leads: Search,
  calls: PhoneCall,
  followUp: CalendarCheck,
  content: Clapperboard,
  customAi: Wrench,
};
