import type { LucideIcon } from "lucide-react";

export interface ToolbarButtonProps {
  icon: LucideIcon;
  onClick?: () => void;
  isActive?: boolean;
}

export type HeadingValue = 1 | 2 | 3 | 4 | 5 | 6 | 0;
