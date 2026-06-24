import TaskDetails from "@/features/tasks/components/TaskDetails";
import { ProjectDetailsNavbar } from "@/features/projects/components/ProjectDetailsNavbar";

export default async function TaskPage({
  params,
}: {
  params: Promise<{ id: string; projectId: string; taskId: string }>;
}) {
  const { id, projectId, taskId } = await params;

  return (
    <div className="flex h-screen flex-col">
      <ProjectDetailsNavbar />
      <div className="min-h-0 flex-1 overflow-auto p-6">
        <TaskDetails orgId={id} projectId={projectId} taskId={taskId} />
      </div>
    </div>
  );
}
