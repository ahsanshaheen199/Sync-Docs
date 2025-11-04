import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useCurrentEditor } from "@tiptap/react";
import { HighlighterIcon } from "lucide-react";
import { SketchPicker } from "react-color";

export function HighlightToolbarButton({
  highlightColor,
}: {
  highlightColor: string;
}) {
  const { editor } = useCurrentEditor();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 flex flex-col gap-y-0.5 items-center justify-center rounded-sm hover:bg-neutral-200/80">
          <HighlighterIcon className="size-4" />
          <div
            className="w-3/5 mx-auto h-0.5"
            style={{ backgroundColor: highlightColor }}
          ></div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-0 shadow-none">
        <SketchPicker
          color={highlightColor}
          onChange={(color) => {
            editor?.chain().focus().setHighlight({ color: color.hex }).run();
          }}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
