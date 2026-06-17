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
    <div>
      OrganizationDashboard
      <div>hello</div>
      <ProjectsCard orgId={organizationId} />
    </div>
  );
}

export default OrganizationDashboard;
