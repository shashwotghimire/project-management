"use client";
import { useEffect, useRef, useState } from "react";
import { Plus, X } from "lucide-react";
import { TaskPriority, TaskStatus } from "@/types/task-api.types";
import { useCreateTask } from "../hooks/useTasks";
import { useGetUserProfile } from "@/features/auth/hooks/useAuth";
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

interface CreateTaskFormProps {
  orgId: string;
  projectId: string;
  status: TaskStatus;
}

export default function CreateTaskForm({ orgId, projectId, status }: CreateTaskFormProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<TaskPriority>("medium");
  const { data: user } = useGetUserProfile();
  const { mutate: createTask, isPending, error } = useCreateTask(orgId, projectId);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !user) return;
    createTask(
      {
        orgId,
        projectId,
        title: title.trim(),
        description: description.trim() || undefined,
        status,
        priority,
        assignedTo: user.id,
      },
      {
        onSuccess: () => {
          setTitle("");
          setDescription("");
          setPriority("medium");
          setOpen(false);
        },
      },
    );
  };

  return (
    <div ref={containerRef} className="relative ml-auto">
      <button
        onClick={() => setOpen((v) => !v)}
        className="cursor-pointer flex items-center justify-center w-5 h-5 rounded hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Add task"
      >
        <Plus size={14} />
      </button>

      {open && (
        <div className="absolute right-0 top-7 z-50 w-72 bg-background border rounded-lg shadow-lg p-3 flex flex-col gap-2">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">New task</span>
            <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
              <X size={13} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <input
              autoFocus
              type="text"
              placeholder="Task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-sm bg-muted rounded px-2 py-1.5 outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground"
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

            {error && (
              <p className="text-xs text-red-500">{error.message}</p>
            )}
            <button
              type="submit"
              disabled={!title.trim() || isPending}
              className="cursor-pointer mt-1 w-full text-sm bg-primary text-primary-foreground rounded py-1.5 font-medium disabled:opacity-50 hover:bg-primary/90 transition-colors"
            >
              {isPending ? "Creating…" : "Create task"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
