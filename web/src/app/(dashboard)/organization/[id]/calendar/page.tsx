import Calendar from "@/features/calendar/components/Calendar";
import { ProjectDetailsNavbar } from "@/features/projects/components/ProjectDetailsNavbar";

export default async function CalendarPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div>
      <ProjectDetailsNavbar />
      <Calendar orgId={id} />
    </div>
  );
}
