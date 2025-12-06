"use client";

import { Search } from "lucide-react";
import React, { useState } from "react";
import { Input } from "../ui/input";

function SearshChat() {
  const [isOpen, setIsopen] = useState(false);

  return (
    <div className="flex h-14 items-center gap-2 bg-secondary dark:bg-secondary px-4">
      <div className="relative flex w-full items-center">
        <Search className="pointer-events-none absolute left-3 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search or start a new chat"
          onFocus={() => {
            setIsopen(true);
          }}
          onBlur={() => {
            setIsopen(false);
          }}
          className={`h-9 w-full rounded-lg border-0 bg-card dark:bg-card pl-10 pr-4 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary/50 text-foreground ${isOpen ? "ring-2 ring-primary/50" : ""
            }`}
        />
      </div>
    </div>
  );
}

export default SearshChat;

