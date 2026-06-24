import { OrganizationNavbar } from "@/features/organization/components/OrganizationNavbar";
import { MembersTable } from "@/features/members/components/MembersTable";

export default async function MembersPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div>
      <OrganizationNavbar />
      <div>Organization members</div>
      <MembersTable orgId={id} />
    </div>
  );
}
