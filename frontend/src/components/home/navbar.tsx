import { Link, useNavigate } from "react-router-dom";
import { FileTextIcon } from "lucide-react";
import { SearchInput } from "./search-input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useAuthStore } from "@/store/use-auth-store";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { apiFetch } from "@/lib/api-fetch";

export function Navbar() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  return (
    <nav className="flex items-center justify-between h-full w-full">
      <div className="flex gap-3 items-center shrink-0 pr-6">
        <Link to="/">
          <FileTextIcon className="size-6 text-blue-600" />
        </Link>
        <span className="text-xl font-medium">Docs</span>
      </div>
      <SearchInput />
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src={user?.avatarUrl} />
            <AvatarFallback>
              {user?.firstName.charAt(0)}
              {user?.lastName.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" sideOffset={8}>
          <DropdownMenuItem>
            <Link to="/profile">Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              try {
                apiFetch("/api/auth/logout", {
                  method: "POST",
                });
                logout();
                navigate("/login");
              } catch (error) {
                console.error(error);
              }
            }}
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
}
