import {
  BoldIcon,
  ItalicIcon,
  ListTodoIcon,
  type LucideIcon,
  MessageSquarePlusIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  SpellCheckIcon,
  UnderlineIcon,
  Undo2Icon,
} from "lucide-react";
import { ToolbarButton } from "./toolbar-button";
import { useCurrentEditor, useEditorState } from "@tiptap/react";
import { Separator } from "../ui/separator";
import { FontFamilyToolbarButton } from "./font-family-toolbar-button";
import { HeadingToolbarButton } from "./heading-toolbar-button";
import type { HeadingValue } from "@/types";
import { HighlightToolbarButton } from "./highlight-toolbar-button";
import { TextColorToolbarButton } from "./text-color-toolbar-button";

export function Toolbar() {
  const { editor } = useCurrentEditor();

  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isBold: ctx.editor?.isActive("bold") ?? false,
        canBold: ctx.editor?.can().chain().toggleBold().run() ?? false,
        isItalic: ctx.editor?.isActive("italic") ?? false,
        canItalic: ctx.editor?.can().chain().toggleItalic().run() ?? false,
        isStrike: ctx.editor?.isActive("strike") ?? false,
        canStrike: ctx.editor?.can().chain().toggleStrike().run() ?? false,
        isCode: ctx.editor?.isActive("code") ?? false,
        canCode: ctx.editor?.can().chain().toggleCode().run() ?? false,
        canClearMarks: ctx.editor?.can().chain().unsetAllMarks().run() ?? false,
        isParagraph: ctx.editor?.isActive("paragraph") ?? false,
        isBulletList: ctx.editor?.isActive("bulletList") ?? false,
        isOrderedList: ctx.editor?.isActive("orderedList") ?? false,
        isCodeBlock: ctx.editor?.isActive("codeBlock") ?? false,
        isBlockquote: ctx.editor?.isActive("blockquote") ?? false,
        canUndo: ctx.editor?.can().chain().undo().run() ?? false,
        canRedo: ctx.editor?.can().chain().redo().run() ?? false,
        isUnderline: ctx.editor?.isActive("underline") ?? false,
        isTaskList: ctx.editor?.isActive("taskList") ?? false,
        fontFamily:
          ctx.editor?.getAttributes("textStyle").fontFamily ?? "Arial",
        heading: ctx.editor?.getAttributes("heading")?.level ?? 0,
        textColor: ctx.editor?.getAttributes("textStyle").color ?? "#000000",
        highlightColor:
          ctx.editor?.getAttributes("highlight").color ?? "#ffffff",
      };
    },
  });

  const sections: {
    label: string;
    icon: LucideIcon;
    onClick?: () => void;
    isActive?: boolean;
  }[][] = [
    [
      {
        label: "Undo",
        icon: Undo2Icon,
        onClick: () => editor?.chain().focus().undo().run(),
      },
      {
        label: "Redo",
        icon: Redo2Icon,
        onClick: () => editor?.chain().focus().redo().run(),
      },
      {
        label: "Print",
        icon: PrinterIcon,
        onClick: () => window.print(),
      },
      {
        label: "Spell Check",
        icon: SpellCheckIcon,
        onClick: () => {
          const spellCheck = editor?.view.dom.getAttribute("spellcheck");
          editor?.view.dom.setAttribute(
            "spellcheck",
            spellCheck === "true" ? "false" : "true"
          );
        },
      },
    ],
    [
      {
        label: "Bold",
        icon: BoldIcon,
        isActive: editorState?.isBold ?? false,
        onClick: () => {
          editor?.chain().focus().toggleBold().run();
        },
      },
      {
        label: "Italic",
        icon: ItalicIcon,
        isActive: editorState?.isItalic ?? false,
        onClick: () => {
          editor?.chain().focus().toggleItalic().run();
        },
      },
      {
        label: "Underline",
        icon: UnderlineIcon,
        isActive: editorState?.isUnderline ?? false,
        onClick: () => {
          editor?.chain().focus().toggleUnderline().run();
        },
      },
    ],
    [
      {
        label: "Comment",
        icon: MessageSquarePlusIcon,
        onClick: () => {
          //   editor?.chain().focus().toggleComment().run();
        },
        isActive: false,
      },
      {
        label: "List Todo",
        icon: ListTodoIcon,
        onClick: () => {
          editor?.chain().focus().toggleTaskList().run();
        },
        isActive: editorState?.isTaskList ?? false,
      },
      {
        label: "Remove Formating",
        icon: RemoveFormattingIcon,
        onClick: () => {
          editor?.chain().focus().unsetAllMarks().run();
        },
      },
    ],
  ];

  return (
    <div className="px-2.5 py-0.5 bg-[#F0F4F9] rounded-3xl min-h-10 flex items-center gap-x-0.5 overflow-x-auto">
      {sections[0].map((section, index) => (
        <ToolbarButton key={index} {...section} />
      ))}
      <Separator orientation="vertical" className="h-6!" />
      <FontFamilyToolbarButton fontFamily={editorState?.fontFamily} />
      <Separator orientation="vertical" className="h-6!" />
      <HeadingToolbarButton
        headingValue={editorState?.heading as HeadingValue}
      />
      <Separator orientation="vertical" className="h-6!" />
      {sections[1].map((section, index) => (
        <ToolbarButton key={index} {...section} />
      ))}
      <TextColorToolbarButton textColor={editorState?.textColor ?? "#000000"} />
      <HighlightToolbarButton
        highlightColor={editorState?.highlightColor ?? "#ffffff"}
      />
      <Separator orientation="vertical" className="h-6!" />
      {sections[2].map((section, index) => (
        <ToolbarButton key={index} {...section} />
      ))}
    </div>
  );
}
