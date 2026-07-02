import ProtectedRoutes from "@/components/ProtectedRoutes";
import { SocketProvider } from "@/features/notifications/components/SocketProvider";
import React from "react";

export default function dashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoutes>
      <SocketProvider>{children}</SocketProvider>
    </ProtectedRoutes>
  );
}
