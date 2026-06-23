import { Task, TaskPriority, TaskStatus } from "@/types/task-api.types";
import { Card, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { CalendarDays } from "lucide-react";

const STATUS_STYLES: Record<TaskStatus, { label: string; className: string }> =
  {
    todo: {
      label: "Todo",
      className: "bg-muted text-muted-foreground",
    },
    in_progress: {
      label: "In Progress",
      className:
        "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    },
    done: {
      label: "Done",
      className:
        "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    },
  };

const PRIORITY_STYLES: Record<
  TaskPriority,
  { label: string; className: string }
> = {
  low: {
    label: "Low",
    className:
      "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
  },
  medium: {
    label: "Medium",
    className:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  },
  high: {
    label: "High",
    className: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  },
};

function Badge({
  label,
  className,
}: {
  label: string;
  className: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${className}`}
    >
      {label}
    </span>
  );
}

export default function TaskCard({ task }: { task: Task }) {
  const status = STATUS_STYLES[task.status];
  const priority = PRIORITY_STYLES[task.priority];

  const dueDate = task.dueDate
    ? new Date(task.dueDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <Card className="hover:ring-primary/30 cursor-pointer transition-shadow hover:shadow-md rounded-none">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium leading-snug">
          {task.title}
        </CardTitle>
        {task.description && (
          <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
            {task.description}
          </p>
        )}
      </CardHeader>
      <CardFooter className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          <Badge label={status.label} className={status.className} />
          <Badge label={priority.label} className={priority.className} />
        </div>
        {dueDate && (
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <CalendarDays className="h-3 w-3" />
            {dueDate}
          </span>
        )}
      </CardFooter>
    </Card>
  );
}
