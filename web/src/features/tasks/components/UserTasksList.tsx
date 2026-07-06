"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetMyOrgTasks } from "../hooks/useTasks";
import { useGetUsersProjects } from "@/features/projects/hooks/useProject";
import { TaskPriority, TaskStatus } from "@/types/task-api.types";
import { Project } from "@/types/project-api.types";
import Link from "next/link";
import Image from "next/image";

const statusLabel: Record<TaskStatus, string> = {
  todo: "To Do",
  in_progress: "In Progress",
  completed: "Completed",
};

const statusClass: Record<TaskStatus, string> = {
  todo: "bg-muted text-muted-foreground",
  in_progress: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  completed: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
};

const priorityClass: Record<TaskPriority, string> = {
  high: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  medium: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  low: "bg-muted text-muted-foreground",
};

export function UserTasksList({ orgId }: { orgId: string }) {
  const { data: tasks, isPending, error } = useGetMyOrgTasks(orgId);
  const { data: projectsData } = useGetUsersProjects(orgId);

  const projectMap = new Map<string, Project>(
    projectsData?.data.map((m) => [m.Project.id, m.Project]) ?? [],
  );

  if (isPending) {
    return <div className="p-6 text-sm text-muted-foreground">Loading tasks…</div>;
  }

  if (error) {
    return <div className="p-6 text-sm text-destructive">Failed to load tasks.</div>;
  }

  if (!tasks?.length) {
    return <div className="p-6 text-sm text-muted-foreground">No tasks assigned to you.</div>;
  }

  return (
    <div className="rounded-lg border p-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="py-4">Title</TableHead>
            <TableHead className="py-4">Project</TableHead>
            <TableHead className="py-4">Status</TableHead>
            <TableHead className="py-4">Priority</TableHead>
            <TableHead className="py-4">Due Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => {
            const project = projectMap.get(task.projectId);
            return (
            <TableRow key={task.id}>
              <TableCell className="py-4 font-medium">
                <Link
                  href={`/organization/${orgId}/projects/${task.projectId}/tasks/${task.id}`}
                  className="hover:underline"
                >
                  {task.title}
                </Link>
              </TableCell>
              <TableCell className="py-4">
                <Link
                  href={`/organization/${orgId}/projects/${task.projectId}`}
                  className="flex items-center gap-2 hover:underline"
                >
                  {project?.logoUrl?.startsWith("http") ? (
                    <Image
                      src={project.logoUrl}
                      alt={project.name}
                      width={20}
                      height={20}
                      className="rounded-sm object-cover shrink-0"
                    />
                  ) : (
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-sm bg-muted text-xs font-semibold uppercase">
                      {project?.name.charAt(0) ?? "?"}
                    </div>
                  )}
                  <span className="text-sm">{project?.name ?? "Unknown"}</span>
                </Link>
              </TableCell>
              <TableCell className="py-4">
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusClass[task.status]}`}>
                  {statusLabel[task.status]}
                </span>
              </TableCell>
              <TableCell className="py-4">
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${priorityClass[task.priority]}`}>
                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                </span>
              </TableCell>
              <TableCell className="py-4 text-muted-foreground">
                {task.dueDate
                  ? new Date(task.dueDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                  : "—"}
              </TableCell>
            </TableRow>
          );})}
        </TableBody>
      </Table>
    </div>
  );
}
