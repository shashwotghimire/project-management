"use client";

import { useState } from "react";
import { Hash, MoreHorizontal, PanelLeftClose, PanelLeftOpen, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useGetChannels, useUpdateChannel, useDeleteChannel } from "../hooks/useChannels";
import CreateChannelDialog from "./CreateChannelDialog";
import { Channel } from "@/types/channel-api.types";

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
  const updateChannel = useUpdateChannel(orgId, projectId);
  const deleteChannel = useDeleteChannel(orgId, projectId);
  const [createOpen, setCreateOpen] = useState(false);
  const [renameChannel, setRenameChannel] = useState<Channel | null>(null);
  const [renameValue, setRenameValue] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<Channel | null>(null);

  function openRename(channel: Channel) {
    setRenameValue(channel.name);
    setRenameChannel(channel);
  }

  function handleRename() {
    if (!renameChannel || !renameValue.trim()) return;
    updateChannel.mutate(
      { orgId, projectId, channelId: renameChannel.id, name: renameValue.trim() },
      { onSuccess: () => setRenameChannel(null) },
    );
  }

  function handleDelete() {
    if (!deleteTarget) return;
    deleteChannel.mutate(
      { orgId, projectId, channelId: deleteTarget.id },
      { onSuccess: () => setDeleteTarget(null) },
    );
  }

  return (
    <>
      <Dialog open={!!renameChannel} onOpenChange={(o) => !o && setRenameChannel(null)}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Rename channel</DialogTitle>
          </DialogHeader>
          <Input
            value={renameValue}
            onChange={(e) => setRenameValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleRename()}
            autoFocus
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setRenameChannel(null)}>Cancel</Button>
            <Button onClick={handleRename} disabled={updateChannel.isPending}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteTarget} onOpenChange={(o) => !o && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete #{deleteTarget?.name}?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the channel and all its messages.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-500 text-white hover:bg-red-600 cursor-pointer"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

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
            <div
              key={channel.id}
              className={cn(
                "group flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors",
                "hover:bg-accent hover:text-accent-foreground",
                channel.id === activeChannelId
                  ? "bg-accent text-accent-foreground font-medium"
                  : "text-muted-foreground",
              )}
            >
              <button
                onClick={() => onSelectChannel(channel.id)}
                className="flex flex-1 items-center gap-2 min-w-0 cursor-pointer"
              >
                <Hash className="size-3.5 shrink-0" />
                <span className="truncate">{channel.name}</span>
              </button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MoreHorizontal className="size-3.5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-36">
                  <DropdownMenuItem className="cursor-pointer" onClick={() => openRename(channel)}>
                    Rename
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-red-500 focus:text-red-500 cursor-pointer"
                    onClick={() => setDeleteTarget(channel)}
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
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
