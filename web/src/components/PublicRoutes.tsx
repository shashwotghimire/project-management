"use client";

import { useGetUserProfile } from "@/features/auth/hooks/useAuth";
import { useRouter } from "next/navigation";
import React from "react";
import { Spinner } from "@/components/Spinner";

export const PublicRoutes = ({ children }: { children: React.ReactNode }) => {
  const hasToken =
    typeof window !== "undefined" && !!localStorage.getItem("accessToken");
  const { data, isLoading } = useGetUserProfile();
  const router = useRouter();
  React.useEffect(() => {
    if (!isLoading && data) {
      router.replace("/onboarding");
    }
  }, [data, isLoading]);
  if (hasToken && isLoading) {
    return <Spinner fullPage />;
  }
  return <>{children}</>;
};
