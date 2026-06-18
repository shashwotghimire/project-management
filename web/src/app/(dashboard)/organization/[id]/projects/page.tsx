import { OrganizationNavbar } from "@/features/organization/components/OrganizationNavbar";
import { ProjectsTable } from "@/features/projects/components/ProjectsTable";

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div>
      <OrganizationNavbar />
      <div>Your projects</div>
      <ProjectsTable orgId={id} />
    </div>
  );
}
