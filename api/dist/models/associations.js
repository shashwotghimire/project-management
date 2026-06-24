"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const comments_model_1 = require("./comments.model");
const organizations_members_model_1 = require("./organizations-members.model");
const organizations_model_1 = require("./organizations.model");
const project_members_model_1 = require("./project-members.model");
const projects_model_1 = require("./projects.model");
const tasks_model_1 = require("./tasks.model");
const users_model_1 = require("./users.model");
organizations_model_1.Organization.belongsToMany(users_model_1.User, {
    through: organizations_members_model_1.OrganizationsMember,
    foreignKey: "orgId",
    otherKey: "userId",
    as: "members",
});
users_model_1.User.belongsToMany(organizations_model_1.Organization, {
    through: organizations_members_model_1.OrganizationsMember,
    foreignKey: "userId",
    otherKey: "orgId",
    as: "organizations",
});
users_model_1.User.hasMany(organizations_members_model_1.OrganizationsMember, { foreignKey: "userId" });
organizations_model_1.Organization.hasMany(organizations_members_model_1.OrganizationsMember, { foreignKey: "orgId" });
organizations_members_model_1.OrganizationsMember.belongsTo(users_model_1.User, { foreignKey: "userId" });
organizations_members_model_1.OrganizationsMember.belongsTo(organizations_model_1.Organization, { foreignKey: "orgId" });
organizations_model_1.Organization.belongsTo(users_model_1.User, { foreignKey: "adminId", as: "admin" });
users_model_1.User.hasMany(organizations_model_1.Organization, {
    foreignKey: "adminId",
    as: "ownedOrganizations",
});
organizations_model_1.Organization.hasMany(projects_model_1.Project, { foreignKey: "organizationId", as: "projects" });
projects_model_1.Project.belongsTo(organizations_model_1.Organization, {
    foreignKey: "organizationId",
    as: "organization",
});
projects_model_1.Project.belongsToMany(users_model_1.User, {
    through: project_members_model_1.ProjectMembers,
    foreignKey: "projectId",
    otherKey: "userId",
    as: "members",
});
users_model_1.User.belongsToMany(projects_model_1.Project, {
    through: project_members_model_1.ProjectMembers,
    foreignKey: "userId",
    otherKey: "projectId",
    as: "assignedProjects",
});
projects_model_1.Project.hasMany(project_members_model_1.ProjectMembers, { foreignKey: "projectId" });
project_members_model_1.ProjectMembers.belongsTo(projects_model_1.Project, { foreignKey: "projectId" });
project_members_model_1.ProjectMembers.belongsTo(users_model_1.User, { foreignKey: "userId", as: "member" });
project_members_model_1.ProjectMembers.belongsTo(users_model_1.User, {
    foreignKey: "assignedBy",
    as: "assignedByUser",
});
projects_model_1.Project.hasMany(tasks_model_1.Tasks, { foreignKey: "projectId", as: "tasks" });
tasks_model_1.Tasks.belongsTo(projects_model_1.Project, { foreignKey: "projectId", as: "project" });
tasks_model_1.Tasks.belongsTo(users_model_1.User, { foreignKey: "createdBy", as: "creator" });
users_model_1.User.hasMany(tasks_model_1.Tasks, { foreignKey: "createdBy", as: "createdTasks" });
tasks_model_1.Tasks.belongsTo(users_model_1.User, { foreignKey: "assignedTo", as: "assignee" });
users_model_1.User.hasMany(tasks_model_1.Tasks, { foreignKey: "assignedTo", as: "assignedTasks" });
tasks_model_1.Tasks.belongsTo(users_model_1.User, { foreignKey: "assignedBy", as: "assigner" });
users_model_1.User.hasMany(tasks_model_1.Tasks, { foreignKey: "assignedBy", as: "tasksAssigned" });
projects_model_1.Project.hasMany(comments_model_1.Comments, { foreignKey: "projectId" });
comments_model_1.Comments.belongsTo(projects_model_1.Project, { foreignKey: "projectId" });
tasks_model_1.Tasks.hasMany(comments_model_1.Comments, { foreignKey: "taskId" });
comments_model_1.Comments.belongsTo(tasks_model_1.Tasks, { foreignKey: "taskId" });
comments_model_1.Comments.belongsTo(users_model_1.User, { foreignKey: "authorId", as: "author" });
users_model_1.User.hasMany(comments_model_1.Comments, { foreignKey: "authorId", as: "comments" });
//# sourceMappingURL=associations.js.map