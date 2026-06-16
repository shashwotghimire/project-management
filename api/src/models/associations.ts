import { OrganizationsMember } from "./organizations-members.model";
import { Organization } from "./organizations.model";
import { ProjectMembers } from "./project-members.model";
import { Project } from "./projects.model";
import { User } from "./users.model";

Organization.belongsToMany(User, {
  through: OrganizationsMember,
  foreignKey: "orgId",
  otherKey: "userId",
  as: "members",
});
User.belongsToMany(Organization, {
  through: OrganizationsMember,
  foreignKey: "userId",
  otherKey: "orgId",
  as: "organizations",
});

User.hasMany(OrganizationsMember, { foreignKey: "userId" });
Organization.hasMany(OrganizationsMember, { foreignKey: "orgId" });
OrganizationsMember.belongsTo(User, { foreignKey: "userId" });
OrganizationsMember.belongsTo(Organization, { foreignKey: "orgId" });

Organization.belongsTo(User, { foreignKey: "adminId", as: "admin" });
User.hasMany(Organization, {
  foreignKey: "adminId",
  as: "ownedOrganizations",
});

Organization.hasMany(Project, { foreignKey: "organizationId", as: "projects" });
Project.belongsTo(Organization, {
  foreignKey: "organizationId",
  as: "organization",
});

Project.belongsToMany(User, {
  through: ProjectMembers,
  foreignKey: "projectId",
  otherKey: "userId",
  as: "members",
});
User.belongsToMany(Project, {
  through: ProjectMembers,
  foreignKey: "userId",
  otherKey: "projectId",
  as: "assignedProjects",
});

Project.hasMany(ProjectMembers, { foreignKey: "projectId" });
ProjectMembers.belongsTo(Project, { foreignKey: "projectId" });
ProjectMembers.belongsTo(User, { foreignKey: "userId", as: "member" });
ProjectMembers.belongsTo(User, {
  foreignKey: "assignedBy",
  as: "assignedByUser",
});
