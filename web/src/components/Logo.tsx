import React from "react";
import Link from "next/link";

function Logo() {
  return (
    <Link href="/onboarding">
      <h1 className="text-xl font-bold">TeamWork</h1>
    </Link>
  );
}

export default Logo;
