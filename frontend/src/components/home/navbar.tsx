import { Link } from "react-router-dom";
import { FileTextIcon } from "lucide-react";
import { SearchInput } from "./search-input";

export function Navbar() {
  return (
    <nav className="flex items-center justify-between h-full w-full">
      <div className="flex gap-3 items-center shrink-0 pr-6">
        <Link to="/">
          <FileTextIcon className="size-6 text-blue-600" />
        </Link>
        <span className="text-xl font-medium">Docs</span>
      </div>
      <SearchInput />
    </nav>
  );
}
