"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { useGetProjectMembers, useRemoveProjectMember } from "../hooks/useProject";
import { Spinner } from "@/components/Spinner";
import { QueryError } from "@/components/QueryError";

interface ProjectMembersTableProps {
  orgId: string;
  projectId: string;
}

export default function ProjectMembersTable({ orgId, projectId }: ProjectMembersTableProps) {
  const [removeError, setRemoveError] = useState<string | null>(null);
  const { data, isPending, error } = useGetProjectMembers(orgId, projectId);
  const { mutate: removeMember, isPending: isRemoving } = useRemoveProjectMember(orgId, projectId);

  if (isPending) return <Spinner fullPage />;
  if (error) return <QueryError message="Failed to load members." />;

  return (
    <div className="flex flex-col gap-3 rounded-lg border p-6">
      {removeError && (
        <div className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {removeError}
        </div>
      )}
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="py-4">Member</TableHead>
          <TableHead className="py-4">Email</TableHead>
          <TableHead className="py-4">Added</TableHead>
          <TableHead className="w-24 py-4">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((member) => (
          <TableRow key={member.userId}>
            <TableCell className="py-4">
              <div className="flex items-center gap-2">
                <img
                  src={member.member.gravatarUrl}
                  alt={member.member.username}
                  className="h-7 w-7 rounded-full object-cover"
                />
                <span className="font-medium">{member.member.username}</span>
              </div>
            </TableCell>
            <TableCell className="py-4">{member.member.email}</TableCell>
            <TableCell className="py-4">
              {new Date(member.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </TableCell>
            <TableCell className="py-4">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="sm" disabled={isRemoving}>
                    Remove
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Remove member</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to remove{" "}
                      <span className="font-medium text-foreground">
                        {member.member.username}
                      </span>{" "}
                      from this project? They will lose access immediately.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      variant="destructive"
                      onClick={() => {
                        setRemoveError(null);
                        removeMember(member.userId, {
                          onError: () =>
                            setRemoveError(
                              `Failed to remove ${member.member.username}. Please try again.`,
                            ),
                        });
                      }}
                    >
                      Remove
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </div>
  );
}
