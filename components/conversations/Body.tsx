"use client";
import React, { useEffect, useRef, useState } from "react";
import FormChat from "./FormChat";
import { FullMessageType } from "@/app/types";
import useConverstions from "@/app/hook/useConverstions";
import MassegChat from "../chat/MassegChat";
import axios from "axios";
import { ScrollArea } from "../ui/scroll-area";
import { useTheme } from "next-themes";
// import imgese from "../../public/images/download.jpg";
interface MessagesProps {
  intionalMesssages: FullMessageType[];
}
const Body: React.FC<MessagesProps> = ({ intionalMesssages }) => {
  const [messages, setMessages] = useState(intionalMesssages);
  const bottonRef = useRef<HTMLDivElement>(null);
  const { conversationId } = useConverstions();
  const { theme } = useTheme();
  const backgroundImage =
    theme === "dark"
      ? "url('/images/download.jpg')"
      : "url('/images/🔥 Whatsapp Backgrounds on WallpaperSafari.jpg')";
  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);
  return (
    <div className=" flex  rounded-xl w-full ">
      <div className="w-full h-full overflow-hidden  ">
        <ScrollArea
          style={{
            backgroundImage,
          }}
          className={`h-125 w-full rounded-md    `}
        >
          {messages.map((msg, index) => {
            return (
              <MassegChat
                isLast={index === messages.length - 1}
                key={msg.id}
                data={msg}
              />
            );
          })}
          <div ref={bottonRef} className="pt-24" />
        </ScrollArea>
        <div className="flex h-[52px] rounded-br-xl bg-white dark:bg-neutral-900  flex-1  justify-center items-center">
          <FormChat />
        </div>
      </div>
    </div>
  );
};

export default Body;
