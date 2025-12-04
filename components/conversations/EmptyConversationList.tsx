import React from "react";
import { ScrollArea } from "../ui/scroll-area";

function EmptyConversationList() {
  return (
    <div className="min-h-[calc(100vh-160px)] max-h-[calc(100vh-160px)] overflow-hidden rounded-b-[28px] bg-[#111b21]">
      <ScrollArea className="h-full">
        <div className="flex h-full items-center justify-center px-6 text-center text-[#8696a0]">
          <div>
            <p className="text-lg font-semibold text-[#e9edef]">
              Your chats will appear here
            </p>
            <p className="text-sm">
              Tap the new chat button to start a WhatsApp-style conversation.
            </p>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}

export default EmptyConversationList;
