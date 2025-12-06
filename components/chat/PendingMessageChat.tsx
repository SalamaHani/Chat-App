"use client";

import { PendingMessage } from "@/app/context/PendingMessagesContext";
import { authClient } from "@/lib/auth-client";
import clsx from "clsx";
import Image from "next/image";
import { Clock, Check, AlertCircle } from "lucide-react";
import AvatarChat from "../conversations/AvatarChat";

interface PendingMessageProps {
    data: PendingMessage;
}

const PendingMessageChat: React.FC<PendingMessageProps> = ({ data }) => {
    const session = authClient.useSession();

    // Pending messages are always from the current user
    const container = clsx("flex gap-3 px-4 py-1 justify-end");
    const body = clsx("flex flex-col gap-1 items-end");

    // WhatsApp style: green for own messages with slight opacity for pending
    const message = clsx(
        "relative overflow-hidden rounded-lg px-3 py-2 text-sm shadow-sm",
        "rounded-tr-none bg-[#d9fdd3] dark:bg-[#005c4b] text-neutral-900 dark:text-white",
        data.status === "sending" && "opacity-80",
        data.status === "failed" && "opacity-60",
        data.image ? "rounded-lg p-1" : "rounded-lg px-3 py-2"
    );

    const formatTime = (date: Date) => {
        return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const StatusIcon = () => {
        switch (data.status) {
            case "sending":
                return <Clock size={14} className="text-neutral-400 animate-pulse" />;
            case "sent":
                return <Check size={16} className="text-neutral-400" />;
            case "failed":
                return <AlertCircle size={14} className="text-red-500" />;
            default:
                return null;
        }
    };

    return (
        <div className={container}>
            <div className="order-2">
                <AvatarChat user={data.sender as any} />
            </div>
            <div className={body}>
                <div className="flex flex-col">
                    <div className={message}>
                        {data.image ? (
                            <Image
                                alt="Image"
                                src={data.image}
                                width={288}
                                height={288}
                                className="rounded-lg object-cover"
                            />
                        ) : (
                            <div className="leading-relaxed">{data.body}</div>
                        )}
                        <div className="flex items-center justify-end gap-1 mt-1">
                            <span className="text-[11px] text-neutral-500 dark:text-neutral-400">
                                {formatTime(data.createdAt)}
                            </span>
                            <StatusIcon />
                        </div>
                    </div>
                    {data.status === "failed" && (
                        <span className="text-[11px] text-red-500 mt-1">
                            Failed to send. Tap to retry.
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PendingMessageChat;
