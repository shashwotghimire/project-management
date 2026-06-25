export declare const createProjectService: ({ name, organizationId, createdBy, logoUrl, }: {
    name: string;
    organizationId: string;
    createdBy: string;
    logoUrl?: string;
}) => Promise<import("../models/projects.model").Project>;
export declare const updateProjectService: ({ projectId, userId, name, logoUrl, status, }: {
    projectId: string;
    userId: string;
    name?: string;
    logoUrl?: string;
    status?: "active" | "archived";
}) => Promise<[number, import("../models/projects.model").Project[]]>;
export declare const getUserProjectsService: ({ userId, organizationId, page, limit, search, }: {
    userId: string;
    organizationId: string;
    page: number;
    limit: number;
    search?: string;
}) => Promise<{
    data: import("../models/project-members.model").ProjectMembers[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}>;
export declare const deleteProjectService: ({ projectId, userId, }: {
    projectId: string;
    userId: string;
}) => Promise<void>;
export declare const getProjectMembersService: ({ projectId, userId, }: {
    projectId: string;
    userId: string;
}) => Promise<import("../models/project-members.model").ProjectMembers[]>;
export declare const getProjectByIdService: ({ projectId, userId, }: {
    projectId: string;
    userId: string;
}) => Promise<import("../models/projects.model").Project>;
export declare const removeProjectMemberService: ({ projectId, targetUserId, requesterId, }: {
    projectId: string;
    targetUserId: string;
    requesterId: string;
}) => Promise<void>;
export declare const addMemberToProjectService: ({ userId, projectId, assignedBy, }: {
    userId: string;
    projectId: string;
    assignedBy: string;
}) => Promise<import("../models/project-members.model").ProjectMembers>;
//# sourceMappingURL=projects.service.d.ts.map