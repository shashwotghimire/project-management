"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Project, ProjectStatus } from "@/types/project-api.types";
import { useUpdateProject } from "../hooks/useProject";

interface EditProjectDialogProps {
  open: boolean;
  onOpenChange: (val: boolean) => void;
  orgId: string;
  project: Project;
}

export default function EditProjectDialog({
  open,
  onOpenChange,
  orgId,
  project,
}: EditProjectDialogProps) {
  const [name, setName] = useState(project.name);
  const [logoUrl, setLogoUrl] = useState(project.logoUrl ?? "");
  const [status, setStatus] = useState<ProjectStatus>(project.status);
  const [error, setError] = useState<string | null>(null);

  const { mutate: updateProject, isPending } = useUpdateProject(orgId, project.id);

  useEffect(() => {
    if (open) {
      setName(project.name);
      setLogoUrl(project.logoUrl ?? "");
      setStatus(project.status);
      setError(null);
    }
  }, [open, project]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    updateProject(
      {
        name: name.trim(),
        logoUrl: logoUrl.trim() || null,
        status,
      },
      {
        onSuccess: () => onOpenChange(false),
        onError: () => setError("Failed to update project. Please try again."),
      },
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit project</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <Label htmlFor="project-name">Name</Label>
            <Input
              id="project-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="project-logo">Logo URL</Label>
            <Input
              id="project-logo"
              type="url"
              placeholder="https://..."
              value={logoUrl}
              onChange={(e) => setLogoUrl(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="project-status">Status</Label>
            <Select value={status} onValueChange={(v) => setStatus(v as ProjectStatus)}>
              <SelectTrigger id="project-status">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}
          <div className="flex justify-end gap-2 border-t pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving…" : "Save changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
