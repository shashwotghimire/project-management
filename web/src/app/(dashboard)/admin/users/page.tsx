"use client";

import { useState } from "react";
import { useGetAdminUsers } from "@/features/admin/hooks/useAdminUsers";
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
import { Users, Search, Loader2, Calendar } from "lucide-react";
import { format } from "date-fns";

export default function AdminUsersPage() {
  const [page, setPage] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const [search, setSearch] = useState("");
  const limit = 10;

  const { data, isLoading, isError } = useGetAdminUsers(page, limit, search);

  const users = data?.users || [];
  const pagination = data?.pagination;

  const handleSearch = () => {
    setSearch(inputValue);
    setPage(1);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-950">Users</h1>
          <p className="text-zinc-500 mt-1">
            Browse and monitor all user accounts registered on the platform.
          </p>
        </div>
      </div>

      {/* Search controls */}
      <div className="flex items-center gap-2 max-w-md">
        <div className="flex items-center gap-3 bg-white flex-1 p-4 rounded-xl border border-zinc-200 shadow-sm">
          <Search className="h-4 w-4 text-zinc-400 shrink-0" />
          <Input
            type="text"
            placeholder="Search by username or email..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="border-0 shadow-none focus-visible:ring-0 p-0 h-auto"
          />
        </div>
        <Button onClick={handleSearch} className="shrink-0">
          Search
        </Button>
      </div>

      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
        </div>
      ) : isError ? (
        <div className="p-8 text-center text-red-600 bg-red-50 border border-red-200 rounded-xl">
          Failed to load users. Please try again.
        </div>
      ) : users.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center bg-white border border-zinc-200 rounded-xl shadow-sm">
          <Users className="h-12 w-12 text-zinc-300 mb-4" />
          <h3 className="text-lg font-semibold text-zinc-800">No users found</h3>
          <p className="text-zinc-500 mt-1 max-w-sm">
            Try adjusting your search criteria.
          </p>
        </div>
      ) : (
        <div className="bg-white border border-zinc-200 rounded-xl shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-zinc-50/70 hover:bg-zinc-50/70">
                <TableHead className="font-semibold text-zinc-700 pl-6">User</TableHead>
                <TableHead className="font-semibold text-zinc-700">Email</TableHead>
                <TableHead className="font-semibold text-zinc-700">System Role</TableHead>
                <TableHead className="font-semibold text-zinc-700">Email Status</TableHead>
                <TableHead className="font-semibold text-zinc-700 text-right pr-6">Joined Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id} className="hover:bg-zinc-50/50">
                  <TableCell className="font-medium text-zinc-900 pl-6">
                    <div className="flex items-center gap-3">
                      {user.gravatarUrl?.startsWith("http") ? (
                        <img
                          src={user.gravatarUrl}
                          alt={user.username}
                          className="size-8 rounded-full object-cover border border-zinc-200"
                        />
                      ) : (
                        <div className="size-8 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center text-xs font-bold text-zinc-600">
                          {user.username.slice(0, 2).toUpperCase()}
                        </div>
                      )}
                      <span>{user.username}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-zinc-600">{user.email}</TableCell>
                  <TableCell>
                    {user.role === "superadmin" ? (
                      <Badge className="bg-red-50 text-red-700 border-red-200 hover:bg-red-50">
                        Super Admin
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="bg-zinc-100 text-zinc-700 border-zinc-200">
                        User
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {user.emailVerified ? (
                      <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                        Verified
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                        Unverified
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right text-zinc-500 pr-6 text-sm">
                    <div className="flex items-center justify-end gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-zinc-400" />
                      <span>{format(new Date(user.createdAt), "MMM d, yyyy")}</span>
                    </div>
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
