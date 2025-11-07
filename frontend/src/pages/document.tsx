import { Editor } from '@/components/document/editor';
import { Toolbar } from '@/components/document/editor/toolbar';
import { EditorContextProvider } from '@/context/editor-context';
import { Navbar } from '@/components/document/navbar';

export function Document() {
	return (
		<div className="min-h-screen bg-[#FAFBFD]">
			<EditorContextProvider>
				<div className="fixed top-0 right-0 left-0 z-10 flex flex-col gap-y-2 bg-[#FAFBFD] px-4 pt-2 print:hidden">
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
