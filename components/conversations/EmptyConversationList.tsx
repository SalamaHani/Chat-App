import React from "react";
import { MessageSquarePlus } from "lucide-react";

function EmptyConversationList() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-[#f0f2f5] dark:bg-[#202c33] p-8">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="w-16 h-16 rounded-full bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center">
          <MessageSquarePlus className="w-8 h-8 text-sidebar-primary" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-neutral-800 dark:text-white">
            No conversations yet
          </h2>
          <p className="text-sm text-slate-500 dark:text-neutral-400 mt-1">
            Start a new conversation to begin chatting
          </p>
        </div>
      </div>
    </div>
  );
}

export default EmptyConversationList;

