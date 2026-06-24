import { Task } from "@/types/task-api.types";
import { useSortable } from "@dnd-kit/react/sortable";
import TaskCard from "./TaskCard";

export default function SortableTaskCard({
  task,
  index,
}: {
  task: Task;
  index: number;
}) {
  const { ref, isDragging } = useSortable({
    id: task.id,
    index,
    group: "kanban",
  });

  return (
    <div ref={ref} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <TaskCard task={task} />
    </div>
  );
}
