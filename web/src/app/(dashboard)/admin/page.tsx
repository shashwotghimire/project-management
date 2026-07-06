"use client";

import { useGetAdminStats } from "@/features/admin/hooks/useAdminStats";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Building2, Users, FolderKanban, CheckSquare, CalendarDays, Loader2 } from "lucide-react";
import Link from "next/link";

export default function AdminDashboardPage() {
  const { data: stats, isLoading, isError } = useGetAdminStats();

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
      </div>
    );
  }

  if (isError || !stats) {
    return (
      <div className="p-8 text-center text-red-600">
        Failed to load platform stats. Please try again.
      </div>
    );
  }

  const {
    totalOrganizations,
    totalUsers,
    totalProjects,
    totalTasks,
    tasksStatus,
    orgsLast30Days,
  } = stats;

  const todoPercent = totalTasks > 0 ? Math.round((tasksStatus.todo / totalTasks) * 100) : 0;
  const inProgressPercent = totalTasks > 0 ? Math.round((tasksStatus.in_progress / totalTasks) * 100) : 0;
  const completedPercent = totalTasks > 0 ? Math.round((tasksStatus.completed / totalTasks) * 100) : 0;

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-950">Platform Overview</h1>
        <p className="text-zinc-500 mt-1">
          Monitor organizations, projects, and activities across the platform.
        </p>
      </div>

      {/* Main Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border border-zinc-200/80 shadow-sm hover:shadow transition">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-zinc-500">Total Organizations</CardTitle>
            <Building2 className="h-4 w-4 text-zinc-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-zinc-900">{totalOrganizations}</div>
            <p className="text-xs text-zinc-500 mt-1">Active and suspended</p>
          </CardContent>
        </Card>

        <Card className="border border-zinc-200/80 shadow-sm hover:shadow transition">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-zinc-500">Total Users</CardTitle>
            <Users className="h-4 w-4 text-zinc-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-zinc-900">{totalUsers}</div>
            <p className="text-xs text-zinc-500 mt-1">Platform members</p>
          </CardContent>
        </Card>

        <Card className="border border-zinc-200/80 shadow-sm hover:shadow transition">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-zinc-500">Total Projects</CardTitle>
            <FolderKanban className="h-4 w-4 text-zinc-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-zinc-900">{totalProjects}</div>
            <p className="text-xs text-zinc-500 mt-1">Across all organizations</p>
          </CardContent>
        </Card>

        <Card className="border border-zinc-200/80 shadow-sm hover:shadow transition">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-zinc-500">New Orgs (30d)</CardTitle>
            <CalendarDays className="h-4 w-4 text-zinc-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-zinc-900">{orgsLast30Days}</div>
            <p className="text-xs text-zinc-500 mt-1">Created in last 30 days</p>
          </CardContent>
        </Card>
      </div>

      {/* Task Breakdown Section */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border border-zinc-200/80 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg text-zinc-900 flex items-center gap-2">
              <CheckSquare className="h-5 w-5 text-zinc-500" />
              Task Status Breakdown
            </CardTitle>
            <CardDescription>
              Total of {totalTasks} tasks created across the platform.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Status bars */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-zinc-600">To Do</span>
                <span className="text-zinc-500">{tasksStatus.todo} tasks ({todoPercent}%)</span>
              </div>
              <div className="h-2 w-full bg-zinc-100 rounded-full overflow-hidden">
                <div className="h-full bg-zinc-400 rounded-full" style={{ width: `${todoPercent}%` }} />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-zinc-600">In Progress</span>
                <span className="text-zinc-500">{tasksStatus.in_progress} tasks ({inProgressPercent}%)</span>
              </div>
              <div className="h-2 w-full bg-zinc-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: `${inProgressPercent}%` }} />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-zinc-600">Completed</span>
                <span className="text-zinc-500">{tasksStatus.completed} tasks ({completedPercent}%)</span>
              </div>
              <div className="h-2 w-full bg-zinc-100 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: `${completedPercent}%` }} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-zinc-200/80 shadow-sm flex flex-col justify-between">
          <CardHeader>
            <CardTitle className="text-lg text-zinc-900">Quick Operations</CardTitle>
            <CardDescription>Direct shortcuts to administration modules.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-6 flex-1 items-center">
            <Link
              href="/admin/organizations"
              className="flex flex-col items-center justify-center p-6 border border-zinc-200 rounded-xl hover:bg-zinc-50 transition text-center group"
            >
              <Building2 className="h-8 w-8 text-zinc-500 group-hover:text-zinc-900 transition mb-3" />
              <span className="font-semibold text-zinc-800">Organizations</span>
              <span className="text-xs text-zinc-400 mt-1">Suspend/unsuspend orgs</span>
            </Link>

            <Link
              href="/admin/users"
              className="flex flex-col items-center justify-center p-6 border border-zinc-200 rounded-xl hover:bg-zinc-50 transition text-center group"
            >
              <Users className="h-8 w-8 text-zinc-500 group-hover:text-zinc-900 transition mb-3" />
              <span className="font-semibold text-zinc-800">Users</span>
              <span className="text-xs text-zinc-400 mt-1">View user accounts</span>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
