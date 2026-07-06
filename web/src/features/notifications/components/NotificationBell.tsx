"use client";

import { Bell, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Notification } from "@/types/notification-api.types";
import Link from "next/link";
import { useDeleteNotification } from "@/features/notifications/hooks/useNotifications";

interface NotificationBellProps {
  notifications: Notification[];
  unreadCount: number;
  orgId: string;
  onOpen?: () => void;
}

export function NotificationBell({
  notifications,
  unreadCount,
  orgId,
  onOpen,
}: NotificationBellProps) {
  const { mutate: deleteNotification } = useDeleteNotification(orgId);

  return (
    <DropdownMenu onOpenChange={(open) => open && onOpen?.()}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative text-muted-foreground"
        >
          <Bell className="size-4" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 flex size-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white leading-none">
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications.length === 0 ? (
          <div className="px-2 py-6 text-center text-sm text-muted-foreground">
            No notifications
          </div>
        ) : (
          notifications.map((n) => (
            <div key={n.id} className="group relative flex items-start px-2 py-2 hover:bg-accent rounded-sm">
              <div className="flex-1 min-w-0">
                {n.href ? (
                  <Link href={n.href} className="flex flex-col gap-0.5 cursor-pointer">
                    <span className="font-medium text-sm">{n.title}</span>
                    <span className="text-xs text-muted-foreground line-clamp-2">{n.message}</span>
                  </Link>
                ) : (
                  <div className="flex flex-col gap-0.5">
                    <span className="font-medium text-sm">{n.title}</span>
                    <span className="text-xs text-muted-foreground line-clamp-2">{n.message}</span>
                  </div>
                )}
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteNotification(n.id);
                }}
                className="ml-2 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground"
              >
                <X className="size-3.5" />
              </button>
            </div>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
