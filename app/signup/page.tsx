import { SignUp } from "@/components/signup-form";

export default function SignupPage() {
  return (
    <div className="flex items-center justify-center w-full h-screen ">
      <div className=" p-8 rounded shadow-md">
        <SignUp />
      </div>
    </div>
  );
}
