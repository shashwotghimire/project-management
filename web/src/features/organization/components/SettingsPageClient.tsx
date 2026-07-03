"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { ProjectDetailsNavbar } from "@/features/projects/components/ProjectDetailsNavbar";
import {
  useGetOrganizationById,
  useUpdateOrganization,
  useDeleteOrganization,
  useUploadOrgLogo,
} from "@/features/organization/hooks/useOrganization";
import { useGetUserProfile } from "@/features/auth/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ShieldAlert, Building2, Upload } from "lucide-react";

interface Props {
  orgId: string;
}

export function SettingsPageClient({ orgId }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: org } = useGetOrganizationById(orgId);
  const { data: user } = useGetUserProfile();
  const updateOrg = useUpdateOrganization(orgId);
  const deleteOrg = useDeleteOrganization(orgId);
  const uploadLogo = useUploadOrgLogo(orgId);
  const logoInputRef = useRef<HTMLInputElement>(null);

  const [orgName, setOrgName] = useState("");
  const [orgWebsite, setOrgWebsite] = useState("");
  const [orgDescription, setOrgDescription] = useState("");
  const [pendingLogo, setPendingLogo] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const isOrgAdmin = !!user && !!org && user.id === org.adminId;

  const handleOrgSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (pendingLogo) {
      uploadLogo.mutate(pendingLogo, {
        onSuccess: () => {
          setPendingLogo(null);
          setLogoPreview(null);
        },
      });
    }

    const data: Record<string, string> = {};
    if (orgName.trim()) data.name = orgName.trim();
    if (orgWebsite.trim()) data.websiteUrl = orgWebsite.trim();
    if (orgDescription.trim()) data.description = orgDescription.trim();
    if (Object.keys(data).length) updateOrg.mutate(data);
  };

  const handleDeleteOrg = () => {
    deleteOrg.mutate(undefined, {
      onSuccess: () => {
        queryClient.clear();
        router.push("/onboarding");
      },
    });
  };

  return (
    <div>
      <ProjectDetailsNavbar />
      <div className="max-w-2xl mx-auto px-8 py-10">
        <h1 className="text-xl font-semibold mb-1">Organization settings</h1>
        <p className="text-sm text-muted-foreground mb-8">
          Manage your organization details.
        </p>

        {!isOrgAdmin ? (
          <div className="flex items-start gap-3 rounded-lg border border-yellow-200 bg-yellow-50 px-4 py-3 text-sm text-yellow-800">
            <ShieldAlert className="size-4 mt-0.5 shrink-0" />
            <span>Only the organization admin can edit these settings.</span>
          </div>
        ) : (
          <form onSubmit={handleOrgSubmit} className="space-y-10 border border-border rounded-lg p-6">
            {/* Details section */}
            <div>
              <h2 className="text-sm font-semibold mb-1">Organization details</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Leave a field blank to keep its current value.
              </p>

              {/* Logo upload */}
              <div className="flex items-center gap-5 mb-6">
                {logoPreview || org?.logoUrl ? (
                  <img
                    src={logoPreview ?? org!.logoUrl!}
                    alt={org?.name}
                    className="size-20 rounded-lg object-cover border"
                  />
                ) : (
                  <div className="size-20 rounded-lg bg-muted flex items-center justify-center border">
                    <Building2 className="size-8 text-muted-foreground" />
                  </div>
                )}
                <div>
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
                  <Button
                    variant="outline"
                    size="sm"
                    type="button"
                    onClick={() => logoInputRef.current?.click()}
                  >
                    <Upload className="size-3.5 mr-1.5" />
                    {pendingLogo ? "Change logo" : "Upload logo"}
                  </Button>
                  <p className="text-xs text-muted-foreground mt-1.5">
                    {pendingLogo ? `Selected: ${pendingLogo.name}` : "JPG or PNG, max 10 MB."}
                  </p>
                  {uploadLogo.isError && (
                    <p className="text-xs text-red-600 mt-1">Upload failed.</p>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="org-name">Name</Label>
                  <Input
                    id="org-name"
                    placeholder={org?.name ?? "Organization name"}
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="org-website">Website URL</Label>
                  <Input
                    id="org-website"
                    placeholder={org?.websiteUrl ?? "https://example.com"}
                    value={orgWebsite}
                    onChange={(e) => setOrgWebsite(e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="org-description">Description</Label>
                  <Input
                    id="org-description"
                    placeholder={org?.description ?? "Short description"}
                    value={orgDescription}
                    onChange={(e) => setOrgDescription(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <Separator />

            <div className="flex items-center gap-4">
              <Button type="submit" disabled={updateOrg.isPending || uploadLogo.isPending}>
                {updateOrg.isPending || uploadLogo.isPending ? "Saving…" : "Save changes"}
              </Button>
              {updateOrg.isSuccess && (
                <p className="text-sm text-green-600">Organization updated.</p>
              )}
              {updateOrg.isError && (
                <p className="text-sm text-red-600">
                  Failed to update organization.
                </p>
              )}
            </div>

            <Separator />

            {/* Danger zone */}
            <div>
              <h2 className="text-sm font-semibold text-red-600 mb-1">
                Danger zone
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                Permanently delete this organization and all of its data. This
                action cannot be undone.
              </p>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="sm">
                    Delete organization
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Delete &quot;{org?.name}&quot;?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. All projects, tasks, and
                      members will be permanently removed.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDeleteOrg}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      {deleteOrg.isPending ? "Deleting…" : "Delete"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
