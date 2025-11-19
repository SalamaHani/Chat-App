"use client";

import React, { useState, useCallback, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "../animate-ui/components/radix/dialog";
import { AnimateIcon } from "../animate-ui/icons/icon";
import { UsersRound } from "../animate-ui/icons/users-round";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../animate-ui/components/radix/checkbox";
import Avatar from "../conversations/Avatar";
import { User } from "@prisma/client";
import { Button } from "../ui/button";

interface NewGroupProps {
  users: User[];
  isOpen: boolean;
}

const NewChat: React.FC<NewGroupProps> = ({ users, isOpen }) => {
  const [open, setOpen] = useState(isOpen);
  const [groupName, setGroupName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [search, setSearch] = useState("");

  const toggleUser = useCallback((userId: string) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter((u) =>
      u.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, users]);

  const isValid = groupName.trim().length > 0 && selectedUsers.length >= 2;

  const handleCreate = () => {
    if (!isValid) return;
    console.log("Creating group:", { name: groupName, members: selectedUsers });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
          <DialogDescription className="text-sm text-muted-foreground">
            Provide a group name and select at least two members for the group.
          </DialogDescription>
        </DialogHeader>

        <div className="p-4 flex flex-col gap-4">
          <div>
            <Label htmlFor="groupName">
              Group Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="groupName"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="Enter group name"
            />
          </div>

          <div>
            <Label>Search Members</Label>
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Type a name..."
            />
          </div>

          <ScrollArea className="h-[250px] w-full rounded-md border p-2">
            <h4 className="text-sm mb-2 font-medium">Select Members</h4>
            <Separator className="mb-3" />

            <div className="flex flex-col gap-3">
              {filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-accent cursor-pointer"
                  onClick={() => toggleUser(user.id)}
                >
                  <div className="flex items-center gap-3">
                    <Avatar user={user} />
                    <span className="font-medium">{user.name}</span>
                  </div>
                  <Checkbox checked={selectedUsers.includes(user.id)} />
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="flex justify-between items-center mt-4">
            <p className="text-xs text-muted-foreground">
              {selectedUsers.length} members selected
            </p>
            <Button disabled={!isValid} onClick={handleCreate}>
              Create Group
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewChat;
