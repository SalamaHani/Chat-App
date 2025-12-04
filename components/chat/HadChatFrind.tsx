
import NewChat from "./NewChat";
import Filterchat from "./Filterchat";
import { User } from "@prisma/client";
import { Sparkles } from "lucide-react";

interface HeadProps {
  users: User[];
}

function HadChatFrind({ users }: HeadProps) {
  return (
    <header className="flex h-20 shrink-0 items-center rounded-t-[28px] bg-[#202c33] px-6 text-[#e9edef] shadow-[0_2px_24px_rgba(0,0,0,0.35)] transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-16">
      <div className="flex w-full items-center justify-between gap-4">
        <div>
          <p className="text-lg font-semibold tracking-wide">Chats</p>
          <p className="flex items-center gap-1 text-xs font-medium text-[#8696a0]">
            <Sparkles size={14} className="text-[#00a884]" />
            Stay connected with your people
          </p>
        </div>
        <div className="flex items-center gap-3">
          <NewChat users={users} isButton={false} />
          <Filterchat />
        </div>
      </div>
    </header>
  );
}

export default HadChatFrind;
