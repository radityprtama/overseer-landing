import { LucideIcon } from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
  colSpan?: number;
}

export interface UseCase {
  id: string;
  title: string;
  story: string;
  benefits: string[];
}
