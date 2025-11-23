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
  const othuruser = useOthouUser(conversation);
  const textstust = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} mempers`;
    }
    return "Active";
  }, [conversation]);
  return (
    <header className="flex rounded-t-xl rounded-tl-none    bg-white dark:bg-neutral-900 h-18  shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-16">
      <div className="flex items-center justify-between w-full gap-2 px-4">
        <div className="flex items-center  gap-2 px-4">
          {conversation.isGroup ? (
            <AvatarGroup users={conversation.users} />
          ) : (
            <AvatarChat user={othuruser} />
          )}
          <div>
            <div className="text-sm font-semibold">
              {conversation.name || othuruser.name}
            </div>
            <div className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
              {textstust}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 px-4">
          <AnimateIcon animateOnHover>
            <PhoneCall className="cursor-pointer" size={20} />
          </AnimateIcon>
          <AnimateIcon animateOnHover>
            <Cctv className="cursor-pointer" size={20} />
          </AnimateIcon>
          <AnimateIcon animateOnHover>
            <Search className="cursor-pointer" size={20} />
          </AnimateIcon>
          <Ditales conversation={conversation} />
        </div>
      </div>
    </header>
  );
};

export default HedConversation;
