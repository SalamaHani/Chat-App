import React from "react";
import HadChatFrind from "./HadChatFrind";
import SearshChat from "./SearshChat";
import { faveretlisting } from "@/utils/action";
import Users from "./Users";
// import { Separator } from "../ui/separator";

async function ChatFrinds() {
  const users = await faveretlisting();
  console.log(users)
  return (
    <div className="bg-[#111827] rounded-l-xl border-r-[#4b5563] border-r-[1px]  overflow-hidden  w-[30%]">
      <HadChatFrind />
      <SearshChat />
      <div className="px-4">
        {users.map((user) => {
          return <Users key={user.id} user={user} />;
        })}
      </div>

      {/* <Separator
        orientation="vertical"
        className="mr-2 data-[orientation=vertical]:h-full"
      /> */}
    </div>
  );
}

export default ChatFrinds;
