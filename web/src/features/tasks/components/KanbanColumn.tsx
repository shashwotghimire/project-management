"use client";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Task, TaskStatus } from "@/types/task-api.types";
import { cn } from "@/lib/utils";
import SortableTaskCard from "./SortableTaskCards";

interface KanbanColumnProps {
  status: TaskStatus;
  title: string;
  tasks: Task[];
  isPending: boolean;
  error: Error | null;
  getTaskHref?: (taskId: string) => string;
}

export default function KanbanColumn({
  status,
  title,
  tasks,
  isPending,
  error,
  getTaskHref,
}: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id: status });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "bg-muted rounded p-4 flex flex-col gap-2 min-h-32",
        isOver && "ring-2 ring-primary",
      )}
    >
      <h3 className="text-sm font-semibold">{title}</h3>
      {isPending && <p>Loading...</p>}
      {error && <p className="text-destructive">Failed to load tasks.</p>}
      <SortableContext
        items={tasks.map((t) => t.id)}
        strategy={verticalListSortingStrategy}
      >
        {tasks.map((task) => (
          <SortableTaskCard key={task.id} task={task} href={getTaskHref?.(task.id)} />
        ))}
      </SortableContext>
    </div>
  );
}
