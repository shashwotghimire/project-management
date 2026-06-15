"use client";

import React from "react";
import {
  useAcceptInvitation,
  useGetUsersOrganizations,
} from "../hooks/useOnboarding";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import CreateOrgModal from "./CreateOrgModal";

const OnboardingCard = () => {
  const [token, setToken] = React.useState("");
  const router = useRouter();
  const { data, error, isLoading } = useGetUsersOrganizations();
  const {
    data: acceptInvitationData,
    mutate: acceptInvitationMutate,
    error: acceptInvitationError,
    isPending: acceptInvitationPending,
  } = useAcceptInvitation(token);

  if (isLoading) {
    return <div>Loading organizations...</div>;
  }

  if (error) {
    return <div>Error loading organizations: {error.message}</div>;
  }

  const handleJoinOrganization = () => {
    acceptInvitationMutate(undefined, {
      onSuccess: (data) => {
        router.push(`/organization/${data.organizationId}`);
      },
    });
  };
  return (
    <div className="p-6">
      <div className="flex justify-center items-center">
        <div>
          <h2 className="text-2xl font-bold mt-3">Choose a workspace</h2>
          <h3 className="mt-3">
            {" "}
            Pick a workspace to enter, create or join another with an invitation
            code.
          </h3>
        </div>
      </div>
      <div className="flex justify-center items-center w-full h-105 mt-10">
        <ScrollArea className="h-105 w-full max-w-xl rounded-md border">
          <div className="p-4 text-center">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-md leading-none font-semibold">
                Your Organizations
              </h4>
              <CreateOrgModal />
            </div>
            {data?.organizations.map((organization) => (
              <div
                key={organization.Organization.id}
                onClick={() =>
                  router.push(`/organization/${organization.Organization.id}`)
                }
              >
                <Card className="mt-2 p-2 hover:bg-muted/50 cursor-pointer transition-colors">
                  <div className="">
                    {organization.Organization.logoUrl ? (
                      <img
                        src={organization.Organization.logoUrl}
                        alt={organization.Organization.name}
                        className="w-10 h-10 rounded-full"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                        <span className="text-lg font-bold">
                          {organization.Organization.name.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-2 flex justify-between">
                    <div className="text-sm font-semibold">
                      {organization.Organization.name}
                    </div>
                    <div>
                      {organization.userRoleInOrg === "org admin"
                        ? "Admin"
                        : "Member"}
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
      <div className="flex gap-2 w-full max-w-xl mx-auto mt-6">
        <Input
          type="text"
          placeholder="Enter invitation code..."
          className="flex-1 h-10"
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />
        <Button
          className="h-10"
          onClick={handleJoinOrganization}
          disabled={acceptInvitationPending}
        >
          {acceptInvitationPending ? "Joining..." : "Join Organization"}
        </Button>
      </div>
      {acceptInvitationError && (
        <div className="text-red-500 mt-2">
          Error joining organization: {acceptInvitationError.message}
        </div>
      )}
    </div>
  );
};

export default OnboardingCard;
