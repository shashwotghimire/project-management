"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateChannel } from "../hooks/useChannels";

interface CreateChannelDialogProps {
  open: boolean;
  onOpenChange: (val: boolean) => void;
  orgId: string;
  projectId: string;
}

export default function CreateChannelDialog({
  open,
  onOpenChange,
  orgId,
  projectId,
}: CreateChannelDialogProps) {
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);

  const { mutate: createChannel, isPending } = useCreateChannel(orgId, projectId);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    createChannel(
      { orgId, projectId, name: name.trim() },
      {
        onSuccess: () => {
          setName("");
          onOpenChange(false);
        },
        onError: (err) => setError(err.message),
      },
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Create channel</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="channel-name">Name</Label>
            <Input
              id="channel-name"
              placeholder="e.g. general"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending || !name.trim()}>
              {isPending ? "Creating…" : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
