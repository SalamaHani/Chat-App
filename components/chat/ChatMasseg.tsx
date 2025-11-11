import React from "react";
import HadChatMasseg from "./HadChatMasseg";
import FormChat from "./FormChat";
import MassegChat from "./MassegChat";

function ChatMasseg() {
  return (
    <div className="bg-[#1f2937] rounded-xl rounded-bl-none w-[70%] h-full">
      <HadChatMasseg />
      <div className=" flex  w-full ">
        <div className="w-full  ">
          <div className="h-[530px] overflow-y-hidden bg-amber-200">
            <MassegChat />
          </div>
          <div className="flex h-[57px]  justify-center items-center">
            <FormChat />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatMasseg;
