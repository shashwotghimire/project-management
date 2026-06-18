import OrganizationDashboard from "@/features/organization/components/OrganizationDashboard";
import { OrganizationNavbar } from "@/features/organization/components/OrganizationNavbar";

async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div>
      <OrganizationNavbar />
      <OrganizationDashboard organizationId={id} />
    </div>
  );
}

export default page;
