/* eslint-disable react/jsx-no-undef */
import React from "react";
import HadChatFrind from "./HadChatFrind";
import SearshChat from "./SearshChat";
import { faveretlisting } from "@/utils/action";
import Users from "./Users";

// import { AnimateIcon } from "../animate-ui/icons/icon";
// import { SlidersHorizontal } from "../animate-ui/icons/sliders-horizontal";
import { Highlight } from "../animate-ui/primitives/effects/highlight";
import {
  Menu,
  MenuGroup,
  MenuItem,
  MenuPanel,
  MenuTrigger,
} from "../animate-ui/components/base/menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { setstring } from "@/utils/format";
import { Pin } from "lucide-react";

// import { Separator } from "../ui/separator";

async function ChatFrinds() {
  const users = await faveretlisting();
  //  const  labels = { pinned: 'Pinned Items', unpinned: 'All Items' },

  //  const  labelMotionProps = {
  //     initial: { opacity: 0 },
  //     animate: { opacity: 1 },
  //     exit: { opacity: 0 },
  //     transition: { duration: 0.22, ease: 'easeInOut' },
  //  }
  return (
    <div className="bg-[#111827] rounded-xl  overflow-hidden h-full  w-full">
      <HadChatFrind />
      <SearshChat />
      <div
        className={
          "space-y-2 relative px-2 min-h-120 max-h-120 overflow-y-auto"
        }
      >
        {users.map((user) => {
          return <Users key={user.id} user={user} />;
        })}
      </div>
    </div>
  );
}

export default ChatFrinds;
