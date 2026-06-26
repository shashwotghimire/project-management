"use client";
import React from "react";
import { useGetOrganizationById } from "../hooks/useOrganization";
import ProjectsCard from "@/features/projects/components/ProjectsCard";

function OrganizationDashboard({ organizationId }: { organizationId: string }) {
  const {
    data: organization,
    isLoading,
    error,
  } = useGetOrganizationById(organizationId);
  return (
    <div className="p-6 space-y-6">
      <ProjectsCard orgId={organizationId} />
    </div>
  );
}

export default OrganizationDashboard;
