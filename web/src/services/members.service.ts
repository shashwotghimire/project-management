import api from "@/lib/axios";
import { GetOrgMembersResponse } from "@/types/members-api.types";

export const getOrgMembersService = async (
  orgId: string,
): Promise<GetOrgMembersResponse["data"]> => {
  const response = await api.get<GetOrgMembersResponse>(
    `/organizations/${orgId}/members`,
  );
  return response.data.data;
};
