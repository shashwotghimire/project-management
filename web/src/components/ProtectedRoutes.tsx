"use client";

import { useGetUserProfile } from "@/features/auth/hooks/useAuth";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/Spinner";

const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  const { data, isLoading, error } = useGetUserProfile();
  const router = useRouter();
  useEffect(() => {
    if (!isLoading && !data) {
      router.replace("/login");
    }
  }, [data, isLoading]);
  if (isLoading) {
    return <Spinner fullPage />;
  }
  return <>{children}</>;
};

export default ProtectedRoutes;
