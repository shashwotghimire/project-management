"use client";

import { useState } from "react";
import { useGetAdminOrganizations } from "@/features/admin/hooks/useAdminOrganizations";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, Search, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";

export default function AdminOrganizationsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const limit = 10;

  const { data, isLoading, isError } = useGetAdminOrganizations(page, limit, search);

  const orgs = data?.organizations || [];
  const pagination = data?.pagination;

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-950">Organizations</h1>
          <p className="text-zinc-500 mt-1">
            Manage all organizations registered on the platform.
          </p>
        </div>
      </div>

      {/* Search controls */}
      <div className="flex items-center gap-3 bg-white p-4 rounded-xl border border-zinc-200 shadow-sm max-w-md">
        <Search className="h-4 w-4 text-zinc-400 shrink-0" />
        <Input
          type="text"
          placeholder="Search by organization name..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="border-0 shadow-none focus-visible:ring-0 p-0 h-auto"
        />
      </div>

      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
        </div>
      ) : isError ? (
        <div className="p-8 text-center text-red-600 bg-red-50 border border-red-200 rounded-xl">
          Failed to load organizations. Please try again.
        </div>
      ) : orgs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center bg-white border border-zinc-200 rounded-xl shadow-sm">
          <Building2 className="h-12 w-12 text-zinc-300 mb-4" />
          <h3 className="text-lg font-semibold text-zinc-800">No organizations found</h3>
          <p className="text-zinc-500 mt-1 max-w-sm">
            Try adjusting your search criteria or register a new tenant.
          </p>
        </div>
      ) : (
        <div className="bg-white border border-zinc-200 rounded-xl shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-zinc-50/70 hover:bg-zinc-50/70">
                <TableHead className="font-semibold text-zinc-700">Name</TableHead>
                <TableHead className="font-semibold text-zinc-700">Admin</TableHead>
                <TableHead className="font-semibold text-zinc-700 text-center">Members</TableHead>
                <TableHead className="font-semibold text-zinc-700 text-center">Projects</TableHead>
                <TableHead className="font-semibold text-zinc-700">Status</TableHead>
                <TableHead className="text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orgs.map((org) => (
                <TableRow key={org.id} className="hover:bg-zinc-50/50">
                  <TableCell className="font-medium text-zinc-900">
                    <div className="flex items-center gap-3">
                      {org.logoUrl ? (
                        <img
                          src={org.logoUrl}
                          alt={org.name}
                          className="size-8 rounded-lg object-cover border border-zinc-100"
                        />
                      ) : (
                        <div className="size-8 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-500">
                          <Building2 className="h-4 w-4" />
                        </div>
                      )}
                      <div className="flex flex-col">
                        <span>{org.name}</span>
                        {org.description && (
                          <span className="text-xs text-zinc-400 max-w-xs truncate">
                            {org.description}
                          </span>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-zinc-600">
                    {org.admin ? (
                      <div className="flex flex-col leading-tight">
                        <span className="font-medium">{org.admin.username}</span>
                        <span className="text-xs text-zinc-400">{org.admin.email}</span>
                      </div>
                    ) : (
                      <span className="text-xs text-zinc-400">No Admin</span>
                    )}
                  </TableCell>
                  <TableCell className="text-center font-semibold text-zinc-700">
                    {org.memberCount}
                  </TableCell>
                  <TableCell className="text-center font-semibold text-zinc-700">
                    {org.projectCount}
                  </TableCell>
                  <TableCell>
                    {org.blocked ? (
                      <Badge variant="destructive" className="bg-red-50 text-red-700 border-red-200 hover:bg-red-50">
                        Suspended
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-50">
                        Active
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" asChild className="hover:bg-zinc-100">
                      <Link href={`/admin/organizations/${org.id}`}>
                        Manage
                        <ArrowRight className="h-4 w-4 ml-2 text-zinc-400" />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination Controls */}
          {pagination && pagination.pages > 1 && (
            <div className="flex items-center justify-center gap-2 p-4 border-t border-zinc-150 bg-zinc-50/50">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Previous
              </Button>
              <span className="text-sm text-zinc-500">
                Page {pagination.page} of {pagination.pages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => p + 1)}
                disabled={page >= pagination.pages}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
