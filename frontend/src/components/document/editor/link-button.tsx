import { Link2Icon } from "lucide-react";
import { useCurrentEditor } from "@tiptap/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { useState } from "react";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";

export function LinkToolbarButton() {
  const { editor } = useCurrentEditor();
  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (open) {
          setValue(editor?.getAttributes("link").href ?? "");
        }
      }}
    >
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80">
          <Link2Icon className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2.5 flex items-center gap-x-2">
        <Input
          placeholder="https://www.example.com"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button
          onClick={() => {
            if (value) {
              editor
                ?.chain()
                .focus()
                .extendMarkRange("link")
                .setLink({ href: value })
                .run();
              setValue("");
              setIsOpen(false);
            }
          }}
        >
          Apply
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
