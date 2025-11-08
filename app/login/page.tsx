import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center w-full h-screen ">
      <div className=" p-8 rounded shadow-md">
        <LoginForm />
      </div>
    </div>
  );
}
