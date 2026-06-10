import { AuthGraphicsLogin } from "@/features/auth/components/AuthGraphics";
import { LoginForm } from "@/features/auth/components/LoginForm";

function LoginPage() {
  return (
    <div className="h-screen flex overflow-hidden">
      <div className="hidden md:block md:w-1/2">
        <AuthGraphicsLogin />
      </div>
      <div className="w-full md:w-1/2">
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage;
