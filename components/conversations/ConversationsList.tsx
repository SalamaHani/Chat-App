"use client";
import React from "react";
import { FullConversationstype } from "@/app/types";
import HadChatFrind from "../chat/HadChatFrind";
import SearshChat from "../chat/SearshChat";
import ConversationBox from "./ConversationBox";

import EmptyConversationList from "./EmptyConversationList";
import useConverstions from "@/app/hook/useConverstions";

interface Conversationsporps {
  intialItems: FullConversationstype[];
}
const ConversationsList: React.FC<Conversationsporps> = ({ intialItems }) => {
  const { conversationId } = useConverstions();
  if (intialItems.length == 0) {
    return <EmptyConversationList />;
  }
  return (
    <div className="rounded-xl  bg-neutral-200 dark:bg-neutral-900 rounded-tr-none rounded-br-none overflow-hidden h-full  w-full">
      <HadChatFrind />
      <SearshChat />
      <div
        className={
          "space-y-2 relative px-2 bg-white dark:bg-neutral-900 min-h-120 max-h-120 overflow-y-auto"
        }
      >
        {intialItems.map((item) => {
          return (
            <ConversationBox
              data={item}
              isActive={conversationId == item.id}
              key={item.id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ConversationsList;
