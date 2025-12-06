import React from "react";
import { MessageCircle } from "lucide-react";

function EmptyConversation() {
  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      {/* Header placeholder */}
      <div className="flex h-16 shrink-0 items-center bg-[#f0f2f5] dark:bg-[#202c33] border-b border-neutral-200 dark:border-neutral-700">
        <div className="px-4">
          <div className="text-lg font-semibold text-neutral-800 dark:text-white">Chat</div>
          <div className="text-xs text-neutral-500 dark:text-neutral-400">Select a conversation</div>
        </div>
      </div>

      {/* Empty state content */}
      <div className="flex-1 flex flex-col items-center justify-center bg-[#efeae2] dark:bg-[#0b141a]">
        <div className="flex flex-col items-center gap-6 p-8">
          <div className="w-24 h-24 rounded-full bg-[#00a884]/10 flex items-center justify-center">
            <MessageCircle className="w-12 h-12 text-[#00a884]" />
          </div>
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-light text-neutral-700 dark:text-neutral-300">
              Chat App
            </h1>
            <p className="text-neutral-500 dark:text-neutral-400 max-w-md text-sm">
              Select a conversation from the list to start messaging.<br />
              Stay connected with your friends and team.
            </p>
          </div>
        </div>
      </div>

      {/* Footer placeholder */}
      <div className="flex h-16 bg-[#f0f2f5] dark:bg-[#202c33] border-t border-neutral-200 dark:border-neutral-700 items-center justify-center">
        <div className="text-neutral-500 dark:text-neutral-400 text-sm">
          🔒 End-to-end encrypted
        </div>
      </div>
    </div>
  );
}

export default EmptyConversation;
