import { Project } from "../models/projects.model";
import { ProjectMembers } from "../models/project-members.model";
export declare function createProject(data: {
    name: string;
    organizationId: string;
    createdBy: string;
    logoUrl?: string;
}): Promise<Project>;
export declare function getProjectById(projectId: string): Promise<Project | null>;
export declare function isUserMemberOfProject(userId: string, projectId: string): Promise<boolean>;
export declare function isUserAdminOfProject(userId: string, projectId: string): Promise<boolean>;
export declare function getProjectsByUserId(userId: string, organizationId: string, { page, limit, search }: {
    page: number;
    limit: number;
    search?: string;
}): Promise<{
    data: ProjectMembers[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}>;
export declare function deleteProject(projectId: string): Promise<void>;
export declare function updateProject(projectId: string, data: {
    name?: string;
    logoUrl?: string;
    status?: "active" | "archived";
}): Promise<[number, Project[]]>;
export declare function addMemberToProject(data: {
    userId: string;
    projectId: string;
    assignedBy: string;
}): Promise<ProjectMembers>;
export declare function removeProjectMember(userId: string, projectId: string): Promise<number>;
export declare function getProjectMembers(projectId: string): Promise<ProjectMembers[]>;
//# sourceMappingURL=projects.repository.d.ts.map