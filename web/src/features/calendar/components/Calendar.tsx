"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import { useGetCalendarTasks } from "../hooks/useCalendar";
import { Spinner } from "@/components/Spinner";
import { QueryError } from "@/components/QueryError";

export default function Calendar({ orgId }: { orgId: string }) {
  const { data, isPending, error } = useGetCalendarTasks(orgId);
  if (isPending) return <Spinner fullPage />;
  if (error || !data) return <QueryError message="Failed to load calendar tasks." />;
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
            backgroundColor:
              task.priority === "high"
                ? "#ef4444"
                : task.priority === "medium"
                  ? "#3b82f6"
                  : "#22c55e",
            borderColor:
              task.priority === "high"
                ? "#ef4444"
                : task.priority === "medium"
                  ? "#3b82f6"
                  : "#22c55e",
          }))}
        views={{
          dayGridMonth: { displayEventTime: false, eventDisplay: "block" },
        }}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        contentHeight={675}
      />
    </div>
  );
}
