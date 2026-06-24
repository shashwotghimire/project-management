import { getOrgMembersService } from "@/services/members.service";
import { useQuery } from "@tanstack/react-query";

export const useGetOrgMembers = (orgId: string) => {
  return useQuery({
    queryKey: ["org-members", orgId],
    queryFn: () => getOrgMembersService(orgId),
  });
};
