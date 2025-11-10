import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import React from "react";
import { AvatarFallback } from "../ui/avatar";
import { formatTime, formatTimeArabic, setstring } from "@/utils/format";
import { User } from "@prisma/client";
import { Badge } from "../ui/badge";
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
  return (
    <div
      key={key}
      className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground flex flex-1 gap-4 justify-between "
    >
      <div className="flex flex-1 gap-4 w-[90%]">
        <Avatar className="h-12 w-12 rounded-lg">
          {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
          <AvatarFallback className="rounded-full">
            {setstring(user?.name || "")}
          </AvatarFallback>
        </Avatar>
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-medium">{user?.name}</span>
          <span className="text-xs text-gray-500 dark:text-neutral-500">
            {user?.email}
          </span>
        </div>
      </div>
      <div className="grid flex-1 w-[10%] flex-col-reverse text-left text-xs leading-tight">
        <MessageTime createdAt={user?.createdAt ?? Date.now} />
        <Badge className="h-4 min-w-4 rounded-full px-1 font-mono tabular-nums">
          8
        </Badge>
      </div>
    </div>
  );
}

export default Users;
