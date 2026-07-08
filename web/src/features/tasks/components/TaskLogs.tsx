"use client";

import { ScrollText } from "lucide-react";
import { useGetTaskActivityLogs } from "../hooks/useTasks";
import { TaskActivityLog, TaskActivityAction } from "@/types/task-api.types";
import Image from "next/image";

const ACTION_LABELS: Record<TaskActivityAction, string> = {
  task_created: "created this task",
  task_assigned: "assigned this task",
  task_reassigned: "reassigned this task",
  task_unassigned: "unassigned this task",
  status_changed: "changed the status",
  priority_changed: "changed the priority",
  due_date_changed: "changed the due date",
  title_changed: "changed the title",
  description_changed: "updated the description",
  comment_added: "added a comment",
  comment_edited: "edited a comment",
  comment_deleted: "deleted a comment",
  task_completed: "completed this task",
  task_reopened: "reopened this task",
};

function actorName(actor: TaskActivityLog["actor"]) {
  return `${actor.firstName} ${actor.lastName}`.trim();
}

function Avatar({ actor }: { actor: TaskActivityLog["actor"] }) {
  const name = actorName(actor);
  if (actor.profilePicture) {
    return (
      <Image
        src={actor.profilePicture}
        alt={name}
        width={24}
        height={24}
        className="size-6 rounded-full object-cover shrink-0"
      />
    );
  }
  return (
    <div className="size-6 rounded-full bg-zinc-100 flex items-center justify-center shrink-0 text-[10px] font-semibold text-zinc-600">
      {name.slice(0, 2).toUpperCase()}
    </div>
  );
}

function MetaDetail({ action, meta }: { action: TaskActivityAction; meta: TaskActivityLog["meta"] }) {
  if (!meta) return null;

  if (action === "status_changed" && meta.to) {
    const labels: Record<string, string> = { todo: "To Do", in_progress: "In Progress", completed: "Completed" };
    return <span className="text-zinc-400"> → <span className="font-medium text-zinc-600">{labels[meta.to as string] ?? String(meta.to)}</span></span>;
  }
  if (action === "priority_changed" && meta.to) {
    return <span className="text-zinc-400"> → <span className="font-medium text-zinc-600 capitalize">{String(meta.to)}</span></span>;
  }
  if (action === "due_date_changed" && meta.to) {
    const d = new Date(meta.to as string).toLocaleDateString(undefined, { month: "short", day: "numeric" });
    return <span className="text-zinc-400"> → <span className="font-medium text-zinc-600">{d}</span></span>;
  }
  return null;
}

function LogEntry({ log }: { log: TaskActivityLog }) {
  const label = ACTION_LABELS[log.action] ?? log.action;
  const time = new Date(log.createdAt).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="flex items-start gap-2 py-2.5 border-b border-zinc-100 last:border-0">
      <Avatar actor={log.actor} />
      <div className="flex-1 min-w-0">
        <p className="text-xs leading-snug">
          <span className="font-medium text-zinc-800">{actorName(log.actor)}</span>{" "}
          <span className="text-zinc-500">{label}</span>
          <MetaDetail action={log.action} meta={log.meta} />
        </p>
        <p className="text-[11px] text-zinc-400 mt-0.5">{time}</p>
      </div>
    </div>
  );
}

function SkeletonRow() {
  return (
    <div className="flex items-start gap-2 py-2.5 border-b border-zinc-100 last:border-0 animate-pulse">
      <div className="size-6 rounded-full bg-zinc-100 shrink-0" />
      <div className="flex-1 pt-0.5 space-y-1.5">
        <div className="h-3 bg-zinc-100 rounded w-3/4" />
        <div className="h-2.5 bg-zinc-100 rounded w-1/3" />
      </div>
    </div>
  );
}

export default function TaskLogs({
  orgId,
  projectId,
  taskId,
}: {
  orgId: string;
  projectId: string;
  taskId: string;
}) {
  const { data, isLoading, isError } = useGetTaskActivityLogs(orgId, projectId, taskId);

  return (
    <div className="hidden md:flex flex-col overflow-y-auto">
      <div className="px-5 py-5 flex items-center gap-2 border-b shrink-0">
        <ScrollText className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-semibold">Logs</span>
        {data && (
          <span className="ml-auto text-xs text-zinc-400">{data.total}</span>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-4">
        {isLoading && Array.from({ length: 4 }).map((_, i) => <SkeletonRow key={i} />)}

        {isError && (
          <p className="py-6 text-xs text-destructive text-center">
            Failed to load logs.
          </p>
        )}

        {!isLoading && data?.logs.length === 0 && (
          <p className="py-6 text-xs text-zinc-400 text-center">
            No activity yet.
          </p>
        )}

        {data?.logs.map((log) => (
          <LogEntry key={log.id} log={log} />
        ))}
      </div>
    </div>
  );
}
