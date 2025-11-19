"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../animate-ui/components/radix/dialog";
import { AnimateIcon } from "../animate-ui/icons/icon";
import { Separator } from "../ui/separator";
import React, { useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { UsersRound } from "../animate-ui/icons/users-round";
import Avatar from "../conversations/Avatar";
import { Checkbox } from "../animate-ui/components/radix/checkbox";
import { User } from "@prisma/client";

interface NewGroupProps {
  users: User[];
  isOpen: boolean;
}

const NewGroup: React.FC<NewGroupProps> = ({ users, isOpen }) => {
  const [open, setOpen] = useState(isOpen);

  // Track selected users
  const [selectedUsers, setSelectedUsers] = useState<Record<string, boolean>>(
    {}
  );

  const toggleUser = (id: string, value: boolean) => {
    setSelectedUsers((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <div className="flex px-4 items-center gap-2 cursor-pointer">
          <div className="relative">
            <div className="relative rounded-full flex justify-center items-center ring-1 ring-white h-12 w-12">
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
          <DialogTitle>Create New Group</DialogTitle>
        </DialogHeader>

        {/* Group Name */}
        <div className="flex flex-col p-4 bg-white dark:bg-neutral-950 gap-2">
          <Label>
            Name Group <span className="text-red-500">*</span>
          </Label>
          <Input name="Name" id="Name" type="text" />
        </div>

        {/* Members List */}
        <ScrollArea className="h-90 w-full rounded-md">
          <div className="p-4">
            <h4 className="mb-4 text-sm font-medium">Select Members</h4>
            <Separator className="my-2" />

            {users.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <div className="flex items-center gap-3">
                  <Avatar user={user} />
                  <span className="font-medium">{user.name}</span>
                </div>

                <Checkbox
                  checked={!!selectedUsers[user.id]}
                  onCheckedChange={(value) => toggleUser(user.id, !!value)}
                />
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default NewGroup;
