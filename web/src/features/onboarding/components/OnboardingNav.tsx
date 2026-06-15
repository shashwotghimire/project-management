"use client";

import Logo from "@/components/Logo";
import { UserDropdownMenu } from "./UserDropdownMenu";
import { AuthUser } from "@/types/auth-api.types";
import { useQueryClient } from "@tanstack/react-query";

function OnboardingNav() {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<AuthUser | null>(["user"]);
  return (
    <nav className="flex items-center justify-between px-6 py-3 border-b bg-background">
      <div className="flex items-center gap-2">
        <Logo />
      </div>
      <UserDropdownMenu user={user} />
    </nav>
  );
}

export default OnboardingNav;
