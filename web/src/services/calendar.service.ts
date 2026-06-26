import api from "@/lib/axios";
import { CalendarTask, GetCalendarTasksResponse } from "@/types/calendar-api.types";

export const getCalendarTasksService = async (orgId: string): Promise<CalendarTask[]> => {
  const res = await api.get<GetCalendarTasksResponse>(`/organizations/${orgId}/calendar-tasks`);
  return res.data.data;
};
