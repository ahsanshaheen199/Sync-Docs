import { ListIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useCurrentEditor, useEditorState } from "@tiptap/react";
import { useState } from "react";

export function ListToolbarButton() {
  const { editor } = useCurrentEditor();
  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isBulletList: ctx.editor?.isActive("bulletList"),
        isOrderedList: ctx.editor?.isActive("orderedList"),
      };
    },
  });
  const [isOpen, setIsOpen] = useState(false);

  const lists = [
    {
      label: "Bullet List",
      icon: ListIcon,
      isActive: editorState?.isBulletList ?? false,
      onClick: () => {
        editor?.chain().focus().toggleBulletList().run();
        setIsOpen(false);
      },
    },
    {
      label: "Ordered List",
      icon: ListIcon,
      isActive: editorState?.isOrderedList ?? false,
      onClick: () => {
        editor?.chain().focus().toggleOrderedList().run();
        setIsOpen(false);
      },
    },
  ];

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80">
          <ListIcon className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {lists.map(({ label, icon: Icon, isActive, onClick }) => (
          <button
            className={cn(
              "flex items-center px-2 py-1 gap-x-2 rounded-sm text-sm hover:bg-neutral-200/80",
              isActive && "bg-neutral-200/80"
            )}
            key={label}
            onClick={onClick}
          >
            <Icon className="size-4 mr-2" />
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
