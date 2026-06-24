"use client";

import { useGetProjectTasks } from "../hooks/useTasks";
import SortableTaskCard from "./SortableTaskCards";
import { groupByStatus } from "@/lib/groupTasks";

export default function Kanban({
  orgId,
  projectId,
}: {
  orgId: string;
  projectId: string;
}) {
  const { data, isPending, error } = useGetProjectTasks(orgId, projectId);
  const columns = [
    { title: "To Do", status: "todo" },
    { title: "In Progress", status: "in_progress" },
    { title: "Completed", status: "completed" },
  ] as const;
  return (
    <div>
      <div className="grid grid-cols-3 gap-4 min-h-200">
        {columns.map((status) => (
          <div
            key={status.status}
            className="bg-muted rounded p-4 flex flex-col gap-2"
          >
            <h3 className="text-sm font-semibold">{status.title}</h3>
            {data
              ?.filter((data) => data.status === status.status)
              .map((data, index) => (
                <SortableTaskCard key={data.id} task={data} index={index} />
              ))}
            {isPending && <p>Loading...</p>}
            {error && <p className="text-destructive">Failed to load tasks.</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
