"use client";

import { useGetProjectMembers } from "../hooks/useProject";

export default function MemberAvatars({ orgId, projectId }: { orgId: string; projectId: string }) {
  const { data: members } = useGetProjectMembers(orgId, projectId);
  if (!members?.length) return null;

  const visible = members.slice(0, 4);
  const overflow = members.length - visible.length;

  return (
    <div className="flex items-center -space-x-2">
      {visible.map((m) => (
        <img
          key={m.id}
          src={m.member.gravatarUrl}
          alt={m.member.username}
          title={m.member.username}
          className="h-6 w-6 rounded-full ring-2 ring-background object-cover"
        />
      ))}
      {overflow > 0 && (
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted ring-2 ring-background text-[10px] font-medium text-muted-foreground">
          +{overflow}
        </div>
      )}
    </div>
  );
}
