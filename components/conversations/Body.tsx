"use client";
import React, { useEffect, useRef, useState } from "react";
import FormChat from "./FormChat";
import { FullMessageType } from "@/app/types";
import useConverstions from "@/app/hook/useConverstions";
import MassegChat from "../chat/MassegChat";
import PendingMessageChat from "../chat/PendingMessageChat";
import axios from "axios";
import { ScrollArea } from "../ui/scroll-area";
import { useTheme } from "next-themes";
import { pusherClient } from "@/lib/Pusher";
import { find } from "lodash";
import { usePendingMessages } from "@/app/context/PendingMessagesContext";

interface MessagesProps {
  intionalMesssages: FullMessageType[];
  isGroup?: boolean;
}

const Body: React.FC<MessagesProps> = ({ intionalMesssages, isGroup }) => {
  const [messages, setMessages] = useState(intionalMesssages);
  const bottonRef = useRef<HTMLDivElement>(null);
  const { conversationId } = useConverstions();
  const { theme } = useTheme();
  const { pendingMessages } = usePendingMessages();

  // Filter pending messages for current conversation
  const conversationPendingMessages = pendingMessages.filter(
    (msg) => msg.conversationId === conversationId
  );

  // WhatsApp style background
  const backgroundImage =
    theme === "dark"
      ? "url('/images/download.jpg')"
      : "url('/images/🔥 Whatsapp Backgrounds on WallpaperSafari.jpg')";

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);

  useEffect(() => {
    const MessagesHndelr = (message: FullMessageType) => {
      axios.post(`/api/conversations/${conversationId}/seen`);
      setMessages((current) => {
        if (find(current, { id: message.id })) {
          return current;
        }
        return [...current, message];
      });
    };

    const MessagesUpdatHndelr = (newMessage: Partial<FullMessageType> & { id: string }) => {
      setMessages((current) =>
        current.map((cuerntMessag) => {
          if (cuerntMessag.id == newMessage.id) {
            // Merge the update with existing message to preserve sender data
            return {
              ...cuerntMessag,
              ...newMessage,
              sender: newMessage.sender || cuerntMessag.sender,
              seen: newMessage.seen || cuerntMessag.seen,
            };
          }
          return cuerntMessag;
        })
      );
    };

    pusherClient.subscribe(conversationId);
    bottonRef?.current?.scrollIntoView();
    pusherClient.bind("messages:new", MessagesHndelr);
    pusherClient.bind("message:update", MessagesUpdatHndelr);
    return () => {
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind("messages:new", MessagesHndelr);
      pusherClient.unbind("message:update", MessagesUpdatHndelr);
    };
  }, [conversationId]);

  // Scroll to bottom when pending messages change
  useEffect(() => {
    bottonRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversationPendingMessages.length]);

  return (
    <div className="flex flex-col flex-1 w-full h-full overflow-hidden">
      {/* Chat messages area with WhatsApp background */}
      <div className="flex-1 w-full overflow-hidden ">
        <ScrollArea
          style={{
            backgroundImage,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="h-full w-full"
        >
          <div className="flex flex-col min-h-full py-2">
            {/* Regular messages */}
            {messages.map((msg, index) => (
              <MassegChat
                isLast={index === messages.length - 1 && conversationPendingMessages.length === 0}
                key={msg.id}
                data={msg}
                isGroup={isGroup}
              />
            ))}

            {/* Pending messages (optimistic) */}
            {conversationPendingMessages.map((msg) => (
              <PendingMessageChat key={msg.id} data={msg} />
            ))}

            <div ref={bottonRef} className="pt-20" />
          </div>
        </ScrollArea>
      </div>

      {/* WhatsApp style input area - light gray */}
      <div className="flex h-16 items-center bg-[#f0f2f5] dark:bg-[#202c33] px-4">
        <FormChat />
      </div>
    </div>
  );
};

export default Body;



