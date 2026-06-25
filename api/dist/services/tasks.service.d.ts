import { TaskPriority, TaskStatus } from "../types/tasks";
export declare const createTaskService: (data: {
    title: string;
    description: string;
    assignedTo: string;
    assignedBy: string;
    createdBy: string;
    projectId: string;
    status: TaskStatus;
    priority: TaskPriority;
    dueDate?: string;
}) => Promise<import("../models/tasks.model").Tasks>;
export declare const getTasksInProjectService: ({ projectId, userId, page, limit, }: {
    projectId: string;
    userId: string;
    page: number;
    limit: number;
}) => Promise<{
    tasks: import("../models/tasks.model").Tasks[];
    total: number;
    page: number;
    limit: number;
}>;
export declare const getTaskByIdService: ({ userId, taskId, projectId, }: {
    userId: string;
    taskId: string;
    projectId: string;
}) => Promise<{
    task: import("../models/tasks.model").Tasks;
    assignedTaskUserDetails: import("../models/tasks.model").Tasks | null;
}>;
export declare const getTasksAssignedToUserService: ({ userId, orgId, }: {
    userId: string;
    orgId: string;
}) => Promise<import("../models/tasks.model").Tasks[]>;
export declare const deleteTaskService: ({ taskId, projectId, userId, }: {
    taskId: string;
    projectId: string;
    userId: string;
}) => Promise<number>;
export declare const updateTaskService: ({ taskId, projectId, userId, data, }: {
    taskId: string;
    projectId: string;
    userId: string;
    data: {
        title?: string;
        description?: string;
        status?: TaskStatus;
        priority?: TaskPriority;
        dueDate?: string;
    };
}) => Promise<import("../models/tasks.model").Tasks | null>;
export declare const getTasksAssignedToUserInProjectService: ({ userId, projectId, }: {
    userId: string;
    projectId: string;
}) => Promise<import("../models/tasks.model").Tasks[]>;
export declare const updateTaskStatusService: ({ taskId, projectId, userId, status, position, }: {
    taskId: string;
    projectId: string;
    userId: string;
    status: TaskStatus;
    position: number;
}) => Promise<void>;
export declare const updateTaskPositionService: ({ taskId, projectId, userId, position, }: {
    taskId: string;
    projectId: string;
    userId: string;
    position: number;
}) => Promise<void>;
export declare const reassignTaskToAnotherUserService: ({ taskId, newUserId, projectId, userId, }: {
    taskId: string;
    newUserId: string;
    projectId: string;
    userId: string;
}) => Promise<[affectedCount: number]>;
//# sourceMappingURL=tasks.service.d.ts.map