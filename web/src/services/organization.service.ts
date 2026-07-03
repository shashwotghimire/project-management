import api from "@/lib/axios";
import {
  CreateOrganizationResponse,
  DeleteOrganizationResponse,
  GetOrgMembersResponse,
  GetUsersOrganizationsResponse,
  OrganizationByIdResponse,
  UpdateOrganizationRequest,
  UpdateOrganizationResponse,
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

export const getOrganizationByIdService = async (orgId: string) => {
  const response = await api.get<OrganizationByIdResponse>(
    `/organizations/${orgId}`,
  );
  return response.data.data;
};

export const updateOrganizationService = async (
  orgId: string,
  data: UpdateOrganizationRequest,
): Promise<UpdateOrganizationResponse["data"]> => {
  const response = await api.patch<UpdateOrganizationResponse>(
    `/organizations/${orgId}`,
    data,
  );
  return response.data.data;
};

export const deleteOrganizationService = async (
  orgId: string,
): Promise<void> => {
  await api.delete<DeleteOrganizationResponse>(`/organizations/${orgId}`);
};

export const getOrgMembersService = async (
  orgId: string,
): Promise<GetOrgMembersResponse["data"]> => {
  const response = await api.get<GetOrgMembersResponse>(
    `/organizations/${orgId}/members`,
  );
  return response.data.data;
};

export const uploadOrgLogoService = async (
  orgId: string,
  file: File,
): Promise<{ url: string }> => {
  const form = new FormData();
  form.append("file", file);
  const response = await api.patch<{ success: boolean; data: { url: string } }>(
    `/organizations/${orgId}/logo`,
    form,
  );
  return response.data.data;
};
