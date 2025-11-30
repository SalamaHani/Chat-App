"use client";

import { FullMessageType } from "@/app/types";
import { authClient } from "@/lib/auth-client";
import clsx from "clsx";
import { MessageTime } from "./Users";
import Image from "next/image";
import { Check, CheckCheck } from "lucide-react";
import { useMemo } from "react";
import AvatarChat from "../conversations/AvatarChat";

interface ChatMessageprops {
  data: FullMessageType;
  isLast?: boolean;
}
const MassegChat: React.FC<ChatMessageprops> = ({ data, isLast }) => {
  const session = authClient.useSession();
  const isOnw = session?.data?.user?.email === data?.sender?.email;
  const seenlist = (data.seen || [])
    .filter((user) => user.email !== data.sender.email)
    .map((user) => user.name)
    .join(", ");
  // const otherSeen = (data.seen || []).filter((u) => u.id !== data.sender.id);

  const hasSeen = (data.seen || []).some(
    (user) => user.email !== data.sender.email
  );
  // const hasSeen = useMemo(() => {
  //   return data.seen.length == 2;
  // }, [data]);
  const contener = clsx("flex gap-3 p-4", isOnw && "justify-end");
  const body = clsx("flex flex-col gap-2", isOnw && "item-end");
  const avatar = clsx(isOnw && "order-2");
  const message = clsx(
    "text-sm  max-w-md  overflow-hidden relative max-w-[75%] px-3 py-2 rounded-xl  shadow-[0_2px_4px_rgba(0,0,0,0.18)] ",
    isOnw
      ? "bg-sidebar-primary text-white  rounded-br-none"
      : "bg-white dark:bg-neutral-800 rounded-bl-none",
    data.image ? "p-0 rounded-md " : "px-3 py-2 rounded-full"
  );
  return (
    <div className={contener}>
      <div className={avatar}>
        <AvatarChat user={data.sender} />
      </div>
      <div className={body}>
        <div className=" flex  flex-col gap-1">
          <div className={message}>
            {data.image ? (
              <Image
                alt="Imag"
                src={data.image}
                width={288}
                height={288}
                className=" object-cover  rounded-md"
              />
            ) : (
              <div>{data.body}</div>
            )}
          </div>
          <div className="flex items-center gap-1">
            {isOnw && (
              <>
                {hasSeen ? (
                  <div className="text-xs text-gray-500 font-light">
                    <CheckCheck size={11} className="text-sky-500" />
                  </div>
                ) : (
                  <div className="text-xs text-gray-500 font-light">
                    <Check size={11} className="text-neutral-500" />
                  </div>
                )}
              </>
            )}
            <div className="text-sm text-gray-400">
              <MessageTime createdAt={data?.createdAt ?? Date.now} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MassegChat;
