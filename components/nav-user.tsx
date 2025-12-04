"use client";

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CloudUpload,
  CreditCard,
} from "lucide-react";

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
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./animate-ui/components/radix/dialog";
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

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoding, setIsloding] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(user.image);
  const route = useRouter();
  const {
    handleSubmit,
    setValue,
    register,
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

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsloding(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "chatimge"); // Cloudinary unsigned preset

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dg6x1vecd/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      setValue("image", data.secure_url);
      setImagePreview(data.secure_url);
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setIsloding(false);
    }
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
                <AvatarFallback className="rounded-lg bg-primary text-white ">
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

                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-4 mt-4"
                  >
                    {/* Avatar */}
                    <div className="flex items-center gap-4">
                      <div className=" w-full flex justify-center items-center flex-col gap-2">
                        <Avatar className="w-24 h-24 border">
                          {imagePreview ? (
                            <AvatarImage src={imagePreview} alt="Profile" />
                          ) : (
                            <AvatarFallback>
                              {setstring(user.name)}
                            </AvatarFallback>
                          )}
                        </Avatar>
                        <label className="text-sm text-sidebar-primary cursor-pointer hover:underline">
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageChange}
                          />
                          Change Photo
                        </label>
                      </div>
                    </div>

                    {/* Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name
                      </label>
                      <Input {...register("name")} placeholder="Your Name" />
                    </div>

                    {/* Bio */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Bio
                      </label>
                      <Textarea
                        {...register("bio")}
                        placeholder="Tell something about yourself"
                        rows={3}
                      />
                    </div>

                    <DialogFooter className="flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button disabled={isLoding} type="submit">
                        Save
                      </Button>
                    </DialogFooter>
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
