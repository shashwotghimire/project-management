"use client";
import { useCallback } from "react";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { columns } from "@/types/task-api.types";
import { useKanbanDnd } from "../hooks/useKanbanDnd";
import KanbanColumn from "./KanbanColumn";
import TaskCard from "./TaskCard";

export default function Kanban({
  orgId,
  projectId,
}: {
  orgId: string;
  projectId: string;
}) {
  const {
    tasksByStatus,
    activeTask,
    isPending,
    error,
    sensors,
    collisionDetection,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  } = useKanbanDnd(orgId, projectId);

  const getTaskHref = useCallback(
    (taskId: string) =>
      `/organization/${orgId}/projects/${projectId}/tasks/${taskId}`,
    [orgId, projectId],
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={collisionDetection}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-3 gap-4 min-h-200">
        {columns.map((col) => (
          <KanbanColumn
            key={col.status}
            status={col.status}
            title={col.title}
            tasks={tasksByStatus[col.status]}
            isPending={isPending}
            error={error}
            getTaskHref={getTaskHref}
          />
        ))}
      </div>
      <DragOverlay>
        {activeTask ? <TaskCard task={activeTask} /> : null}
      </DragOverlay>
    </DndContext>
  );
}
