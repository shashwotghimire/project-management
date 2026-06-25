"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addMemberToProject = exports.removeProjectMember = exports.getProjectMembers = exports.deleteProject = exports.updateProject = exports.getUserProjects = exports.getProjectById = exports.createProject = void 0;
const asyncHandler_1 = __importDefault(require("../helpers/asyncHandler"));
const ApiResponse_1 = require("../helpers/ApiResponse");
const projects_service_1 = require("../services/projects.service");
const check_string_helper_1 = require("../helpers/check-string.helper");
exports.createProject = (0, asyncHandler_1.default)(async (req, res) => {
    const { orgId } = req.params;
    const organizationId = (0, check_string_helper_1.isString)(orgId);
    const { name, logoUrl } = req.body;
    const createdBy = req.user.id;
    const project = await (0, projects_service_1.createProjectService)({
        name,
        organizationId,
        createdBy,
        logoUrl,
    });
    return res
        .status(201)
        .json(new ApiResponse_1.ApiResponse(true, "Project created successfully", project));
});
exports.getProjectById = (0, asyncHandler_1.default)(async (req, res) => {
    const projectId = (0, check_string_helper_1.isString)(req.params.projectId);
    const userId = req.user.id;
    const project = await (0, projects_service_1.getProjectByIdService)({ projectId, userId });
    return res
        .status(200)
        .json(new ApiResponse_1.ApiResponse(true, "Project fetched successfully", project));
});
exports.getUserProjects = (0, asyncHandler_1.default)(async (req, res) => {
    const organizationId = (0, check_string_helper_1.isString)(req.params.orgId);
    const userId = req.user.id;
    const { page, limit, search = "", } = req.query;
    const projects = await (0, projects_service_1.getUserProjectsService)({
        userId,
        organizationId,
        page: Number(page) || 1,
        limit: Number(limit) || 10,
        search,
    });
    return res
        .status(200)
        .json(new ApiResponse_1.ApiResponse(true, "Projects fetched successfully", projects));
});
exports.updateProject = (0, asyncHandler_1.default)(async (req, res) => {
    const projectId = (0, check_string_helper_1.isString)(req.params.projectId);
    const { name, logoUrl, status } = req.body;
    const userId = req.user.id;
    const updated = await (0, projects_service_1.updateProjectService)({
        projectId,
        userId,
        name,
        logoUrl,
        status,
    });
    return res
        .status(200)
        .json(new ApiResponse_1.ApiResponse(true, "Project updated successfully", updated));
});
exports.deleteProject = (0, asyncHandler_1.default)(async (req, res) => {
    const projectId = (0, check_string_helper_1.isString)(req.params.projectId);
    const userId = req.user.id;
    await (0, projects_service_1.deleteProjectService)({ projectId, userId });
    return res
        .status(200)
        .json(new ApiResponse_1.ApiResponse(true, "Project deleted successfully", null));
});
exports.getProjectMembers = (0, asyncHandler_1.default)(async (req, res) => {
    const projectId = (0, check_string_helper_1.isString)(req.params.projectId);
    const userId = req.user.id;
    const members = await (0, projects_service_1.getProjectMembersService)({ projectId, userId });
    return res
        .status(200)
        .json(new ApiResponse_1.ApiResponse(true, "Project members fetched successfully", members));
});
exports.removeProjectMember = (0, asyncHandler_1.default)(async (req, res) => {
    const projectId = (0, check_string_helper_1.isString)(req.params.projectId);
    const targetUserId = (0, check_string_helper_1.isString)(req.params.userId);
    const requesterId = req.user.id;
    await (0, projects_service_1.removeProjectMemberService)({ projectId, targetUserId, requesterId });
    return res
        .status(200)
        .json(new ApiResponse_1.ApiResponse(true, "Member removed from project successfully", null));
});
exports.addMemberToProject = (0, asyncHandler_1.default)(async (req, res) => {
    const projectId = (0, check_string_helper_1.isString)(req.params.projectId);
    const { userId } = req.body;
    const assignedBy = req.user.id;
    const member = await (0, projects_service_1.addMemberToProjectService)({
        userId,
        projectId,
        assignedBy,
    });
    return res
        .status(200)
        .json(new ApiResponse_1.ApiResponse(true, "Member added to project successfully", member));
});
//# sourceMappingURL=projects.controller.js.map