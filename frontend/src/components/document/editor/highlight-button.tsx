import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { useCurrentEditor, useEditorState } from "@tiptap/react";
import { HighlighterIcon } from "lucide-react";
import { SketchPicker } from "react-color";

export function HighlightToolbarButton() {
  const { editor } = useCurrentEditor();
  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        highlightColor:
          ctx.editor?.getAttributes("highlight").color ?? "#ffffff",
      };
    },
  });
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 flex flex-col gap-y-0.5 items-center justify-center rounded-sm hover:bg-neutral-200/80">
          <HighlighterIcon className="size-4" />
          <div
            className="w-3/5 mx-auto h-0.5"
            style={{
              backgroundColor: editorState?.highlightColor ?? "#ffffff",
            }}
          ></div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-0 shadow-none">
        <SketchPicker
          color={editorState?.highlightColor ?? "#ffffff"}
          onChange={(color) => {
            editor?.chain().focus().setHighlight({ color: color.hex }).run();
          }}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
