"use client";

import { useGetUserProfile } from "@/features/auth/hooks/useAuth";
import { useRouter } from "next/navigation";
import React from "react";

export const PublicRoutes = ({ children }: { children: React.ReactNode }) => {
  const { data, isLoading, error } = useGetUserProfile();
  const router = useRouter();
  React.useEffect(() => {
    if (!isLoading && data) {
      router.replace("/onboarding");
    }
  }, [data, isLoading, error]);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return null;
  }
  if (!data) {
    return null;
  }
  return <>{children}</>;
};
