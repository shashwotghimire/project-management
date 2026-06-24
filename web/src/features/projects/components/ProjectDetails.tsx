"use client";

import { useGetProjectById } from "../hooks/useProject";
import ProjectStatusBadge from "./ProjectStatusBadge";
import MemberAvatars from "./MemberAvatars";
import Kanban from "@/features/tasks/components/Kanban";
import TaskList from "@/features/tasks/components/TaskList";
import GroupChat from "./GroupChat";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
    <div className="flex h-full flex-col">
      {/* Fixed header */}
      <div className="shrink-0 space-y-3 px-6 py-4">
        <div className="flex items-center gap-3">
          {project.logoUrl && (
            <Image
              src={project.logoUrl}
              alt={project.name}
              className="h-10 w-10 rounded-md object-cover"
              width={40}
              height={40}
            />
          )}
          <h1 className="text-2xl font-semibold">{project.name}</h1>
          <ProjectStatusBadge status={project.status} />
        </div>
        <MemberAvatars orgId={orgId} projectId={projectId} />
      </div>

      {/* Tabs fill remaining height */}
      <Tabs defaultValue="kanban" className="flex min-h-0 flex-1 flex-col">
        <div className="shrink-0 flex justify-center py-3">
          <TabsList className="h-9 rounded-full px-1">
            <TabsTrigger value="kanban" className="rounded-full px-4 text-sm data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm">Kanban</TabsTrigger>
            <TabsTrigger value="tasks" className="rounded-full px-4 text-sm data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm">All Tasks</TabsTrigger>
            <TabsTrigger value="chat" className="rounded-full px-4 text-sm data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm">Group Chat</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="kanban" className="mt-0 flex-1 overflow-auto p-6">
          <Kanban orgId={orgId} projectId={projectId} />
        </TabsContent>
        <TabsContent value="tasks" className="mt-0 flex-1 overflow-auto p-6">
          <TaskList orgId={orgId} projectId={projectId} />
        </TabsContent>
        <TabsContent value="chat" className="mt-0 flex-1 overflow-auto p-6">
          <GroupChat />
        </TabsContent>
      </Tabs>
    </div>
  );
}
