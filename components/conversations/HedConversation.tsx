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
    return "Active";
  }, [conversation]);
  return (
    <header className="flex h-20 shrink-0 items-center rounded-t-[28px] bg-[#202c33] text-[#e9edef] shadow-[0_1px_0_rgba(255,255,255,0.05)] transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-16">
      <div className="flex w-full items-center justify-between gap-4 px-6">
        <div className="flex items-center gap-3">
          {conversation.isGroup ? (
            <AvatarGroup users={conversation.users} />
          ) : (
            <AvatarChat user={otherUser} />
          )}
          <div>
            <div className="text-sm font-semibold leading-tight">
              {conversation.name || otherUser.name}
            </div>
            <div className="text-xs font-medium text-[#8696a0]">
              {statusText}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <AnimateIcon animateOnHover>
            <PhoneCall className="cursor-pointer text-[#8696a0]" size={20} />
          </AnimateIcon>
          <AnimateIcon animateOnHover>
            <Cctv className="cursor-pointer text-[#8696a0]" size={20} />
          </AnimateIcon>
          <AnimateIcon animateOnHover>
            <Search className="cursor-pointer text-[#8696a0]" size={20} />
          </AnimateIcon>
          <Ditales conversation={conversation} />
        </div>
      </div>
    </header>
  );
};

export default HedConversation;
