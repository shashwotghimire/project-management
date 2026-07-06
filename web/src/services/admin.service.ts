import api from "@/lib/axios";
import {
  GetAdminOrganizationsResponse,
  GetAdminOrganizationDetailResponse,
  GetAdminUsersResponse,
  GetAdminStatsResponse,
} from "@/types/admin-api.types";

export const getAdminOrganizationsService = async (
  page: number = 1,
  limit: number = 10,
  query: string = "",
): Promise<GetAdminOrganizationsResponse["data"]> => {
  const response = await api.get<GetAdminOrganizationsResponse>(
    `/admin/organizations?page=${page}&limit=${limit}&query=${query}`,
  );
  return response.data.data;
};

export const getAdminOrganizationDetailService = async (
  orgId: string,
): Promise<GetAdminOrganizationDetailResponse["data"]> => {
  const response = await api.get<GetAdminOrganizationDetailResponse>(
    `/admin/organizations/${orgId}`,
  );
  return response.data.data;
};

export const blockOrganizationService = async (orgId: string) => {
  const response = await api.patch(`/admin/organizations/${orgId}/block`);
  return response.data;
};

export const unblockOrganizationService = async (orgId: string) => {
  const response = await api.patch(`/admin/organizations/${orgId}/unblock`);
  return response.data;
};

export const getAdminUsersService = async (
  page: number = 1,
  limit: number = 10,
  query: string = "",
): Promise<GetAdminUsersResponse["data"]> => {
  const response = await api.get<GetAdminUsersResponse>(
    `/admin/users?page=${page}&limit=${limit}&query=${query}`,
  );
  return response.data.data;
};

export const getAdminStatsService = async (): Promise<
  GetAdminStatsResponse["data"]
> => {
  const response = await api.get<GetAdminStatsResponse>("/admin/stats");
  return response.data.data;
};
