"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { useGetOrganizationById } from "@/features/organization/hooks/useOrganization";
import { useParams } from "next/navigation";
import { NotificationBell } from "@/features/notifications/components/NotificationBell";
import { useGetUserNotifications } from "@/features/notifications/hooks/useNotifications";

import { CreateTaskModal } from "./CreateTaskModal";

export function ProjectNavbar() {
  const params = useParams<{ id: string }>();
  const orgId = params?.id ?? "";
  const { data: org } = useGetOrganizationById(orgId);
  const { data: notifications = [] } = useGetUserNotifications(orgId);
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <header className="h-14 flex items-center justify-between px-4 border-b bg-white">
      <div className="flex items-center gap-3">
        <SidebarTrigger className="text-muted-foreground" />
        <span className="text-sm font-semibold">{org?.name ?? ""}</span>
      </div>

      <div className="flex items-center gap-2">
        <NotificationBell notifications={notifications} unreadCount={unreadCount} />
        <CreateTaskModal orgId={orgId} projectId="" />
      </div>
    </header>
  );
}
