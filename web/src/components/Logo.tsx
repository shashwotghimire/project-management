import React from "react";
import Link from "next/link";

function Logo() {
  return (
    <Link href="/onboarding" className="flex items-center gap-2">
      <div className="w-6 h-6 bg-foreground rounded-sm flex items-center justify-center shrink-0">
        <div className="w-3 h-3 bg-background rotate-45" />
      </div>
      <h1 className="text-xl font-bold">TeamWork</h1>
    </Link>
  );
}

export default Logo;
