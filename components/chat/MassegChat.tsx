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
}
const MassegChat: React.FC<ChatMessageprops> = ({ data, isLast }) => {
  const session = authClient.useSession();
  const isOwn = session?.data?.user?.email === data?.sender?.email;

  const hasSeen = useMemo(() => {
    return (data.seen || []).some((user) => user.email !== data.sender.email);
  }, [data.seen, data.sender.email]);

  const container = clsx("flex gap-3 px-5 py-2", isOwn && "justify-end");
  const body = clsx("flex flex-col gap-1.5", isOwn && "items-end");
  const avatar = clsx(isOwn && "order-2");
  const message = clsx(
    "relative max-w-[70%] overflow-hidden rounded-3xl border text-sm shadow-[0_18px_40px_rgba(0,0,0,0.35)] transition",
    isOwn
      ? "rounded-br-none border-[#0d4f3c] bg-gradient-to-br from-[#066d52] to-[#02412f] text-white"
      : "rounded-bl-none border-white/10 bg-gradient-to-br from-[#1f2c34] to-[#111a20] text-[#e9edef]",
    data.image ? "rounded-2xl p-0" : "px-4 py-3"
  );
  const senderLabel = !isOwn ? data?.sender?.name ?? "Member" : "You";
  return (
    <div className={container}>
      <div className={avatar}>
        <AvatarChat user={data.sender} />
      </div>
      <div className={body}>
        <div
          className={clsx(
            "text-xs font-semibold uppercase tracking-wide text-[#7c8f99]",
            isOwn && "text-[#9fd6c3]"
          )}
        >
          {senderLabel}
        </div>
        <div className="flex flex-col gap-1">
          <div className={message}>
            {data.image ? (
              <Image
                alt="Image"
                src={data.image}
                width={288}
                height={288}
                className="rounded-md object-cover"
              />
            ) : (
              <div>{data.body}</div>
            )}
          </div>
          <div className="flex items-center gap-1 text-[11px] text-[#8696a0]">
            {isOwn && (
              <>
                {hasSeen ? (
                  <div className="font-light">
                    <CheckCheck size={11} className="text-[#53bdeb]" />
                  </div>
                ) : (
                  <div className="font-light">
                    <Check size={11} className="text-[#8696a0]" />
                  </div>
                )}
              </>
            )}
            <div>
              <MessageTime createdAt={data?.createdAt ?? Date.now} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MassegChat;
