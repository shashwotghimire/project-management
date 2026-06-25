"use client";

import { MessageSquare } from "lucide-react";

export default function TaskComments() {
  return (
    <div className="border-t flex flex-col shrink-0 min-h-72">
      <div className="px-8 py-5 flex items-center gap-2 border-b shrink-0">
        <MessageSquare className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-semibold">Comments</span>
      </div>
      <div className="flex-1 flex items-center justify-center py-8">
        <p className="text-xs text-muted-foreground">No comments yet</p>
      </div>
    </div>
  );
}
