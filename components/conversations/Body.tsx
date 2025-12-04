"use client";
import React, { Fragment, useEffect, useMemo, useRef, useState } from "react";
import FormChat from "./FormChat";
import { FullMessageType } from "@/app/types";
import useConverstions from "@/app/hook/useConverstions";
import MassegChat from "../chat/MassegChat";
import axios from "axios";
import { ScrollArea } from "../ui/scroll-area";
import { useTheme } from "next-themes";
import { pusherClient } from "@/lib/Pusher";
import { find } from "lodash";
import { ShieldCheck } from "lucide-react";

// import imgese from "../../public/images/download.jpg";
interface MessagesProps {
  intionalMesssages: FullMessageType[];
}
const dayFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  month: "short",
  day: "numeric",
});

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

    const MessagesUpdatHndelr = (newMessage: FullMessageType) => {
      setMessages((current) =>
        current.map((cuerntMessag) => {
          if (cuerntMessag.id == newMessage.id) {
            return newMessage;
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
  const decoratedMessages = useMemo(() => {
    return messages.map((message, index) => {
      const previousMessage = messages[index - 1];
      const currentDate = new Date(message.createdAt ?? new Date());
      const prevDate = previousMessage
        ? new Date(previousMessage.createdAt ?? new Date())
        : null;
      const shouldShowDivider =
        !prevDate ||
        currentDate.toDateString() !== prevDate.toDateString();
      return {
        message,
        divider:
          shouldShowDivider && dayFormatter.format(currentDate).toString(),
      };
    });
  }, [messages]);

  return (
    <div className="relative flex h-full w-full rounded-[32px]">
      <div className="absolute inset-0 rounded-[32px] bg-gradient-to-b from-[#111b21] via-[#0b141a] to-[#0a1014]" />
      <div className="relative flex w-full flex-col overflow-hidden rounded-[32px] border border-white/5 shadow-inner shadow-black/40">
        <div className="flex items-center justify-between border-b border-white/5 bg-[#111b21]/80 px-8 py-3 text-xs text-[#b1bcc5] backdrop-blur">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25d366]/60 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#25d366]" />
            </span>
            Live conversation
          </div>
          <div className="hidden gap-4 sm:flex">
            <span className="flex items-center gap-1">
              <ShieldCheck size={14} /> Secure connection
            </span>
            <span>Last synced a moment ago</span>
          </div>
        </div>
        <ScrollArea
          style={{
            backgroundImage,
          }}
          className="h-[calc(100vh-260px)] w-full bg-cover bg-center bg-repeat px-4 py-2"
        >
          {decoratedMessages.length === 0 ? (
            <div className="flex h-[60vh] flex-col items-center justify-center gap-3 text-center text-[#c3cfd6]">
              <p className="text-lg font-semibold text-[#e9edef]">
                Start the conversation
              </p>
              <p className="max-w-sm text-sm text-[#9aa6af]">
                Send a friendly message, share a file, or drop a voice note to
                kick things off.
              </p>
            </div>
          ) : (
            decoratedMessages.map(({ divider, message }, index) => (
              <Fragment key={message.id}>
                {divider ? (
                  <div className="mx-auto my-4 w-fit rounded-full bg-[#182229] px-4 py-1 text-xs font-semibold text-[#b1bcc5]">
                    {divider}
                  </div>
                ) : null}
                <MassegChat
                  isLast={index === decoratedMessages.length - 1}
                  data={message}
                />
              </Fragment>
            ))
          )}
          <div ref={bottonRef} className="pt-24" />
        </ScrollArea>
        <div className="border-t border-white/5 bg-[#111b21]/90 px-4 py-3 backdrop-blur">
          <FormChat />
          <p className="mt-2 text-center text-[11px] uppercase tracking-[0.2em] text-[#566169]">
            Press Enter to send • Shift + Enter for new line
          </p>
        </div>
      </div>
    </div>
  );
};

export default Body;
