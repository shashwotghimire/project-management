"use client";

import { useGetDashboardProjects, useGetUsersProjects } from "../hooks/useProject";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, FolderOpen } from "lucide-react";
import ProjectCardItem from "./ProjectCardItem";
import ProjectCardSkeleton from "./ProjectCardSkeleton";
import Link from "next/link";
import { QueryError } from "@/components/QueryError";

export default function ProjectsCard({ orgId }: { orgId: string }) {
  const { data, isLoading, error } = useGetDashboardProjects(orgId);
  const { data: allProjects } = useGetUsersProjects(orgId, { limit: 1 });
  const projectMembers = data ?? [];
  const total = allProjects?.total ?? 0;

  if (error) {
    return <QueryError message="Failed to load projects. Please try again." />;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Recent Projects</h2>
        {!isLoading && (
          <Link
            href={`/organization/${orgId}/projects`}
            className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <span>{total} {total === 1 ? "project" : "projects"}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        )}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <ProjectCardSkeleton key={i} />
          ))}
        </div>
      ) : !projectMembers.length ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <FolderOpen className="mb-3 h-10 w-10 text-muted-foreground/50" />
            <p className="font-medium text-muted-foreground">No projects yet</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Projects you belong to will appear here.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projectMembers.map((member) => (
            <Link
              key={member.id}
              href={`/organization/${orgId}/projects/${member.Project.id}`}
            >
              <ProjectCardItem project={member.Project} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
