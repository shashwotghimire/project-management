import { AiSummary } from "./ai-summary.model";
import { Channel } from "./channel.model";
import { Comments } from "./comments.model";
import { Invitations } from "./invitation.model";
import { Messages } from "./messages.model";
import { Notifications } from "./notifications.model";
import { OrganizationsMember } from "./organizations-members.model";
import { Organization } from "./organizations.model";
import { ProjectMembers } from "./project-members.model";
import { Project } from "./projects.model";
import { Tasks } from "./tasks.model";
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

Project.hasMany(Tasks, { foreignKey: "projectId", as: "tasks" });
Tasks.belongsTo(Project, { foreignKey: "projectId", as: "project" });

Tasks.belongsTo(User, { foreignKey: "createdBy", as: "creator" });
User.hasMany(Tasks, { foreignKey: "createdBy", as: "createdTasks" });

Tasks.belongsTo(User, { foreignKey: "assignedTo", as: "assignee" });
User.hasMany(Tasks, { foreignKey: "assignedTo", as: "assignedTasks" });

Tasks.belongsTo(User, { foreignKey: "assignedBy", as: "assigner" });
User.hasMany(Tasks, { foreignKey: "assignedBy", as: "tasksAssigned" });

Project.hasMany(Comments, { foreignKey: "projectId" });
Comments.belongsTo(Project, { foreignKey: "projectId" });

Tasks.hasMany(Comments, { foreignKey: "taskId" });
Comments.belongsTo(Tasks, { foreignKey: "taskId" });

Invitations.belongsTo(Organization, {
  foreignKey: "organizationId",
  as: "organization",
});
Invitations.belongsTo(User, { foreignKey: "invitedBy", as: "inviter" });

Comments.belongsTo(User, { foreignKey: "authorId", as: "author" });
User.hasMany(Comments, { foreignKey: "authorId", as: "comments" });

Project.hasMany(Channel, { foreignKey: "projectId", as: "channels" });
Channel.belongsTo(Project, { foreignKey: "projectId", as: "project" });

Channel.hasMany(Messages, { foreignKey: "channelId", as: "messages" });
Messages.belongsTo(Channel, { foreignKey: "channelId", as: "channel" });

Messages.belongsTo(User, { foreignKey: "senderId", as: "sender" });
User.hasMany(Messages, { foreignKey: "senderId", as: "sentMessages" });

User.hasMany(Notifications, { foreignKey: "userId", as: "notifications" });
Notifications.belongsTo(User, { foreignKey: "userId", as: "user" });

AiSummary.belongsTo(User, { foreignKey: "userId" });
User.hasOne(AiSummary, { foreignKey: "userId" });

AiSummary.belongsTo(Organization, { foreignKey: "orgId" });
Organization.hasMany(AiSummary, { foreignKey: "orgId" });
