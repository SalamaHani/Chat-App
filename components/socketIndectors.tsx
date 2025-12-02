"use client";
import { useActive } from "@/app/hook/useActive";
import { User } from "@prisma/client";
interface AvaterProps {
  user?: User;
}
export const SocketIndectors: React.FC<AvaterProps> = ({ user }) => {
  const { mempers } = useActive();
  console.log(mempers);
  const userEmail = user?.email;
  const isActive = userEmail ? mempers.includes(userEmail) : false;
  console.log(`stutas ${isActive}`);
  if (isActive) {
    return (
      <span className=" absolute block rounded-full bg-yellow-500 ring-2  ring-white right-0 top-0 h-2 w-2 " />
    );
  }
  return (
    <span className=" absolute block rounded-full bg-green-500 ring-2  ring-white right-0 top-0 h-2 w-2 " />
  );
};
