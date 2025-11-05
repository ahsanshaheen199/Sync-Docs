import { CloudCheckIcon } from "lucide-react";

export function DocumentInput() {
  return (
    <div className="flex items-center gap-2">
      <span className="text-lg truncate cursor-pointer px-1.5">
        Untitled Document
      </span>
      <CloudCheckIcon className="size-4" />
    </div>
  );
}
