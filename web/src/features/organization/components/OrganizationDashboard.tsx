"use client";
import React from "react";
import { useGetOrganizationById } from "../hooks/useOrganization";
import ProjectsCard from "@/features/projects/components/ProjectsCard";
import { UserTasksList } from "@/features/tasks/components/UserTasksList";

function OrganizationDashboard({ organizationId }: { organizationId: string }) {
  const {
    data: organization,
    isLoading,
    error,
  } = useGetOrganizationById(organizationId);
  return (
    <div>
      <div className="p-5">AI SUMMARY</div>
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
