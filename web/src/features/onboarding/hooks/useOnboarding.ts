import { acceptInvitationService } from "@/services/invitation.service";
import {
  createOrganizationService,
  getUsersOrganizationsService,
} from "@/services/organization.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetUsersOrganizations = (search: string = "") => {
  return useQuery({
    queryKey: ["user", "organizations"],
    queryFn: async () => {
      return await getUsersOrganizationsService(search);
    },
  });
};

export const useAcceptInvitation = (invitationCode: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const res = await acceptInvitationService(invitationCode);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", "organizations"] });
    },
  });
};

export const useCreateOrganization = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      name,
      description,
      websiteUrl,
    }: {
      name: string;
      description?: string;
      websiteUrl?: string;
    }) => {
      const res = await createOrganizationService(
        name,
        description,
        websiteUrl,
      );
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", "organizations"] });
    },
  });
};
