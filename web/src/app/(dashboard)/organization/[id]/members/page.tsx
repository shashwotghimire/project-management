import { ProjectDetailsNavbar } from "@/features/projects/components/ProjectDetailsNavbar";
import { MembersTable } from "@/features/members/components/MembersTable";
import { InviteMemberDialog } from "@/features/members/components/InviteMemberDialog";

export default async function MembersPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div>
      <ProjectDetailsNavbar actions={<InviteMemberDialog orgId={id} />} />
      <div className="p-6">
        <MembersTable orgId={id} />
      </div>
    </div>
  );
}
