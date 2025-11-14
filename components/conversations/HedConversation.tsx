"use client";

import useOthouUser from "@/app/hook/useOthouUser";
import { Conversations, User } from "@prisma/client";
import { WifiHighIcon } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { setstring } from "@/utils/format";

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
      <div className="flex items-center gap-2 px-4">
        {/* <Link
          className=" block text-sky-500 hover:text-sky-600 transition  cursor-pointer"
          href={"/conversation"}
        >
          <WifiHighIcon size={23} />
        </Link> */}
        <Avatar className="h-12 w-12 rounded-lg">
          <AvatarFallback className="rounded-full">
            {setstring(conversation.name || othuruser.name)}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="text-sm font-semibold">
            {conversation.name || othuruser.name}
          </div>
          <div className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
            {textstust}
          </div>
        </div>
        {/* <div className="text-sm font-light text-neutral-500">{textstust}</div> */}
      </div>
    </header>
  );
};

export default HedConversation;
