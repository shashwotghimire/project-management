"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import {
  closestCorners,
  pointerWithin,
  rectIntersection,
  getFirstCollision,
  PointerSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
  type DragOverEvent,
  type CollisionDetection,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { Task, TaskStatus, TasksByStatus } from "@/types/task-api.types";
import { groupByStatus } from "@/lib/groupTasks";
import {
  useGetProjectTasks,
  useUpdateTaskPosition,
  useUpdateTaskStatus,
} from "./useTasks";

export function useKanbanDnd(orgId: string, projectId: string) {
  const { data, isPending, error } = useGetProjectTasks(orgId, projectId, 1, 100);
  const { mutate: updateStatus } = useUpdateTaskStatus(orgId, projectId);
  const { mutate: updatePosition } = useUpdateTaskPosition(orgId, projectId);

  const [tasksByStatus, setTasksByStatus] = useState<TasksByStatus>({
    todo: [],
    in_progress: [],
    completed: [],
  });
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [originContainer, setOriginContainer] = useState<TaskStatus | null>(
    null,
  );
  const skipNextSync = useRef(false);

  useEffect(() => {
    if (skipNextSync.current) {
      skipNextSync.current = false;
      return;
    }
    if (data) setTasksByStatus(groupByStatus(data.tasks));
  }, [data]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  const collisionDetection: CollisionDetection = useCallback(
    (args) => {
      const pointerCollisions = pointerWithin(args);
      const collisions =
        pointerCollisions.length > 0 ? pointerCollisions : rectIntersection(args);
      let overId = getFirstCollision(collisions, "id");

      if (overId != null) {
        if (overId in tasksByStatus) {
          const containerItems = tasksByStatus[overId as TaskStatus];
          if (containerItems.length > 0) {
            overId = closestCorners({
              ...args,
              droppableContainers: args.droppableContainers.filter(
                (c) =>
                  c.id !== overId && containerItems.some((t) => t.id === c.id),
              ),
            })[0]?.id;
          }
        }
        return [{ id: overId }];
      }
      return [];
    },
    [tasksByStatus],
  );

  const findContainer = useCallback(
    (id: string): TaskStatus | undefined => {
      for (const [status, tasks] of Object.entries(tasksByStatus) as [
        TaskStatus,
        Task[],
      ][]) {
        if (tasks.some((t) => t.id === id)) return status;
      }
      if (id in tasksByStatus) return id as TaskStatus;
      return undefined;
    },
    [tasksByStatus],
  );

  const handleDragStart = (event: DragStartEvent) => {
    const task = (Object.values(tasksByStatus) as Task[][])
      .flat()
      .find((t) => t.id === event.active.id);
    setActiveTask(task ?? null);
    setOriginContainer(findContainer(event.active.id as string) ?? null);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeContainer = findContainer(active.id as string);
    const overContainer =
      findContainer(over.id as string) ?? (over.id as TaskStatus);

    if (!activeContainer || !overContainer || activeContainer === overContainer)
      return;

    setTasksByStatus((prev) => {
      const activeItems = [...prev[activeContainer]];
      const overItems = [...prev[overContainer]];
      const activeIndex = activeItems.findIndex((t) => t.id === active.id);
      const [movedTask] = activeItems.splice(activeIndex, 1);

      const overIndex = overItems.findIndex((t) => t.id === over.id);
      const insertIndex = overIndex >= 0 ? overIndex : overItems.length;

      overItems.splice(insertIndex, 0, movedTask);

      return {
        ...prev,
        [activeContainer]: activeItems,
        [overContainer]: overItems,
      };
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);
    setOriginContainer(null);
    if (!over) return;

    const currentContainer = findContainer(active.id as string);
    if (!currentContainer) return;

    const movedId = active.id as string;
    const crossColumn =
      originContainer !== null && originContainer !== currentContainer;

    if (crossColumn) {
      const newPosition = tasksByStatus[currentContainer].findIndex(
        (t) => t.id === movedId,
      );
      skipNextSync.current = true;
      updateStatus({
        orgId,
        projectId,
        taskId: movedId,
        status: currentContainer,
        position: newPosition >= 0 ? newPosition : 0,
      });
    } else {
      const items = tasksByStatus[currentContainer];
      const oldIndex = items.findIndex((t) => t.id === active.id);
      const newIndex = items.findIndex((t) => t.id === over.id);
      if (oldIndex !== newIndex && newIndex >= 0) {
        const reordered = arrayMove(items, oldIndex, newIndex);
        setTasksByStatus((prev) => ({
          ...prev,
          [currentContainer]: reordered,
        }));
        skipNextSync.current = true;
        updatePosition({
          orgId,
          projectId,
          taskId: movedId,
          position: newIndex,
        });
      }
    }
  };

  return {
    tasksByStatus,
    activeTask,
    isPending,
    error,
    sensors,
    collisionDetection,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  };
}
