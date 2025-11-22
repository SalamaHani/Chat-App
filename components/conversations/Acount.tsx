"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../animate-ui/components/radix/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User } from "@prisma/client";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { BadgeCheck } from "lucide-react";
interface edtiAcountProps {
  user: User;
}
export default function EditAccountDialog({ user }: edtiAcountProps) {
  const [name, setName] = useState(user?.name || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [image, setImage] = useState(user?.image || "");
  const [file, setFile] = useState(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleImageUpload = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      setImage(URL.createObjectURL(file));
    }
  };
  const handleSubmit = () => {
    console.log("Submitting:", { name, bio, file });
    // TODO: send to API
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <DropdownMenuItem>
          <BadgeCheck />
          Account
        </DropdownMenuItem>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Account</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-5 p-2">
          {/* Avatar Section */}
          <div className="flex flex-col items-center gap-2">
            <Avatar className="w-24 h-24 border">
              <AvatarImage src={image} />
              <AvatarFallback>{user?.name?.[0] || "?"}</AvatarFallback>
            </Avatar>

            <label className="text-sm text-blue-600 cursor-pointer hover:underline">
              Change Photo
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          </div>

          {/* Name */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Name</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
            />
          </div>

          {/* Bio */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Bio</label>
            <Textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Write something about yourself..."
              className="resize-none"
            />
          </div>

          {/* Submit button */}
          <Button className="w-full mt-3" onClick={handleSubmit}>
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
