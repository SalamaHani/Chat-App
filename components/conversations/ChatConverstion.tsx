"use client";
import React from "react";

import { getConversations } from "@/utils/action";
import SearshChat from "../chat/SearshChat";
import HadChatFrind from "../chat/HadChatFrind";
import ConversationBox from "./ConversationBox";
import useConverstion from "@/app/hook/useConverstion";

// import { Separator } from "../ui/separator";

async function ChatConverstion() {
  const Conversations = await getConversations();
  const { converstionId, isOpen } = useConverstion();
  return (
    <div className="bg-[#111827] rounded-xl  overflow-hidden h-full  w-full">
      <HadChatFrind />
      <SearshChat />
      <div
        className={
          "space-y-2 relative px-2 min-h-120 max-h-120 overflow-y-auto"
        }
      >
        {Conversations.map((item) => {
          return (
            <ConversationBox
              key={item.id}
              data={item}
              isActive={item.id == converstionId}
            />
          );
        })}
      </div>
    </div>
  );
}

export default ChatConverstion;
