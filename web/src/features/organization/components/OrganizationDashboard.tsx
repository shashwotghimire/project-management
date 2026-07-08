"use client";
import React from "react";
import { useGetDashboardSummary, useGetOrganizationById, useRegenerateDashboardSummary } from "../hooks/useOrganization";
import { useGetUserProfile } from "@/features/auth/hooks/useAuth";
import ProjectsCard from "@/features/projects/components/ProjectsCard";
import { UserTasksList } from "@/features/tasks/components/UserTasksList";
import { RefreshCw, ShieldOff } from "lucide-react";
import { ApiError } from "@/types/api-error.types";

function OrganizationDashboard({ organizationId }: { organizationId: string }) {
  const { data: organization, isLoading, error } = useGetOrganizationById(organizationId);
  const { data: user } = useGetUserProfile();
  const { data: summary, isLoading: summaryLoading } = useGetDashboardSummary(organizationId);
  const { mutate: regenerate, isPending: regenerating } = useRegenerateDashboardSummary(organizationId);

  if (error) {
    const apiError = error as unknown as ApiError;
    const isSuspended = apiError.status === 403;
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4 text-center px-6">
        <div className="rounded-full bg-muted p-4">
          <ShieldOff className="size-8 text-muted-foreground" />
        </div>
        <div>
          <h2 className="text-lg font-semibold">
            {isSuspended ? "Organization Suspended" : "Access Denied"}
          </h2>
          <p className="text-sm text-muted-foreground mt-1 max-w-sm">
            {isSuspended
              ? "This organization has been suspended and is no longer accessible. Contact support if you believe this is a mistake."
              : apiError.message || "You don't have permission to view this organization."}
          </p>
        </div>
      </div>
    );
  }

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
