"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";

export default function Calendar() {
  return (
    <div className="flex-1 min-h-0 h-full p-2.5">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        events={[
          { title: "event 1", date: "2026-07-01" },
          { title: "event 2", date: "2026-07-02" },
          { title: "event 2", date: "2026-07-02" },
          { title: "event 2", date: "2026-07-02" },
          { title: "event 3", date: "2026-06-26" },
        ]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay", // Adds Month, Week, and Day buttons
        }}
        contentHeight={650}
      />
    </div>
  );
}
