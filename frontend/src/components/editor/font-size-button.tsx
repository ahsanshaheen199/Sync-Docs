import { useCurrentEditor, useEditorState } from "@tiptap/react";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";

export function FontSizeToolbarButton() {
  const { editor } = useCurrentEditor();
  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        fontSize: ctx.editor?.getAttributes("textStyle").fontSize
          ? ctx.editor?.getAttributes("textStyle").fontSize.replace("px", "")
          : "16",
      };
    },
  });
  const [fontSize, setFontSize] = useState(editorState?.fontSize ?? "16");
  const [inputValue, setInputValue] = useState(fontSize);

  const updateFontSize = (value: string) => {
    const parsedValue = parseInt(value);
    if (!isNaN(parsedValue) && parsedValue > 0) {
      setFontSize(parsedValue);
      setInputValue(parsedValue);
      editor?.chain().focus().setFontSize(`${parsedValue}px`).run();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    updateFontSize(inputValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      updateFontSize(inputValue);
    }
  };

  const incrementFontSize = () => {
    updateFontSize((parseInt(inputValue) + 1).toString());
  };

  const decrementFontSize = () => {
    const parsedValue = parseInt(inputValue);
    if (!isNaN(parsedValue) && parsedValue > 0) {
      updateFontSize((parsedValue - 1).toString());
    }
  };

  return (
    <div className="flex items-center gap-x-0.5">
      <button
        className="size-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80"
        onClick={decrementFontSize}
      >
        <MinusIcon className="size-4" />
      </button>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        onKeyDown={handleKeyDown}
        className="w-7 text-center border border-neutral-400 rounded-sm bg-white text-xs h-7"
      />
      <button
        className="size-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80"
        onClick={incrementFontSize}
      >
        <PlusIcon className="size-4" />
      </button>
    </div>
  );
}
