"use client";

import { ScrollText } from "lucide-react";

export default function TaskLogs() {
  return (
    <div className="hidden md:flex flex-col overflow-y-auto">
      <div className="px-5 py-5 flex items-center gap-2 border-b shrink-0">
        <ScrollText className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-semibold">Logs</span>
      </div>
      <div className="flex-1 flex items-center justify-center px-5">
        <p className="text-xs text-muted-foreground text-center">Activity will appear here</p>
      </div>
    </div>
  );
}
