import { PublicRoutes } from "@/components/PublicRoutes";
import { AuthGraphicsLogin } from "@/features/auth/components/AuthGraphics";
import { AuthNavbar } from "@/features/auth/components/AuthNavbar";
import { LoginForm } from "@/features/auth/components/LoginForm";
import { Suspense } from "react";

function LoginPage() {
  return (
    <PublicRoutes>
      <div className="relative h-screen flex overflow-hidden">
        <AuthNavbar />
        <div className="hidden md:block md:w-1/2">
          <AuthGraphicsLogin />
        </div>
        <div className="w-full md:w-1/2">
          <Suspense>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </PublicRoutes>
  );
}

export default LoginPage;
