"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function FormChat({
  onSendMessage,
}: {
  onSendMessage: (message: string) => void;
}) {
  const [message, setMessgae] = useState("");
  const handelsubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() !== "") {
      onSendMessage(message);
      setMessgae("");
    }
  };
  return (
    <form onSubmit={handelsubmit} className="w-full px-2">
      <div className="flex w-full  items-center gap-2">
        <Input
          onChange={(e) => {
            setMessgae(e.target.value);
          }}
          type="text"
        />
        <Button type="submit" variant="outline">
          Subscribe
        </Button>
      </div>
    </form>
  );
}

export default FormChat;
