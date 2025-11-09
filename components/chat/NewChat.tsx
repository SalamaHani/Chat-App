import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../animate-ui/components/radix/dialog";
import { AnimateIcon } from "../animate-ui/icons/icon";
import { CirclePlus } from "../animate-ui/icons/circle-plus";

function NewChat() {
  return (
    <Dialog >
      <DialogTrigger>
        <AnimateIcon animateOnHover>
          <CirclePlus size={20} />
        </AnimateIcon>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Chat</DialogTitle>
          <DialogDescription>Dialog Description</DialogDescription>
        </DialogHeader>
        <p>Dialog Content</p>
        <DialogFooter>
          <button>Accept</button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default NewChat;
