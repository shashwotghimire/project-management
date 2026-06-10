import { useGetUserProfile } from "@/features/auth/hooks/useAuth";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  const { data, isLoading, error } = useGetUserProfile();
  const router = useRouter();
  useEffect(() => {
    if (!isLoading && (error || !data)) {
      router.replace("/login");
    }
  }, [data, isLoading, error]);
  if (isLoading) {
    return (
      <div className="text-2xl flex justify-center items-center">
        Loading...
      </div>
    );
  }
  return <>{children}</>;
};

export default ProtectedRoutes;
