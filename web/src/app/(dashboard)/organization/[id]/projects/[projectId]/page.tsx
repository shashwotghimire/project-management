import ProjectDetails from "@/features/projects/components/ProjectDetails";
import { ProjectDetailsNavbar } from "@/features/projects/components/ProjectDetailsNavbar";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string; projectId: string }>;
}) {
  const { id, projectId } = await params;

  return (
    <div>
      <ProjectDetailsNavbar />
      <ProjectDetails orgId={id} projectId={projectId} />
    </div>
  );
}
