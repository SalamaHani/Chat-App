"use client";

import { User } from "@prisma/client";
import { X } from "lucide-react";
import { Badge } from "../ui/badge";

interface UserListProps {
  User: User;
}

function SelectUsers({ User }: UserListProps) {
  return (
    <Badge
      className="dark:bg-neutral-700 my-3 bg-neutral-200 flex justify-between items-center"
      variant="outline"
    >
      {User.name}
      <button
        className=" flex justify-center items-center cursor-pointer w-3 h-3"
      >
        <X />
      </button>
    </Badge>
  );
}

export default SelectUsers;
