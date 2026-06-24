"use client";
import { useCallback } from "react";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { SortableContext, horizontalListSortingStrategy } from "@dnd-kit/sortable";
import { columns } from "@/types/task-api.types";
import { useKanbanDnd, toColumnId } from "../hooks/useKanbanDnd";
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
    columnOrder,
    activeTask,
    activeColumnId,
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

  const columnMap = Object.fromEntries(columns.map((c) => [c.status, c.title]));

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={collisionDetection}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={columnOrder.map(toColumnId)}
        strategy={horizontalListSortingStrategy}
      >
        <div className="grid grid-cols-3 gap-4 min-h-200">
          {columnOrder.map((status) => (
            <KanbanColumn
              key={status}
              status={status}
              title={columnMap[status]}
              tasks={tasksByStatus[status]}
              isPending={isPending}
              error={error}
              getTaskHref={getTaskHref}
              orgId={orgId}
              projectId={projectId}
            />
          ))}
        </div>
      </SortableContext>
      <DragOverlay>
        {activeTask ? (
          <TaskCard task={activeTask} />
        ) : activeColumnId ? (
          <KanbanColumn
            status={activeColumnId}
            title={columnMap[activeColumnId]}
            tasks={tasksByStatus[activeColumnId]}
            isPending={false}
            error={null}
            getTaskHref={getTaskHref}
            isOverlay
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
