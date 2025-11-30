import React from "react";
import { ScrollArea } from "../ui/scroll-area";

function EmptyConversationList() {
  return (
    <div className="min-h-120 max-h-120 bg-white dark:bg-neutral-900  overflow-hidden">
      <ScrollArea>
        <div className="space-y-2 relative pl-2 pr-4 min-h-120 max-h-120  dark:bg-neutral-900 ">
          <div className="flex justify-center items-center h-full ">
            <h1 className="text-secondary-foreground text-2xl italic font-medium">
              Start new Conversations{" "}
            </h1>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}

export default EmptyConversationList;
