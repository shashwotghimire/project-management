"use client";

import { useEffect, useRef, useState } from "react";
import { useGetTaskById, useUpdateTask } from "../hooks/useTasks";
import {
  CalendarDays,
  ArrowLeft,
  Clock,
  CheckCircle2,
  User,
  MoreHorizontal,
  Pencil,
  UserRoundPen,
  X,
} from "lucide-react";
import ReassignTaskDialog from "./ReassignTaskDialog";
import { DatePicker } from "./DatePicker";
import TaskComments from "@/features/comments/components/TaskComments";
import TaskLogs from "./TaskLogs";
import Link from "next/link";
import Image from "next/image";
import { TaskStatus, TaskPriority } from "@/types/task-api.types";
import { cn } from "@/lib/utils";
import { Spinner } from "@/components/Spinner";
import { QueryError } from "@/components/QueryError";

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

const priorities: { value: TaskPriority; label: string }[] = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

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
  const { mutate: updateTask, isPending: isUpdating } = useUpdateTask(orgId, projectId);

  const [menuOpen, setMenuOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [reassignOpen, setReassignOpen] = useState(false);

  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editPriority, setEditPriority] = useState<TaskPriority>("medium");
  const [editDueDate, setEditDueDate] = useState<Date | undefined>(undefined);

  const menuRef = useRef<HTMLDivElement>(null);

  const task = data?.task;
  const assignee = data?.assignedTaskUserDetails?.assignee ?? null;

  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  const openEdit = () => {
    if (!task) return;
    setEditTitle(task.title);
    setEditDescription(task.description ?? "");
    setEditPriority(task.priority);
    setEditDueDate(task.dueDate ? new Date(task.dueDate) : undefined);
    setMenuOpen(false);
    setEditOpen(true);
  };

  const openReassign = () => {
    setMenuOpen(false);
    setReassignOpen(true);
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editTitle.trim() || !task) return;
    updateTask(
      {
        orgId,
        projectId,
        taskId: task.id,
        title: editTitle.trim(),
        description: editDescription.trim() || undefined,
        priority: editPriority,
        dueDate: editDueDate ? editDueDate.toISOString() : undefined,
      },
      { onSuccess: () => setEditOpen(false) },
    );
  };

  if (isPending) {
    return <Spinner fullPage />;
  }

  if (isError || !data || !task) {
    return <QueryError message="Failed to load task." className="p-8" />;
  }

  const dueDate = task.dueDate
    ? new Date(task.dueDate).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <>
      {/* outer: 75/25 two-col grid, full height */}
      <div className="grid grid-cols-1 md:grid-cols-[3fr_1fr] h-full">

        {/* ── LEFT col: flex-col, task content (flex-1) + comments below ── */}
        <div className="flex flex-col min-h-0 border-r">

        {/* task content — scrollable */}
        <div className="flex flex-col flex-1 overflow-y-auto">
          {/* Back link */}
          <div className="px-8 pt-6 pb-2 shrink-0">
            <Link
              href={`/organization/${orgId}/projects/${projectId}`}
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to project
            </Link>
          </div>

          {/* Header */}
          <div className="px-8 py-4 flex items-start justify-between gap-4 shrink-0">
            <div className="space-y-2">
              <h1 className="text-2xl font-semibold tracking-tight">{task.title}</h1>
              <div className="flex items-center gap-2">
                <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium", STATUS_STYLES[task.status])}>
                  {STATUS_LABELS[task.status]}
                </span>
                <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium", PRIORITY_STYLES[task.priority])}>
                  {PRIORITY_LABELS[task.priority]} Priority
                </span>
              </div>
            </div>

            {/* Assignee + 3-dot */}
            <div className="flex items-center gap-3 shrink-0">
              {assignee && (
                <div className="flex items-center gap-2.5">
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Assigned to</p>
                    <p className="text-sm font-semibold leading-tight">{assignee.username}</p>
                    <p className="text-xs text-muted-foreground">{assignee.email}</p>
                  </div>
                  {assignee.gravatarUrl?.startsWith("http") ? (
                    <Image
                      src={assignee.gravatarUrl}
                      alt={assignee.username}
                      width={40}
                      height={40}
                      className="rounded-full shrink-0"
                    />
                  ) : (
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted">
                      <User className="h-5 w-5 text-muted-foreground" />
                    </div>
                  )}
                </div>
              )}

              <div ref={menuRef} className="relative">
                <button
                  onClick={() => setMenuOpen((v) => !v)}
                  className="cursor-pointer flex h-8 w-8 items-center justify-center rounded-md hover:bg-accent transition-colors text-muted-foreground hover:text-foreground"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </button>

                {menuOpen && (
                  <div className="absolute right-0 top-9 z-50 w-40 rounded-lg border bg-background shadow-lg py-1">
                    <button
                      onClick={openEdit}
                      className="cursor-pointer flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-accent transition-colors"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                      Update task
                    </button>
                    <button
                      onClick={openReassign}
                      className="cursor-pointer flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-accent transition-colors"
                    >
                      <UserRoundPen className="h-3.5 w-3.5" />
                      Reassign
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Inline edit panel */}
          {editOpen && (
            <div className="mx-8 mb-4 rounded-xl border bg-card shadow-sm p-4 shrink-0">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Edit task</span>
                <button onClick={() => setEditOpen(false)} className="cursor-pointer text-muted-foreground hover:text-foreground">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <form onSubmit={handleUpdate} className="flex flex-col gap-2">
                <input
                  autoFocus
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  placeholder="Task title"
                  className="w-full text-sm bg-muted rounded-md px-3 py-2 outline-none focus:ring-1 focus:ring-primary"
                />
                <textarea
                  placeholder="Description (optional)"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  rows={2}
                  className="w-full text-sm bg-muted rounded-md px-3 py-2 outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground resize-none"
                />
                <div className="flex gap-1.5">
                  {priorities.map((p) => (
                    <button
                      key={p.value}
                      type="button"
                      onClick={() => setEditPriority(p.value)}
                      className={cn(
                        "cursor-pointer flex-1 text-xs py-1.5 rounded-md border transition-colors",
                        editPriority === p.value
                          ? "border-primary bg-primary/10 font-semibold text-primary"
                          : "border-border text-muted-foreground hover:border-muted-foreground",
                      )}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Due date</p>
                  <DatePicker value={editDueDate} onChange={setEditDueDate} placeholder="No due date" />
                </div>
                <button
                  type="submit"
                  disabled={!editTitle.trim() || isUpdating}
                  className="cursor-pointer mt-1 w-full text-sm bg-primary text-primary-foreground rounded-md py-2 font-medium disabled:opacity-50 hover:bg-primary/90 transition-colors"
                >
                  {isUpdating ? "Saving…" : "Save changes"}
                </button>
              </form>
            </div>
          )}

          {/* Task card */}
          <div className="px-8 pb-8">
            <div className="rounded-xl border bg-card shadow-sm p-6 space-y-5">
              {task.description ? (
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{task.description}</p>
              ) : (
                <p className="text-sm text-muted-foreground italic">No description</p>
              )}

              <div className="grid grid-cols-2 gap-4 pt-3 border-t">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Due date</p>
                  <div className="flex items-center gap-2 text-sm">
                    <CalendarDays className="h-4 w-4 shrink-0 text-muted-foreground" />
                    {dueDate
                      ? <span className="font-medium">{dueDate}</span>
                      : <span className="text-muted-foreground">—</span>}
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Created</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 shrink-0" />
                    <span>
                      {new Date(task.createdAt).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>

                {task.completedAt && (
                  <div className="col-span-2">
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
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>{/* end task content scroll area */}

        {/* ── COMMENTS ── */}
        <TaskComments orgId={orgId} projectId={projectId} taskId={taskId} />

        </div>{/* end left col */}

        {/* ── RIGHT col: logs ── */}
        <TaskLogs orgId={orgId} projectId={projectId} taskId={taskId} />

      </div>

      <ReassignTaskDialog
        open={reassignOpen}
        onOpenChange={setReassignOpen}
        orgId={orgId}
        projectId={projectId}
        taskId={taskId}
        currentAssigneeId={task.assignedTo}
      />
    </>
  );
}
