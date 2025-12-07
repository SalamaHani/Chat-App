"use client";

import { FullMessageType } from "@/app/types";
import { authClient } from "@/lib/auth-client";
import clsx from "clsx";
import { MessageTime } from "./Users";
import Image from "next/image";
import { Check, CheckCheck } from "lucide-react";
import AvatarChat from "../conversations/AvatarChat";
import { useMemo } from "react";

interface ChatMessageprops {
  data: FullMessageType;
  isLast?: boolean;
  isGroup?: boolean;
}

const MassegChat: React.FC<ChatMessageprops> = ({ data, isLast, isGroup }) => {
  const session = authClient.useSession();
  const isOwn = session?.data?.user?.email === data?.sender?.email;

  const hasSeen = useMemo(() => {
    if (!data.sender?.email) return false;
    return (data.seen || []).some((user) => user.email !== data.sender.email);
  }, [data.seen, data.sender?.email]);

  const container = clsx("flex gap-3 px-4 py-1", isOwn && "justify-end");
  const body = clsx("flex flex-col gap-1", isOwn && "items-end");
  const avatar = clsx(isOwn && "order-2");

  // WhatsApp style: green for own messages, white for received
  const message = clsx(
    "relative overflow-hidden rounded-lg px-3 py-2 text-sm shadow-sm",
    isOwn
      ? "rounded-tr-none bg-[#d9fdd3] dark:bg-[#005c4b] text-foreground"
      : "rounded-tl-none bg-card dark:bg-secondary text-foreground",
    data.image ? "rounded-lg p-1" : "rounded-lg px-3 py-2"
  );

  return (
    <div className={container}>
      {/* Only show avatar in group chats */}
      {isGroup && (
        <div className={avatar}>
          <AvatarChat user={data.sender} />
        </div>
      )}
      <div className={body}>
        <div className="flex flex-col">
          <div className={message}>
            {data.image ? (
              <div className="relative">
                <Image
                  alt="Image"
                  src={data.image}
                  width={288}
                  height={288}
                  className="rounded-lg object-cover"
                />
                {/* Time and seen overlay on image */}
                <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/50 rounded-full px-2 py-0.5">
                  <span className="text-[11px] text-white">
                    <MessageTime createdAt={data?.createdAt ?? Date.now} />
                  </span>
                  {isOwn && (
                    <>
                      {hasSeen ? (
                        <CheckCheck size={14} className="text-sky-400" />
                      ) : (
                        <Check size={14} className="text-white/70" />
                      )}
                    </>
                  )}
                </div>
              </div>
            ) : (
              <>
                <div className="leading-relaxed">{data.body}</div>
                <div className="flex items-center justify-end gap-1 mt-1">
                  <span className="text-[11px] text-muted-foreground">
                    <MessageTime createdAt={data?.createdAt ?? Date.now} />
                  </span>
                  {isOwn && (
                    <>
                      {hasSeen ? (
                        <CheckCheck size={16} className="text-sky-500" />
                      ) : (
                        <Check size={16} className="text-muted-foreground" />
                      )}
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MassegChat;

