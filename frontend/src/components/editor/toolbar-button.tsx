import { cn } from "@/lib/utils";
import type { ToolbarButtonProps } from "@/types";

export function ToolbarButton({
  icon: Icon,
  onClick,
  isActive,
}: ToolbarButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80",
        isActive && "bg-neutral-200/80"
      )}
    >
      <Icon className="size-4" />
    </button>
  );
}
