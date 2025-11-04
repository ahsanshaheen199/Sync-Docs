import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useCurrentEditor } from "@tiptap/react";
import { cn } from "@/lib/utils";

export function AlignToolbarButton({ alignValue }: { alignValue: string }) {
  const { editor } = useCurrentEditor();

  const alignments = [
    {
      label: "Align Left",
      value: "left",
      icon: AlignLeftIcon,
    },
    {
      label: "Align Center",
      value: "center",
      icon: AlignCenterIcon,
    },
    {
      label: "Align Right",
      value: "right",
      icon: AlignRightIcon,
    },
    {
      label: "Align Justify",
      value: "justify",
      icon: AlignJustifyIcon,
    },
  ];

  const handleAlignment = (value: string) => {
    editor?.chain().focus().setTextAlign(value).run();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80">
          <AlignLeftIcon className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {alignments.map(({ label, value, icon: Icon }) => (
          <button
            className={cn(
              "flex items-center px-2 py-1 gap-x-2 rounded-sm text-sm hover:bg-neutral-200/80",
              alignValue === value && "bg-neutral-200/80"
            )}
            key={value}
            onClick={() => handleAlignment(value)}
          >
            <Icon className="size-4 mr-2" />
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
