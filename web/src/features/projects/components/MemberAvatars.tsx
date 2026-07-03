"use client";

import { useGetProjectMembers } from "../hooks/useProject";

export default function MemberAvatars({ orgId, projectId }: { orgId: string; projectId: string }) {
  const { data: members } = useGetProjectMembers(orgId, projectId);
  if (!members?.length) return null;

  const visible = members.slice(0, 4);
  const overflow = members.length - visible.length;

  return (
    <div className="flex items-center -space-x-2">
      {visible.map((m) =>
        m.member.gravatarUrl?.startsWith("http") ? (
          <img
            key={m.id}
            src={m.member.gravatarUrl}
            alt={m.member.username}
            title={m.member.username}
            className="h-6 w-6 rounded-full ring-2 ring-background object-cover"
          />
        ) : (
          <div
            key={m.id}
            title={m.member.username}
            className="h-6 w-6 rounded-full ring-2 ring-background bg-muted flex items-center justify-center text-[10px] font-medium text-muted-foreground"
          >
            {m.member.username.slice(0, 2).toUpperCase()}
          </div>
        ),
      )}
      {overflow > 0 && (
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted ring-2 ring-background text-[10px] font-medium text-muted-foreground">
          +{overflow}
        </div>
      )}
    </div>
  );
}
