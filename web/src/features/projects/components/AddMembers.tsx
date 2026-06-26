"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGetOrgMembers } from "@/features/organization/hooks/useOrganization";
import { Loader2, UserPlus } from "lucide-react";
import { useGetProjectMembers, useAddMemberToProject } from "../hooks/useProject";

interface AddMembersProps {
  orgId: string;
  projectId: string;
}

export default function AddMembers({ orgId, projectId }: AddMembersProps) {
  const [addingId, setAddingId] = useState<string | null>(null);
  const { data: orgMembers } = useGetOrgMembers(orgId);
  const { data: projectMembers } = useGetProjectMembers(orgId, projectId);
  const { mutate: addMember, isPending } = useAddMemberToProject(orgId, projectId);

  const projectMemberIds = new Set(projectMembers?.map((m) => m.userId) ?? []);
  const addable = orgMembers?.filter((m) => !projectMemberIds.has(m.User.id));

  const handleAdd = (userId: string) => {
    setAddingId(userId);
    addMember(userId, { onSettled: () => setAddingId(null) });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" className="gap-1.5">
          <UserPlus className="size-3.5" />
          Add member
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {!addable?.length ? (
          <div className="px-2 py-3 text-center text-sm text-muted-foreground">
            All org members are already in this project.
          </div>
        ) : (
          addable.map((m) => (
            <DropdownMenuItem
              key={m.User.id}
              disabled={isPending}
              onSelect={() => handleAdd(m.User.id)}
              className="flex items-center justify-between gap-2"
            >
              <div className="flex flex-col items-start gap-0 min-w-0">
                <span className="font-medium truncate">{m.User.username}</span>
                <span className="text-xs text-muted-foreground truncate">
                  {m.User.email}
                </span>
              </div>
              {addingId === m.User.id && (
                <Loader2 className="h-3.5 w-3.5 shrink-0 animate-spin text-muted-foreground" />
              )}
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
