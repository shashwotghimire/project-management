export type TaskStatus = "todo" | "in_progress" | "completed";
export type TaskPriority = "low" | "medium" | "high";

export interface Task {
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
}

export type TasksByStatus = {
  todo: Task[];
  in_progress: Task[];
  completed: Task[];
};

export interface PaginatedTasks {
  tasks: Task[];
  total: number;
  page: number;
  limit: number;
}

export interface GetProjectTasksResponse {
  success: boolean;
  message: string;
  data: PaginatedTasks;
}

export interface GetTaskByIdResponse {
  success: boolean;
  message: string;
  data: Task;
}

export interface UpdateTaskStatusRequest {
  orgId: string;
  projectId: string;
  taskId: string;
  status: TaskStatus;
  position: number;
}

export interface UpdateTaskPositionRequest {
  orgId: string;
  projectId: string;
  taskId: string;
  position: number;
}

export interface UpdateTaskStatusResponse {
  success: boolean;
  message: string;
  data: null;
}

export interface UpdateTaskPositionResponse {
  success: boolean;
  message: string;
  data: null;
}

export interface UpdateTaskRequest {
  orgId: string;
  projectId: string;
  taskId: string;
  title?: string;
  description?: string;
  priority?: TaskPriority;
}

export interface UpdateTaskResponse {
  success: boolean;
  message: string;
  data: Task;
}

export interface DeleteTaskRequest {
  orgId: string;
  projectId: string;
  taskId: string;
}

export interface DeleteTaskResponse {
  success: boolean;
  message: string;
  data: null;
}

export interface CreateTaskRequest {
  orgId: string;
  projectId: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignedTo: string;
}

export interface CreateTaskResponse {
  success: boolean;
  message: string;
  data: Task;
}

export const columns = [
  { title: "To Do", status: "todo" },
  { title: "In Progress", status: "in_progress" },
  { title: "Completed", status: "completed" },
] as const;
