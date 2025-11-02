import { Editor } from "@/components/editor";
import { Toolbar } from "@/components/editor/toolbar";
import { EditorContextProvider } from "@/context/editor-context";

export function Document() {
  return (
    <div className="min-h-screen bg-[#FAFBFD]">
      <EditorContextProvider>
        <Toolbar />
        <Editor />
      </EditorContextProvider>
    </div>
  );
}
