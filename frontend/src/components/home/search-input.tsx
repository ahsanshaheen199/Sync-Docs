import { SearchIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

export function SearchInput() {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const pathname = useLocation().pathname;
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`${pathname}?search=${search}`);
  };

  return (
    <div className="flex flex-1 items-center justify-center">
      <form className="relative max-w-[720px] w-full" onSubmit={handleSubmit}>
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="md:text-base shadow-none placeholder:text-neutral-800 px-14 w-full border-none focus-visible:shadow-[0_1px_1px_0_rgba(65,69,73,.3),0_1px_3px_1px_rgba(65,69,73,.15)] bg-[#F0F4F8] rounded-full focus-visible:ring-0 focus:bg-white"
          type="text"
          placeholder="Search"
        />
        <Button
          type="submit"
          variant="ghost"
          className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full [&_svg]:size-5"
        >
          <SearchIcon className="size-4" />
        </Button>
        {search && (
          <Button
            type="button"
            onClick={() => {
              setSearch("");
              navigate(`${pathname}`);
            }}
            variant="ghost"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full [&_svg]:size-5"
          >
            <XIcon className="size-4" />
          </Button>
        )}
      </form>
    </div>
  );
}
