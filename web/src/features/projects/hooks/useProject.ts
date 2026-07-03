import {
  addMemberToProjectService,
  createProjectService,
  getDashboardProjectsService,
  getProjectByIdService,
  getProjectMembersService,
  getUsersProjectsService,
  removeProjectMemberService,
  updateProjectService,
  uploadProjectLogoService,
} from "@/services/project.service";
import {
  CreateProjectRequest,
  GetUsersProjectsParams,
  UpdateProjectRequest,
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
      queryClient.invalidateQueries({ queryKey: ["dashboard-projects", orgId] });
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
    queryKey: ["dashboard-projects", orgId],
    queryFn: () => getDashboardProjectsService(orgId),
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

export const useRemoveProjectMember = (orgId: string, projectId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId: string) =>
      removeProjectMemberService(orgId, projectId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["project-members", orgId, projectId],
      });
    },
  });
};

export const useAddMemberToProject = (orgId: string, projectId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId: string) =>
      addMemberToProjectService(orgId, projectId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["project-members", orgId, projectId],
      });
    },
  });
};

export const useUpdateProject = (orgId: string, projectId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: UpdateProjectRequest) =>
      updateProjectService(orgId, projectId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["project", orgId, projectId] });
      queryClient.invalidateQueries({ queryKey: ["projects", orgId] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-projects", orgId] });
    },
  });
};

export const useUploadProjectLogo = (orgId: string, projectId: string) => {
  const queryClient = useQueryClient();
  return useMutation<{ url: string }, Error, File>({
    mutationFn: (file) => uploadProjectLogoService(orgId, projectId, file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["project", orgId, projectId] });
    },
  });
};
