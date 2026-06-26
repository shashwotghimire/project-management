"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import { useGetCalendarTasks } from "../hooks/useCalendar";

export default function Calendar({ orgId }: { orgId: string }) {
  const { data, isPending, error } = useGetCalendarTasks(orgId);
  if (isPending) return <div>Loading tasks...</div>;
  if (error || !data) return <div>error fetching tasks</div>;
  return (
    <div className="flex-1 min-h-0 h-full p-2.5 overflow-y-auto">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        eventDisplay="block"
        events={data
          .filter((task) => task.dueDate !== null)
          .map((task) => ({
            title: task.title,
            start: task.dueDate!,
          }))}
        views={{
          dayGridMonth: { displayEventTime: false, eventDisplay: "block" },
        }}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay", // Adds Month, Week, and Day buttons
        }}
        eventBackgroundColor="blue"
        contentHeight={675}
      />
    </div>
  );
}
