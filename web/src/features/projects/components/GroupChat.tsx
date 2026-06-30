"use client";

import { useState } from "react";
import ChannelsSidebar from "@/features/channels/components/ChannelsSidebar";
import ChannelView from "@/features/channels/components/ChannelView";

interface GroupChatProps {
  orgId: string;
  projectId: string;
}

export default function GroupChat({ orgId, projectId }: GroupChatProps) {
  const [activeChannelId, setActiveChannelId] = useState<string | null>(null);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-full min-h-0 overflow-hidden rounded-lg border">
      <ChannelsSidebar
        orgId={orgId}
        projectId={projectId}
        activeChannelId={activeChannelId}
        onSelectChannel={setActiveChannelId}
        collapsed={collapsed}
        onToggle={() => setCollapsed((c) => !c)}
      />
      <div className="flex flex-1 flex-col overflow-hidden">
        {activeChannelId ? (
          <ChannelView orgId={orgId} projectId={projectId} channelId={activeChannelId} />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            Select a channel to start chatting
          </div>
        )}
      </div>
    </div>
  );
}
