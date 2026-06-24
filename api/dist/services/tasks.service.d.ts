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
export declare const getTasksInProjectService: ({ projectId, userId, }: {
    projectId: string;
    userId: string;
}) => Promise<import("../models/tasks.model").Tasks[]>;
export declare const getTaskByIdService: ({ userId, taskId, projectId, }: {
    userId: string;
    taskId: string;
    projectId: string;
}) => Promise<import("../models/tasks.model").Tasks>;
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
}) => Promise<[affectedCount: number]>;
export declare const getTasksAssignedToUserInProjectService: ({ userId, projectId, }: {
    userId: string;
    projectId: string;
}) => Promise<import("../models/tasks.model").Tasks[]>;
export declare const updateTaskStatusService: ({ taskId, projectId, userId, status, }: {
    taskId: string;
    projectId: string;
    userId: string;
    status: TaskStatus;
}) => Promise<[affectedCount: number]>;
export declare const updateTaskPositionService: ({ taskId, projectId, userId, position, }: {
    taskId: string;
    projectId: string;
    userId: string;
    position: number;
}) => Promise<[affectedCount: number]>;
export declare const reassignTaskToAnotherUserService: ({ taskId, newUserId, projectId, userId, }: {
    taskId: string;
    newUserId: string;
    projectId: string;
    userId: string;
}) => Promise<[affectedCount: number]>;
//# sourceMappingURL=tasks.service.d.ts.map