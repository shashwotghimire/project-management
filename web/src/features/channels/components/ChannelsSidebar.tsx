"use client";

import { useState } from "react";
import { Hash, PanelLeftClose, PanelLeftOpen, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useGetChannels } from "../hooks/useChannels";
import CreateChannelDialog from "./CreateChannelDialog";

interface ChannelsSidebarProps {
  orgId: string;
  projectId: string;
  activeChannelId: string | null;
  onSelectChannel: (channelId: string) => void;
  collapsed: boolean;
  onToggle: () => void;
}

export default function ChannelsSidebar({
  orgId,
  projectId,
  activeChannelId,
  onSelectChannel,
  collapsed,
  onToggle,
}: ChannelsSidebarProps) {
  const { data: channels, isLoading } = useGetChannels(orgId, projectId);
  const [createOpen, setCreateOpen] = useState(false);

  return (
    <>
      <CreateChannelDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        orgId={orgId}
        projectId={projectId}
      />
      <div
        className={cn(
          "flex h-full shrink-0 flex-col border-r transition-all duration-200",
          collapsed ? "w-10" : "w-52",
        )}
      >
        <div className={cn("flex h-10 items-center border-b px-2", collapsed ? "justify-center" : "justify-between")}>
          {!collapsed && (
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Channels
            </span>
          )}
          <div className="flex items-center gap-0.5">
            {!collapsed && (
              <Button
                variant="ghost"
                size="icon"
                className="size-6 shrink-0"
                onClick={() => setCreateOpen(true)}
                title="Create channel"
              >
                <Plus className="size-3.5" />
              </Button>
            )}
            <Button variant="ghost" size="icon" className="size-6 shrink-0" onClick={onToggle}>
              {collapsed ? <PanelLeftOpen className="size-3.5" /> : <PanelLeftClose className="size-3.5" />}
            </Button>
          </div>
        </div>

      {!collapsed && (
        <div className="flex-1 overflow-y-auto py-2">
          {isLoading &&
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="px-2 py-0.5">
                <Skeleton className="h-7 w-full rounded-md" />
              </div>
            ))}
          {!isLoading && channels?.length === 0 && (
            <p className="px-3 py-2 text-xs text-muted-foreground">No channels yet</p>
          )}
          {channels?.map((channel) => (
            <button
              key={channel.id}
              onClick={() => onSelectChannel(channel.id)}
              className={cn(
                "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors cursor-pointer",
                "hover:bg-accent hover:text-accent-foreground",
                channel.id === activeChannelId
                  ? "bg-accent text-accent-foreground font-medium"
                  : "text-muted-foreground",
              )}
            >
              <Hash className="size-3.5 shrink-0" />
              <span className="truncate">{channel.name}</span>
            </button>
          ))}
        </div>
      )}

      {collapsed && (
        <div className="flex flex-1 flex-col items-center gap-1 py-2">
          {channels?.map((channel) => (
            <button
              key={channel.id}
              onClick={() => onSelectChannel(channel.id)}
              title={channel.name}
              className={cn(
                "flex size-7 items-center justify-center rounded-md transition-colors cursor-pointer",
                "hover:bg-accent hover:text-accent-foreground",
                channel.id === activeChannelId
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground",
              )}
            >
              <Hash className="size-3.5" />
            </button>
          ))}
        </div>
      )}
      </div>
    </>
  );
}
