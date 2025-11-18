"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../animate-ui/components/radix/dialog";
import { AnimateIcon } from "../animate-ui/icons/icon";
import React, { useMemo, useState } from "react";
import { Conversations, User } from "@prisma/client";
import { Ellipsis } from "../animate-ui/icons/ellipsis";
import Avatar from "./Avatar";
import useOthouUser from "@/app/hook/useOthouUser";
import {
  RippleButton,
  RippleButtonRipples,
} from "../animate-ui/components/buttons/ripple";
interface DitalesProps {
  conversation: Conversations & {
    users: User[];
  };
}
const Ditales: React.FC<DitalesProps> = ({ conversation }) => {
  const [open, setOpen] = useState(false);
  const othuruser = useOthouUser(conversation);
  const textstust = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} mempers`;
    }
    return "Active";
  }, [conversation]);
  const titel = useMemo(() => {
    return conversation.name || othuruser.name;
  }, [conversation.name, othuruser.name]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <AnimateIcon animateOnHover>
          <Ellipsis size={20} />
        </AnimateIcon>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px] p-0 ">
        <DialogHeader className="p-4">
          <DialogTitle>Ovareviw</DialogTitle>
        </DialogHeader>
        <div className="w-full gap-2 px-4  flex justify-between italic items-center flex-col ">
          <Avatar user={othuruser} />
          <div>{titel}</div>
          <div className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
            {textstust}
          </div>
          <div className="flex items-center gap-5 pt-5 p-2 ">
            <RippleButton className="bg-red-500">
              {"Delete Chat"}
              <RippleButtonRipples />
            </RippleButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default Ditales;
