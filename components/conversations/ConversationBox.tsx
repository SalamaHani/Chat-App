"use client";
import React, { useCallback, useMemo } from "react";
import { Badge } from "../ui/badge";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { FullConversationstype } from "@/app/types";
import useOthouUser from "@/app/hook/useOthouUser";
import { MessageTime } from "../chat/Users";
import AvatarChat from "./AvatarChat";
import AvatarGroup from "./AvatarGroup";
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
    if (!lastMessage) return false;
    if (!userEmail) return false;

    const seenArray = lastMessage.seen || [];

    return (
      seenArray.filter((user) => {
        return user?.email === userEmail;
      }).length !== 0
    );
  }, [userEmail, lastMessage]);

  const unseenCount = useMemo(() => {
    if (!data.messages || !userEmail) return 0;
    return data.messages.reduce((count, message) => {
      const seenArray = message.seen || [];
      const hasSeen = seenArray.some((user) => user.email === userEmail);
      return hasSeen ? count : count + 1;
    }, 0);
  }, [data.messages, userEmail]);

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
      className={`flex cursor-pointer items-center justify-between gap-5 rounded-2xl p-3 transition-all ${
        isActive ? "bg-[#2a3942]" : "hover:bg-[#202c33]"
      }`}
    >
      <div className="flex items-center gap-3">
        {data.isGroup ? (
          <AvatarGroup users={data.users} />
        ) : (
          <AvatarChat user={othuruser} />
        )}
        <div className="space-y-0.5">
          <div className="text-sm font-semibold text-[#e9edef]">
            {data?.name || othuruser?.name}
          </div>
          <div
            className={`truncate text-xs ${
              hasSeen ? "text-[#8696a0]" : "font-semibold text-[#d1d7db]"
            }`}
          >
            {lasetMsessageText.length > 30
              ? lasetMsessageText.substring(0, 30) + "...."
              : lasetMsessageText}
          </div>
        </div>
      </div>
      <div className="flex h-13 flex-col items-end justify-around text-xs text-[#8696a0]">
        <MessageTime createdAt={lastMessage?.createdAt ?? Date.now} />
        {unseenCount != 0 ? (
          <Badge className="h-4 min-w-4 rounded-full bg-[#25d366] px-1 font-mono text-xs tabular-nums text-[#111b21]">
            {unseenCount}
          </Badge>
        ) : null}
      </div>
    </div>
  );
}
