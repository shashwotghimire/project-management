"use client";

import { useGetProjectById } from "../hooks/useProject";
import ProjectStatusBadge from "./ProjectStatusBadge";
import MemberAvatars from "./MemberAvatars";
import Kanban from "@/features/tasks/components/Kanban";
import Image from "next/image";

interface ProjectDetailsProps {
  orgId: string;
  projectId: string;
}

export default function ProjectDetails({
  orgId,
  projectId,
}: ProjectDetailsProps) {
  const {
    data: project,
    isLoading,
    isError,
  } = useGetProjectById(orgId, projectId);

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4 p-6">
        <div className="h-8 w-1/3 rounded bg-muted" />
        <div className="h-4 w-1/4 rounded bg-muted" />
      </div>
    );
  }

  if (isError || !project) {
    return (
      <div className="p-6 text-sm text-destructive">
        Failed to load project.
      </div>
    );
  }

  return (
    <div className="space-y-4 p-6">
      <div className="flex items-center gap-3">
        {project.logoUrl && (
          <Image
            src={project.logoUrl}
            alt={project.name}
            className="h-10 w-10 rounded-md object-cover"
          />
        )}
        <h1 className="text-2xl font-semibold">{project.name}</h1>
        <ProjectStatusBadge status={project.status} />
      </div>
      <MemberAvatars orgId={orgId} projectId={projectId} />
      <div>
        <Kanban projectId={projectId} orgId={orgId} />
      </div>
    </div>
  );
}
