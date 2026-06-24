"use client";

import { useGetProjectTasks } from "../hooks/useTasks";
import TaskCard from "./TaskCard";

export default function TaskList({
  orgId,
  projectId,
}: {
  orgId: string;
  projectId: string;
}) {
  const { data, isPending, isError } = useGetProjectTasks(orgId, projectId);

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

  if (!data?.length) {
    return <p className="mt-4 text-sm text-muted-foreground">No tasks yet.</p>;
  }

  return (
    <div className="mt-4 flex flex-col gap-2">
      {data.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}
