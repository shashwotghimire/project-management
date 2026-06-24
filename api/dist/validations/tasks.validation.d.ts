import z from "zod";
export declare const getTasksSchema: z.ZodObject<{
    params: z.ZodObject<{
        orgId: z.ZodUUID;
        projectId: z.ZodUUID;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const getTasksAssignedToUserSchema: z.ZodObject<{
    params: z.ZodObject<{
        orgId: z.ZodUUID;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const getTasksAssignedToUserInProjectSchema: z.ZodObject<{
    params: z.ZodObject<{
        orgId: z.ZodUUID;
        projectId: z.ZodUUID;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const getTaskByIdSchema: z.ZodObject<{
    params: z.ZodObject<{
        orgId: z.ZodUUID;
        projectId: z.ZodUUID;
        taskId: z.ZodUUID;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const deleteTaskSchema: z.ZodObject<{
    params: z.ZodObject<{
        orgId: z.ZodUUID;
        projectId: z.ZodUUID;
        taskId: z.ZodUUID;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const updateTaskSchema: z.ZodObject<{
    params: z.ZodObject<{
        orgId: z.ZodUUID;
        projectId: z.ZodUUID;
        taskId: z.ZodUUID;
    }, z.core.$strip>;
    body: z.ZodObject<{
        title: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
        status: z.ZodOptional<z.ZodEnum<{
            todo: "todo";
            in_progress: "in_progress";
            completed: "completed";
        }>>;
        priority: z.ZodOptional<z.ZodEnum<{
            medium: "medium";
            high: "high";
            low: "low";
        }>>;
        dueDate: z.ZodOptional<z.ZodISODate>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const updateTaskStatusSchema: z.ZodObject<{
    params: z.ZodObject<{
        orgId: z.ZodUUID;
        projectId: z.ZodUUID;
        taskId: z.ZodUUID;
    }, z.core.$strip>;
    body: z.ZodObject<{
        status: z.ZodEnum<{
            todo: "todo";
            in_progress: "in_progress";
            completed: "completed";
        }>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const updateTaskPositionSchema: z.ZodObject<{
    params: z.ZodObject<{
        orgId: z.ZodUUID;
        projectId: z.ZodUUID;
        taskId: z.ZodUUID;
    }, z.core.$strip>;
    body: z.ZodObject<{
        position: z.ZodNumber;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const reassignTaskSchema: z.ZodObject<{
    params: z.ZodObject<{
        orgId: z.ZodUUID;
        projectId: z.ZodUUID;
        taskId: z.ZodUUID;
    }, z.core.$strip>;
    body: z.ZodObject<{
        newUserId: z.ZodUUID;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const createTaskSchema: z.ZodObject<{
    params: z.ZodObject<{
        orgId: z.ZodUUID;
        projectId: z.ZodUUID;
    }, z.core.$strip>;
    body: z.ZodObject<{
        title: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        assignedTo: z.ZodUUID;
        status: z.ZodOptional<z.ZodEnum<{
            todo: "todo";
            in_progress: "in_progress";
            completed: "completed";
        }>>;
        priority: z.ZodOptional<z.ZodEnum<{
            medium: "medium";
            high: "high";
            low: "low";
        }>>;
        dueDate: z.ZodOptional<z.ZodISODate>;
    }, z.core.$strip>;
}, z.core.$strip>;
//# sourceMappingURL=tasks.validation.d.ts.map