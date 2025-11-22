"use client";
import { usePathname } from "next/navigation";
import useConverstion from "./useConverstions";
import { useMemo } from "react";
import {
  BadgeCheck,
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
        title: "Account",
        url: "/account",
        icon: BadgeCheck,
        isActive: pathname === "/account",
      },
      {
        title: "Settings",
        url: "/settings",
        icon: Settings2,
        isActive: pathname === "/settings",
      },
    ],
    [pathname, conversationId]
  );
  return route;
};
export default useRoutes;
