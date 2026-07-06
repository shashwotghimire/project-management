"use client";

import { use, useState } from "react";
import {
  useGetAdminOrganizationDetail,
  useBlockOrganization,
  useUnblockOrganization,
} from "@/features/admin/hooks/useAdminOrganizations";
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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Building2,
  Users,
  FolderKanban,
  UserCheck,
  ShieldAlert,
  ArrowLeft,
  Loader2,
  Lock,
  Unlock,
} from "lucide-react";
import Link from "next/link";

interface PageProps {
  params: Promise<{ orgId: string }>;
}

export default function AdminOrganizationDetailPage({ params }: PageProps) {
  const { orgId } = use(params);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const { data: org, isLoading, isError } = useGetAdminOrganizationDetail(orgId);
  const blockMutation = useBlockOrganization(orgId);
  const unblockMutation = useUnblockOrganization(orgId);

  const handleBlock = async () => {
    try {
      await blockMutation.mutateAsync();
      setStatusMsg({ type: "success", text: "Organization suspended successfully" });
    } catch {
      setStatusMsg({ type: "error", text: "Failed to suspend organization" });
    }
  };

  const handleUnblock = async () => {
    try {
      await unblockMutation.mutateAsync();
      setStatusMsg({ type: "success", text: "Organization reactivated successfully" });
    } catch {
      setStatusMsg({ type: "error", text: "Failed to reactivate organization" });
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
      </div>
    );
  }

  if (isError || !org) {
    return (
      <div className="p-8 max-w-6xl mx-auto space-y-4">
        <Link href="/admin/organizations" className="flex items-center gap-2 text-zinc-500 hover:text-zinc-900 transition">
          <ArrowLeft className="h-4 w-4" /> Back to Organizations
        </Link>
        <div className="p-8 text-center text-red-600 bg-red-50 border border-red-200 rounded-xl">
          Failed to load organization details. Please try again.
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      {statusMsg && (
        <div
          className={`px-4 py-3 rounded-lg text-sm font-medium ${
            statusMsg.type === "success"
              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {statusMsg.text}
        </div>
      )}
      {/* Header */}
      <div className="space-y-4">
        <Link
          href="/admin/organizations"
          className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 transition"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Organizations
        </Link>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            {org.logoUrl ? (
              <img
                src={org.logoUrl}
                alt={org.name}
                className="size-16 rounded-xl object-cover border border-zinc-200"
              />
            ) : (
              <div className="size-16 rounded-xl bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-500 shrink-0">
                <Building2 className="h-8 w-8" />
              </div>
            )}
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold tracking-tight text-zinc-950">{org.name}</h1>
                {org.blocked ? (
                  <Badge variant="destructive" className="bg-red-50 text-red-700 border-red-200">
                    Suspended
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                    Active
                  </Badge>
                )}
              </div>
              <p className="text-zinc-500 max-w-2xl">{org.description || "No description provided."}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {org.blocked ? (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800">
                    <Unlock className="h-4 w-4 mr-2" />
                    Reactivate
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Reactivate Organization?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to unsuspend <strong>{org.name}</strong>?
                      This will restore platform access for all members immediately.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleUnblock} className="bg-emerald-600 hover:bg-emerald-700 text-white">
                      Reactivate
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            ) : (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="bg-red-50 text-red-700 border-red-200 hover:bg-red-100 hover:text-red-800">
                    <Lock className="h-4 w-4 mr-2" />
                    Suspend
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Suspend Organization?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to suspend <strong>{org.name}</strong>?
                      Members of this organization will be blocked from viewing projects, tasks, or chatting.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleBlock} className="bg-red-600 hover:bg-red-700 text-white">
                      Suspend
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </div>
      </div>

      {/* Meta grid */}
      <div className="grid gap-6 sm:grid-cols-3">
        <Card className="border border-zinc-200/80 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-zinc-500">Admin Owner</CardTitle>
            <UserCheck className="h-4 w-4 text-zinc-400" />
          </CardHeader>
          <CardContent>
            {org.admin ? (
              <div className="space-y-1">
                <div className="font-semibold text-zinc-900">{org.admin.username}</div>
                <div className="text-xs text-zinc-500">{org.admin.email}</div>
              </div>
            ) : (
              <span className="text-zinc-500 text-sm">No admin assigned</span>
            )}
          </CardContent>
        </Card>

        <Card className="border border-zinc-200/80 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-zinc-500">Total Members</CardTitle>
            <Users className="h-4 w-4 text-zinc-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-zinc-900">{org.memberCount}</div>
          </CardContent>
        </Card>

        <Card className="border border-zinc-200/80 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-zinc-500">Total Projects</CardTitle>
            <FolderKanban className="h-4 w-4 text-zinc-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-zinc-900">{org.projectCount}</div>
          </CardContent>
        </Card>
      </div>

      {/* Member list section */}
      <Card className="border border-zinc-200/80 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg text-zinc-900">Organization Members</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-zinc-50/70 hover:bg-zinc-50/70">
                <TableHead className="font-semibold text-zinc-700 pl-6">Username</TableHead>
                <TableHead className="font-semibold text-zinc-700">Email</TableHead>
                <TableHead className="font-semibold text-zinc-700">Organization Role</TableHead>
                <TableHead className="font-semibold text-zinc-700">System Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {org.members.map((member) => (
                <TableRow key={member.User.id} className="hover:bg-zinc-50/50">
                  <TableCell className="font-medium text-zinc-900 pl-6">
                    <div className="flex items-center gap-3">
                      {member.User.gravatarUrl ? (
                        <img
                          src={member.User.gravatarUrl}
                          alt={member.User.username}
                          className="size-8 rounded-full object-cover"
                        />
                      ) : (
                        <div className="size-8 rounded-full bg-zinc-100 flex items-center justify-center text-xs font-bold text-zinc-500 border border-zinc-200">
                          {member.User.username.slice(0, 2).toUpperCase()}
                        </div>
                      )}
                      <span>{member.User.username}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-zinc-600">{member.User.email}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`text-xs capitalize ${
                        member.userRoleInOrg === "org admin"
                          ? "bg-indigo-50 text-indigo-700 border-indigo-200"
                          : "bg-zinc-50 text-zinc-700 border-zinc-200"
                      }`}
                    >
                      {member.userRoleInOrg}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-zinc-500 capitalize text-sm">{member.User.role}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
