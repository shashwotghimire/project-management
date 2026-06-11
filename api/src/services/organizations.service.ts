import {
  createOrganization,
  getUsersOrganizations,
} from "../repositories/organizations.repository";

export const createOrganizationService = async ({
  name,
  adminId,
}: {
  name: string;
  adminId: string;
}) => {
  return await createOrganization({ name, adminId });
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
