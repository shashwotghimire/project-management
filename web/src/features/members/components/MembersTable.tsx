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
import { useGetOrgMembers } from "../hooks/useMembers";

export function MembersTable({ orgId }: { orgId: string }) {
  const { data, isPending, error } = useGetOrgMembers(orgId);

  if (isPending) return <div className="p-4 text-sm text-muted-foreground">Loading members...</div>;
  if (error) return <div className="p-4 text-sm text-destructive">Failed to load members.</div>;

  return (
    <Table>
      <TableCaption>Organization members</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Member</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Joined</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((member) => (
          <TableRow key={member.User.id}>
            <TableCell>
              <div className="flex items-center gap-2">
                <img
                  src={member.User.gravatarUrl}
                  alt={member.User.username}
                  className="h-7 w-7 rounded-full object-cover"
                />
                <span className="font-medium">{member.User.username}</span>
              </div>
            </TableCell>
            <TableCell>{member.User.email}</TableCell>
            <TableCell className="capitalize">{member.userRoleInOrg}</TableCell>
            <TableCell>
              {new Date(member.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
