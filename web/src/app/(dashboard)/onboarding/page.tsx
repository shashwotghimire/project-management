"use client";
import { useGetUserProfile } from "@/features/auth/hooks/useAuth";

function OnboardingPage() {
  const { data, error } = useGetUserProfile();
  return (
    <div>
      <h1>Onboarding Page</h1>
      <p>
        Welcome to the onboarding process! Please follow the steps to get
        started.
      </p>
      Welcome {data?.username}
      {error && <p>{error.message}</p>}
    </div>
  );
}
export default OnboardingPage;
