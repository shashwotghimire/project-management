"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useGetChannelById } from "../hooks/useChannels";

interface ChannelViewProps {
  orgId: string;
  projectId: string;
  channelId: string;
}

export default function ChannelView({ orgId, projectId, channelId }: ChannelViewProps) {
  const [message, setMessage] = useState("");
  const { data: channel } = useGetChannelById(orgId, projectId, channelId);

  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim()) return;
    // socket sendMessage will be wired here
    setMessage("");
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-10 shrink-0 items-center border-b px-4">
        <span className="text-sm font-medium"># {channel?.name ?? "…"}</span>
      </div>

      <div className="flex-1 overflow-y-auto p-4" />

      <div className="shrink-0 p-4">
        <form
          onSubmit={handleSend}
          className="flex items-center gap-2 rounded-lg border bg-background px-3 py-2"
        >
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={`Message #${channel?.name ?? "channel"}`}
            className="border-0 p-0 shadow-none focus-visible:ring-0"
          />
          <Button
            type="submit"
            size="icon"
            variant="ghost"
            disabled={!message.trim()}
            className="size-7 shrink-0"
          >
            <Send className="size-3.5" />
          </Button>
        </form>
      </div>
    </div>
  );
}
