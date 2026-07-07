"use client";

import { useState } from "react";
import { useGetProjectById, useGetProjectTaskStats } from "../hooks/useProject";
import ProjectStatusBadge from "./ProjectStatusBadge";
import MemberAvatars from "./MemberAvatars";
import AddMembers from "./AddMembers";
import EditProjectDialog from "./EditProjectDialog";
import Kanban from "@/features/tasks/components/Kanban";
import TaskList from "@/features/tasks/components/TaskList";
import GroupChat from "./GroupChat";
import ProjectMembersTable from "./ProjectMembersTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pencil } from "lucide-react";
import { Spinner } from "@/components/Spinner";
import { QueryError } from "@/components/QueryError";

interface ProjectDetailsProps {
  orgId: string;
  projectId: string;
}

export default function ProjectDetails({
  orgId,
  projectId,
}: ProjectDetailsProps) {
  const [editOpen, setEditOpen] = useState(false);
  const {
    data: project,
    isLoading,
    isError,
  } = useGetProjectById(orgId, projectId);
  const { data: stats } = useGetProjectTaskStats(orgId, projectId);

  if (isLoading) {
    return <Spinner fullPage />;
  }

  if (isError || !project) {
    return <QueryError message="Failed to load project." />;
  }

  return (
    <>
      {editOpen && (
        <EditProjectDialog
          open={editOpen}
          onOpenChange={setEditOpen}
          orgId={orgId}
          project={project}
        />
      )}
    <div className="flex h-full flex-col">
      {/* Fixed header */}
      <div className="shrink-0 space-y-3 px-6 py-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col gap-2">
            <div className="group flex items-center gap-2">
              {project.logoUrl && (
                <img
                  src={project.logoUrl}
                  alt={project.name}
                  className="h-10 w-10 rounded-md object-cover"
                />
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-7 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <MoreHorizontal className="size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem onSelect={() => setEditOpen(true)}>
                    <Pencil className="mr-2 size-3.5" />
                    Edit project
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <h1 className="text-2xl font-semibold">{project.name}</h1>
              <ProjectStatusBadge status={project.status} />
            </div>
            <MemberAvatars orgId={orgId} projectId={projectId} />
          </div>
          <AddMembers orgId={orgId} projectId={projectId} />
        </div>

        {/* Stats strip */}
        {stats && (
          <div className="flex flex-wrap items-center gap-4 text-sm">
            {/* Progress */}
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Progress</span>
              <div className="flex items-center gap-1.5">
                <div className="h-1.5 w-24 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{
                      width: stats.totalTasks > 0
                        ? `${Math.round((stats.totalCompletedTasks / stats.totalTasks) * 100)}%`
                        : "0%",
                    }}
                  />
                </div>
                <span className="font-medium">
                  {stats.totalTasks > 0
                    ? `${Math.round((stats.totalCompletedTasks / stats.totalTasks) * 100)}%`
                    : "0%"}
                </span>
              </div>
            </div>

            <div className="h-4 w-px bg-border" />

            {/* Priority counts */}
            <div className="flex items-center gap-3">
              <span className="text-muted-foreground">Priority</span>
              <span className="flex items-center gap-1">
                <span className="inline-block h-2 w-2 rounded-full bg-red-500" />
                <span className="font-medium">{stats.totalHighPriorityTasks}</span>
                <span className="text-muted-foreground">High</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="inline-block h-2 w-2 rounded-full bg-yellow-500" />
                <span className="font-medium">{stats.totalMediumPriorityTasks}</span>
                <span className="text-muted-foreground">Medium</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="inline-block h-2 w-2 rounded-full bg-green-500" />
                <span className="font-medium">{stats.totalLowPriorityTasks}</span>
                <span className="text-muted-foreground">Low</span>
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Tabs fill remaining height */}
      <Tabs defaultValue="kanban" className="flex min-h-0 flex-1 flex-col">
        <div className="shrink-0 flex justify-center py-3">
          <TabsList className="h-9 rounded-full px-1">
            <TabsTrigger value="kanban" className="rounded-full px-4 text-sm data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm">Kanban</TabsTrigger>
            <TabsTrigger value="tasks" className="rounded-full px-4 text-sm data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm">All Tasks</TabsTrigger>
            <TabsTrigger value="chat" className="rounded-full px-4 text-sm data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm">Group Chat</TabsTrigger>
            <TabsTrigger value="members" className="rounded-full px-4 text-sm data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm">Members</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="kanban" className="mt-0 flex-1 overflow-auto p-6">
          <Kanban orgId={orgId} projectId={projectId} />
        </TabsContent>
        <TabsContent value="tasks" className="mt-0 flex-1 overflow-auto p-6">
          <TaskList orgId={orgId} projectId={projectId} />
        </TabsContent>
        <TabsContent value="chat" className="mt-0 flex-1 overflow-hidden p-6">
          <GroupChat orgId={orgId} projectId={projectId} />
        </TabsContent>
        <TabsContent value="members" className="mt-0 flex-1 overflow-auto p-6">
          <ProjectMembersTable orgId={orgId} projectId={projectId} />
        </TabsContent>
      </Tabs>
    </div>
    </>
  );
}
