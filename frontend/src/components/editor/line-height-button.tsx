import { ListCollapseIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useCurrentEditor, useEditorState } from "@tiptap/react";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function LineHeightToolbarButton() {
  const { editor } = useCurrentEditor();
  const [isOpen, setIsOpen] = useState(false);
  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        currentLineHeight:
          ctx.editor?.getAttributes("textStyle").lineHeight ?? "normal",
      };
    },
  });

  const lineHeights = [
    {
      label: "Default",
      value: "normal",
    },
    {
      label: "1",
      value: "1",
    },
    {
      label: "1.15",
      value: "1.15",
    },
    {
      label: "1.5",
      value: "1.5",
    },
    {
      label: "Double",
      value: "2",
    },
  ];

  const handleLineHeight = (value: string) => {
    editor?.chain().focus().setLineHeight(value).run();
    setIsOpen(false);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80">
          <ListCollapseIcon className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {lineHeights.map(({ label, value }) => (
          <button
            className={cn(
              "flex items-center px-2 py-1 gap-x-2 rounded-sm text-sm hover:bg-neutral-200/80",
              editorState?.currentLineHeight === value && "bg-neutral-200/80"
            )}
            key={value}
            onClick={() => handleLineHeight(value)}
          >
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
