"use client";

import useOthouUser from "@/app/hook/useOthouUser";
import { Conversations, User } from "@prisma/client";
import { useMemo } from "react";
import AvatarChat from "./AvatarChat";
import { AnimateIcon } from "../animate-ui/icons/icon";
import { PhoneCall } from "../animate-ui/icons/phone-call";
import { Search } from "../animate-ui/icons/search";
import { Cctv } from "../animate-ui/icons/cctv";
import Ditales from "./Ditales";
import AvatarGroup from "./AvatarGroup";

interface HedConversationProps {
  conversation: Conversations & {
    users: User[];
  };
}

const HedConversation: React.FC<HedConversationProps> = ({ conversation }) => {
  const otherUser = useOthouUser(conversation);
  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }
    return "last seen recently";
  }, [conversation]);

  return (
    <header className="flex h-16 shrink-0 items-center gap-2  bg-[#f0f2f5] dark:bg-[#202c33] ease-linear">
      <div className="flex items-center justify-between  w-full gap-2 px-4">
        <div className="flex items-center  gap-3">
          {conversation.isGroup ? (
            <AvatarGroup users={conversation.users} />
          ) : (
            <AvatarChat user={otherUser} />
          )}
          <div>
            <div className="text-base font-semibold leading-tight text-neutral-900 dark:text-white">
              {conversation.name || otherUser.name}
            </div>
            <div className="text-xs font-normal text-neutral-500 dark:text-neutral-400">
              {statusText}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <AnimateIcon animateOnHover>
            <Cctv className="cursor-pointer text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 transition-colors" size={22} />
          </AnimateIcon>
          <AnimateIcon animateOnHover>
            <PhoneCall className="cursor-pointer text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 transition-colors" size={22} />
          </AnimateIcon>
          <AnimateIcon animateOnHover>
            <Search className="cursor-pointer text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 transition-colors" size={22} />
          </AnimateIcon>
          <Ditales conversation={conversation} />
        </div>
      </div>
    </header>
  );
};

export default HedConversation;

