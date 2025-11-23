"use client";
import React from "react";
import { FullConversationstype } from "@/app/types";

import ConversationBox from "./ConversationBox";

import EmptyConversationList from "./EmptyConversationList";
import useConverstions from "@/app/hook/useConverstions";
import { ScrollArea } from "../ui/scroll-area";

interface Conversationsporps {
  intialItems: FullConversationstype[];
}
const ConversationsList: React.FC<Conversationsporps> = ({ intialItems }) => {
  const { conversationId } = useConverstions();
  if (intialItems.length == 0) {
    return <EmptyConversationList />;
  }
  return (
    <div className="min-h-120 max-h-120 bg-white dark:bg-neutral-900  overflow-hidden">
      <ScrollArea>
        <div className="space-y-2 relative pl-2 pr-4 min-h-120 max-h-120  ">
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
      </ScrollArea>
    </div>
  );
};

export default ConversationsList;
