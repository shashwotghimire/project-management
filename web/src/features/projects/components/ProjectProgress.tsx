"use client";

import { useGetProjectTaskStats } from "../hooks/useProject";

interface ProjectProgressProps {
  orgId: string;
  projectId: string;
  showLabel?: boolean;
  barClassName?: string;
}

export default function ProjectProgress({
  orgId,
  projectId,
  showLabel = true,
  barClassName = "h-2 w-32",
}: ProjectProgressProps) {
  const { data, isPending } = useGetProjectTaskStats(orgId, projectId);

  const total = data?.totalTasks ?? 0;
  const completed = data?.totalCompletedTasks ?? 0;
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

  if (isPending) {
    return (
      <div className="flex items-center gap-2">
        <div className={`${barClassName} overflow-hidden rounded-full bg-muted animate-pulse`} />
        {showLabel && <span className="text-xs text-muted-foreground">—</span>}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <div className={`${barClassName} overflow-hidden rounded-full bg-muted`}>
        <div
          className="h-full rounded-full bg-primary transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-xs text-muted-foreground">
          {total === 0 ? "No tasks" : `${completed}/${total}`}
        </span>
      )}
    </div>
  );
}
