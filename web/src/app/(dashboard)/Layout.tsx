import ProtectedRoutes from "@/components/ProtectedRoutes";
import React from "react";

export default function dashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProtectedRoutes>{children}</ProtectedRoutes>;
}
