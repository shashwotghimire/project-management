import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SpinnerProps {
  className?: string;
  fullPage?: boolean;
}

export function Spinner({ className, fullPage }: SpinnerProps) {
  if (fullPage) {
    return (
      <div className="flex h-full min-h-[200px] w-full items-center justify-center">
        <Loader2 className={cn("size-6 animate-spin text-muted-foreground", className)} />
      </div>
    );
  }
  return <Loader2 className={cn("size-6 animate-spin text-muted-foreground", className)} />;
}
