"use client";

import React, { useState } from "react";
import { useGetOrgActivityLogs } from "../hooks/useOrganization";
import { OrgActivityLog, OrgActivityAction } from "@/types/organization-api.types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const ACTION_LABELS: Record<OrgActivityAction, string> = {
  org_updated: "updated the organization",
  member_joined: "joined the organization",
  member_removed: "removed a member",
  project_created: "created a project",
  project_deleted: "deleted a project",
  member_added_to_project: "added a member to a project",
  member_removed_from_project: "removed a member from a project",
  invitation_sent: "sent an invitation",
  invitation_accepted: "accepted an invitation",
};

function actorName(actor: OrgActivityLog["actor"]) {
  return `${actor.firstName} ${actor.lastName}`.trim();
}

function Avatar({ actor }: { actor: OrgActivityLog["actor"] }) {
  const name = actorName(actor);
  const initials = name.slice(0, 2).toUpperCase();

  if (actor.profilePicture) {
    return (
      <Image
        src={actor.profilePicture}
        alt={name}
        width={32}
        height={32}
        className="size-8 rounded-full object-cover shrink-0"
      />
    );
  }

  return (
    <div className="size-8 rounded-full bg-zinc-100 flex items-center justify-center shrink-0 text-xs font-semibold text-zinc-600">
      {initials}
    </div>
  );
}

function LogEntry({ log }: { log: OrgActivityLog }) {
  const label = ACTION_LABELS[log.action] ?? log.action;

  const detail = (() => {
    if (log.project && log.targetUser) {
      return `${actorName(log.targetUser)} in ${log.project.name}`;
    }
    if (log.project) return log.project.name;
    if (log.targetUser) return actorName(log.targetUser);
    return null;
  })();

  const time = new Date(log.createdAt).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="flex items-start gap-3 py-3 border-b border-zinc-100 last:border-0">
      <Avatar actor={log.actor} />
      <div className="flex-1 min-w-0 pt-0.5">
        <p className="text-sm leading-snug">
          <span className="font-medium text-zinc-900">{actorName(log.actor)}</span>{" "}
          <span className="text-zinc-500">{label}</span>
          {detail && (
            <>
              {" "}
              <span className="text-zinc-400">·</span>{" "}
              <span className="font-medium text-zinc-700">{detail}</span>
            </>
          )}
        </p>
        <p className="text-xs text-zinc-400 mt-0.5">{time}</p>
      </div>
    </div>
  );
}

function SkeletonRow() {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-zinc-100 last:border-0 animate-pulse">
      <div className="size-8 rounded-full bg-zinc-100 shrink-0" />
      <div className="flex-1 pt-1 space-y-1.5">
        <div className="h-3.5 bg-zinc-100 rounded w-2/3" />
        <div className="h-2.5 bg-zinc-100 rounded w-1/4" />
      </div>
    </div>
  );
}

export default function OrgActivityLogs({ orgId }: { orgId: string }) {
  const [page, setPage] = useState(1);
  const limit = 15;

  const { data, isLoading, isError } = useGetOrgActivityLogs(orgId, page, limit);
  const totalPages = data ? Math.ceil(data.total / limit) : 1;

  return (
    <div>
      <h2 className="text-lg font-semibold mb-3">Activity</h2>

      <div className="rounded-lg border border-zinc-200 bg-white">
        <div className="px-4 divide-y-0">
          {isLoading && Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)}

          {isError && (
            <p className="py-6 text-sm text-destructive text-center">
              Failed to load activity logs.
            </p>
          )}

          {!isLoading && data?.logs.length === 0 && (
            <p className="py-6 text-sm text-zinc-400 text-center">
              No activity yet.
            </p>
          )}

          {data?.logs.map((log) => (
            <LogEntry key={log.id} log={log} />
          ))}
        </div>
      </div>

      {data && totalPages > 1 && (
        <div className="flex items-center justify-between mt-3 text-sm text-zinc-400">
          <span>
            Page {page} of {totalPages}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-1 rounded hover:bg-zinc-100 disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-1 rounded hover:bg-zinc-100 disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
