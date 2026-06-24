import ProjectDetails from "@/features/projects/components/ProjectDetails";
import { ProjectDetailsNavbar } from "@/features/projects/components/ProjectDetailsNavbar";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string; projectId: string }>;
}) {
  const { id, projectId } = await params;

  return (
    <div className="flex h-screen flex-col">
      <ProjectDetailsNavbar />
      <div className="min-h-0 flex-1">
        <ProjectDetails orgId={id} projectId={projectId} />
      </div>
    </div>
  );
}
