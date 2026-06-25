import { ProjectDetailsNavbar } from "@/features/projects/components/ProjectDetailsNavbar";
import { MembersTable } from "@/features/members/components/MembersTable";

export default async function MembersPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div>
      <ProjectDetailsNavbar />
      <div>Organization members</div>
      <MembersTable orgId={id} />
    </div>
  );
}
