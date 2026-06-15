import { getOrganizationByIdService } from "@/services/organization.service";
import { useQuery } from "@tanstack/react-query";

export const useGetOrganizationById = (orgId: string) => {
  return useQuery({
    queryKey: ["organization", orgId],
    queryFn: async () => {
      const response = await getOrganizationByIdService(orgId);
      return response;
    },
  });
};
