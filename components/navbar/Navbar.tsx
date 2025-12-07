"use client";
import React from "react";
import Continer from "../global/Continer";

import DarkMode from "./DarkMode";
import LinksDropdown from "./LinksDropdown";
import { Session } from "@/lib/auth";
import { MessageCircle } from "lucide-react";

function Navbar({ session }: { session: Session | null }) {
  return (
    <>
      <nav
        className={` absolute  top-0 left-0 w-full z-50 transition-all duration-500 `}
      >
        <Continer className="flex justify-between md:flex-row md:justify-between md:items-center flex-wrap py-5 gap-4">
          {/* App Logo */}
          <div className="flex items-center gap-2 cursor-pointer">
            <MessageCircle className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-primary">Chat App</span>
          </div>
          <div className=" flex gap-4 items-center  ">
            <DarkMode />
            <LinksDropdown session={session} />
          </div>
        </Continer>
      </nav>
    </>
  );
}

export default Navbar;
