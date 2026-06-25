"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProject = createProject;
exports.getProjectById = getProjectById;
exports.isUserMemberOfProject = isUserMemberOfProject;
exports.isUserAdminOfProject = isUserAdminOfProject;
exports.getProjectsByUserId = getProjectsByUserId;
exports.deleteProject = deleteProject;
exports.updateProject = updateProject;
exports.addMemberToProject = addMemberToProject;
exports.removeProjectMember = removeProjectMember;
exports.getProjectMembers = getProjectMembers;
const sequelize_1 = require("sequelize");
const projects_model_1 = require("../models/projects.model");
const project_members_model_1 = require("../models/project-members.model");
const organizations_members_model_1 = require("../models/organizations-members.model");
const users_model_1 = require("../models/users.model");
const db_config_1 = require("../configs/db.config");
async function createProject(data) {
    const result = await db_config_1.sequelize.transaction(async (t) => {
        const project = await projects_model_1.Project.create(data, { transaction: t });
        await project_members_model_1.ProjectMembers.create({
            userId: data.createdBy,
            projectId: project.id,
            assignedBy: data.createdBy,
        }, { transaction: t });
        return project;
    });
    return result;
}
async function getProjectById(projectId) {
    return projects_model_1.Project.findByPk(projectId);
}
async function isUserMemberOfProject(userId, projectId) {
    const member = await project_members_model_1.ProjectMembers.findOne({ where: { userId, projectId } });
    return !!member;
}
async function isUserAdminOfProject(userId, projectId) {
    const project = await projects_model_1.Project.findByPk(projectId);
    if (!project)
        return false;
    const isMember = await isUserMemberOfProject(userId, projectId);
    if (!isMember)
        return false;
    const orgMembership = await organizations_members_model_1.OrganizationsMember.findOne({
        where: {
            userId,
            orgId: project.organizationId,
            userRoleInOrg: "org admin",
        },
    });
    return !!orgMembership;
}
async function getProjectsByUserId(userId, organizationId, { page, limit, search }) {
    const pageInt = parseInt(String(page), 10) || 1;
    const limitInt = parseInt(String(limit), 10) || 10;
    const offset = (pageInt - 1) * limitInt;
    const whereClause = { organizationId };
    if (search?.trim()) {
        whereClause.name = {
            [sequelize_1.Op.iLike]: `%${search.trim()}%`,
        };
    }
    const [rows, count] = await Promise.all([
        project_members_model_1.ProjectMembers.findAll({
            where: { userId },
            include: [{ model: projects_model_1.Project, where: whereClause, required: true }],
            limit: limitInt,
            offset,
            order: [["createdAt", "DESC"]],
        }),
        project_members_model_1.ProjectMembers.count({
            where: { userId },
            include: [{ model: projects_model_1.Project, where: whereClause, required: true }],
            distinct: true,
            col: "id",
        }),
    ]);
    return {
        data: rows,
        total: count,
        page: pageInt,
        limit: limitInt,
        totalPages: Math.ceil(count / limitInt),
    };
}
async function deleteProject(projectId) {
    await projects_model_1.Project.destroy({ where: { id: projectId } });
}
async function updateProject(projectId, data) {
    return projects_model_1.Project.update(data, { where: { id: projectId }, returning: true });
}
async function addMemberToProject(data) {
    return project_members_model_1.ProjectMembers.create(data);
}
async function removeProjectMember(userId, projectId) {
    return project_members_model_1.ProjectMembers.destroy({ where: { userId, projectId } });
}
async function getProjectMembers(projectId) {
    return project_members_model_1.ProjectMembers.findAll({
        where: { projectId },
        include: [
            {
                model: users_model_1.User,
                as: "member",
                attributes: ["id", "username", "email", "gravatarUrl"],
            },
        ],
    });
}
//# sourceMappingURL=projects.repository.js.map