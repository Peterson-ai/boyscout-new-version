import { 
  Home, 
  DollarSign, 
  Flag, 
  Heart, 
  Calendar, 
  Award, 
  Settings 
} from "lucide-react";

export const navigationItems = [
  {
    title: "Dashboard",
    icon: Home,
    href: "/",
  },
  {
    title: "Donate",
    icon: DollarSign,
    href: "/donate",
  },
  {
    title: "Campaign",
    icon: Flag,
    href: "/campaigns",
  },
  {
    title: "Needs",
    icon: Heart,
    href: "/youth-needs",
  },
  {
    title: "Events",
    icon: Calendar,
    href: "/events",
  },
  {
    title: "Merit Badges",
    icon: Award,
    href: "/merit-badges",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/settings",
  },
];