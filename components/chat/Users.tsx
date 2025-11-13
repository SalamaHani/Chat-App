"use client";
import { Avatar } from "@radix-ui/react-avatar";
import React, { useCallback, useState } from "react";
import { AvatarFallback } from "../ui/avatar";
import { formatTimeArabic, setstring } from "@/utils/format";
import { User } from "@prisma/client";
import { Badge } from "../ui/badge";
import axios from "axios";
import { useRouter } from "next/navigation";


interface PropsUser {
  user: User | null;
  key: string;
}
export function MessageTime({ createdAt }: { createdAt: Date }) {
  return (
    <span className="text-xs text-muted-foreground">
      {formatTimeArabic(createdAt)}
    </span>
  );
}

function Users({ user, key }: PropsUser) {
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
        console.log("ronde");
        setIsActive(user?.id == data.data.id);
      })
      .finally(() => setIsloding(false));
  }, [user, routur]);
  if (isLoding) {
    return <Avatar>45</Avatar>;
  }
  return (
    <div
      key={key}
      onClick={handelCilek}
      className={`${
        isActive ? `bg-[#1e293b]` : `bg-none`
      } hover:bg-[#1e293b] flex items-center justify-between  gap-5 rounded-sm  p-2`}
    >
      <div className="flex items-center gap-2">
        <Avatar className="h-12 w-12 rounded-lg">
          <AvatarFallback className="rounded-full">
            {setstring(user?.name || "")}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="text-sm font-semibold">{user?.name}</div>
          <div className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
            {user?.email}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end justify-around size-12  ">
        <MessageTime createdAt={user?.createdAt ?? Date.now} />
        <Badge className="h-4 min-w-4 rounded-full px-1 font-mono tabular-nums">
          8
        </Badge>
      </div>
    </div>
  );
}

export default Users;
