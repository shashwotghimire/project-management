"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGetUserProfile } from "@/features/auth/hooks/useAuth";

interface SuperAdminGuardProps {
  children: React.ReactNode;
}

export default function SuperAdminGuard({ children }: SuperAdminGuardProps) {
  const { data: user, isLoading } = useGetUserProfile();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push("/login");
      } else if (user.role !== "superadmin") {
        router.push("/");
      }
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user || user.role !== "superadmin") {
    return null;
  }

  return <>{children}</>;
}
