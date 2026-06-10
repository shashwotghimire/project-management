import { AuthGraphicsRegister } from "@/features/auth/components/AuthGraphics";
import { RegisterForm } from "@/features/auth/components/RegisterForm";

function RegisterPage() {
  return (
    <div className="h-screen flex overflow-hidden">
      <div className="hidden md:block md:w-1/2">
        <AuthGraphicsRegister />
      </div>
      <div className="w-full md:w-1/2 overflow-hidden">
        <RegisterForm />
      </div>
    </div>
  );
}

export default RegisterPage;
