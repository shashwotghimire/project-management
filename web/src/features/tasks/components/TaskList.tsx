"use client";

import { useState } from "react";
import { useGetProjectTasks } from "../hooks/useTasks";
import TaskCard from "./TaskCard";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

  if (isPending) {
    return (
      <div className="space-y-2 mt-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-16 rounded bg-muted animate-pulse" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <p className="mt-4 text-sm text-destructive">Failed to load tasks.</p>
    );
  }

  if (!data?.tasks.length) {
    return <p className="mt-4 text-sm text-muted-foreground">No tasks yet.</p>;
  }

  const totalPages = Math.ceil(data.total / PAGE_SIZE);

  return (
    <div className="mt-4 flex flex-col gap-2">
      {data.tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          href={`/organization/${orgId}/projects/${projectId}/tasks/${task.id}`}
        />
      ))}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-4">
          <Button
            variant="outline"
            size="sm"
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {page} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      )}
    </div>
  );
}
