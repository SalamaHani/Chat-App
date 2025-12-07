"use client";

import React, { useState } from "react";
import {
    User,
    Shield,
    MessageSquare,
    Palette,
    ChevronRight,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/animate-ui/components/radix/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ReloadIcon } from "@radix-ui/react-icons";

interface SettingsListItem {
    id: string;
    title: string;
    icon: React.ReactNode;
    path: string;
}

const settingsItems: SettingsListItem[] = [
    {
        id: "account",
        title: "Account",
        icon: <User className="h-5 w-5" />,
        path: "/settings/account",
    },
    {
        id: "security",
        title: "Security",
        icon: <Shield className="h-5 w-5" />,
        path: "/settings/security",
    },
    {
        id: "chats",
        title: "Chats",
        icon: <MessageSquare className="h-5 w-5" />,
        path: "/settings/chats",
    },
    {
        id: "appearance",
        title: "Appearance",
        icon: <Palette className="h-5 w-5" />,
        path: "/settings/appearance",
    },
];

interface SettingsListProps {
    user?: {
        name: string;
        email: string;
        image?: string | null;
        bio?: string | null;
    };
}

export function SettingsList({ user }: SettingsListProps) {
    const router = useRouter();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState(user?.name || "");
    const [bio, setBio] = useState(user?.bio || "");
    const [image, setImage] = useState(user?.image || "");
    const [isLoading, setIsLoading] = useState(false);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleImageUpload = (e: any) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    };

    const handleSubmit = () => {
        setIsLoading(true);
        // TODO: send to API
        setTimeout(() => {
            setIsLoading(false);
            setIsOpen(false);
        }, 1000);
    };

    return (
        <div className="flex h-full w-[400px] flex-col bg-background border-r border-border">
            {/* User Profile Section */}
            <div className="p-6 border-b border-border">
                <div className="flex items-center gap-4 mb-4">
                    <Avatar className="h-16 w-16">
                        <AvatarImage src={image || undefined} />
                        <AvatarFallback className="text-lg">
                            {user?.name?.[0]?.toUpperCase() || "U"}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                        <h2 className="font-semibold text-lg truncate">{user?.name || "User"}</h2>
                        <p className="text-sm text-muted-foreground truncate">{user?.email}</p>
                    </div>
                </div>

                {user?.bio && (
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{user.bio}</p>
                )}

                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button variant="outline" className="w-full">
                            Edit Account
                        </Button>
                    </DialogTrigger>

                    <DialogContent className="max-w-md">
                        <DialogHeader>
                            <DialogTitle className="text-xl font-semibold">Edit Account</DialogTitle>
                        </DialogHeader>

                        <div className="flex flex-col gap-5 p-2">
                            {/* Avatar Section */}
                            <div className="flex flex-col items-center gap-2">
                                <Avatar className="w-24 h-24 border">
                                    <AvatarImage src={image || undefined} />
                                    <AvatarFallback className="text-2xl">
                                        {name?.[0]?.toUpperCase() || "U"}
                                    </AvatarFallback>
                                </Avatar>

                                <label className="text-sm text-primary cursor-pointer hover:underline">
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
                                    rows={3}
                                />
                            </div>

                            {/* Submit button */}
                            <Button className="w-full mt-3" onClick={handleSubmit} disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                                        Please wait...
                                    </>
                                ) : (
                                    <>Save Changes</>
                                )}
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Settings Header */}
            <div className="p-4 border-b border-border">
                <h1 className="text-xl font-semibold">Settings</h1>
            </div>

            {/* Settings Items */}
            <div className="flex-1 overflow-y-auto">
                {settingsItems.map((item) => {
                    const isActive = pathname === item.path;
                    return (
                        <button
                            key={item.id}
                            onClick={() => router.push(item.path)}
                            className={`w-full flex items-center gap-4 p-4 hover:bg-secondary/50 transition-colors ${isActive ? "bg-secondary" : ""
                                }`}
                        >
                            <div className="flex-shrink-0">{item.icon}</div>
                            <div className="flex-1 text-left">
                                <div className="font-medium">{item.title}</div>
                            </div>
                            <ChevronRight className="h-5 w-5 text-muted-foreground" />
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
