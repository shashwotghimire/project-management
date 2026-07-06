import api from "@/lib/axios";
import { DashboardSummaryResponse } from "@/types/llm-api.types";

export const getDashboardSummaryService = async (orgId: string): Promise<string> => {
  const response = await api.get<DashboardSummaryResponse>(`/ai/${orgId}/summary`);
  return response.data.data;
};

export const regenerateDashboardSummaryService = async (orgId: string): Promise<string> => {
  const response = await api.post<DashboardSummaryResponse>(`/ai/${orgId}/summary/regenerate`);
  return response.data.data;
};
