import React from "react";
import HadChatFrind from "./HadChatFrind";
// import { Separator } from "../ui/separator";

function ChatFrinds() {
  return (
    <div className="bg-[#111827] rounded-l-xl border-r-[#4b5563] border-r-[1px]  overflow-hidden  w-[30%]">
      <HadChatFrind />
      {/* <Separator
        orientation="vertical"
        className="mr-2 data-[orientation=vertical]:h-full"
      /> */}
    </div>
  );
}

export default ChatFrinds;
