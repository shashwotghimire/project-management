import Calendar from "@/features/calendar/components/Calendar";
import { ProjectDetailsNavbar } from "@/features/projects/components/ProjectDetailsNavbar";

export default function CalendarPage() {
  return (
    <div>
      <ProjectDetailsNavbar />
      <Calendar />
    </div>
  );
}
