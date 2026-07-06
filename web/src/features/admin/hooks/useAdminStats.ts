import { useQuery } from "@tanstack/react-query";
import { getAdminStatsService } from "@/services/admin.service";

export const useGetAdminStats = () => {
  return useQuery({
    queryKey: ["admin-stats"],
    queryFn: getAdminStatsService,
    staleTime: 60 * 1000, // 1 minute stale time
  });
};
