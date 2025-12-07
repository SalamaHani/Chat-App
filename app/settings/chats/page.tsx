"use client";

import React, { useState } from "react";
import {
    Smartphone,
    Archive,
    Trash2,
    MessageSquareOff,
    ChevronRight,
} from "lucide-react";
import SettingsItem from "@/components/settings/SettingsItem";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ChatsPage() {
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
        <div className="h-full w-full bg-background p-6 overflow-y-auto">
            <div className="max-w-3xl">
                <h1 className="text-2xl font-semibold mb-6">Chats</h1>

                <div className="bg-card border border-border rounded-lg divide-y divide-border">
                    <SettingsItem
                        icon={<Smartphone className="h-5 w-5" />}
                        title="Synced with your phone"
                        trailing={<ChevronRight className="h-5 w-5 text-muted-foreground" />}
                    />
                    <SettingsItem
                        icon={<Archive className="h-5 w-5" />}
                        title="Archive all chats"
                        description="You will still receive new messages from archived chats"
                        trailing={<ChevronRight className="h-5 w-5 text-muted-foreground" />}
                    />
                    <SettingsItem
                        icon={<MessageSquareOff className="h-5 w-5 text-destructive" />}
                        title="Clear all messages"
                        description="Delete all messages from chats and groups"
                        onClick={() => setClearMessagesOpen(true)}
                        destructive
                    />
                    <SettingsItem
                        icon={<Trash2 className="h-5 w-5 text-destructive" />}
                        title="Delete all chats"
                        description="Delete all messages and clear the chats from your history"
                        onClick={() => setDeleteChatsOpen(true)}
                        destructive
                    />
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
