"use client";
import React from "react";
import { FullConversationstype } from "@/app/types";
import HadChatFrind from "../chat/HadChatFrind";
import SearshChat from "../chat/SearshChat";
import ConversationBox from "./ConversationBox";
import useConverstion from "@/app/hook/useConverstion";
interface Conversationsporps {
  intialItems: FullConversationstype[];
}
const ConversationsList: React.FC<Conversationsporps> = ({ intialItems }) => {
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
        {intialItems.map((item) => {
          return (
            <ConversationBox
              data={item}
              isActive={item.id == converstionId}
              key={item.id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ConversationsList;
