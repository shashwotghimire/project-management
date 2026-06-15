import OrganizationDashboard from "@/features/organization/components/OrganizationDashboard";

async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <OrganizationDashboard organizationId={id} />;
}

export default page;
