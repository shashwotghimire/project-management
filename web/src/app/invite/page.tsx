import { InviteAcceptance } from "@/features/members/components/InviteAcceptance";
import { Suspense } from "react";

export default function InvitePage() {
  return (
    <Suspense>
      <InviteAcceptance />
    </Suspense>
  );
}
