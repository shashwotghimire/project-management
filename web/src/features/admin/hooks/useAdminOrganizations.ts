import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAdminOrganizationsService,
  getAdminOrganizationDetailService,
  blockOrganizationService,
  unblockOrganizationService,
} from "@/services/admin.service";

export const useGetAdminOrganizations = (
  page: number = 1,
  limit: number = 10,
  query: string = "",
) => {
  return useQuery({
    queryKey: ["admin-organizations", page, limit, query],
    queryFn: () => getAdminOrganizationsService(page, limit, query),
  });
};

export const useGetAdminOrganizationDetail = (orgId: string) => {
  return useQuery({
    queryKey: ["admin-organization", orgId],
    queryFn: () => getAdminOrganizationDetailService(orgId),
    enabled: !!orgId,
  });
};

export const useBlockOrganization = (orgId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => blockOrganizationService(orgId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-organizations"] });
      queryClient.invalidateQueries({ queryKey: ["admin-organization", orgId] });
      queryClient.invalidateQueries({ queryKey: ["admin-stats"] });
    },
  });
};

export const useUnblockOrganization = (orgId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => unblockOrganizationService(orgId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-organizations"] });
      queryClient.invalidateQueries({ queryKey: ["admin-organization", orgId] });
      queryClient.invalidateQueries({ queryKey: ["admin-stats"] });
    },
  });
};
