import {
  addMemberToProjectService,
  createProjectService,
  getProjectByIdService,
  getProjectMembersService,
  getUsersProjectsService,
} from "@/services/project.service";
import {
  CreateProjectRequest,
  GetUsersProjectsParams,
} from "@/types/project-api.types";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

export const useCreateProject = (orgId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: CreateProjectRequest) =>
      createProjectService(orgId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects", orgId] });
    },
  });
};

export const useGetUsersProjects = (
  orgId: string,
  params?: GetUsersProjectsParams,
) => {
  return useQuery({
    queryKey: ["projects", orgId, params],
    queryFn: () => getUsersProjectsService(orgId, params),
  });
};

export const useGetDashboardProjects = (orgId: string) => {
  return useQuery({
    queryKey: ["projects", orgId, { limit: 3 }],
    queryFn: () => getUsersProjectsService(orgId, { limit: 3 }),
  });
};

export const useGetProjectById = (orgId: string, projectId: string) => {
  return useQuery({
    queryKey: ["project", orgId, projectId],
    queryFn: () => getProjectByIdService(orgId, projectId),
  });
};

export const useGetProjectMembers = (orgId: string, projectId: string) => {
  return useQuery({
    queryKey: ["project-members", orgId, projectId],
    queryFn: () => getProjectMembersService(orgId, projectId),
  });
};

export const useAddMemberToProject = (orgId: string, projectId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId: string) =>
      addMemberToProjectService(projectId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["project-members", orgId, projectId],
      });
    },
  });
};
