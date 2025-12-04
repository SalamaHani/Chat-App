import React from "react";

function EmptyConversation() {
  return (
    <div className="flex h-full w-full rounded-[32px] border border-white/5 bg-[#0b141a] shadow-2xl shadow-black/40">
      <div className="flex flex-1 flex-col rounded-[32px]">
        <header className="flex h-20 shrink-0 items-center rounded-t-[32px] bg-[#202c33] px-6 text-[#e9edef] shadow-[0_1px_0_rgba(255,255,255,0.05)]">
          <div>
            <div className="text-sm font-semibold">WhatsApp Web</div>
            <div className="text-xs text-[#8696a0]">
              Notifications are end-to-end encrypted
            </div>
          </div>
        </header>
        <div className="flex flex-1 flex-col items-center justify-center gap-4 bg-[#0b141a]/80 text-center text-[#e9edef]">
          <h1 className="text-2xl font-semibold">Keep your phone connected</h1>
          <p className="max-w-md text-sm text-[#8696a0]">
            WhatsApp connects to your phone to sync messages. To reduce data
            usage, connect your phone to Wi-Fi.
          </p>
        </div>
      </div>
    </div>
  );
}

export default EmptyConversation;
