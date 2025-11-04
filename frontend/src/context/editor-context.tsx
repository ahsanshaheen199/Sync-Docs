import { useEditor, EditorContext } from "@tiptap/react";
import { useMemo } from "react";
import { StarterKit } from "@tiptap/starter-kit";
import { TaskList } from "@tiptap/extension-list";
import { TaskItem } from "@tiptap/extension-list";
import { TableKit } from "@tiptap/extension-table";
import { TextStyle, FontFamily, Color } from "@tiptap/extension-text-style";
import { Highlight } from "@tiptap/extension-highlight";

export function EditorContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      TableKit.configure({
        table: { resizable: true },
      }),
      TextStyle,
      FontFamily,
      Highlight.configure({
        multicolor: true,
      }),
      Color,
    ],
    content: `
            <table>
              <tbody>
                <tr>
                  <th>Name</th>
                  <th colspan="3">Description</th>
                </tr>
                <tr>
                  <td>Cyndi Lauper</td>
                  <td>Singer</td>
                  <td>Songwriter</td>
                  <td>Actress</td>
                </tr>
              </tbody>
            </table>
          `,
    editorProps: {
      attributes: {
        style: "padding-left:56px; padding-right:56px;",
        class:
          "focus:outline-none print:border-0 bg-white flex flex-col min-h-[1054px] w-[816px] border border-[#C7C7C7] pt-10 pr-14 pb-10 cursor-text",
      },
    },
  });

  const providerValue = useMemo(() => ({ editor }), [editor]);
  return (
    <EditorContext.Provider value={providerValue}>
      {children}
    </EditorContext.Provider>
  );
}
