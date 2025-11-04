import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { useCurrentEditor } from "@tiptap/react";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";

export function FontFamilyToolbarButton({
  fontFamily,
}: {
  fontFamily?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { editor } = useCurrentEditor();
  const fontFamiles = [
    {
      label: "Arial",
      value: "Arial",
    },
    {
      label: "Times New Roman",
      value: "Times New Roman",
    },
    {
      label: "Verdana",
      value: "Verdana",
    },
    {
      label: "Georgia",
      value: "Georgia",
    },
    {
      label: "Courier New",
      value: "Courier New",
    },
  ];

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <button className="h-7 w-28 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 text-sm overflow-hidden px-1.5">
          <span className="truncate">{fontFamily ?? "Arial"}</span>
          <ChevronDownIcon className="size-4 shrink-0 ml-2" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1 bg-white shadow-md rounded-sm">
        {fontFamiles.map((font) => (
          <button
            key={font.value}
            className={cn(
              "flex items-center px-2 py-1 gap-x-2 rounded-sm text-sm hover:bg-neutral-200/80",
              fontFamily === font.value && "bg-neutral-200/80"
            )}
            style={{ fontFamily: font.value }}
            onClick={() => {
              setIsOpen(false);
              editor?.chain().focus().setFontFamily(font.value).run();
            }}
          >
            <span className="text-sm">{font.label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
