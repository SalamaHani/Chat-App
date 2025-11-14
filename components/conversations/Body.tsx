import React from "react";
import FormChat from "./FormChat";

function Body() {
  return (
    <div className=" flex  rounded-xl w-full ">
      <div className="w-full h-full overflow-hidden  ">
        <div className="max-h-125 min-h-125   overflow-y-auto  ">
          {/* {messages.map((msg, index) => {
            return (
              <MassegChat
                key={index}
                sender={msg.sender}
                messgage={msg.message}
                isOwnMasseg={msg.sender === username}
              />
            );
          })} */}
        </div>
        <div className="flex h-[52px]  flex-1  justify-center items-center">
          <FormChat />
        </div>
      </div>
    </div>
  );
}

export default Body;
