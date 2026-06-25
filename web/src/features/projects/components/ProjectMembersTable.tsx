"use client";

import {
  Table,
  TableBody,
  TableCaption,
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
import { useGetProjectMembers, useRemoveProjectMember } from "../hooks/useProject";

interface ProjectMembersTableProps {
  orgId: string;
  projectId: string;
}

export default function ProjectMembersTable({ orgId, projectId }: ProjectMembersTableProps) {
  const { data, isPending, error } = useGetProjectMembers(orgId, projectId);
  const { mutate: removeMember, isPending: isRemoving } = useRemoveProjectMember(orgId, projectId);

  if (isPending) return <div className="p-4 text-sm text-muted-foreground">Loading members...</div>;
  if (error) return <div className="p-4 text-sm text-destructive">Failed to load members.</div>;

  return (
    <Table>
      <TableCaption>Project members</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Member</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Added</TableHead>
          <TableHead className="w-24">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((member) => (
          <TableRow key={member.userId}>
            <TableCell>
              <div className="flex items-center gap-2">
                <img
                  src={member.member.gravatarUrl}
                  alt={member.member.username}
                  className="h-7 w-7 rounded-full object-cover"
                />
                <span className="font-medium">{member.member.username}</span>
              </div>
            </TableCell>
            <TableCell>{member.member.email}</TableCell>
            <TableCell>
              {new Date(member.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </TableCell>
            <TableCell>
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
                      onClick={() => removeMember(member.userId)}
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
  );
}
