import type { Task } from "@/types/task-api.types";
export function groupByStatus(tasks: Task[]) {
  const sorted = (arr: Task[]) =>
    arr.sort((a, b) => (a.position ?? Infinity) - (b.position ?? Infinity));
  return {
    todo: sorted(tasks.filter((task) => task.status === "todo")),
    inProgress: sorted(tasks.filter((task) => task.status === "in_progress")),
    completed: sorted(tasks.filter((task) => task.status === "completed")),
  };
}
