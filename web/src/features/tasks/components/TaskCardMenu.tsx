"use client";
import { useEffect, useRef, useState } from "react";
import { MoreHorizontal, Pencil, Trash2, X } from "lucide-react";
import { Task, TaskPriority } from "@/types/task-api.types";
import { useUpdateTask, useDeleteTask } from "../hooks/useTasks";
import { cn } from "@/lib/utils";

const priorities: { value: TaskPriority; label: string }[] = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

const priorityColors: Record<TaskPriority, string> = {
  low: "text-green-600",
  medium: "text-yellow-600",
  high: "text-red-600",
};

interface TaskCardMenuProps {
  task: Task;
  orgId: string;
  projectId: string;
}

export default function TaskCardMenu({ task, orgId, projectId }: TaskCardMenuProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description ?? "");
  const [priority, setPriority] = useState<TaskPriority>(task.priority);
  const containerRef = useRef<HTMLDivElement>(null);

  const { mutate: updateTask, isPending: isUpdating } = useUpdateTask(orgId, projectId);
  const { mutate: deleteTask, isPending: isDeleting } = useDeleteTask(orgId, projectId);

  useEffect(() => {
    if (!menuOpen && !editOpen) return;
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
        setEditOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen, editOpen]);

  const openEdit = () => {
    setTitle(task.title);
    setDescription(task.description ?? "");
    setPriority(task.priority);
    setMenuOpen(false);
    setEditOpen(true);
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    updateTask(
      { orgId, projectId, taskId: task.id, title: title.trim(), description: description.trim() || undefined, priority },
      { onSuccess: () => setEditOpen(false) },
    );
  };

  const handleDelete = () => {
    deleteTask({ orgId, projectId, taskId: task.id });
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setMenuOpen((v) => !v); }}
        className="cursor-pointer flex items-center justify-center w-5 h-5 rounded hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Task options"
      >
        <MoreHorizontal size={14} />
      </button>

      {menuOpen && (
        <div className="absolute right-0 top-6 z-50 w-32 bg-background border rounded-lg shadow-lg py-1 flex flex-col">
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); openEdit(); }}
            className="cursor-pointer flex items-center gap-2 px-3 py-1.5 text-sm hover:bg-accent transition-colors"
          >
            <Pencil size={13} /> Edit
          </button>
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleDelete(); }}
            disabled={isDeleting}
            className="cursor-pointer flex items-center gap-2 px-3 py-1.5 text-sm text-destructive hover:bg-accent transition-colors disabled:opacity-50"
          >
            <Trash2 size={13} /> Delete
          </button>
        </div>
      )}

      {editOpen && (
        <div className="absolute right-0 top-6 z-50 w-72 bg-background border rounded-lg shadow-lg p-3 flex flex-col gap-2">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Edit task</span>
            <button onClick={() => setEditOpen(false)} className="cursor-pointer text-muted-foreground hover:text-foreground">
              <X size={13} />
            </button>
          </div>

          <form onSubmit={handleUpdate} className="flex flex-col gap-2">
            <input
              autoFocus
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-sm bg-muted rounded px-2 py-1.5 outline-none focus:ring-1 focus:ring-primary"
            />

            <textarea
              placeholder="Description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              className="w-full text-sm bg-muted rounded px-2 py-1.5 outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground resize-none"
            />

            <div className="flex gap-1">
              {priorities.map((p) => (
                <button
                  key={p.value}
                  type="button"
                  onClick={() => setPriority(p.value)}
                  className={cn(
                    "cursor-pointer flex-1 text-xs py-1 rounded border transition-colors",
                    priority === p.value
                      ? "border-primary bg-primary/10 font-semibold " + priorityColors[p.value]
                      : "border-border text-muted-foreground hover:border-muted-foreground",
                  )}
                >
                  {p.label}
                </button>
              ))}
            </div>

            <button
              type="submit"
              disabled={!title.trim() || isUpdating}
              className="cursor-pointer mt-1 w-full text-sm bg-primary text-primary-foreground rounded py-1.5 font-medium disabled:opacity-50 hover:bg-primary/90 transition-colors"
            >
              {isUpdating ? "Saving…" : "Save changes"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
