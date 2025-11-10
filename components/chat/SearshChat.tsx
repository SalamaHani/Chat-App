"use client";
import { Search } from "lucide-react";
import React, { useState } from "react";
import { Input } from "../ui/input";

function SearshChat() {
  const [isOpen, setIsopen] = useState(false);
  return (
    <div className="  flex-1 flex rounded-t-xl rounded-tr-none px-4      bg-[#111827]  h-18 shrink-0  gap-2  ">
      <Input
        type="text"
        placeholder="Search or Start new chat"
        //   onChange={(e) => {
        //     setParmes(e.target.value);
        //     handleSearch(e.target.value);
        //   }}
        onFocus={() => {
          setIsopen(true);
        }}
        onBlur={() => {
          setIsopen(false);
        }}
        className={`   flex-1 px-3   border-none    rounded-sm  ${
          isOpen ? "" : ""
        }  text-base dark:placeholder:text-white placeholder:text-gray-500 `}
      />
    </div>
  );
}

export default SearshChat;
