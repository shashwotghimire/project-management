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
import { useGetUsersProjects } from "../hooks/useProject";
import Link from "next/link";
import MemberAvatars from "./MemberAvatars";

export function ProjectsTable({ orgId }: { orgId: string }) {
  const { data, isPending, error } = useGetUsersProjects(orgId);
  return (
    <Table>
      <TableCaption>Your projects</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-25">Project</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Progress</TableHead>
          <TableHead>Tasks</TableHead>
          <TableHead>Members</TableHead>
          <TableHead>Updated</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.data.map((project) => (
          <TableRow key={project.id}>
            <TableCell className="font-medium">
              <Link
                href={`/organization/${orgId}/projects/${project.Project.id}`}
              >
                {project.Project.name}
              </Link>
            </TableCell>
            <TableCell
              className={`${project.Project.status === "active" ? "text-lime-600" : "text-gray-500"}`}
            >
              {project.Project.status === "active" ? "Active" : "Archived"}
            </TableCell>
            <TableCell>TODO</TableCell>
            <TableCell>$250.00</TableCell>
            <TableCell>
              <MemberAvatars orgId={orgId} projectId={project.Project.id} />
            </TableCell>
            <TableCell>
              {new Date(project.Project.updatedAt).toLocaleDateString("en-US", {
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
