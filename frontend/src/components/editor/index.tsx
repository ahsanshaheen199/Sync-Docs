import { EditorContent, useCurrentEditor } from "@tiptap/react";

export function Editor() {
  const { editor } = useCurrentEditor();
  return (
    <div className="size-full px-4 bg-[#F9FBFD] overflow-x-auto print:p-0 print:bg-white print:overflow-visible">
      <div className="min-w-max flex justify-center w-[816px] py-4 print:py-0 mx-auto print:w-full print:min-w-0">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
