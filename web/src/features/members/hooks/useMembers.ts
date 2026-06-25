import { getOrgMembersService, removeOrgMemberService } from "@/services/members.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetOrgMembers = (orgId: string) => {
  return useQuery({
    queryKey: ["org-members", orgId],
    queryFn: () => getOrgMembersService(orgId),
  });
};

export const useRemoveOrgMember = (orgId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId: string) => removeOrgMemberService(orgId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["org-members", orgId] });
    },
  });
};
