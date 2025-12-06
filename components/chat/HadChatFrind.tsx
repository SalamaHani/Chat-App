
import NewChat from "./NewChat";
import Filterchat from "./Filterchat";
import { User } from "@prisma/client";

interface HeadProps {
  users: User[];
}

function HadChatFrind({ users }: HeadProps) {
  return (
    <header className="flex h-14 shrink-0 items-center gap-2 bg-[#f0f2f5] dark:bg-[#202c33] px-4 transition-[width,height] ease-linear">
      <div className="flex items-center justify-between w-full gap-2">
        <p className="text-xl font-bold tracking-tight text-neutral-800 dark:text-white">Chats</p>
        <div className="flex items-center justify-between gap-4">
          <NewChat users={users} isButton={false} />
          <Filterchat />
        </div>
      </div>
    </header>
  );
}

export default HadChatFrind;


