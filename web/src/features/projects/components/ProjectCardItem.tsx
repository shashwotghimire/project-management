import { Project } from "@/types/project-api.types";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FolderOpen } from "lucide-react";
import ProjectStatusBadge from "./ProjectStatusBadge";
import MemberAvatars from "./MemberAvatars";
import Image from "next/image";

export default function ProjectCardItem({ project }: { project: Project }) {
  const initials = project.name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");

  const createdDate = new Date(project.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Card className="hover:ring-primary/30 cursor-pointer transition-shadow hover:shadow-md rounded-none">
      <CardHeader>
        <div className="flex items-start gap-3">
          {project.logoUrl?.startsWith("http") ? (
            <Image
              src={project.logoUrl}
              alt={project.name}
              width={40}
              height={40}
              className="h-10 w-10 rounded-lg object-cover ring-1 ring-foreground/10"
            />
          ) : (
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm font-semibold text-primary">
              {initials || <FolderOpen className="h-5 w-5" />}
            </div>
          )}
          <div className="min-w-0 flex-1">
            <CardTitle className="truncate">{project.name}</CardTitle>
            <CardDescription className="mt-0.5">
              Created {createdDate}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardFooter className="flex items-center justify-between">
        <ProjectStatusBadge status={project.status} />
        <MemberAvatars orgId={project.organizationId} projectId={project.id} />
      </CardFooter>
    </Card>
  );
}
