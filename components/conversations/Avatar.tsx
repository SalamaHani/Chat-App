"use client";

import { User } from "@prisma/client";
import Image from "next/image";

interface AvaterProps {
  user?: User | null;
}
const Avatar: React.FC<AvaterProps> = ({ user }) => {
  return (
    <div className=" relative">
      <div className=" relative rounded-full  inline-block h-9 w-9 ">
        <Image
          className="rounded-full"
          alt="user image"
          src={
            user?.image ||
            "/images/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.avif"
          }
          fill
        />
      </div>
      <span className=" absolute block rounded-full bg-green-500 ring-2  ring-white right-0 top-0 h-2 w-2 " />
    </div>
  );
};

export default Avatar;
