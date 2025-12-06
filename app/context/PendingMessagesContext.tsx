"use client";
import React, { createContext, useContext, useState, useCallback } from "react";
import { authClient } from "@/lib/auth-client";

export interface PendingMessage {
    id: string;
    body: string | null;
    image: string | null;
    createdAt: Date;
    conversationId: string;
    senderId: string;
    status: "sending" | "sent" | "failed";
    sender: {
        id: string;
        name: string;
        email: string;
        image: string | null;
    };
}

interface PendingMessagesContextType {
    pendingMessages: PendingMessage[];
    addPendingMessage: (message: Omit<PendingMessage, "id" | "createdAt" | "status" | "sender" | "senderId">) => string;
    updatePendingMessageStatus: (id: string, status: "sent" | "failed") => void;
    removePendingMessage: (id: string) => void;
}

const PendingMessagesContext = createContext<PendingMessagesContextType | null>(null);

export function PendingMessagesProvider({ children }: { children: React.ReactNode }) {
    const [pendingMessages, setPendingMessages] = useState<PendingMessage[]>([]);
    const session = authClient.useSession();

    const addPendingMessage = useCallback((message: Omit<PendingMessage, "id" | "createdAt" | "status" | "sender" | "senderId">) => {
        const id = `pending-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        const user = session?.data?.user;

        const pendingMessage: PendingMessage = {
            ...message,
            id,
            createdAt: new Date(),
            status: "sending",
            senderId: user?.id || "",
            sender: {
                id: user?.id || "",
                name: user?.name || "",
                email: user?.email || "",
                image: user?.image || null,
            },
        };

        setPendingMessages((prev) => [...prev, pendingMessage]);
        return id;
    }, [session?.data?.user]);

    const updatePendingMessageStatus = useCallback((id: string, status: "sent" | "failed") => {
        setPendingMessages((prev) =>
            prev.map((msg) => (msg.id === id ? { ...msg, status } : msg))
        );
    }, []);

    const removePendingMessage = useCallback((id: string) => {
        setPendingMessages((prev) => prev.filter((msg) => msg.id !== id));
    }, []);

    return (
        <PendingMessagesContext.Provider
            value={{
                pendingMessages,
                addPendingMessage,
                updatePendingMessageStatus,
                removePendingMessage,
            }}
        >
            {children}
        </PendingMessagesContext.Provider>
    );
}

export function usePendingMessages() {
    const context = useContext(PendingMessagesContext);
    if (!context) {
        throw new Error("usePendingMessages must be used within a PendingMessagesProvider");
    }
    return context;
}
