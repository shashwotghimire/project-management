"use client";

import { useEffect, useRef, useState } from "react";
import { AlertCircle, RefreshCw, Send, WifiOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useGetChannelById } from "../hooks/useChannels";
import { useGetMessages } from "@/features/messages/hooks/useMessages";
import { connectSocket } from "@/lib/socket";
import { Message } from "@/types/message-api.types";
import { useGetUserProfile } from "@/features/auth/hooks/useAuth";
import ChatBubble from "./ChatBubble";

interface ChannelViewProps {
  orgId: string;
  projectId: string;
  channelId: string;
}

export default function ChannelView({ orgId, projectId, channelId }: ChannelViewProps) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [sendError, setSendError] = useState<string | null>(null);
  const [disconnected, setDisconnected] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { data: channel } = useGetChannelById(orgId, projectId, channelId);
  const { data: history, isLoading: historyLoading, isError: historyError, refetch } = useGetMessages(orgId, projectId, channelId);
  const { data: profile } = useGetUserProfile();

  useEffect(() => {
    if (history) setMessages(history);
  }, [history]);

  useEffect(() => {
    const socket = connectSocket();
    socket.emit("joinChannel", channelId);

    const handleNewMessage = (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
    };

    const handleSendError = (msg: string) => {
      setSendError(msg);
      setTimeout(() => setSendError(null), 4000);
    };

    const handleDisconnect = () => setDisconnected(true);
    const handleConnect = () => {
      setDisconnected(false);
      socket.emit("joinChannel", channelId);
    };

    socket.on("newMessage", handleNewMessage);
    socket.on("sendError", handleSendError);
    socket.on("disconnect", handleDisconnect);
    socket.on("connect", handleConnect);

    return () => {
      socket.emit("leaveChannel", channelId);
      socket.off("newMessage", handleNewMessage);
      socket.off("sendError", handleSendError);
      socket.off("disconnect", handleDisconnect);
      socket.off("connect", handleConnect);
    };
  }, [channelId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    const socket = connectSocket();
    socket.emit("sendMessage", channelId, input.trim());
    setInput("");
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-10 shrink-0 items-center border-b px-4">
        <span className="text-sm font-medium"># {channel?.name ?? "…"}</span>
      </div>

      {disconnected && (
        <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 text-xs text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400">
          <WifiOff className="size-3.5 shrink-0" />
          Reconnecting…
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {historyLoading && (
          <div className="flex flex-1 items-center justify-center py-12 text-sm text-muted-foreground">
            Loading messages…
          </div>
        )}

        {historyError && !historyLoading && (
          <div className="flex flex-col items-center justify-center gap-3 py-12 text-sm text-muted-foreground">
            <AlertCircle className="size-5 text-red-500" />
            <span>Failed to load messages.</span>
            <Button variant="outline" size="sm" onClick={() => refetch()} className="gap-1.5">
              <RefreshCw className="size-3.5" />
              Retry
            </Button>
          </div>
        )}

        {!historyLoading && !historyError && messages.map((msg) => (
          <ChatBubble
            key={msg.id}
            message={msg}
            isOwn={msg.senderId === profile?.id}
          />
        ))}
        <div ref={bottomRef} />
      </div>

      {sendError && (
        <div className="flex items-center gap-2 bg-red-50 px-4 py-2 text-xs text-red-600 dark:bg-red-950 dark:text-red-400">
          <AlertCircle className="size-3.5 shrink-0" />
          {sendError}
        </div>
      )}

      <div className="shrink-0 p-4">
        <form
          onSubmit={handleSend}
          className="flex items-center gap-2 rounded-lg border bg-background px-3 py-2"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Message #${channel?.name ?? "channel"}`}
            className="border-0 p-0 shadow-none focus-visible:ring-0"
            disabled={disconnected}
          />
          <Button
            type="submit"
            size="icon"
            variant="ghost"
            disabled={!input.trim() || disconnected}
            className="size-7 shrink-0"
          >
            <Send className="size-3.5" />
          </Button>
        </form>
      </div>
    </div>
  );
}
