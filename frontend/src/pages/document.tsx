import { Editor } from "@/components/document/editor";
import { Toolbar } from "@/components/document/editor/toolbar";
import { EditorContextProvider } from "@/context/editor-context";
import { Navbar } from "@/components/document/navbar";

export function Document() {
  return (
    <div className="min-h-screen bg-[#FAFBFD]">
      <EditorContextProvider>
        <div className="flex flex-col px-4 pt-2 gap-y-2 fixed top-0 left-0 right-0 z-10 print:hidden bg-[#FAFBFD]">
          <Navbar />
          <Toolbar />
        </div>
        <div className="pt-[114px] print:pt-0">
          <Editor />
        </div>
      </EditorContextProvider>
    </div>
  );
}
