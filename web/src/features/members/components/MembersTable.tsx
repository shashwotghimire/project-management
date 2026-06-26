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
import { useGetOrgMembers, useRemoveOrgMember } from "../hooks/useMembers";
import { Spinner } from "@/components/Spinner";
import { QueryError } from "@/components/QueryError";

export function MembersTable({ orgId }: { orgId: string }) {
  const { data, isPending, error } = useGetOrgMembers(orgId);
  const { mutate: removeMember, isPending: isRemoving } = useRemoveOrgMember(orgId);

  if (isPending) return <Spinner fullPage />;
  if (error) return <QueryError message="Failed to load members." />;

  return (
    <div className="rounded-lg border p-6">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="py-4">Member</TableHead>
          <TableHead className="py-4">Email</TableHead>
          <TableHead className="py-4">Role</TableHead>
          <TableHead className="py-4">Joined</TableHead>
          <TableHead className="w-24 py-4">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((member) => (
          <TableRow key={member.User.id}>
            <TableCell className="py-4">
              <div className="flex items-center gap-2">
                <img
                  src={member.User.gravatarUrl}
                  alt={member.User.username}
                  className="h-7 w-7 rounded-full object-cover"
                />
                <span className="font-medium">{member.User.username}</span>
              </div>
            </TableCell>
            <TableCell className="py-4">{member.User.email}</TableCell>
            <TableCell className="capitalize py-4">{member.userRoleInOrg}</TableCell>
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
                        {member.User.username}
                      </span>{" "}
                      from this organization? They will lose access to all projects immediately.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      variant="destructive"
                      onClick={() => removeMember(member.User.id)}
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
