import type { LucideIcon } from "lucide-react";

export interface ToolbarButtonProps {
  icon: LucideIcon;
  onClick?: () => void;
  isActive?: boolean;
}
