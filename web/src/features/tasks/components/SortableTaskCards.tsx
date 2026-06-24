import { Task } from "@/types/task-api.types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TaskCard from "./TaskCard";
import TaskCardMenu from "./TaskCardMenu";

interface SortableTaskCardProps {
  task: Task;
  href?: string;
  orgId?: string;
  projectId?: string;
}

export default function SortableTaskCard({ task, href, orgId, projectId }: SortableTaskCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="relative group">
      <div {...attributes} {...listeners}>
        <TaskCard task={task} href={href} />
      </div>
      {orgId && projectId && (
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <TaskCardMenu task={task} orgId={orgId} projectId={projectId} />
        </div>
      )}
    </div>
  );
}
