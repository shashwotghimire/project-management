import api from "@/lib/axios";
import {
  CreateOrganizationResponse,
  GetUsersOrganizationsResponse,
} from "@/types/organization-api.types";

export const getUsersOrganizationsService = async (
  query: string = "",
): Promise<GetUsersOrganizationsResponse["data"]> => {
  const response = await api.get<GetUsersOrganizationsResponse>(
    `/organizations?page=1&limit=10&query=${query}`,
  );
  return response.data.data;
};

export const createOrganizationService = async (
  name: string,
  description?: string,
  websiteUrl?: string,
) => {
  const response = await api.post<CreateOrganizationResponse>(
    "/organizations",
    {
      name,
      description,
      websiteUrl,
    },
  );
  return response.data.data;
};
