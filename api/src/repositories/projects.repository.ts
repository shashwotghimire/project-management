import { Op } from "sequelize";
import { Project } from "../models/projects.model";
import { ProjectMembers } from "../models/project-members.model";
import { OrganizationsMember } from "../models/organizations-members.model";
import { User } from "../models/users.model";
import { Organization } from "../models/organizations.model";
import { ApiError } from "../helpers/ApiError";
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
  const user = await User.findByPk(userId);
  const isSuperadmin = user?.role === "superadmin";

  if (!isSuperadmin) {
    const project = await Project.findByPk(projectId);
    if (project) {
      const org = await Organization.findByPk(project.organizationId);
      if (org && org.blocked) {
        throw new ApiError(
          403,
          "This organization has been suspended",
          "Organization suspended",
        );
      }
    }
  }

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
  { page, limit, search }: { page: number; limit: number; search?: string },
) {
  const pageInt = parseInt(String(page), 10) || 1;
  const limitInt = parseInt(String(limit), 10) || 10;
  const offset = (pageInt - 1) * limitInt;
  const whereClause: any = { organizationId };
  if (search?.trim()) {
    whereClause.name = {
      [Op.iLike]: `%${search.trim()}%`,
    };
  }

  const [rows, count] = await Promise.all([
    ProjectMembers.findAll({
      where: { userId },
      include: [{ model: Project, where: whereClause, required: true }],
      limit: limitInt,
      offset,
      order: [["createdAt", "DESC"]],
    }),
    ProjectMembers.count({
      where: { userId },
      include: [{ model: Project, where: whereClause, required: true }],
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

export async function getDashboardProjects(
  userId: string,
  organizationId: string,
) {
  return ProjectMembers.findAll({
    where: { userId },
    include: [
      {
        model: Project,
        where: { organizationId },
        required: true,
      },
    ],
    order: [[{ model: Project, as: "Project" }, "updatedAt", "DESC"]],
    limit: 3,
  });
}

export async function deleteProject(projectId: string): Promise<void> {
  await Project.destroy({ where: { id: projectId } });
}

export async function updateProject(
  projectId: string,
  data: { name?: string; logoUrl?: string; status?: "active" | "archived" },
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

export async function removeProjectMember(
  userId: string,
  projectId: string,
): Promise<number> {
  return ProjectMembers.destroy({ where: { userId, projectId } });
}

export async function getProjectMembers(projectId: string) {
  return ProjectMembers.findAll({
    where: { projectId },
    include: [
      {
        model: User,
        as: "member",
        attributes: ["id", "username", "email", "gravatarUrl"],
      },
    ],
  });
}

export async function updateProjectLogo(projectId: string, logoUrl: string): Promise<Project | null> {
  const project = await Project.findByPk(projectId);
  if (!project) return null;
  project.logoUrl = logoUrl;
  await project.save();
  return project;
}
