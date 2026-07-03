import {
  deleteOrganizationService,
  getOrgMembersService,
  getOrganizationByIdService,
  updateOrganizationService,
  uploadOrgLogoService,
} from "@/services/organization.service";
import { UpdateOrganizationRequest } from "@/types/organization-api.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetOrganizationById = (orgId: string) => {
  return useQuery({
    queryKey: ["organization", orgId],
    queryFn: async () => {
      const response = await getOrganizationByIdService(orgId);
      return response;
    },
  });
};

export const useUpdateOrganization = (orgId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateOrganizationRequest) =>
      updateOrganizationService(orgId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organization", orgId] });
    },
  });
};

export const useDeleteOrganization = (orgId: string) => {
  return useMutation({
    mutationFn: () => deleteOrganizationService(orgId),
  });
};

export const useGetOrgMembers = (orgId: string) => {
  return useQuery({
    queryKey: ["org-members", orgId],
    queryFn: () => getOrgMembersService(orgId),
    enabled: !!orgId,
  });
};

export const useUploadOrgLogo = (orgId: string) => {
  const queryClient = useQueryClient();
  return useMutation<{ url: string }, Error, File>({
    mutationFn: (file) => uploadOrgLogoService(orgId, file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organization", orgId] });
    },
  });
};
