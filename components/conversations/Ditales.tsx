"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../animate-ui/components/radix/dialog";
import { AnimateIcon } from "../animate-ui/icons/icon";
import React, { useCallback, useMemo, useState } from "react";
import { Conversations, User } from "@prisma/client";
import { Ellipsis } from "../animate-ui/icons/ellipsis";
import Avatar from "./Avatar";
import useOthouUser from "@/app/hook/useOthouUser";
import { MessageTime } from "../chat/Users";
import { formatLastMessageDate } from "@/utils/format";
import {
  RippleButton,
  RippleButtonRipples,
} from "../animate-ui/components/buttons/ripple";
import useConverstions from "@/app/hook/useConverstions";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
interface DitalesProps {
  conversation: Conversations & {
    users: User[];
  };
}
const Ditales: React.FC<DitalesProps> = ({ conversation }) => {
  const [open, setOpen] = useState(false);
  const [isloding, setIsLoding] = useState(false);
  const route = useRouter();
  const { conversationId } = useConverstions();
  const handelDelete = useCallback(() => {
    setIsLoding(true);
    axios
      .delete(`/api/conversations/${conversationId}`)
      .then(() => {
        route.push("/conversations");
        route.refresh();
        setOpen(true);
        toast.success("Dlelete Convarstions is  Successfily ");
      })
      .catch(() => toast.warning("Somseing went Woring"))
      .finally(() => setIsLoding(false));
  }, [conversationId, route]);
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
        </div>
        <div>
          <div className="w-full gap-2 px-4  flex justify-around italic  items-start ">
            <div>
              <p>Last Seen</p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">
                  {formatLastMessageDate(conversation?.lastMessageAt)} at
                </span>
                <MessageTime
                  createdAt={conversation?.lastMessageAt ?? Date.now}
                />
              </div>
            </div>
            <div>
              <p>Email</p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">
                  {othuruser.email}
                </span>
              </div>
            </div>
          </div>
          <div className="w-full gap-2 px-4 py-4  flex  italic  items-center flex-col ">
            <div className="flex items-center gap-5 pt-5 p-2 ">
              <RippleButton
                onClick={handelDelete}
                className="bg-red-500  hover:bg-red-500"
              >
                {"Delete"}
                <RippleButtonRipples />
              </RippleButton>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default Ditales;
