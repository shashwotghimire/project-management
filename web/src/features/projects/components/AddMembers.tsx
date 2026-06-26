"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useGetOrgMembers } from "@/features/organization/hooks/useOrganization";
import { CheckCircle2, Loader2, UserPlus, XCircle } from "lucide-react";
import { useGetProjectMembers, useAddMemberToProject } from "../hooks/useProject";

interface AddMembersProps {
  orgId: string;
  projectId: string;
}

type MemberStatus = { type: "success" | "error"; name: string };

export default function AddMembers({ orgId, projectId }: AddMembersProps) {
  const [open, setOpen] = useState(false);
  const [addingId, setAddingId] = useState<string | null>(null);
  const [status, setStatus] = useState<MemberStatus | null>(null);

  const { data: orgMembers } = useGetOrgMembers(orgId);
  const { data: projectMembers } = useGetProjectMembers(orgId, projectId);
  const { mutate: addMember } = useAddMemberToProject(orgId, projectId);

  const projectMemberIds = new Set(projectMembers?.map((m) => m.userId) ?? []);
  const addable = orgMembers?.filter((m) => !projectMemberIds.has(m.User.id));

  const handleAdd = (userId: string, username: string) => {
    setAddingId(userId);
    setStatus(null);
    addMember(userId, {
      onSuccess: () => {
        setStatus({ type: "success", name: username });
        setAddingId(null);
      },
      onError: () => {
        setStatus({ type: "error", name: username });
        setAddingId(null);
      },
    });
  };

  function handleOpenChange(val: boolean) {
    setOpen(val);
    if (!val) setStatus(null);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-1.5">
          <UserPlus className="size-3.5" />
          Add member
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add member to project</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-2">
          {!addable?.length ? (
            <p className="py-2 text-sm text-muted-foreground">
              All org members are already in this project.
            </p>
          ) : (
            <div className="space-y-1.5">
              {addable.map((m) => (
                <div key={m.User.id} className="flex items-center justify-between gap-3">
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm font-medium truncate">{m.User.username}</span>
                    <span className="text-xs text-muted-foreground truncate">{m.User.email}</span>
                  </div>
                  <Button
                    size="sm"
                    disabled={addingId !== null}
                    onClick={() => handleAdd(m.User.id, m.User.username)}
                    className="shrink-0"
                  >
                    {addingId === m.User.id ? (
                      <Loader2 className="size-3.5 animate-spin" />
                    ) : (
                      "Add"
                    )}
                  </Button>
                </div>
              ))}
            </div>
          )}
          {status && (
            status.type === "success" ? (
              <div className="flex items-center gap-2 rounded-md bg-green-50 px-3 py-2 text-sm text-green-700">
                <CheckCircle2 className="size-4 shrink-0" />
                <span><span className="font-medium">{status.name}</span> was added to the project.</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
                <XCircle className="size-4 shrink-0" />
                <span>Failed to add <span className="font-medium">{status.name}</span>. Please try again.</span>
              </div>
            )
          )}
          <div className="flex justify-end gap-2 border-t pt-4">
            <Button variant="outline" onClick={() => handleOpenChange(false)}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
