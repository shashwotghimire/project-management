"use client";

import { useGetUserProfile } from "@/features/auth/hooks/useAuth";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);
  const { data, isLoading, error } = useGetUserProfile();
  useEffect(() => {
    if (data) {
      setUser(data);
      setIsLoggedIn(true);
    }
    if (error) {
      router.push("/login");
    }
  }, [data, error]);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return <>{children}</>;
}
