import { SettingsPageClient } from "@/features/organization/components/SettingsPageClient";

export default async function SettingsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <SettingsPageClient orgId={id} />;
}
