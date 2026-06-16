import { Project } from "../models/projects.model";
import { ProjectMembers } from "../models/project-members.model";
import { OrganizationsMember } from "../models/organizations-members.model";
import { sequelize } from "../configs/db.config";

export async function createProject(data: {
  name: string;
  organizationId: string;
  createdBy: string;
  logoUrl?: string;
}) {
  const result = await sequelize.transaction(async (t) => {
    const project = await Project.create(data, { transaction: t });
    await ProjectMembers.create(
      {
        userId: data.createdBy,
        projectId: project.id,
        assignedBy: data.createdBy,
      },
      { transaction: t },
    );
    return project;
  });
  return result;
}

export async function getProjectById(
  projectId: string,
): Promise<Project | null> {
  return Project.findByPk(projectId);
}

export async function isUserMemberOfProject(
  userId: string,
  projectId: string,
): Promise<boolean> {
  const member = await ProjectMembers.findOne({ where: { userId, projectId } });
  return !!member;
}

export async function isUserAdminOfProject(
  userId: string,
  projectId: string,
): Promise<boolean> {
  const project = await Project.findByPk(projectId);
  if (!project) return false;

  const isMember = await isUserMemberOfProject(userId, projectId);
  if (!isMember) return false;

  const orgMembership = await OrganizationsMember.findOne({
    where: {
      userId,
      orgId: project.organizationId,
      userRoleInOrg: "org admin",
    },
  });
  return !!orgMembership;
}

export async function getProjectsByUserId(
  userId: string,
  organizationId: string,
) {
  return ProjectMembers.findAll({
    where: { userId },
    include: [{ model: Project, where: { organizationId }, required: true }],
  });
}

export async function deleteProject(projectId: string): Promise<void> {
  await Project.destroy({ where: { id: projectId } });
}

export async function updateProject(
  projectId: string,
  data: { name?: string; logoUrl?: string },
): Promise<[number, Project[]]> {
  return Project.update(data, { where: { id: projectId }, returning: true });
}

export async function addMemberToProject(data: {
  userId: string;
  projectId: string;
  assignedBy: string;
}) {
  return ProjectMembers.create(data);
}
