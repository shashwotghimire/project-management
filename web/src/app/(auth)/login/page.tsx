import { AuthGraphics } from "@/features/auth/components/AuthGraphics";
import { LoginForm } from "@/features/auth/components/LoginForm";

function LoginPage() {
  return (
    <div className="flex flex-1">
      <div className="hidden md:block md:w-1/2">
        <AuthGraphics />
      </div>
      <div className="w-full md:w-1/2">
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage;
