"use client";
import { usePathname } from "next/navigation";
import useConverstion from "./useConverstions";
import { useMemo } from "react";
import {
  CircleFadingPlus,
  MessageCircleMore,
  PhoneCall,
  Settings2,
} from "lucide-react";

const useRoutes = () => {
  const pathname = usePathname();
  const { conversationId } = useConverstion();
  const route = useMemo(
    () => [
      {
        title: "Chats",
        url: "/conversations",
        icon: MessageCircleMore,
        isActive: pathname === "/conversations" || !!conversationId,
      },
      {
        title: "Calls",
        url: "/calls",
        icon: PhoneCall,
        isActive: pathname === "/calls",
      },
      {
        title: "My condition",
        url: "/condition",
        icon: CircleFadingPlus,
        isActive: pathname === "condition",
      },
      {
        title: "Settings",
        url: "/settings",
        icon: Settings2,
        isActive: pathname === "settings",
      },
    ],
    [pathname, conversationId]
  );
  return route;
};
export default useRoutes;
