"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addMemberToProjectService = exports.getProjectByIdService = exports.getProjectMembersService = exports.deleteProjectService = exports.getUserProjectsService = exports.updateProjectService = exports.createProjectService = void 0;
const ApiError_1 = require("../helpers/ApiError");
const organizations_repository_1 = require("../repositories/organizations.repository");
const projects_repository_1 = require("../repositories/projects.repository");
const createProjectService = async ({ name, organizationId, createdBy, logoUrl, }) => {
    const org = await (0, organizations_repository_1.getOrgByAdminId)(createdBy, organizationId);
    if (!org) {
        throw new ApiError_1.ApiError(403, "Only organization admins can create projects", "Only organization admins can create projects");
    }
    return await (0, projects_repository_1.createProject)({
        name,
        organizationId,
        createdBy,
        ...(logoUrl && { logoUrl }),
    });
};
exports.createProjectService = createProjectService;
const updateProjectService = async ({ projectId, userId, name, logoUrl, status, }) => {
    const project = await (0, projects_repository_1.getProjectById)(projectId);
    if (!project) {
        throw new ApiError_1.ApiError(404, "Project not found", "Project not found");
    }
    const isAdmin = await (0, projects_repository_1.isUserAdminOfProject)(userId, projectId);
    if (!isAdmin) {
        throw new ApiError_1.ApiError(403, "Only project admins can update projects", "Only project admins can update projects");
    }
    return await (0, projects_repository_1.updateProject)(projectId, {
        ...(name && { name }),
        ...(logoUrl && { logoUrl }),
        ...(status && { status }),
    });
};
exports.updateProjectService = updateProjectService;
const getUserProjectsService = async ({ userId, organizationId, page, limit, search = "", }) => {
    return await (0, projects_repository_1.getProjectsByUserId)(userId, organizationId, {
        page,
        limit,
        search,
    });
};
exports.getUserProjectsService = getUserProjectsService;
const deleteProjectService = async ({ projectId, userId, }) => {
    const project = await (0, projects_repository_1.getProjectById)(projectId);
    if (!project) {
        throw new ApiError_1.ApiError(404, "Project not found", "Project not found");
    }
    const isAdmin = await (0, projects_repository_1.isUserAdminOfProject)(userId, projectId);
    if (!isAdmin) {
        throw new ApiError_1.ApiError(403, "Only project admins can delete projects", "Only project admins can delete projects");
    }
    await (0, projects_repository_1.deleteProject)(projectId);
};
exports.deleteProjectService = deleteProjectService;
const getProjectMembersService = async ({ projectId, userId, }) => {
    const project = await (0, projects_repository_1.getProjectById)(projectId);
    if (!project) {
        throw new ApiError_1.ApiError(404, "Project not found", "Project not found");
    }
    const isMember = await (0, projects_repository_1.isUserMemberOfProject)(userId, projectId);
    if (!isMember) {
        throw new ApiError_1.ApiError(403, "Access denied", "Access denied");
    }
    return await (0, projects_repository_1.getProjectMembers)(projectId);
};
exports.getProjectMembersService = getProjectMembersService;
const getProjectByIdService = async ({ projectId, userId, }) => {
    const project = await (0, projects_repository_1.getProjectById)(projectId);
    if (!project) {
        throw new ApiError_1.ApiError(404, "Project not found", "Project not found");
    }
    const isMember = await (0, projects_repository_1.isUserMemberOfProject)(userId, projectId);
    if (!isMember) {
        throw new ApiError_1.ApiError(403, "Access denied", "Access denied");
    }
    return project;
};
exports.getProjectByIdService = getProjectByIdService;
const addMemberToProjectService = async ({ userId, projectId, assignedBy, }) => {
    const project = await (0, projects_repository_1.getProjectById)(projectId);
    if (!project) {
        throw new ApiError_1.ApiError(404, "Project not found", "Project not found");
    }
    const isAdmin = await (0, projects_repository_1.isUserAdminOfProject)(assignedBy, projectId);
    if (!isAdmin) {
        throw new ApiError_1.ApiError(403, "Only project admins can add members to projects", "Only project admins can add members to projects");
    }
    return await (0, projects_repository_1.addMemberToProject)({ userId, projectId, assignedBy });
};
exports.addMemberToProjectService = addMemberToProjectService;
//# sourceMappingURL=projects.service.js.map