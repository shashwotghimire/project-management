"use client";

import { useGetUsersOrganizations } from "../hooks/useOnboarding";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const OnboardingCard = () => {
  const { data, error, isLoading } = useGetUsersOrganizations();
  console.log("Organizations data:", data);

  if (isLoading) {
    return <div>Loading organizations...</div>;
  }

  if (error) {
    return <div>Error loading organizations: {error.message}</div>;
  }
  return (
    <div className="p-6">
      <div className="flex justify-center items-center w-full h-105 mt-10">
        <ScrollArea className="h-105 w-full max-w-xl rounded-md border">
          <div className="p-4 text-center">
            <h4 className="mb-4 text-md leading-none font-semibold">
              Your Organizations
            </h4>
            {data?.organizations.map((organization) => (
              <Card key={organization.Organization.id} className="mt-2 p-2">
                <div>
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
            ))}
          </div>
        </ScrollArea>
      </div>
      <div className="flex gap-2 w-full max-w-xl mx-auto mt-6">
        <Input
          type="text"
          placeholder="Enter invitation code..."
          className="flex-1 h-10"
        />
        <Button className="h-10">Join Organization</Button>
      </div>
    </div>
  );
};

export default OnboardingCard;
