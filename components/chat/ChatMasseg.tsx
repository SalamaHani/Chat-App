"use client";
import React, { useEffect, useState } from "react";
import HadChatMasseg from "./HadChatMasseg";
import FormChat from "./FormChat";
import MassegChat from "./MassegChat";
// import { socket } from "@/lib/socketClinet";

function ChatMasseg() {
  const [messages, setMessgages] = useState<
    { sender: string; message: string }[]
  >([]);
  const [username, setUsername] = useState("");
  const handelSendMessgage = (message: string) => {
    const data = { message, sender: username };
    setMessgages((prev) => [...prev, { sender: username, message }]);
    // socket.emit("message", data);
    console.log(message);
  };
  // useEffect(() => {
  //   socket.on("message", (data) => {
  //     setMessgages((prev) => [...prev, data]);
  //   });
  //   return () => {
  //     socket.off("join_room");
  //     socket.off("message");
  //   };
  // }, []);
  return (
    <div className=" relative  pr-4 bg-background w-full  rounded-xl">
      <header className="flex  h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4"></div>
      </header>
      <div className="flex flex-1 w-full  rounded-xl gap-4 p-4 pt-0">
        <div className="flex flex-1 rounded-xl ">
          <div className="bg-[#2e4a71] rounded-xl  w-full h-full">
            <HadChatMasseg />
            <div className=" flex  w-full ">
              <div className="w-full h-full overflow-hidden  ">
                <div className="max-h-120 min-h-120 overflow-y-auto ">
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
        </div>
      </div>
    </div>
  );
}

export default ChatMasseg;
