"use client";

import { useGetUserProfile } from "@/features/auth/hooks/useAuth";
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
  const { isLoading, data } = useGetUserProfile();
  const router = useRouter();
  const allowed = data?.role === "superadmin" ? true : false;
  useEffect(() => {
    if (!isLoading && !allowed) {
      router.push("/onboarding");
    }
  }, [allowed, isLoading]);
  if (isLoading) {
    return null;
  }
  if (!allowed) {
    return null;
  }
  return <>{children}</>;
}
