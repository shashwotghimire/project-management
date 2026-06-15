"use client";
import React from "react";
import { useGetOrganizationById } from "../hooks/useOrganization";

function OrganizationDashboard({ organizationId }: { organizationId: string }) {
  const {
    data: organization,
    isLoading,
    error,
  } = useGetOrganizationById(organizationId);
  return <div>OrganizationDashboard</div>;
}

export default OrganizationDashboard;
