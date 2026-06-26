import type { TaskStatus, TaskPriority } from "./task-api.types";

export interface CalendarTask {
  id: string;
  title: string;
  description: string | null;
  projectId: string;
  createdBy: string;
  assignedTo: string | null;
  assignedBy: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  position: number | null;
  dueDate: string | null;
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;
  project: {
    id: string;
    name: string;
  };
}

export interface GetCalendarTasksResponse {
  success: boolean;
  message: string;
  data: CalendarTask[];
}
