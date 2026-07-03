"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetUsersProjects } from "../hooks/useProject";
import Link from "next/link";
import MemberAvatars from "./MemberAvatars";
import Image from "next/image";

export function ProjectsTable({ orgId }: { orgId: string }) {
  const { data, isPending, error } = useGetUsersProjects(orgId);
  return (
    <div className="rounded-lg border p-6">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-25 py-4">Project</TableHead>
          <TableHead className="py-4">Status</TableHead>
          <TableHead className="py-4">Progress</TableHead>
          <TableHead className="py-4">Members</TableHead>
          <TableHead className="py-4">Updated</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.data.map((project) => (
          <TableRow key={project.id}>
            <TableCell className="py-4 font-medium">
              <Link
                href={`/organization/${orgId}/projects/${project.Project.id}`}
                className="flex items-center gap-2"
              >
                {project.Project.logoUrl?.startsWith("http") ? (
                  <Image
                    src={project.Project.logoUrl}
                    alt={project.Project.name}
                    width={24}
                    height={24}
                    className="rounded-sm object-cover shrink-0"
                  />
                ) : (
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-sm bg-muted text-xs font-semibold uppercase">
                    {project.Project.name.charAt(0)}
                  </div>
                )}
                {project.Project.name}
              </Link>
            </TableCell>
            <TableCell
              className={`py-4 ${project.Project.status === "active" ? "text-lime-600" : "text-gray-500"}`}
            >
              {project.Project.status === "active" ? "Active" : "Archived"}
            </TableCell>
            <TableCell className="py-4">
              <div className="flex items-center gap-2">
                <div className="h-2 w-32 overflow-hidden rounded-full bg-muted">
                  <div className="h-full w-1/3 rounded-full bg-primary/40" />
                </div>
                <span className="text-xs text-muted-foreground">—</span>
              </div>
            </TableCell>
            <TableCell className="py-4">
              <MemberAvatars orgId={orgId} projectId={project.Project.id} />
            </TableCell>
            <TableCell className="py-4">
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
    </div>
  );
}
