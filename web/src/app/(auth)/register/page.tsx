import { RegisterForm } from "@/features/auth/components/RegisterForm";

function RegisterPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-8">Register Page</h1>
      <RegisterForm />
    </div>
  );
}

export default RegisterPage;
