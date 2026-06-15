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
import { useCreateOrganization } from "../hooks/useOnboarding";
import { useRouter } from "next/navigation";

function CreateOrgModal() {
  const router = useRouter();
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [websiteUrl, setWebsiteUrl] = React.useState("");
  const { mutate, isPending, error } = useCreateOrganization();
  const handleCreateOrganization = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(
      { name, description, websiteUrl },
      {
        onSuccess: (data) => {
          setName("");
          setDescription("");
          setWebsiteUrl("");
          router.push(`/organization/${data.org.id}`);
        },
      },
    );
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-none cursor-pointer">
          + Create
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <form className="grid gap-4" onSubmit={handleCreateOrganization}>
          <DialogHeader>
            <DialogTitle>Create organization</DialogTitle>
            <DialogDescription>
              Add details of your organization here. Click create when
              you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="name-1">Name</Label>
              <Input
                id="name-1"
                placeholder="ACME Inc."
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Field>
            <Field>
              <Label>Description</Label>
              <textarea
                placeholder="Enter organization description..."
                className="border border-neutral-400 rounded-2xl p-2"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Field>
            <Field>
              <Label htmlFor="websiteUrl-1">Website URL</Label>
              <Input
                id="websiteUrl-1"
                placeholder="https://www.acme.com"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
              />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Creating..." : "Create"}
            </Button>
          </DialogFooter>
          {error && (
            <div className="text-red-500 text-sm mt-2">
              {error.message ||
                "An error occurred while creating the organization."}
            </div>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
export default CreateOrgModal;
