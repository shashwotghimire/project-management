"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup } from "@/components/ui/field";
import { useCreateProject } from "../hooks/useProject";

export function CreateTaskModal({
  orgId,
  projectId,
}: {
  orgId: string;
  projectId: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const { mutate: createProject, isPending, error } = useCreateProject(orgId);

  const handleCreateProject = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createProject(
      { name },
      {
        onSuccess: () => {
          setName("");
          setOpen(false);
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className=" cursor-pointer">+ Create</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <form className="grid gap-4" onSubmit={handleCreateProject}>
          <DialogHeader>
            <DialogTitle>Create project</DialogTitle>
            <DialogDescription>
              Add details of your project here. Click create when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="project-name">Name</Label>
              <Input
                id="project-name"
                placeholder="My Project"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                minLength={3}
              />
            </Field>
          </FieldGroup>
          {error && (
            <p className="text-red-500 text-sm">
              {(error as Error).message ||
                "An error occurred while creating the project."}
            </p>
          )}
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline" disabled={isPending}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isPending || name.length < 3}>
              {isPending ? "Creating..." : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
