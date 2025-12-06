"use client";

import { Search } from "lucide-react";
import React, { useState } from "react";
import { Input } from "../ui/input";

function SearshChat() {
  const [isOpen, setIsopen] = useState(false);

  return (
    <div className="flex h-14 items-center gap-2 bg-slate-100 dark:bg-neutral-800 px-4">
      <div className="relative flex w-full items-center">
        <Search className="pointer-events-none absolute left-3 h-4 w-4 text-slate-500 dark:text-neutral-400" />
        <Input
          type="text"
          placeholder="Search or start a new chat"
          onFocus={() => {
            setIsopen(true);
          }}
          onBlur={() => {
            setIsopen(false);
          }}
          className={`h-9 w-full rounded-lg border-0 bg-white dark:bg-neutral-700 pl-10 pr-4 text-sm shadow-sm placeholder:text-slate-400 dark:placeholder:text-neutral-400 focus-visible:ring-2 focus-visible:ring-sidebar-primary/50 dark:text-white ${isOpen ? "ring-2 ring-sidebar-primary/50" : ""
            }`}
        />
      </div>
    </div>
  );
}

export default SearshChat;

