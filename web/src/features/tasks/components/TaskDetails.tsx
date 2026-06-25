"use client";

import { useGetTaskById } from "../hooks/useTasks";
import { CalendarDays, ArrowLeft, Clock, CheckCircle2, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { TaskStatus, TaskPriority } from "@/types/task-api.types";

const STATUS_LABELS: Record<TaskStatus, string> = {
  todo: "To Do",
  in_progress: "In Progress",
  completed: "Completed",
};

const PRIORITY_LABELS: Record<TaskPriority, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
};

const STATUS_STYLES: Record<TaskStatus, string> = {
  todo: "bg-muted text-muted-foreground",
  in_progress: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  completed: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
};

const PRIORITY_STYLES: Record<TaskPriority, string> = {
  low: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
  medium: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  high: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

export default function TaskDetails({
  orgId,
  projectId,
  taskId,
}: {
  orgId: string;
  projectId: string;
  taskId: string;
}) {
  const { data, isPending, isError } = useGetTaskById(orgId, projectId, taskId);
  const task = data?.task;
  const assignee = data?.assignedTaskUserDetails?.assignee ?? null;

  if (isPending) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-8 w-1/3 rounded bg-muted" />
        <div className="h-4 w-1/4 rounded bg-muted" />
      </div>
    );
  }

  if (isError || !data || !task) {
    return (
      <div className="text-sm text-destructive">Failed to load task.</div>
    );
  }

  const dueDate = task.dueDate
    ? new Date(task.dueDate).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <div className="flex h-full flex-col">
      <div className="shrink-0 px-6 py-4">
        <Link
          href={`/organization/${orgId}/projects/${projectId}`}
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to project
        </Link>
      </div>

      <div className="flex-1 px-6">
        <div className="max-w-3xl space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <h1 className="text-2xl font-semibold tracking-tight">{task.title}</h1>
              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLES[task.status]}`}
                >
                  {STATUS_LABELS[task.status]}
                </span>
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${PRIORITY_STYLES[task.priority]}`}
                >
                  {PRIORITY_LABELS[task.priority]} Priority
                </span>
              </div>
            </div>

            {assignee && (
              <div className="flex shrink-0 items-center gap-3 text-right">
                <div className="text-right">
                  <p className="text-xs text-muted-foreground mb-0.5">Assigned to</p>
                  <p className="text-sm font-medium">{assignee.username}</p>
                  <p className="text-xs text-muted-foreground">{assignee.email}</p>
                </div>
                {assignee.gravatarUrl ? (
                  <Image
                    src={assignee.gravatarUrl}
                    alt={assignee.username}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                    <User className="h-4 w-4 text-muted-foreground" />
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="rounded-xl border bg-card shadow-sm p-6 space-y-5">
            {task.description && (
              <p className="text-sm leading-relaxed whitespace-pre-wrap">
                {task.description}
              </p>
            )}

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="space-y-0.5">
                <p className="text-xs text-muted-foreground">Due date</p>
                <div className="flex items-center gap-2 text-sm font-medium">
                  <CalendarDays className="h-4 w-4 shrink-0 text-muted-foreground" />
                  {dueDate && <span>{dueDate}</span>}
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4 shrink-0" />
                <span>
                  Created{" "}
                  {new Date(task.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              {task.completedAt && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span>
                    Completed{" "}
                    {new Date(task.completedAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
