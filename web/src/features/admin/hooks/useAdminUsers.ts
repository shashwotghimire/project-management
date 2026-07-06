import { useQuery } from "@tanstack/react-query";
import { getAdminUsersService } from "@/services/admin.service";

export const useGetAdminUsers = (
  page: number = 1,
  limit: number = 10,
  query: string = "",
) => {
  return useQuery({
    queryKey: ["admin-users", page, limit, query],
    queryFn: () => getAdminUsersService(page, limit, query),
  });
};
