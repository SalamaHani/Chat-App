"use client";
import React, { useCallback, useMemo } from "react";
import { setstring } from "@/utils/format";
import { Badge } from "../ui/badge";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { FullConversationstype } from "@/app/types";
import useOthouUser from "@/app/hook/useOthouUser";
import { MessageTime } from "../chat/Users";
import Avatar from "./Avatar";
interface ConversationBoxProps {
  data: FullConversationstype;
  isActive?: boolean;
}
export default function ConversationBox({
  data,
  isActive,
}: ConversationBoxProps) {
  const routur = useRouter();
  const session = authClient.useSession();
  const othuruser = useOthouUser(data);
  const handelCilek = useCallback(() => {
    routur.push(`/conversations/${data.id}`);
  }, [data, routur]);

  const lastMessage = useMemo(() => {
    const messages = data.messages || [];
    return messages[messages.length - 1];
  }, [data.messages]);

  const userEmail = useMemo(() => {
    return session?.data?.user?.email;
  }, [session?.data?.user?.email]);

  const hasSeen = useMemo(() => {
    if (!lastMessage) {
      return false;
    }
    if (!userEmail) {
      return false;
    }
    const seenArray = lastMessage?.seen || [];

    return (
      seenArray.filter((user) => {
        user?.email == userEmail;
      }).length != 0
    );
  }, [userEmail, lastMessage]);
  const countlasmasseags = useMemo(() => {
    const countMessages = lastMessage?.seen?.length;
    console.log(lastMessage, "gfbgfferg");
    return countMessages;
  }, [lastMessage]);

  const lasetMsessageText = useMemo(() => {
    if (lastMessage?.image) {
      return "Send an image";
    }
    if (lastMessage?.body) {
      return lastMessage?.body;
    }
    return "Start Conversation ";
  }, [lastMessage]);

  return (
    <div
      onClick={handelCilek}
      className={`${
        isActive ? ` bg-neutral-100 dark:bg-neutral-800` : `bg-none`
      } dark:hover:bg-neutral-800  hover:bg-neutral-50 flex items-center justify-between cursor-pointer  gap-5 rounded-sm  p-2`}
    >
      <div className="flex items-center gap-2">
        <Avatar user={data} />
        {/* <Avatar className="h-12 w-12 rounded-lg">
          <AvatarFallback className="rounded-full">
            {setstring(data?.name || othuruser?.name)}
          </AvatarFallback>
        </Avatar> */}
        <div>
          <div className="text-sm font-semibold">
            {data?.name || othuruser?.name}
          </div>
          <div
            className={`text-sm  truncate ${
              hasSeen
                ? `text-gray-500 dark:text-white`
                : `text-gray-500 font-medium`
            }`}
          >
            {lasetMsessageText}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end justify-around size-12  ">
        <MessageTime createdAt={lastMessage?.createdAt ?? Date.now} />
        <Badge className="h-4 min-w-4 rounded-full bg-sidebar-primary px-1 font-mono tabular-nums">
          {countlasmasseags != undefined ? countlasmasseags : 2}
        </Badge>
      </div>
    </div>
  );
}
