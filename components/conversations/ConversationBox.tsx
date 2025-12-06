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
import { Check, CheckCheck } from "lucide-react";

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
    return seenArray.filter((user) => user?.email === userEmail).length !== 0;
  }, [userEmail, lastMessage]);

  const isOwnMessage = useMemo(() => {
    if (!lastMessage) return false;
    return lastMessage.sender?.email === userEmail;
  }, [lastMessage, userEmail]);

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
      return "📷 Photo";
    }
    if (lastMessage?.body) {
      return lastMessage?.body;
    }
    return "Start a conversation";
  }, [lastMessage]);

  return (
    <div
      onClick={handelCilek}
      className={`
        flex items-center gap-3 px-3 py-2 mt-2 rounded-md cursor-pointer
        transition-colors duration-100
        hover:bg-white dark:hover:bg-accent
        ${isActive
          ? "bg-white dark:bg-accent"
          : "hover:bg-white dark:hover:bg-accent"
        }
      `}
    >
      {/* Avatar */}
      <div className="flex-shrink-0">
        {data.isGroup ? (
          <AvatarGroup users={data.users} />
        ) : (
          <AvatarChat user={othuruser} />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 pb-3">
        {/* Top row: Name and Time */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-[16px] font-normal text-neutral-900 dark:text-white truncate">
            {data?.name || othuruser?.name}
          </span>
          <span
            className={`text-xs flex-shrink-0 ${unseenCount > 0
              ? "text-primary"
              : "text-muted-foreground"
              }`}
          >
            <MessageTime createdAt={lastMessage?.createdAt ?? Date.now} />
          </span>
        </div>

        {/* Bottom row: Message preview and badge */}
        <div className="flex items-center justify-between gap-2 mt-1">
          <div className="flex items-center gap-1 flex-1 min-w-0">
            {/* Show checkmarks for own messages */}

            {hasSeen ? (
              <CheckCheck size={14} className="text-sky-400" />
            ) : (
              <Check size={14} className="text-white/70" />
            )}

            <p className="text-[14px] text-neutral-500 dark:text-neutral-400 truncate">
              {lasetMsessageText.length > 40
                ? lasetMsessageText.substring(0, 40) + "..."
                : lasetMsessageText}
            </p>
          </div>

          {/* Unread badge */}
          {unseenCount > 0 && (
            <Badge className="h-5 min-w-5 rounded-full bg-primary hover:bg-primary text-primary-foreground text-[11px] font-medium px-1.5 flex-shrink-0">
              {unseenCount}
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}
