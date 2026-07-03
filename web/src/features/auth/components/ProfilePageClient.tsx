"use client";

import { useState } from "react";
import { useGetUserProfile, useUpdateUserProfile } from "@/features/auth/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import OnboardingNav from "@/features/onboarding/components/OnboardingNav";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function ProfilePageClient() {
  const { data: user } = useGetUserProfile();
  const updateProfile = useUpdateUserProfile();

  const [username, setUsername] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordMismatch =
    newPassword && confirmPassword && newPassword !== confirmPassword;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordMismatch) return;

    const data: Record<string, string> = {};
    if (username.trim()) data.username = username.trim();
    if (newPassword) {
      data.currentPassword = currentPassword;
      data.newPassword = newPassword;
    }
    if (!Object.keys(data).length) return;

    updateProfile.mutate(data, {
      onSuccess: () => {
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setUsername("");
      },
    });
  };

  return (
    <>
      <OnboardingNav />
      <div className="max-w-4xl mx-auto px-8 py-10">
        <Link
          href="/onboarding"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="size-3.5" />
          Back to organizations
        </Link>
        <h1 className="text-xl font-semibold mb-1">Profile</h1>
        <p className="text-sm text-muted-foreground mb-8">
          Manage your account details.
        </p>

        <form onSubmit={handleSubmit} className="space-y-10 border border-border rounded-lg p-6">
          {/* Avatar section */}
          <div>
            <h2 className="text-sm font-semibold mb-4">Profile picture</h2>
            <div className="flex items-center gap-5">
              {user?.gravatarUrl ? (
                <img
                  src={user.gravatarUrl}
                  alt={user.username}
                  className="size-20 rounded-full object-cover"
                />
              ) : (
                <div className="size-20 rounded-full bg-muted flex items-center justify-center text-xl font-bold">
                  {user?.username?.slice(0, 2).toUpperCase() ?? "?"}
                </div>
              )}
              <div>
                <Button variant="outline" size="sm" disabled type="button">
                  Upload photo
                </Button>
                <p className="text-xs text-muted-foreground mt-1.5">
                  Photo upload coming soon.
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Username section */}
          <div>
            <h2 className="text-sm font-semibold mb-4">Account info</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder={user?.username ?? "Username"}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label>Email</Label>
                <Input value={user?.email ?? ""} disabled />
              </div>
            </div>
          </div>

          <Separator />

          {/* Password section */}
          <div>
            <h2 className="text-sm font-semibold mb-4">Change password</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5 col-span-2">
                <Label htmlFor="current-password">Current password</Label>
                <Input
                  id="current-password"
                  type="password"
                  placeholder="Enter current password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="max-w-[calc(50%-0.5rem)]"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="new-password">New password</Label>
                <Input
                  id="new-password"
                  type="password"
                  placeholder="Min. 6 characters"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="confirm-password">Confirm new password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {passwordMismatch && (
                  <p className="text-xs text-red-600">Passwords do not match.</p>
                )}
              </div>
            </div>
          </div>

          <Separator />

          <div className="flex items-center gap-4">
            <Button
              type="submit"
              disabled={updateProfile.isPending || !!passwordMismatch}
            >
              {updateProfile.isPending ? "Saving…" : "Save changes"}
            </Button>
            {updateProfile.isSuccess && (
              <p className="text-sm text-green-600">Profile updated.</p>
            )}
            {updateProfile.isError && (
              <p className="text-sm text-red-600">
                Failed to update. Check your current password.
              </p>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
