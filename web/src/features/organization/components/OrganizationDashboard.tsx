"use client";
import React from "react";
import { useGetDashboardSummary, useGetOrganizationById, useRegenerateDashboardSummary } from "../hooks/useOrganization";
import { useGetUserProfile } from "@/features/auth/hooks/useAuth";
import ProjectsCard from "@/features/projects/components/ProjectsCard";
import { UserTasksList } from "@/features/tasks/components/UserTasksList";
import { RefreshCw } from "lucide-react";

function OrganizationDashboard({ organizationId }: { organizationId: string }) {
  const { data: organization, isLoading, error } = useGetOrganizationById(organizationId);
  const { data: user } = useGetUserProfile();
  const { data: summary, isLoading: summaryLoading } = useGetDashboardSummary(organizationId);
  const { mutate: regenerate, isPending: regenerating } = useRegenerateDashboardSummary(organizationId);

  return (
    <div>
      <div className="px-5 pt-6 pb-1">
        <h1 className="text-2xl font-bold">
          Welcome back{user?.username ? `, ${user.username}` : ""}
        </h1>
      </div>
      <div className="p-5 flex items-start gap-3">
        <div className="flex-1">
          {summaryLoading || regenerating ? (
            <p className="text-base text-muted-foreground animate-pulse">
              {regenerating ? "Regenerating summary…" : "Loading summary…"}
            </p>
          ) : summary ? (
            <p className="text-base font-medium">{summary}</p>
          ) : null}
        </div>
        <button
          onClick={() => regenerate()}
          disabled={summaryLoading || regenerating}
          className="shrink-0 flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
          title="Regenerate summary"
        >
          <RefreshCw className={`h-4 w-4 ${regenerating ? "animate-spin" : ""}`} />
          <span>Regenerate</span>
        </button>
      </div>
      <div className="p-6 space-y-6">
        <ProjectsCard orgId={organizationId} />
      </div>
      <div className="p-6 space-y-3">
        <h2 className="text-lg font-semibold">My Tasks</h2>
        <UserTasksList orgId={organizationId} />
      </div>
    </div>
  );
}

export default OrganizationDashboard;
