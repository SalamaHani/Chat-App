"use client";
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
import { Button } from "../ui/button";

export default function NewChat({ isButton }: { isButton?: boolean }) {
  return (
    <Dialog>
      <DialogTrigger>
        {isButton ? (
          <Button>new chat</Button>
        ) : (
          <AnimateIcon animateOnHover>
            <CirclePlus size={20} />
          </AnimateIcon>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>new chat</DialogTitle>
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
