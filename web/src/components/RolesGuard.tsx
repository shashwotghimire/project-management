"use client";

import { useAuthStore } from "@/store/auth.store";
import { UserRoles } from "@/types/auth-api.types";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function RolesGuard({
  roles,
  children,
}: {
  roles: UserRoles[];
  children: React.ReactNode;
}) {
  const hasRoles = useAuthStore((s) => s.hasRoles);
  const router = useRouter();
  const allowed = hasRoles(...roles);
  useEffect(() => {
    if (!allowed) router.replace("/onboarding");
  }, [allowed]);

  if (!allowed) {
    return null;
  }
  return <>{children}</>;
}
