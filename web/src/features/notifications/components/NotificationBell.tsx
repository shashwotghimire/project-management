"use client";

import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Notification } from "@/types/notification-api.types";

interface NotificationBellProps {
  notifications: Notification[];
  unreadCount: number;
  onOpen?: () => void;
}

export function NotificationBell({
  notifications,
  unreadCount,
  onOpen,
}: NotificationBellProps) {
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
            <DropdownMenuItem key={n.id} className="flex flex-col items-start gap-0.5 py-2">
              <span className="font-medium text-sm">{n.title}</span>
              <span className="text-xs text-muted-foreground line-clamp-2">{n.message}</span>
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
