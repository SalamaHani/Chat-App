import React from "react";
import FormChat from "./FormChat";

function Body() {
  return (
    <div className=" flex  w-full ">
      <div className="w-full h-full overflow-hidden  ">
        <div className="max-h-120 min-h-120 overflow-y-auto  ">
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
        <div className="flex h-[57px]  justify-center items-center">
          <FormChat />
        </div>
      </div>
    </div>
  );
}

export default Body;
