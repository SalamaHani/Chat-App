"use client";
import React from "react";
import NewChat from "./NewChat";
import Filterchat from "./Filterchat";
import SearshChat from "./SearshChat";

function HadChatFrind() {
  return (
    <div>
      <header className="flex rounded-xl  bg-[#111827]  h-18 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex items-center justify-between w-full gap-2 px-4">
          <p className=" italic font-medium text-xl">Chats</p>
          <div className="flex items-center justify-between  gap-6 ">
            <NewChat />
            <Filterchat />
          </div>
        </div>
      </header>
    </div>
  );
}

export default HadChatFrind;
