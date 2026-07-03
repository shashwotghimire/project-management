import { Message } from "@/types/message-api.types";
import { cn } from "@/lib/utils";
interface ChatBubbleProps {
  message: Message;
  isOwn: boolean;
}

export default function ChatBubble({ message, isOwn }: ChatBubbleProps) {
  const time = new Date(message.createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const initials = message.sender.username.slice(0, 2).toUpperCase();

  return (
    <div className={cn("flex min-w-0 items-end gap-2", isOwn && "flex-row-reverse")}>
      {message.sender.gravatarUrl?.startsWith("http") ? (
        <img
          src={message.sender.gravatarUrl}
          alt={message.sender.username}
          className="size-7 shrink-0 rounded-full object-cover"
        />
      ) : (
        <div className="size-7 shrink-0 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
          {initials}
        </div>
      )}

      <div className={cn("flex min-w-0 flex-col gap-0.5", isOwn && "items-end")}>
        <div className={cn("flex items-baseline gap-2", isOwn && "flex-row-reverse")}>
          <span className="text-sm font-medium">{message.sender.username}</span>
          <span className="text-xs text-muted-foreground">{time}</span>
        </div>
        <div
          className={cn(
            "max-w-[75%] break-words rounded-2xl px-3 py-2 text-sm",
            isOwn
              ? "rounded-tr-sm bg-primary text-primary-foreground"
              : "rounded-tl-sm bg-muted",
          )}
        >
          {message.content}
        </div>
      </div>
    </div>
  );
}
