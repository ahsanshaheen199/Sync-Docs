import { useState } from "react";
import { useCurrentEditor, useEditorState } from "@tiptap/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { ChevronDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { type HeadingValue } from "@/types";

export function HeadingToolbarButton() {
  const [isOpen, setIsOpen] = useState(false);
  const { editor } = useCurrentEditor();
  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        headingValue: ctx.editor?.getAttributes("heading").level ?? 0,
      };
    },
  });
  const headings = [
    {
      label: "Heading 1",
      value: 1,
      fontSize: "2rem",
    },
    {
      label: "Heading 2",
      value: 2,
      fontSize: "1.5rem",
    },
    {
      label: "Heading 3",
      value: 3,
      fontSize: "1.25rem",
    },
    {
      label: "Heading 4",
      value: 4,
      fontSize: "1.125rem",
    },
    {
      label: "Heading 5",
      value: 5,
      fontSize: "1rem",
    },
    {
      label: "Heading 6",
      value: 6,
      fontSize: "0.8rem",
    },
    {
      label: "Normal Text",
      value: 0,
      fontSize: "1rem",
    },
  ];
  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 text-sm overflow-hidden px-1.5">
          <span className="truncate">
            {editorState?.headingValue
              ? headings.find((h) => h.value === editorState?.headingValue)
                  ?.label
              : "Normal Text"}
          </span>
          <ChevronDownIcon className="size-4 shrink-0 ml-2" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1 bg-white shadow-md rounded-sm">
        {headings.map((heading) => (
          <button
            key={heading.value}
            className={cn(
              "flex items-center px-2 py-1 gap-x-2 rounded-sm text-sm hover:bg-neutral-200/80",
              heading.value === editorState?.headingValue && "bg-neutral-200/80"
            )}
            style={{ fontSize: heading.fontSize }}
            onClick={() => {
              setIsOpen(false);
              if (heading.value === 0) {
                editor?.chain().focus().setParagraph().run();
              } else {
                editor
                  ?.chain()
                  .focus()
                  .setHeading({
                    level: heading.value as Exclude<HeadingValue, 0>,
                  })
                  .run();
              }
            }}
          >
            {heading.label}
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
