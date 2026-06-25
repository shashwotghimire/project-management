import { Tasks } from "../models/tasks.model";
import { TaskPriority, TaskStatus } from "../types/tasks";
export declare const createTask: (data: {
    title: string;
    description: string;
    assignedTo: string;
    assignedBy: string;
    createdBy: string;
    projectId: string;
    status: TaskStatus;
    priority: TaskPriority;
    dueDate?: string;
}) => Promise<Tasks>;
export declare const getTasksInProject: (projectId: string, page?: number, limit?: number) => Promise<{
    tasks: Tasks[];
    total: number;
    page: number;
    limit: number;
}>;
export declare const getTaskById: (taskId: string) => Promise<Tasks | null>;
export declare const getTasksAssignedToUser: (userId: string) => Promise<Tasks[]>;
export declare const getTasksAssignedToUserInProject: (userId: string, projectId: string) => Promise<Tasks[]>;
export declare const updateTask: (taskId: string, data: {
    title?: string;
    description?: string;
    status?: TaskStatus;
    priority?: TaskPriority;
    dueDate?: string;
}) => Promise<Tasks | null>;
export declare const deleteTask: (taskId: string) => Promise<number>;
export declare const updateTaskStatus: (taskId: string, status: TaskStatus, position: number) => Promise<void>;
export declare const updateTaskPosition: (taskId: string, position: number) => Promise<void>;
export declare const reassignTaskToAnotherUser: ({ taskId, newUserId, }: {
    taskId: string;
    newUserId: string;
}) => Promise<[affectedCount: number]>;
export declare const getAssignedToTaskUserDetails: ({ projectId, taskId, userId, }: {
    projectId: string;
    taskId: string;
    userId: string;
}) => Promise<Tasks | null>;
//# sourceMappingURL=tasks.repository.d.ts.map