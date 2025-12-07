"use client";

import React, { useState } from "react";
import {
    Smartphone,
    Archive,
    Trash2,
    MessageSquareOff,
    Palette,
    ChevronRight,
    User,
    Lock,
    Eye,
    UserPlus,
    CheckCheck,
    Shield,
    Ban,
    Info,
} from "lucide-react";
import SettingsItem from "./SettingsItem";
import { ConfirmDialog } from "../ui/ConfirmDialog";
import { ThemeToggle } from "./ThemeToggle";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";

export function SettingsContent() {
    const router = useRouter();
    const [clearMessagesOpen, setClearMessagesOpen] = useState(false);
    const [deleteChatsOpen, setDeleteChatsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleClearMessages = async () => {
        setIsLoading(true);
        try {
            await axios.post("/api/messages/clear-messages");
            toast.success("All messages cleared successfully");
            setClearMessagesOpen(false);
            router.refresh();
        } catch (error) {
            toast.error("Failed to clear messages");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteChats = async () => {
        setIsLoading(true);
        try {
            await axios.post("/api/conversations/delete-chats");
            toast.success("All chats deleted successfully");
            setDeleteChatsOpen(false);
            router.push("/conversations");
        } catch (error) {
            toast.error("Failed to delete chats");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="h-full w-full bg-background flex items-center justify-center">
            <div className="w-full max-w-4xl mx-auto overflow-y-auto h-full py-6">
                {/* Account Section */}
                <div className="mb-6">
                    <div className="px-6 py-2">
                        <h2 className="text-lg font-semibold">Account</h2>
                    </div>
                    <div className="bg-card border-y border-border">
                        <div className="px-6 py-3">
                            <div className="text-sm font-medium">Privacy</div>
                            <div className="text-xs text-muted-foreground italic">
                                Managed on your phone
                            </div>
                        </div>
                        <div className="border-t border-border" />
                        <SettingsItem
                            icon={<Eye className="h-5 w-5" />}
                            title="Last seen and online"
                            description="My contacts, Everyone"
                            trailing={<ChevronRight className="h-5 w-5 text-muted-foreground" />}
                        />
                        <div className="border-t border-border" />
                        <SettingsItem
                            icon={<User className="h-5 w-5" />}
                            title="Profile photo"
                            description="Everyone"
                            trailing={<ChevronRight className="h-5 w-5 text-muted-foreground" />}
                        />
                        <div className="border-t border-border" />
                        <SettingsItem
                            icon={<Info className="h-5 w-5" />}
                            title="About"
                            description="My contacts"
                            trailing={<ChevronRight className="h-5 w-5 text-muted-foreground" />}
                        />
                        <div className="border-t border-border" />
                        <SettingsItem
                            icon={<UserPlus className="h-5 w-5" />}
                            title="Add to groups"
                            description="Everyone"
                            trailing={<ChevronRight className="h-5 w-5 text-muted-foreground" />}
                        />
                        <div className="border-t border-border" />
                        <SettingsItem
                            icon={<CheckCheck className="h-5 w-5" />}
                            title="Read receipts"
                            description="On"
                            trailing={<ChevronRight className="h-5 w-5 text-muted-foreground" />}
                        />
                    </div>

                    {/* Blocked Contacts */}
                    <div className="mt-4">
                        <div className="px-6 py-3 bg-card border-y border-border">
                            <div className="text-sm font-medium">Blocked contacts</div>
                            <div className="text-xs text-muted-foreground italic">
                                Managed on your phone
                            </div>
                        </div>
                        <div className="bg-card border-b border-border">
                            <SettingsItem
                                icon={<Ban className="h-5 w-5" />}
                                title="No blocked contacts"
                                trailing={<ChevronRight className="h-5 w-5 text-muted-foreground" />}
                            />
                        </div>
                    </div>
                </div>

                {/* Security Section */}
                <div className="mb-6">
                    <div className="px-6 py-2">
                        <h2 className="text-lg font-semibold">Security</h2>
                    </div>
                    <div className="bg-card border-y border-border p-6 space-y-4">
                        <div>
                            <h3 className="font-medium mb-2">Your chats and calls are private</h3>
                            <p className="text-sm text-muted-foreground mb-3">
                                End-to-end encryption keeps your personal messages and calls between you and the
                                people you choose. No one outside of the chat, not even WhatsApp, can read, listen
                                to, or share them. This includes your:
                            </p>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li className="flex items-center gap-2">
                                    <MessageSquareOff className="h-4 w-4" />
                                    Text and voice messages
                                </li>
                                <li className="flex items-center gap-2">
                                    <Shield className="h-4 w-4" />
                                    Audio and video calls
                                </li>
                                <li className="flex items-center gap-2">
                                    <Lock className="h-4 w-4" />
                                    Photos, videos and documents
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Chat History Section */}
                <div className="mb-6">
                    <div className="px-6 py-2">
                        <h2 className="text-sm font-semibold text-muted-foreground uppercase">
                            Chat history
                        </h2>
                    </div>
                    <div className="bg-card border-y border-border">
                        <SettingsItem
                            icon={<Smartphone className="h-5 w-5" />}
                            title="Synced with your phone"
                            trailing={<ChevronRight className="h-5 w-5 text-muted-foreground" />}
                        />
                        <div className="border-t border-border" />
                        <SettingsItem
                            icon={<Archive className="h-5 w-5" />}
                            title="Archive all chats"
                            description="You will still receive new messages from archived chats"
                            trailing={<ChevronRight className="h-5 w-5 text-muted-foreground" />}
                        />
                        <div className="border-t border-border" />
                        <SettingsItem
                            icon={<MessageSquareOff className="h-5 w-5 text-destructive" />}
                            title="Clear all messages"
                            description="Delete all messages from chats and groups"
                            onClick={() => setClearMessagesOpen(true)}
                            destructive
                        />
                        <div className="border-t border-border" />
                        <SettingsItem
                            icon={<Trash2 className="h-5 w-5 text-destructive" />}
                            title="Delete all chats"
                            description="Delete all messages and clear the chats from your history"
                            onClick={() => setDeleteChatsOpen(true)}
                            destructive
                        />
                    </div>
                </div>

                {/* Appearance Section */}
                <div className="mb-6">
                    <div className="px-6 py-2">
                        <h2 className="text-sm font-semibold text-muted-foreground uppercase">
                            Appearance
                        </h2>
                    </div>
                    <div className="bg-card border-y border-border">
                        <SettingsItem
                            icon={<Palette className="h-5 w-5" />}
                            title="Theme"
                            description="Choose your preferred theme"
                            trailing={<ThemeToggle />}
                        />
                    </div>
                </div>
            </div>

            {/* Confirmation Dialogs */}
            <ConfirmDialog
                open={clearMessagesOpen}
                onOpenChange={setClearMessagesOpen}
                title="Clear all messages?"
                description="This will delete all messages from your chats and groups. This action cannot be undone."
                confirmText="Clear Messages"
                onConfirm={handleClearMessages}
                destructive
            />

            <ConfirmDialog
                open={deleteChatsOpen}
                onOpenChange={setDeleteChatsOpen}
                title="Delete all chats?"
                description="This will delete all your conversations and messages permanently. This action cannot be undone."
                confirmText="Delete All"
                onConfirm={handleDeleteChats}
                destructive
            />
        </div>
    );
}
