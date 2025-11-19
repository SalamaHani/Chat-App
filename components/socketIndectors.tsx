"use client";
import { useSocket } from "@/app/socket-provider";
import React, { useEffect } from "react";

export const SocketIndectors = () => {
  const { isConnected } = useSocket();
  if (isConnected) {
    return (
      <span className=" absolute block rounded-full bg-yellow-500 ring-2  ring-white right-0 top-0 h-2 w-2 " />
    );
  }
  return (
    <span className=" absolute block rounded-full bg-green-500 ring-2  ring-white right-0 top-0 h-2 w-2 " />
  );
};
