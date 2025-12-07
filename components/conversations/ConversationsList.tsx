"use client";
import React, { useEffect, useMemo, useState } from "react";
import { FullConversationstype } from "@/app/types";

import ConversationBox from "./ConversationBox";

import EmptyConversationList from "./EmptyConversationList";
import useConverstions from "@/app/hook/useConverstions";
import { ScrollArea } from "../ui/scroll-area";
import { authClient } from "@/lib/auth-client";
import { pusherClient } from "@/lib/Pusher";
import { find } from "lodash";
import { useRouter } from "next/navigation";

interface Conversationsporps {
  intialItems: FullConversationstype[];
}

const ConversationsList: React.FC<Conversationsporps> = ({ intialItems }) => {
  const [Items, setItems] = useState(intialItems);
  const { conversationId } = useConverstions();
  const session = authClient.useSession();
  const route = useRouter();

  const pusherKey = useMemo(() => {
    return session?.data?.user?.email;
  }, [session?.data?.user?.email]);

  useEffect(() => {
    if (!pusherKey) {
      return;
    }
    const newHndelr = (conversation: FullConversationstype) => {
      setItems((current) => {
        if (find(current, { id: conversation.id })) {
          return current;
        }
        return [conversation, ...current];
      });
    };
    const updateHndelr = (conversation: FullConversationstype & {
      lastMessageAt?: Date;
      seenUpdate?: { seenByUserId: string; seenByUserEmail: string; messageIds: string[] };
    }) => {
      setItems((current) => {
        const updated = current.map((curentConversation) => {
          if (curentConversation.id == conversation.id) {
            const existingMessages = curentConversation.messages || [];
            const newMessages = conversation.messages || [];

            let finalMessages;

            // Check if this is a seen update (from marking messages as seen)
            if (conversation.seenUpdate && conversation.seenUpdate.messageIds.length > 0) {
              // Update seen arrays for the specified messages
              finalMessages = existingMessages.map(msg => {
                if (conversation.seenUpdate!.messageIds.includes(msg.id)) {
                  // Add the user to seen array if not already there
                  const alreadySeen = msg.seen?.some(u => u.email === conversation.seenUpdate!.seenByUserEmail);
                  if (!alreadySeen) {
                    return {
                      ...msg,
                      seen: [...(msg.seen || []), {
                        id: conversation.seenUpdate!.seenByUserId,
                        email: conversation.seenUpdate!.seenByUserEmail
                      }],
                    };
                  }
                }
                return msg;
              });

              // Also update the last message if provided
              if (newMessages.length > 0) {
                const lastMsgUpdate = newMessages[newMessages.length - 1];
                finalMessages = finalMessages.map(msg => {
                  if (msg.id === lastMsgUpdate.id) {
                    return { ...msg, ...lastMsgUpdate };
                  }
                  return msg;
                });
              }
            } else if (newMessages.length === 1) {
              // Single new message - merge with existing
              const messageMap = new Map(existingMessages.map(m => [m.id, m]));
              newMessages.forEach(msg => {
                messageMap.set(msg.id, { ...messageMap.get(msg.id), ...msg });
              });
              finalMessages = Array.from(messageMap.values());
            } else {
              // Fallback - just use existing messages
              finalMessages = existingMessages;
            }

            return {
              ...curentConversation,
              messages: finalMessages,
              lastMessageAt: conversation.lastMessageAt || curentConversation.lastMessageAt,
            };
          }
          return curentConversation;
        });

        // Sort by lastMessageAt (newest first)
        return updated.sort((a, b) => {
          const aTime = new Date(a.lastMessageAt).getTime();
          const bTime = new Date(b.lastMessageAt).getTime();
          return bTime - aTime;
        });
      });
    };
    const deletehndelr = (conversation: FullConversationstype) => {
      setItems((current) => {
        return [...current.filter((vonte) => vonte.id !== conversation.id)];
      });
      if (conversation.id == conversationId) {
        route.push("/conversations");
      }
    };
    pusherClient.subscribe(pusherKey);
    pusherClient.bind("conversation:new", newHndelr);
    pusherClient.bind("conversation:update", updateHndelr);
    pusherClient.bind("conversation:remove", deletehndelr);
    return () => {
      pusherClient.unsubscribe(pusherKey);
      pusherClient.unbind("conversation:new", newHndelr);
      pusherClient.unbind("conversation:update", updateHndelr);
      pusherClient.unbind("conversation:remove", deletehndelr);
    };
  }, [pusherKey, conversationId, route]);

  if (Items.length == 0) {
    return <EmptyConversationList />;
  }

  return (
    <div className="flex-1 overflow-hidden">
      <ScrollArea className="h-full p-2 ">
        <div>
          {Items.map((item) => (
            <ConversationBox
              data={item}
              isActive={conversationId == item.id}
              key={item.id}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ConversationsList;

