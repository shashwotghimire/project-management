import { PublicRoutes } from "@/components/PublicRoutes";
import { AuthGraphicsRegister } from "@/features/auth/components/AuthGraphics";
import { AuthNavbar } from "@/features/auth/components/AuthNavbar";
import { RegisterForm } from "@/features/auth/components/RegisterForm";

function RegisterPage() {
  return (
    <PublicRoutes>
      <div className="relative h-screen flex overflow-hidden">
        <AuthNavbar />
        <div className="hidden md:block md:w-1/2">
          <AuthGraphicsRegister />
        </div>
        <div className="w-full md:w-1/2 overflow-hidden">
          <RegisterForm />
        </div>
      </div>
    </PublicRoutes>
  );
}

export default RegisterPage;
