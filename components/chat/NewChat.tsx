"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../animate-ui/components/radix/dialog";
import { AnimateIcon } from "../animate-ui/icons/icon";
import { CirclePlus } from "../animate-ui/icons/circle-plus";
import { Button } from "../ui/button";
import Users from "./Users";
import { UsersRound } from "../animate-ui/icons/users-round";
import { Separator } from "../ui/separator";
import React, { useCallback, useMemo, useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { User } from "@prisma/client";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import AvatarChat from "../conversations/AvatarChat";
import { Checkbox } from "../animate-ui/components/radix/checkbox";
import { Badge } from "../ui/badge";
import { X } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { setstring } from "@/utils/format";
interface NewchatProps {
  users: User[];
}
const NewChat: React.FC<NewchatProps> = ({ users }) => {
  const [open, setOpen] = useState(false);
  const [openg, setOpeng] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [loding, setloding] = useState(false);
  const router = useRouter();
  const toggleUser = useCallback((user: User) => {
    setSelectedUsers((prev) =>
      prev.includes(user)
        ? prev.filter((usere) => usere.id != user?.id)
        : [...prev, user]
    );
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter((u) =>
      u.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, users]);

  const isValid = groupName.trim().length > 0 && selectedUsers.length >= 1;
  const options = selectedUsers.map((user) => ({
    value: user.id,
    label: user.name,
  }));
  console.log(options);
  const handelCreateGroup = () => {
    if (!isValid) return;
    console.log("Creating group:", {
      name: groupName,
      members: options,
    });

    setloding(true);
    const data = { name: groupName, members: options };
    axios
      .post("/api/conversations", {
        ...data,
        isGroup: true,
      })
      .then(() => {
        router.refresh();
        setOpeng(false);
        setOpen(false);
      })
      .catch(() => {
        toast.warning("waring data in valid");
      })
      .finally(() => {
        setloding(false);
      });
  };
  const handelDeleteUser = (userId: string) => {
    const newUsers = selectedUsers.filter((user) => user.id != userId);
    setSelectedUsers(newUsers);
  };
  const format = ({ user }: { user: User }) => {
    return (
      <Badge
        className="bg-sidebar-primary my-3 text-white flex justify-between items-center"
        variant="outline"
      >
        <div className=" flex items-center gap-1 ">
          <Avatar className="w-5 h-5 bg-neutral-400 dark:bg-neutral-100">
            <AvatarImage src={`${user.image}`} alt="@shadcn" />
            <AvatarFallback className="bg-neutral-300 dark:bg-neutral-100">
              {setstring(user.name)}
            </AvatarFallback>
          </Avatar>
          {user.name}
        </div>
        <button
          onMouseDown={() => handelDeleteUser(user.id)}
          className=" flex justify-center items-center cursor-pointer w-3 h-3"
        >
          <X />
        </button>
      </Badge>
    );
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <AnimateIcon animateOnHover>
          <CirclePlus size={20} />
        </AnimateIcon>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px] p-0 ">
        <DialogHeader className="p-4">
          <DialogTitle>New Chat</DialogTitle>
          <DialogDescription>
            Start a new chat or create a group.
          </DialogDescription>
        </DialogHeader>
        <div className=" overflow-hidden h-full  w-full">
          <div className="  flex-1 flex  flex-col p-4  bg-white dark:bg-neutral-950  shrink-0  gap-2  ">
            <div
              className={`${
                true ? ` bg-neutral-100 dark:bg-neutral-800` : `bg-none`
              } dark:hover:bg-neutral-800   py-2  bg-neutral-100  hover:bg-neutral-200 flex items-center justify-between cursor-pointer  rounded-sm  `}
            >
              <Dialog open={openg} onOpenChange={setOpeng}>
                <DialogTrigger>
                  <div className="flex px-4 items-center gap-2 cursor-pointer">
                    <div className="relative">
                      <div className="rounded-full flex justify-center items-center ring-1 ring-white h-12 w-12">
                        <AnimateIcon animateOnHover>
                          <UsersRound />
                        </AnimateIcon>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold">New Group</div>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[400px] p-0">
                  <DialogHeader className="p-4">
                    <DialogTitle>New Group</DialogTitle>
                    <DialogDescription className="text-sx text-muted-foreground">
                      Provide a group name and select
                    </DialogDescription>
                  </DialogHeader>
                  <div className="p-4 flex flex-col gap-4">
                    <div>
                      <Label htmlFor="groupName" className="mb-4">
                        Group Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="groupName"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                        placeholder="Enter group name"
                      />
                    </div>

                    {isValid ? (
                      <ScrollArea className={`h-[70px] w-full   p-2}`}>
                        <div
                          className={`w-full  ${
                            selectedUsers.length >= 2 ? `h-[50px] ` : ``
                          }`}
                        >
                          <div className={` relative`}>
                            {/* Filter Pills */}
                            <div
                              className={`flex dark:bg-black ${
                                selectedUsers.length >= 2
                                  ? `flex-col absolute left-0 top-0`
                                  : `flex-row block`
                              } items-center w-full  max-w-lg border   dark:border-none rounded-xl    bg-white shadow-sm overflow-hidden`}
                            >
                              <div
                                className={`flex z-999999 ${
                                  selectedUsers.length >= 2
                                    ? `flex-wrap w-full   justify-start `
                                    : `flex-nowrap`
                                }     space-x-2  px-2 `}
                              >
                                {selectedUsers.map((user, index) => (
                                  <React.Fragment key={index}>
                                    {format({ user })}
                                  </React.Fragment>
                                ))}
                              </div>
                              <div className=" flex flex-1 w-full space-x-2  px-2">
                                <input
                                  type="text"
                                  placeholder="Sersh User"
                                  onChange={(e) => setSearch(e.target.value)}
                                  className={` p-2 bg-gray-50 dark:bg-black  flex-1   border-none  outline-none transition-all duration-300  focus:border-none  rounded-xl   text-base dark:placeholder:text-white placeholder:text-gray-500 `}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </ScrollArea>
                    ) : null}
                  </div>
                  <div
                    className={`p-4 flex flex-col gap-2  ${
                      selectedUsers.length >= 2 ? `mt-3 ` : ``
                    }`}
                  >
                    <ScrollArea className="h-[250px] w-full rounded-md border p-2">
                      <h4 className="text-sm mb-2 font-medium">
                        Select Members
                      </h4>
                      <Separator className="mb-3" />
                      <div className="flex flex-col gap-3">
                        {filteredUsers.map((user) => (
                          <div
                            key={user.id}
                            className="flex items-center justify-between p-2 rounded-lg hover:bg-accent cursor-pointer"
                            onClick={() => toggleUser(user)}
                          >
                            <div className="flex items-center gap-3">
                              <AvatarChat user={user} />
                              <span className="font-medium">{user.name}</span>
                            </div>
                            <Checkbox
                              className=" data-[state=checked]:bg-sidebar-primary  "
                              checked={selectedUsers.includes(user)}
                            />
                          </div>
                        ))}
                      </div>
                    </ScrollArea>

                    <div className="flex justify-between items-center mt-4">
                      <p className="text-xs text-muted-foreground">
                        {selectedUsers.length} members selected
                      </p>
                      <Button
                        className="bg-sidebar-primary hover:bg-sky-500"
                        disabled={!isValid}
                        onClick={handelCreateGroup}
                      >
                        Create Group
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <ScrollArea className="h-90 w-full rounded-md ">
            <div className="p-4">
              <h4 className="mb-4 text-sm leading-none font-medium">
                All Contact
              </h4>
              <Separator className="my-2" />
              {users.map((user) => (
                <React.Fragment key={user.id}>
                  <Users user={user} closeDialog={() => setOpen(false)} />
                </React.Fragment>
              ))}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default NewChat;
