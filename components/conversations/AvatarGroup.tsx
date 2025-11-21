"use client";

import { User } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface AvaterProps {
  users?: User[];
}
const AvatarGroup: React.FC<AvaterProps> = ({ users = [] }) => {
  return (
    <div className=" relative">
      <div className="flex -space-x-4">
        {users.slice(0, 3).map((user, i) => (
          <Avatar
            key={i}
            className="border-2 border-white dark:border-neutral-900 h-9 w-9"
          >
            <AvatarImage src={user.image || ""} />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>
        ))}

        {users.length > 3 && (
          <div className="h-9 w-9 rounded-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center text-sm font-medium border-2 border-white dark:border-neutral-900">
            +{users.length - 3}
          </div>
        )}
      </div>
    </div>
  );
};

export default AvatarGroup;
