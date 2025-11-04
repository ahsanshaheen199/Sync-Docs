import { useCurrentEditor } from "@tiptap/react";
import { ImageIcon, LinkIcon, UploadIcon } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { DropdownMenuTrigger } from "../ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export function ImageToolbarButton() {
  const { editor } = useCurrentEditor();
  const [imageUrl, setImageUrl] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const onChange = (src: string) => {
    editor?.chain().focus().setImage({ src }).run();
  };

  const onUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const url = URL.createObjectURL(file);
        onChange(url);
      }
    };
    input.click();
  };

  const handleImageUrlSubmit = () => {
    if (imageUrl && imageUrl.trim() !== "") {
      onChange(imageUrl);
      setImageUrl("");
      setIsOpen(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80">
            <ImageIcon className="size-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={onUpload}>
            <UploadIcon className="size-4 mr-2" />
            Upload
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsOpen(true)}>
            <LinkIcon className="size-4 mr-2" />
            Insert from URL
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Insert Image URL</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Enter image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleImageUrlSubmit();
              }
            }}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleImageUrlSubmit}>Insert</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
