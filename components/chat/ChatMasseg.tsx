"use client";
import React, { useEffect, useState } from "react";
import HadChatMasseg from "./HadChatMasseg";
import FormChat from "./FormChat";
import MassegChat from "./MassegChat";
import { socket } from "@/lib/socketClinet";

function ChatMasseg() {
  const [messages, setMessgages] = useState<
    { sender: string; message: string }[]
  >([]);
  const [username, setUsername] = useState("");
  const handelSendMessgage = (message: string) => {
    const data = { message, sender: username };
    setMessgages((prev) => [...prev, { sender: username, message }]);
    socket.emit("message", data);
    console.log(message);
  };
  useEffect(() => {
    socket.on("message", (data) => {
      setMessgages((prev) => [...prev, data]);
    });
    return () => {
      socket.off("join_room");
      socket.off("message");
    };
  }, []);
  return (
    <div className="bg-[#1f2937] rounded-xl rounded-bl-none w-[70%] h-full">
      <HadChatMasseg />
      <div className=" flex  w-full ">
        <div className="w-full  ">
          <div className="h-[530px] overflow-y-hidden bg-amber-200">
            {messages.map((msg, index) => {
              return (
                <MassegChat
                  key={index}
                  sender={msg.sender}
                  messgage={msg.message}
                  isOwnMasseg={msg.sender === username}
                />
              );
            })}
          </div>
          <div className="flex h-[57px]  justify-center items-center">
            <FormChat onSendMessage={handelSendMessgage} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatMasseg;
