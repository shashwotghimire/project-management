import ProjectDetails from "@/features/projects/components/ProjectDetails";
import { ProjectNavbar } from "@/features/projects/components/ProjectNavbar";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string; projectId: string }>;
}) {
  const { id, projectId } = await params;

  return (
    <div>
      <ProjectNavbar />
      <ProjectDetails orgId={id} projectId={projectId} />
    </div>
  );
}
