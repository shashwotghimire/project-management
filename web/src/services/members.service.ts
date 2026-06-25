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

export const removeOrgMemberService = async (
  orgId: string,
  userId: string,
): Promise<void> => {
  await api.delete(`/organizations/${orgId}/members/${userId}`);
};
