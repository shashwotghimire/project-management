"use client";

import { useEffect, useRef, useState } from "react";
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
import { useUpdateProject, useUploadProjectLogo } from "../hooks/useProject";
import { Upload } from "lucide-react";

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
  const [status, setStatus] = useState<ProjectStatus>(project.status);
  const [error, setError] = useState<string | null>(null);
  const [pendingLogo, setPendingLogo] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  const { mutate: updateProject, isPending } = useUpdateProject(orgId, project.id);
  const { mutate: uploadLogo, isPending: isUploadingLogo } = useUploadProjectLogo(orgId, project.id);

  useEffect(() => {
    if (open) {
      setName(project.name);
      setStatus(project.status);
      setError(null);
      setPendingLogo(null);
      setLogoPreview(null);
    }
  }, [open, project]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (pendingLogo) {
      uploadLogo(pendingLogo, {
        onError: () => setError("Failed to upload logo. Please try again."),
      });
    }

    updateProject(
      { name: name.trim(), status },
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
            <Label>Logo</Label>
            <div className="flex items-center gap-3">
              {(logoPreview || project.logoUrl) && (
                <img
                  src={logoPreview ?? project.logoUrl!}
                  alt={project.name}
                  className="size-10 rounded object-cover border"
                />
              )}
              <input
                ref={logoInputRef}
                type="file"
                accept=".jpg,.jpeg,.png"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  setPendingLogo(file);
                  setLogoPreview(URL.createObjectURL(file));
                  e.target.value = "";
                }}
              />
              <div>
                <Button
                  variant="outline"
                  size="sm"
                  type="button"
                  onClick={() => logoInputRef.current?.click()}
                >
                  <Upload className="size-3.5 mr-1.5" />
                  {pendingLogo ? "Change logo" : "Upload logo"}
                </Button>
                {pendingLogo && (
                  <p className="text-xs text-muted-foreground mt-1">{pendingLogo.name}</p>
                )}
              </div>
            </div>
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
            <Button type="submit" disabled={isPending || isUploadingLogo}>
              {isPending || isUploadingLogo ? "Saving…" : "Save changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
