"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AuthUser } from "@/types/auth-api.types";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

interface UserDropdownMenuProps {
  user: AuthUser | null | undefined;
}

export function UserDropdownMenu({ user }: UserDropdownMenuProps) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    queryClient.clear();
    router.push("/login");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <img
          src={user?.gravatarUrl}
          alt="User avatar"
          className="w-8 h-8 rounded-full cursor-pointer"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48" align="end">
        <DropdownMenuLabel>
          <div className="font-medium">{user?.username}</div>
          <div className="text-xs text-muted-foreground font-normal truncate">
            {user?.email}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="text-red-500 focus:text-red-500 cursor-pointer"
            onClick={handleLogout}
          >
            Log out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
