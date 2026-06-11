import { ApiError } from "../helpers/ApiError";
import {
  createOrganization,
  deleteOrganization,
  getOrgByAdminId,
  getUsersOrganizations,
  updateOrganization,
} from "../repositories/organizations.repository";

export const createOrganizationService = async ({
  name,
  adminId,
  logoUrl = "",
  description = "",
  websiteUrl = "",
}: {
  name: string;
  adminId: string;
  logoUrl?: string;
  description?: string;
  websiteUrl?: string;
}) => {
  return await createOrganization({
    name,
    adminId,
    logoUrl,
    description,
    websiteUrl,
  });
};

export const getUsersOrganizationsService = async ({
  userId,
  page = 1,
  limit = 10,
  query = "",
}: {
  userId: string;
  page: number;
  limit: number;
  query?: string;
}) => {
  return await getUsersOrganizations({ userId, page, limit, query });
};

export const updateOrganizationService = async ({
  orgId,
  adminId,
  name,
  logoUrl,
  description,
  websiteUrl,
}: {
  orgId: string;
  adminId: string;
  name?: string | undefined;
  logoUrl?: string | undefined;
  description?: string | undefined;
  websiteUrl?: string | undefined;
}) => {
  const org = await getOrgByAdminId(adminId, orgId);
  if (!org) {
    throw new ApiError(
      404,
      "Organization not found or you are not the admin",
      "Organization not found or you are not the admin",
    );
  }
  const updatedOrg = await updateOrganization({
    orgId,
    userId: adminId,
    name,
    logoUrl,
    description,
    websiteUrl,
  });
  return updatedOrg;
};

export const deleteOrganizationService = async ({
  orgId,
  adminId,
}: {
  orgId: string;
  adminId: string;
}) => {
  const org = await getOrgByAdminId(adminId, orgId);
  if (!org) {
    throw new ApiError(
      404,
      "Organization not found or you are not the admin",
      "Organization not found or you are not the admin",
    );
  }
  await deleteOrganization(orgId, adminId);
};
