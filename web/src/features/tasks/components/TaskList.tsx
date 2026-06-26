"use client";

import { useState } from "react";
import { useGetProjectTasks } from "../hooks/useTasks";
import { useGetOrgMembers } from "@/features/members/hooks/useMembers";
import TaskCard from "./TaskCard";
import { ChevronLeft, ChevronRight, ListTodo } from "lucide-react";

const PAGE_SIZE = 10;

export default function TaskList({
  orgId,
  projectId,
}: {
  orgId: string;
  projectId: string;
}) {
  const [page, setPage] = useState(1);
  const { data, isPending, isError } = useGetProjectTasks(
    orgId,
    projectId,
    page,
    PAGE_SIZE,
  );
  const { data: members } = useGetOrgMembers(orgId);

  const totalPages = data ? Math.ceil(data.total / PAGE_SIZE) : 1;

  const memberMap = new Map(members?.map((m) => [m.User.id, m.User]) ?? []);

  return (
    <div className="flex flex-col gap-2">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 pb-2 border-b">
        <div className="flex items-center gap-2">
          <ListTodo className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-semibold">All Tasks</span>
          {data && (
            <span className="text-xs text-muted-foreground">({data.total})</span>
          )}
        </div>
        {totalPages > 1 && (
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="cursor-pointer flex h-6 w-6 items-center justify-center rounded hover:bg-accent disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </button>
            <span className="text-xs text-muted-foreground tabular-nums">
              {page} / {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="cursor-pointer flex h-6 w-6 items-center justify-center rounded hover:bg-accent disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      {isPending ? (
        <div className="space-y-2 mt-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-16 rounded bg-muted animate-pulse" />
          ))}
        </div>
      ) : isError ? (
        <p className="mt-4 text-sm text-destructive">Failed to load tasks.</p>
      ) : !data?.tasks.length ? (
        <p className="mt-4 text-sm text-muted-foreground">No tasks yet.</p>
      ) : (
        <div className="mt-2 flex flex-col gap-2">
          {data.tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              assignee={task.assignedTo ? memberMap.get(task.assignedTo) : undefined}
              href={`/organization/${orgId}/projects/${projectId}/tasks/${task.id}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
