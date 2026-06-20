"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { useGetOrganizationById } from "@/features/organization/hooks/useOrganization";
import { useParams } from "next/navigation";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

import { CreateTaskModal } from "./CreateTaskModal";

export function ProjectNavbar() {
  const params = useParams<{ id: string }>();
  const orgId = params?.id ?? "";
  const { data: org } = useGetOrganizationById(orgId);

  return (
    <header className="h-14 flex items-center justify-between px-4 border-b bg-white">
      <div className="flex items-center gap-3">
        <SidebarTrigger className="text-muted-foreground" />
        <span className="text-sm font-semibold">{org?.name ?? ""}</span>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <Bell className="size-4" />
        </Button>
        <CreateTaskModal orgId={orgId} projectId="" />
      </div>
    </header>
  );
}
