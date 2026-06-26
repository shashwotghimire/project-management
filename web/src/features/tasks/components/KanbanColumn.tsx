"use client";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Task, TaskStatus } from "@/types/task-api.types";
import { cn } from "@/lib/utils";
import SortableTaskCard from "./SortableTaskCards";
import { GripVertical } from "lucide-react";
import { toColumnId } from "../hooks/useKanbanDnd";
import CreateTaskForm from "./CreateTaskForm";
import { Spinner } from "@/components/Spinner";
import { QueryError } from "@/components/QueryError";

interface KanbanColumnProps {
  status: TaskStatus;
  title: string;
  tasks: Task[];
  isPending: boolean;
  error: Error | null;
  getTaskHref?: (taskId: string) => string;
  isOverlay?: boolean;
  orgId?: string;
  projectId?: string;
}

export default function KanbanColumn({
  status,
  title,
  tasks,
  isPending,
  error,
  getTaskHref,
  isOverlay,
  orgId,
  projectId,
}: KanbanColumnProps) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: toColumnId(status) });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "bg-muted rounded p-4 flex flex-col gap-2 min-h-32",
        isDragging && !isOverlay && "opacity-40",
        isOverlay && "shadow-xl rotate-1",
      )}
    >
      <div className="flex items-center gap-1">
        <button
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground p-0.5 rounded"
          aria-label="Drag column"
        >
          <GripVertical size={14} />
        </button>
        <h3 className="text-sm font-semibold">{title}</h3>
        {!isOverlay && orgId && projectId && (
          <CreateTaskForm orgId={orgId} projectId={projectId} status={status} />
        )}
      </div>
      {isPending && <Spinner className="mx-auto" />}
      {error && <QueryError message="Failed to load tasks." className="p-0" />}
      <SortableContext
        items={tasks.map((t) => t.id)}
        strategy={verticalListSortingStrategy}
      >
        {tasks.map((task) => (
          <SortableTaskCard key={task.id} task={task} href={getTaskHref?.(task.id)} orgId={orgId} projectId={projectId} />
        ))}
      </SortableContext>
    </div>
  );
}
