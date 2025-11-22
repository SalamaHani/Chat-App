"use client";

import { BadgeCheck, Bell, ChevronsUpDown, CreditCard } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { setstring } from "@/utils/format";
import { Logout } from "./logout";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./animate-ui/components/radix/dialog";
import { CldUploadButton } from "next-cloudinary";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "sonner";
import { User } from "@prisma/client";

interface PropsUser {
  user: User;
}
export function NavUser({ user }: PropsUser) {
  const { isMobile } = useSidebar();
  const [name, setName] = useState(user?.name || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCldUploadM, setIsCldUploadM] = useState(false);
  const [isLoding, setIsloding] = useState(false);
  const route = useRouter();
  const {
    handleSubmit,
    setValue,
    watch,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: user?.name,
      image: user?.image,
      bio: user?.bio,
    },
  });
  // eslint-disable-next-line react-hooks/incompatible-library
  const image = watch("image");

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsloding(true);
    axios
      .post("/api/settings", data)
      .then(() => {
        route.refresh();
        setIsDialogOpen(false);
      })
      .catch(() => toast.error("Somtihing Wroing !"))
      .finally(() => setIsloding(false));
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handelUlod = (resault: any) => {
    setValue("image", resault?.info?.secure_url, {
      shouldValidate: true,
    });
  };
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  src={image || user?.image || ""}
                  alt={user?.name}
                />
                <AvatarFallback className="rounded-lg">
                  {setstring(user?.name || "")}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user?.name}</span>
                <span className="truncate text-xs">{user?.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user?.image || ""} alt={user?.name} />
                  <AvatarFallback className="rounded-lg">
                    {`${setstring(user?.name || "")} `}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user?.name}</span>
                  <span className="truncate text-xs">{user?.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <DropdownMenuItem
                    onSelect={(event) => {
                      event.preventDefault(); // prevent dropdown from closing
                      setIsDialogOpen(true); // open dialog
                    }}
                  >
                    <BadgeCheck />
                    Account
                  </DropdownMenuItem>
                </DialogTrigger>

                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">
                      Account
                    </DialogTitle>
                  </DialogHeader>

                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-5 p-2">
                      {/* Avatar Section */}
                      <div className="flex flex-col items-center gap-2">
                        <Avatar className="w-24 h-24 border">
                          <AvatarImage src={image || user?.image || ""} />
                          <AvatarFallback>
                            {user?.name?.[0] || "?"}
                          </AvatarFallback>
                        </Avatar>
                        <CldUploadButton
                          options={{ maxFiles: 1 }}
                          onSuccess={handelUlod}
                          uploadPreset="chatimge"
                        >
                          <label className="text-sm text-blue-600 cursor-pointer hover:underline">
                            Change Photo
                          </label>
                        </CldUploadButton>
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
                      <Button
                        className="w-full mt-3"
                        type="submit"
                        disabled={isLoding}
                        onClick={() => setIsDialogOpen(false)}
                      >
                        Save Changes
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
              <DropdownMenuItem>
                <CreditCard />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />

            <DropdownMenuItem>
              Logout
              <Logout />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
