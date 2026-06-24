"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGetOrgMembers } from "@/features/organization/hooks/useOrganization";
import { UserPlus } from "lucide-react";
import { useGetProjectMembers, useAddMemberToProject } from "../hooks/useProject";

interface AddMembersProps {
  orgId: string;
  projectId: string;
}

export default function AddMembers({ orgId, projectId }: AddMembersProps) {
  const { data: orgMembers } = useGetOrgMembers(orgId);
  const { data: projectMembers } = useGetProjectMembers(orgId, projectId);
  const { mutate: addMember, isPending } = useAddMemberToProject(
    orgId,
    projectId,
  );

  const projectMemberIds = new Set(projectMembers?.map((m) => m.userId) ?? []);
  const addable = orgMembers?.filter((m) => !projectMemberIds.has(m.User.id));

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
              onSelect={() => addMember(m.User.id)}
              className="flex flex-col items-start gap-0"
            >
              <span className="font-medium">{m.User.username}</span>
              <span className="text-xs text-muted-foreground">
                {m.User.email}
              </span>
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
