"use client";

import { Search } from "lucide-react";
import React, { useState } from "react";
import { Input } from "../ui/input";

function SearshChat() {
  const [isOpen, setIsopen] = useState(false);

  return (
    <div className="flex h-16 items-center border-b border-white/5 px-6">
      <div className="relative flex w-full items-center">
        <Search className="pointer-events-none absolute left-4 h-5 w-5 text-[#8696a0]" />
        <Input
          type="text"
          placeholder="Search or start a new chat"
          onFocus={() => setIsopen(true)}
          onBlur={() => setIsopen(false)}
          className={`h-11 w-full rounded-full border border-transparent bg-[#202c33] pl-11 pr-4 text-sm text-[#e9edef] placeholder:text-[#8696a0] focus-visible:ring-2 focus-visible:ring-[#00a884] ${
            isOpen ? "ring-2 ring-[#00a884]" : ""
          }`}
        />
      </div>
    </div>
  );
}

export default SearshChat;