import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { SketchPicker } from "react-color";
import { useCurrentEditor } from "@tiptap/react";

export function TextColorToolbarButton({ textColor }: { textColor: string }) {
  const { editor } = useCurrentEditor();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-4"
            aria-hidden="true"
          >
            <path d="m6 16 6-12 6 12"></path>
            <path d="M8 12h8"></path>
          </svg>
          <div
            className="w-3/5 mx-auto h-0.5"
            style={{ backgroundColor: textColor }}
          ></div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-0 shadow-none">
        <SketchPicker
          color={textColor}
          onChange={(color) => {
            editor?.chain().focus().setColor(color.hex).run();
          }}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
