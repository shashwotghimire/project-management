import { getUsersOrganizationsService } from "@/services/organization.service";
import { useQuery } from "@tanstack/react-query";

export const useGetUsersOrganizations = (search: string = "") => {
  return useQuery({
    queryKey: ["user", "organizations"],
    queryFn: async () => {
      return await getUsersOrganizationsService(search);
    },
  });
};
