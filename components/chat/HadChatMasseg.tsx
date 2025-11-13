import { FullConversationstype } from "@/app/types";
import { Home } from "lucide-react";
import React from "react";

function HadChatMasseg() {
  return (
    <header className="flex rounded-t-xl  bg-[#111827] border-b-[1px] border-b-[#4b5563]    h-18 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <Home />
      </div>
    </header>
  );
}

export default HadChatMasseg;
