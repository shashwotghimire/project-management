"use client";

import { connectSocket } from "@/lib/socket";
import React, { useEffect } from "react";
import { Notification } from "@/types/notification-api.types";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();

  const params = useParams<{ id: string }>();
  const orgId = params?.id ?? "";

  useEffect(() => {
    if (!orgId) return;
    const socket = connectSocket();
    const handleNewNotification = (notification: Notification) => {
      queryClient.setQueryData<Notification[]>(
        ["notifications", orgId],
        (old = []) =>
          old.some((n) => n.id === notification.id) ? old : [notification, ...old],
      );
    };
    socket.on("notification:new", handleNewNotification);
    return () => {
      socket.off("notification:new", handleNewNotification);
    };
  }, [orgId, queryClient]);

  return <>{children}</>;
}
