"use client";
import React, { useCallback, useMemo } from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { setstring } from "@/utils/format";
import { Badge } from "../ui/badge";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { FullConversationstype } from "@/app/types";
import { format } from "date-fns";
import useOthouUser from "@/app/hook/useOthouUser";
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
        isActive ? `bg-[#1e293b]` : `bg-none`
      } hover:bg-[#1e293b] flex items-center justify-between  gap-5 rounded-sm  p-2`}
    >
      <div className="flex items-center gap-2">
        <Avatar className="h-12 w-12 rounded-lg">
          <AvatarFallback className="rounded-full">
            {setstring(data?.name || othuruser?.name)}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="text-sm font-semibold">
            {data?.name || othuruser?.name}
          </div>
          <div
            className={`text-sm  truncate ${
              hasSeen ? `text-gray-500 ` : `text-black font-medium`
            }`}
          >
            {lasetMsessageText}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end justify-around size-12  ">
        <span className="text-xs text-muted-foreground">
          {lastMessage?.createdAt
            ? format(new Date(lastMessage.createdAt), "p")
            : "—"}
        </span>
        <Badge className="h-4 min-w-4 rounded-full px-1 font-mono tabular-nums">
          {countlasmasseags}
        </Badge>
      </div>
    </div>
  );
}
