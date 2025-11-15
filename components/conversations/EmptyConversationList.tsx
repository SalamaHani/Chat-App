import React from "react";
import HadChatFrind from "../chat/HadChatFrind";


function EmptyConversationList() {
  return (
    <div className="rounded-xl  bg-neutral-200 dark:bg-neutral-900 rounded-tr-none rounded-br-none overflow-hidden h-full  w-full">
      <HadChatFrind />
      <div
        className={
          "space-y-2 relative px-2 bg-white dark:bg-neutral-900 min-h-130 max-h-150 overflow-y-auto"
        }
      >
        <div className=" flex  rounded-t-xl w-full ">
          <div className="w-full h-full  overflow-hidden  ">
            <div className=" max-h-123 min-h-125 overflow-y-auto">
              <div className=" w-full flex h-125 bg-white dark:bg-neutral-900 justify-center flex-1 flex-col gap-3 italic items-center">
                <h1 className="text-secondary-foreground text-2xl italic font-medium">
                  Start new Conversation
                </h1>
              </div>
            </div>
            <div className="flex h-[52px]  rounded-br-xl flex-1 bg-white dark:bg-neutral-900 justify-center items-center"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmptyConversationList;
