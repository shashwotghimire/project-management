"use client";

import Image from "next/image";
import { User, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGetOrgMembers } from "@/features/members/hooks/useMembers";
import { useReassignTask } from "../hooks/useTasks";
import { cn } from "@/lib/utils";

interface ReassignTaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  orgId: string;
  projectId: string;
  taskId: string;
  currentAssigneeId: string | null;
}

export default function ReassignTaskDialog({
  open,
  onOpenChange,
  orgId,
  projectId,
  taskId,
  currentAssigneeId,
}: ReassignTaskDialogProps) {
  const { data: members, isPending } = useGetOrgMembers(orgId);
  const { mutate: reassign, isPending: isReassigning } = useReassignTask(orgId, projectId);

  const handleSelect = (newUserId: string) => {
    if (newUserId === currentAssigneeId || isReassigning) return;
    reassign(
      { orgId, projectId, taskId, newUserId },
      { onSuccess: () => onOpenChange(false) },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Reassign task</DialogTitle>
        </DialogHeader>

        <div className="mt-2 max-h-72 overflow-y-auto divide-y">
          {isPending && (
            <div className="space-y-2 py-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 px-1 py-2 animate-pulse">
                  <div className="h-8 w-8 rounded-full bg-muted shrink-0" />
                  <div className="space-y-1 flex-1">
                    <div className="h-3 w-24 rounded bg-muted" />
                    <div className="h-2.5 w-32 rounded bg-muted" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {!isPending &&
            members?.map((member) => {
              const user = member.User;
              const isCurrentAssignee = user.id === currentAssigneeId;

              return (
                <button
                  key={user.id}
                  onClick={() => handleSelect(user.id)}
                  disabled={isCurrentAssignee || isReassigning}
                  className={cn(
                    "cursor-pointer w-full flex items-center gap-3 px-1 py-2.5 text-left transition-colors hover:bg-accent",
                    isCurrentAssignee && "opacity-60 cursor-default",
                  )}
                >
                  {user.gravatarUrl ? (
                    <Image
                      src={user.gravatarUrl}
                      alt={user.username}
                      width={32}
                      height={32}
                      className="rounded-full shrink-0"
                    />
                  ) : (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted">
                      <User className="h-4 w-4 text-muted-foreground" />
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{user.username}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                  </div>

                  {isCurrentAssignee && (
                    <Check className="h-4 w-4 shrink-0 text-primary" />
                  )}
                </button>
              );
            })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
