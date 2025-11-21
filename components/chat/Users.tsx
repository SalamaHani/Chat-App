"use client";

import React, { useCallback, useState } from "react";
import { formatTimeArabic } from "@/utils/format";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import Avatar from "../conversations/AvatarChat";

interface PropsUser {
  user: User | null;
  closeDialog?: () => void;
}
export function MessageTime({ createdAt }: { createdAt: Date }) {
  return (
    <span className="text-xs text-muted-foreground">
      {formatTimeArabic(createdAt)}
    </span>
  );
}

function Users({ user, closeDialog }: PropsUser) {
  const routur = useRouter();
  const [isLoding, setIsloding] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const handelCilek = useCallback(() => {
    setIsloding(true);
    axios
      .post("/api/conversations", {
        userId: user?.id,
      })
      .then((data) => {
        routur.push(`/conversations/${data.data.id}`);
        closeDialog();
        setIsActive(user?.id == data.data.id);
      })
      .finally(() => setIsloding(false));
  }, [user, routur, closeDialog]);
  if (isLoding) {
    return <p>45</p>;
  }
  return (
    <div
      onClick={handelCilek}
      className={`${
        isActive ? `bg-neutral-100 dark:bg-neutral-800` : `bg-none`
      } dark:hover:bg-neutral-800  hover:bg-neutral-50 flex items-center justify-between cursor-pointer  gap-5 rounded-sm  p-2`}
    >
      <div className="flex items-center gap-2">
        <Avatar user={user} />
        <div>
          <div className="text-sm font-semibold">{user?.name}</div>
          <div className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
            {user?.email}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users;
