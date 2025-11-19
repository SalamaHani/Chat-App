"use client";

import React, { useCallback, useState } from "react";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import Avatar from "../conversations/Avatar";
import { Checkbox } from "../animate-ui/components/radix/checkbox";

interface UserListProps {
  user: User;
  selectedUserIds?: string[];
  closeDialog?: () => void;
  onSelect?: (userId: string, checked: boolean) => void;
}

function SelectUsers({ user, closeDialog, onSelect }: UserListProps) {
  const routur = useRouter();
  const [isLoding, setIsloding] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [checked, setChecked] = useState(false);
  const handleChange = (value: boolean) => {
    setChecked(value);
    onSelect?.(user.id, value);
  };
  //   const handelCilek = useCallback(() => {
  //     setIsloding(true);
  //     axios
  //       .post("/api/conversations", {
  //         userId: user?.id,
  //       })
  //       .then((data) => {
  //         routur.push(`/conversations/${data.data.id}`);
  //         closeDialog();
  //         setIsActive(user?.id == data.data.id);
  //       })
  //       .finally(() => setIsloding(false));
  //   }, [user, routur, closeDialog]);
  return (
    <div>
      <div className="flex flex-col gap-3">
        <div
          key={user.id}
          className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
        >
          <div className="flex items-center gap-3">
            <Avatar user={user} />
            <span className="font-medium">{user.name}</span>
          </div>
          <Checkbox checked={checked} onCheckedChange={handleChange} />
        </div>
      </div>
    </div>
  );
}

export default SelectUsers;
