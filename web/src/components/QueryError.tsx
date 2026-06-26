import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface QueryErrorProps {
  message?: string;
  className?: string;
}

export function QueryError({ message = "Something went wrong. Please try again.", className }: QueryErrorProps) {
  return (
    <div className={cn("flex items-center gap-2 p-4 text-sm text-destructive", className)}>
      <AlertCircle className="size-4 shrink-0" />
      <span>{message}</span>
    </div>
  );
}
