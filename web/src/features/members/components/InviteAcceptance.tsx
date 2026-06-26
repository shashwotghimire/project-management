"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Loader2, Building2 } from "lucide-react";
import {
  acceptInvitationService,
  declineInvitationService,
  getInvitationDetailsService,
  InvitationDetails,
} from "@/services/invitation.service";

type ActionState = "idle" | "accepting" | "declining" | "accepted" | "declined" | "error";

export function InviteAcceptance() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [details, setDetails] = useState<InvitationDetails | null>(null);
  const [loadingDetails, setLoadingDetails] = useState(true);
  const [detailsError, setDetailsError] = useState("");
  const [actionState, setActionState] = useState<ActionState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [acceptedOrgId, setAcceptedOrgId] = useState("");

  useEffect(() => {
    if (!token) return;
    const accessToken =
      typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
    if (!accessToken) {
      router.replace(`/login?redirect=/invite?token=${token}`);
      return;
    }
    getInvitationDetailsService(token)
      .then(setDetails)
      .catch((e) => {
        const msg =
          e?.response?.data?.message ?? "Could not load invitation details.";
        setDetailsError(msg);
      })
      .finally(() => setLoadingDetails(false));
  }, [token, router]);

  if (!token) {
    return <ErrorScreen message="This link is missing a token. Please check your email and try again." />;
  }

  if (loadingDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (detailsError) {
    return <ErrorScreen message={detailsError} />;
  }

  if (actionState === "accepted") {
    return (
      <CenteredCard>
        <CheckCircle className="mx-auto size-12 text-green-500" />
        <h1 className="text-xl font-semibold">You're in!</h1>
        <p className="text-muted-foreground text-sm">
          You've successfully joined <strong>{details?.organization.name}</strong>.
        </p>
        <Button onClick={() => router.push(`/organization/${acceptedOrgId}`)}>
          Go to organization
        </Button>
      </CenteredCard>
    );
  }

  if (actionState === "declined") {
    return (
      <CenteredCard>
        <XCircle className="mx-auto size-12 text-muted-foreground" />
        <h1 className="text-xl font-semibold">Invitation declined</h1>
        <p className="text-muted-foreground text-sm">
          You've declined the invitation to join{" "}
          <strong>{details?.organization.name}</strong>. You can close this tab.
        </p>
      </CenteredCard>
    );
  }

  if (actionState === "error") {
    return (
      <CenteredCard>
        <XCircle className="mx-auto size-12 text-destructive" />
        <h1 className="text-xl font-semibold">Something went wrong</h1>
        <p className="text-muted-foreground text-sm">{errorMsg}</p>
        <Button variant="outline" onClick={() => setActionState("idle")}>
          Try again
        </Button>
      </CenteredCard>
    );
  }

  async function handleAccept() {
    setActionState("accepting");
    try {
      const result = await acceptInvitationService(token!);
      setAcceptedOrgId(result.data.organizationId);
      setActionState("accepted");
    } catch (e: unknown) {
      setErrorMsg(
        (e as { response?: { data?: { message?: string } } })?.response?.data
          ?.message ?? "Something went wrong. Please try again.",
      );
      setActionState("error");
    }
  }

  async function handleDecline() {
    setActionState("declining");
    try {
      await declineInvitationService(token!);
      setActionState("declined");
    } catch (e: unknown) {
      setErrorMsg(
        (e as { response?: { data?: { message?: string } } })?.response?.data
          ?.message ?? "Something went wrong. Please try again.",
      );
      setActionState("error");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-xl shadow-sm border p-10 max-w-md w-full space-y-6">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-lg bg-indigo-100 flex items-center justify-center shrink-0">
            <Building2 className="size-5 text-indigo-600" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">
              Invited by{" "}
              <span className="font-medium text-foreground">
                {details?.inviter.username}
              </span>
            </p>
            <h1 className="text-lg font-semibold leading-tight">
              Join <span className="text-indigo-600">{details?.organization.name}</span>
            </h1>
          </div>
        </div>

        <p className="text-sm text-muted-foreground">
          <strong>{details?.inviter.username}</strong> has invited you to join{" "}
          <strong>{details?.organization.name}</strong> on Project Management.
        </p>

        <div className="flex gap-3">
          <Button
            className="flex-1"
            onClick={handleAccept}
            disabled={actionState === "accepting" || actionState === "declining"}
          >
            {actionState === "accepting" && (
              <Loader2 className="size-4 mr-2 animate-spin" />
            )}
            Accept invitation
          </Button>
          <Button
            variant="outline"
            className="flex-1"
            onClick={handleDecline}
            disabled={actionState === "accepting" || actionState === "declining"}
          >
            {actionState === "declining" && (
              <Loader2 className="size-4 mr-2 animate-spin" />
            )}
            Decline
          </Button>
        </div>
      </div>
    </div>
  );
}

function CenteredCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-xl shadow-sm border p-10 max-w-md w-full text-center space-y-4">
        {children}
      </div>
    </div>
  );
}

function ErrorScreen({ message }: { message: string }) {
  return (
    <CenteredCard>
      <XCircle className="mx-auto size-12 text-destructive" />
      <h1 className="text-xl font-semibold">Invalid invitation</h1>
      <p className="text-muted-foreground text-sm">{message}</p>
    </CenteredCard>
  );
}
