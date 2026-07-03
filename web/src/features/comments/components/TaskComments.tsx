"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, ChevronLeft, ChevronRight, Send, User } from "lucide-react";
import Image from "next/image";
import { useGetTaskComments, useCreateComment } from "../hooks/useComments";
import { cn } from "@/lib/utils";

export default function TaskComments({
  orgId,
  projectId,
  taskId,
}: {
  orgId: string;
  projectId: string;
  taskId: string;
}) {
  const [page, setPage] = useState(1);
  const limit = 20;

  const { data, isPending } = useGetTaskComments(orgId, projectId, taskId, page, limit);
  const { mutate: createComment, isPending: isSubmitting } = useCreateComment(
    orgId,
    projectId,
    taskId,
    page,
  );

  const [draft, setDraft] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const comments = data?.comments ?? [];
  const totalPages = data?.totalPages ?? 1;

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [draft]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const content = draft.trim();
    if (!content || isSubmitting) return;
    createComment(content, {
      onSuccess: () => {
        setDraft("");
        setPage(1);
      },
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent);
    }
  };

  return (
    <div className="border-t flex flex-col min-h-0 flex-1">
      {/* Header */}
      <div className="px-8 py-4 flex items-center justify-between gap-2 border-b shrink-0">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-semibold">Comments</span>
          {data && (
            <span className="text-xs text-muted-foreground">({data.total})</span>
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="cursor-pointer flex h-6 w-6 items-center justify-center rounded hover:bg-accent disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </button>
            <span className="text-xs text-muted-foreground tabular-nums">
              {page} / {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="cursor-pointer flex h-6 w-6 items-center justify-center rounded hover:bg-accent disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Comments list — scrollable */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden px-8 py-4 space-y-5 min-h-0">
        {isPending ? (
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="flex gap-3 animate-pulse">
                <div className="h-8 w-8 rounded-full bg-muted shrink-0" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-3 w-24 rounded bg-muted" />
                  <div className="h-3 w-full rounded bg-muted" />
                  <div className="h-3 w-3/4 rounded bg-muted" />
                </div>
              </div>
            ))}
          </div>
        ) : comments.length === 0 ? (
          <div className="flex items-center justify-center py-8">
            <p className="text-xs text-muted-foreground">No comments yet</p>
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="flex gap-3">
              {comment.author?.gravatarUrl?.startsWith("http") ? (
                <Image
                  src={comment.author.gravatarUrl}
                  alt={comment.author.username}
                  width={32}
                  height={32}
                  className="rounded-full shrink-0 mt-0.5"
                />
              ) : (
                <div className="flex h-8 w-8 shrink-0 mt-0.5 items-center justify-center rounded-full bg-muted">
                  <User className="h-4 w-4 text-muted-foreground" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2 mb-0.5">
                  <span className="text-xs font-semibold truncate">
                    {comment.author?.username ?? "Unknown"}
                  </span>
                  <span className="text-xs text-muted-foreground shrink-0">
                    {new Date(comment.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <p className="text-sm leading-relaxed whitespace-pre-wrap break-all">
                  {comment.content}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Input */}
      <div className="shrink-0 border-t px-8 py-4">
        <form onSubmit={handleSubmit}>
          <div className="flex items-end gap-2">
            <textarea
              ref={textareaRef}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Add a comment… (Enter to send, Shift+Enter for newline)"
              rows={1}
              maxLength={115}
              className={cn(
                "flex-1 min-w-0 resize-none overflow-hidden bg-muted rounded-lg px-3 py-2 text-sm outline-none",
                "focus:ring-1 focus:ring-primary placeholder:text-muted-foreground",
                "max-h-40 overflow-y-auto",
              )}
            />
            <button
              type="submit"
              disabled={!draft.trim() || isSubmitting}
              className="cursor-pointer flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
          <div className="flex justify-end mt-1">
            <span className={cn("text-xs", draft.length >= 115 ? "text-destructive font-medium" : "text-muted-foreground")}>
              {draft.length}/115
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
